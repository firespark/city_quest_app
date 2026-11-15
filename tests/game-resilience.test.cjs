const assert = require('node:assert/strict')
const { test } = require('node:test')
const path = require('node:path')
const { transformFileSync } = require('@babel/core')
const load = (file, mocks = {}, globals = {}) => {
    const result = transformFileSync(path.join(__dirname, '..', file), { babelrc: false, configFile: false,
        plugins: [[require.resolve('@babel/plugin-transform-react-jsx'), { runtime: 'automatic' }], require.resolve('@babel/plugin-transform-modules-commonjs')] })
    const module = { exports: {} }
    const requireMock = name => { if (Object.hasOwn(mocks, name)) return mocks[name]; throw new Error('Unexpected dependency: ' + name) }
    new Function('require', 'module', 'exports', ...Object.keys(globals), result.code)(requireMock, module, module.exports, ...Object.values(globals))
    return module.exports
}
const jsx = (type, props, key) => ({ type, props, key })
const runtime = { jsx, jsxs: jsx, Fragment: 'Fragment' }
const styles = { mainStyle: {}, gameStyle: {} }
const elements = (tree, predicate) => {
    if (!tree || typeof tree !== 'object') return []
    if (Array.isArray(tree)) return tree.flatMap(node => elements(node, predicate))
    return [...(predicate(tree) ? [tree] : []), ...elements(tree.props?.children, predicate)]
}
const makeHttp = fetch => {
    const recovery = load('src/scripts/appRecovery.js')
    let failures = 0
    recovery.subscribeToCriticalErrors(() => { failures++ })
    const { Http } = load('src/scripts/http.js', { './appRecovery': recovery }, { fetch,
        setTimeout: fn => { fn(); return 1 }, console: { log: () => {} } })
    return { Http, recovery, get failures() { return failures } }
}
const response = (status, body) => ({ ok: status >= 200 && status < 300, status, json: async () => body })

test('HTTP and legacy JSON errors stay local, including the normal anonymous-profile 401', async () => {
    for (const [httpStatus, status, error] of [[200, 401, 'Unauthorized'], [401, 401, 'Unauthorized'], [403, 200, 'Forbidden'], [200, 403, 'Forbidden'], [404, 404, 'Not found'], [500, 500, 'error'], [200, 409, 'route changed']]) {
        let calls = 0
        const harness = makeHttp(async () => { calls++; return response(httpStatus, { success: 0, status, error }) })
        const output = await harness.Http.get('https://api.test/game')
        assert.equal(output.success, 0)
        assert.notEqual(output.error, 'connection_error')
        assert.equal(harness.failures, 0)
        assert.equal(calls, 1)
    }
})

test('ordinary validation and wrong-answer responses do not restart the app', async () => {
    for (const body of [{ success: 0, status: 400, error: 'invalid answer' }, { success: 1, data: { errors: 1 } }]) {
        const harness = makeHttp(async () => response(200, body))
        assert.deepEqual(await harness.Http.post('https://api.test/answer', {}), body)
        assert.equal(harness.failures, 0)
    }
})

test('network failures keep the offline response and GET retry policy', async () => {
    let calls = 0
    const harness = makeHttp(async () => { calls++; throw new Error('network unavailable') })
    assert.equal((await harness.Http.get('https://api.test/game')).error, 'connection_error')
    assert.equal(calls, 4)
    assert.equal(harness.failures, 0)
})

test('malformed server responses return a local error, and pending requests cannot break a restarted app', async () => {
    const broken = makeHttp(async () => ({ ok: true, status: 200, json: async () => { throw new Error('HTML response') } }))
    assert.equal((await broken.Http.get('https://api.test/game')).error, 'Не удалось загрузить данные')
    assert.equal(broken.failures, 0)
    const invalid = makeHttp(async () => response(200, {}))
    assert.equal((await invalid.Http.get('https://api.test/game')).success, 0)
    assert.equal(invalid.failures, 0)
    for (const error of [null, {}, ['Forbidden']]) {
        const invalidError = makeHttp(async () => response(200, { success: 0, status: 500, error }))
        assert.equal((await invalidError.Http.get('https://api.test/profile')).error, 'Не удалось загрузить данные')
        assert.equal(invalidError.failures, 0)
    }
    let resolve
    const pending = makeHttp(() => new Promise(done => { resolve = done }))
    const request = pending.Http.get('https://api.test/game')
    pending.recovery.restartAppState()
    resolve(response(403, { success: 0, error: 'Forbidden' }))
    await request
    assert.equal(pending.failures, 0)
})

test('recovery boundary remounts the app on request and restores the previous JS error handler', () => {
    const recovery = load('src/scripts/appRecovery.js')
    let previousCalls = 0
    const previous = () => { previousCalls++ }
    let handler = previous
    class Component { constructor(props) { this.props = props } setState(value) { this.state = { ...this.state, ...value } } }
    const { AppErrorBoundary } = load('src/components/common/AppErrorBoundary.js', {
        react: { Component }, 'react/jsx-runtime': runtime,
        'react-native': { View: 'View', Text: 'Text', TouchableOpacity: 'Button' },
        '../../scripts/appRecovery': recovery, '../../styles/mainStyle': styles,
    }, { globalThis: { ErrorUtils: { getGlobalHandler: () => handler, setGlobalHandler: value => { handler = value } } } })
    const boundary = new AppErrorBoundary({ children: 'APP' })
    boundary.componentDidMount()
    const before = boundary.render()
    recovery.reportCriticalError()
    assert.equal(boundary.state.failed, true)
    const button = elements(boundary.render(), node => node.type === 'Button')[0]
    button.props.onPress()
    assert.equal(boundary.state.failed, false)
    assert.notEqual(boundary.render().key, before.key)
    const restarted = boundary.render().key
    recovery.requestAppRestart()
    assert.equal(boundary.state.failed, false)
    assert.notEqual(boundary.render().key, restarted)
    handler(new Error('fatal JS error'), true)
    assert.equal(boundary.state.failed, true)
    assert.equal(previousCalls, 0)
    handler(new Error('nonfatal'), false)
    assert.equal(previousCalls, 1)
    assert.deepEqual(AppErrorBoundary.getDerivedStateFromError(), { failed: true })
    boundary.componentWillUnmount()
    assert.equal(handler, previous)
})

// Run effects and preserve hook state across renders of the actual component source.
const mountComponent = (file, name, Http, context = { token: 'test-token' }) => {
    const state = [], dependencies = [], effects = []
    let cursor = 0
    const react = {
        useContext: () => context,
        useState: initial => {
            const index = cursor++
            if (!(index in state)) state[index] = initial
            return [state[index], value => { state[index] = typeof value === 'function' ? value(state[index]) : value }]
        },
        useEffect: (callback, next) => {
            const index = cursor++
            if (!dependencies[index] || next.some((value, key) => value !== dependencies[index][key])) {
                dependencies[index] = next
                effects.push(callback)
            }
        },
    }
    const mocks = { react, 'react/jsx-runtime': runtime,
        'react-native': { View: 'View', ScrollView: 'ScrollView', Text: 'Text' },
        '@expo/vector-icons': { Ionicons: 'Icon' },
    }
    for (const prefix of ['../', '../../']) {
        for (const style of ['mainStyle', 'headerStyle', 'profileStyle', 'questsStyle']) mocks[prefix + 'styles/' + style] = { [style]: {} }
        mocks[prefix + 'context/mainContext'] = { MainContext: {} }
        mocks[prefix + 'scripts/http'] = { Http }
    }
    for (const prefix of ['../components/common/', '../common/']) {
        for (const component of ['Back', 'Menu', 'Footer', 'Loader', 'Error', 'ConnectionError']) mocks[prefix + component] = { [component]: component }
    }
    for (const component of ['Settings', 'ProfileRegister']) mocks['../components/profile/' + component] = { [component]: component }
    for (const component of ['OpenQuests', 'DoneQuests', 'PurchasedQuests']) mocks['../components/quests/' + component] = { [component]: component }
    for (const component of ['OpenQuest', 'PurchasedQuest']) mocks['./' + component] = { [component]: component }
    const Component = load(file, mocks)[name]
    const render = () => { cursor = 0; return Component() }
    const settle = async () => {
        while (effects.length) effects.shift()()
        await new Promise(resolve => setImmediate(resolve))
        return render()
    }
    render()
    return { render, settle }
}
const nodesOfType = (tree, type) => elements(tree, node => node.type === type)
const textIncludes = (tree, text) => elements(tree, node => node.type === 'Text').some(node => String(node.props.children).includes(text))

test('anonymous profile handles the real API 401 contract without replacing the app or changing the token', async () => {
    const context = { token: 'anonymous-token' }
    const harness = makeHttp(async () => response(200, { success: 0, status: 401, error: 'Unauthorized' }))
    const profile = mountComponent('src/screens/ProfileScreen.js', 'ProfileScreen', harness.Http, context)
    const tree = await profile.settle()
    assert.equal(nodesOfType(tree, 'ProfileRegister').length, 1)
    assert.equal(nodesOfType(tree, 'OpenQuests').length, 1)
    assert.equal(nodesOfType(tree, 'DoneQuests').length, 1)
    assert.equal(nodesOfType(tree, 'Error').length, 0)
    assert.equal(nodesOfType(tree, 'Back').length, 1)
    assert.equal(nodesOfType(tree, 'Footer').length, 1)
    assert.equal(context.token, 'anonymous-token')
    assert.equal(harness.failures, 0)
})

test('registered profile renders its name, settings and purchased quests', async () => {
    for (const name of ['Тестовый путешественник', null, 123]) {
        const harness = makeHttp(async () => response(200, { success: 1, data: { name, email: 'test@example.test' } }))
        const profile = mountComponent('src/screens/ProfileScreen.js', 'ProfileScreen', harness.Http)
        const tree = await profile.settle()
        assert.ok(textIncludes(tree, typeof name === 'string' ? name : 'Путешественник'))
        assert.equal(nodesOfType(tree, 'Settings').length, 1)
        assert.equal(nodesOfType(tree, 'PurchasedQuests').length, 1)
        assert.equal(nodesOfType(tree, 'ProfileRegister').length, 0)
    }
})

test('profile errors keep the sign-in entry accessible, retain navigation and can be retried', async () => {
    for (const failure of ['offline', 403, 500, 'malformed']) {
        let healthy = false
        const harness = makeHttp(async () => {
            if (healthy) return response(200, { success: 1, data: { name: 'Профиль восстановлен', email: 'test@example.test' } })
            if (failure === 'offline') throw new Error('offline')
            if (failure === 'malformed') return response(200, { success: 1, data: null })
            return response(failure, { success: 0, error: 'Forbidden' })
        })
        const profile = mountComponent('src/screens/ProfileScreen.js', 'ProfileScreen', harness.Http)
        const tree = await profile.settle()
        assert.equal(nodesOfType(tree, 'Back').length, 1)
        assert.equal(nodesOfType(tree, 'Menu').length, 1)
        assert.equal(nodesOfType(tree, 'Footer').length, 1)
        assert.equal(nodesOfType(tree, 'ProfileRegister').length, 1)
        assert.equal(nodesOfType(tree, 'OpenQuests').length, 0)
        assert.equal(nodesOfType(tree, 'DoneQuests').length, 0)
        const retry = nodesOfType(tree, failure === 'offline' ? 'ConnectionError' : 'Error')[0]
        assert.ok(retry, String(failure))
        assert.equal(harness.failures, 0)
        healthy = true
        await retry.props.onRetry()
        assert.ok(textIncludes(profile.render(), 'Профиль восстановлен'))
    }
})

test('each profile quest block keeps errors local and recovers without an app restart', async () => {
    for (const [name, title, empty] of [
        ['OpenQuests', 'Открытые туры', 'Нет открытых туров'],
        ['DoneQuests', 'Пройденные туры', 'Нет пройденных туров'],
        ['PurchasedQuests', 'Купленные туры', 'Нет купленных туров'],
    ]) {
        for (const failure of [403, 404, 500, null, {}, [null], 'offline']) {
            let healthy = false
            const harness = makeHttp(async () => {
                if (healthy) return response(200, { success: 1, data: [] })
                if (failure === 'offline') throw new Error('offline')
                return typeof failure === 'number'
                    ? response(failure, { success: 0, error: 'Forbidden' })
                    : response(200, { success: 1, data: failure })
            })
            const block = mountComponent('src/components/quests/' + name + '.js', name, harness.Http)
            const tree = await block.settle()
            assert.ok(textIncludes(tree, title))
            assert.equal(textIncludes(tree, empty), false)
            assert.equal(harness.failures, 0)
            const retry = nodesOfType(tree, failure === 'offline' ? 'ConnectionError' : 'Error')[0]
            assert.ok(retry, name + ': ' + JSON.stringify(failure))
            healthy = true
            await retry.props.onRetry()
            assert.ok(textIncludes(block.render(), empty))
        }
    }
})

test('local errors only restart on explicit user action, while validation messages stay inline', () => {
    const recovery = load('src/scripts/appRecovery.js')
    let restarts = 0, retries = 0
    recovery.subscribeToAppRestarts(() => { restarts++ })
    const { Error: ErrorMessage } = load('src/components/common/Error.js', {
        'react/jsx-runtime': runtime, 'react-native': { View: 'View', Text: 'Text', TouchableOpacity: 'Button' },
        '../../styles/mainStyle': styles, '../../scripts/appRecovery': recovery,
    })
    const critical = ErrorMessage({ text: 'Forbidden' })
    assert.equal(restarts, 0)
    nodesOfType(critical, 'Button')[0].props.onPress()
    assert.equal(restarts, 1)
    const retry = ErrorMessage({ text: 'Forbidden', onRetry: () => { retries++ } })
    nodesOfType(retry, 'Button')[0].props.onPress()
    assert.equal(retries, 1)
    assert.equal(restarts, 1)
    assert.equal(nodesOfType(ErrorMessage({ text: 'Неверный ответ' }), 'Button').length, 0)
})

const { splitAnswerInput } = load('src/scripts/answerInput.js')
test('spaces and pasted phrases advance and distribute words without joining them', () => {
    assert.deepEqual(splitAnswerInput('кот ', 0, 2, {}), { answers: { 0: 'кот' }, focusIndex: 1 })
    assert.deepEqual(splitAnswerInput('кот дом', 0, 3, {}), { answers: { 0: 'кот', 1: 'дом' }, focusIndex: 1 })
    assert.deepEqual(splitAnswerInput('кот дом ', 0, 3, {}), { answers: { 0: 'кот', 1: 'дом' }, focusIndex: 2 })
    assert.equal(splitAnswerInput('дом ', 1, 2, {}).focusIndex, 1)
    assert.equal(splitAnswerInput(' ', 0, 2, {}).focusIndex, 0)
    assert.deepEqual(splitAnswerInput('  кот\nдом', 0, 2, {}), { answers: { 0: 'кот', 1: 'дом' }, focusIndex: 1 })
    assert.deepEqual(splitAnswerInput('а б', 0, 1, {}), { answers: { 0: 'аб' }, focusIndex: 0 })
})

test('answer form actually focuses the next native input after a space', () => {
    let answers = {}, focus = 0
    const ref = { current: [] }
    const { TaskAnswerForm } = load('src/components/game/TaskAnswerForm.js', {
        react: { useContext: () => ({ answersState: answers, setAnswersState: value => { answers = value } }),
            useState: initial => [initial, () => {}], useRef: () => ref },
        'react/jsx-runtime': runtime,
        'react-native': { View: 'View', Text: 'Text', TextInput: 'Input', TouchableOpacity: 'Button', Image: 'Image' },
        '../../styles/mainStyle': styles, '../../styles/gameStyle': styles,
        '../common/Loader': { Loader: 'Loader' }, '../../context/mainContext': { MainContext: {} },
        '../../scripts/http': { Http: {} }, '../../scripts/answerInput': { splitAnswerInput },
    })
    const tree = TaskAnswerForm({ game: { inputs2: 2 }, answerNumber: 2 })
    const inputs = elements(tree, node => node.type === 'Input')
    inputs[1].props.ref({ focus: () => { focus++ } })
    inputs[0].props.onChangeText('кот ')
    assert.deepEqual(answers, { 0: 'кот' })
    assert.equal(focus, 1)
})

test('excursion can be hidden independently of the ordinary quest option', () => {
    const { GameFormat } = load('src/components/game/GameFormat.js', { 'react/jsx-runtime': runtime,
        'react-native': { View: 'View', Text: 'Text', TouchableOpacity: 'Button' },
        '../../styles/mainStyle': styles, '../../styles/gameStyle': styles })
    const tree = GameFormat({ selectedId: 1, setSelectedId: () => {}, tourEnabled: false })
    assert.equal(elements(tree, node => node.type === 'Button').length, 1)
})

test('zero-balance extras cannot be purchased when disabled, but existing stock can still be used', async () => {
    for (const name of ['Hints', 'Skips']) {
        let purchases = 0, modal
        const lower = name.toLowerCase()
        const mocks = {
            react: { useContext: () => ({}), useState: initial => [initial, () => {}] }, 'react/jsx-runtime': runtime,
            'react-native': { View: 'View', Text: 'Text', TouchableOpacity: 'Button', Image: 'Image', ActivityIndicator: 'Spinner' },
            '@expo/vector-icons': { Ionicons: 'Icon' }, '../../styles/gameStyle': styles,
            '../../context/mainContext': { MainContext: {} },
            '../../context/GoogleBillingContext': { useGoogleBilling: () => ({ buyProduct: async () => { purchases++; return { success: 0 } } }), ErrorCode: {} },
            '../../scripts/http': { Http: {} }, '../../config/billing': { BILLING_PRODUCTS: { rustore: { hints: 'hints', skips: 'skips' } } },
            '../../libs/RuStoreReactPay': { RuStoreReactPay: { getPurchaseAvailability: async () => { purchases++; return { availability: true } } } },
        }
        for (const image of ['hint', 'hint-disabled', 'skip', 'skip-disabled']) mocks['../../../assets/img/' + image + '.png'] = 1
        const Control = load('src/components/game/' + name + '.js', mocks)[name]
        const props = { [lower]: 0, ['show' + name.slice(0, -1)]: false, canBuy: false, setModal: value => { modal = value } }
        const tree = Control(props)
        const button = elements(tree, node => node.type === 'Button')[0]
        assert.equal(button.props.disabled, true)
        button.props.onPress()
        await Promise.resolve()
        assert.equal(purchases, 0)
        assert.equal(elements(tree, node => node.type === 'Icon').length, 0)
        const stock = Control({ ...props, [lower]: 1, ['show' + name.slice(0, -1)]: true })
        elements(stock, node => node.type === 'Button')[0].props.onPress()
        assert.equal(modal, lower === 'hints' ? 'hint' : 'skip')
    }
})

test('finish button opens the current quest city list without a completion request', () => {
    const events = []
    const { FinishButton } = load('src/components/game/FinishButton.js', {
        react: { useContext: () => ({
            setCityData: city => events.push(city), changeScreen: screen => events.push(screen),
            questScreenCleanup: () => events.push('cleanup'),
        }) },
        'react/jsx-runtime': runtime, 'react-native': { View: 'View', Text: 'Text', TouchableOpacity: 'Button' },
        '../../context/mainContext': { MainContext: {} }, '../../context/types': { QUESTS_SCREEN: 'QUESTS' },
        '../../styles/mainStyle': styles,
    })
    elements(FinishButton({ game: { quest_city_id: 27, quest_city: 'Тбилиси' } }), node => node.type === 'Button')[0].props.onPress()
    assert.deepEqual(events, [{ id: 27, title: 'Тбилиси' }, 'QUESTS', 'cleanup'])
})

test('confirming a hint immediately opens the corresponding hint without scrolling or closing the modal', async () => {
    for (const status of [0, '0', 1, '1']) {
        const events = [], requests = []
        const data = { status, hints_number: 2, sight_hint1: { text: ['Первая подсказка'] }, sight_hint2: { text: ['Вторая подсказка'] } }
        const { ModalHintAlert } = load('src/components/game/modal/ModalHintAlert.js', {
            react: { useState: initial => [initial, () => {}], useContext: () => ({
                questId: 7, token: 'test-token', scrollViewRef: { current: { scrollToEnd: () => events.push('scroll') } },
            }) },
            'react/jsx-runtime': runtime, 'react-native': { View: 'View', Text: 'Text', TouchableOpacity: 'Button' },
            '../../../styles/mainStyle': styles, '../../../styles/gameStyle': styles,
            '../../common/Loader': { Loader: 'Loader' }, '../../common/Error': { Error: 'Error' },
            '../../../context/mainContext': { MainContext: {} },
            '../../../scripts/http': { Http: { get: async (...args) => { requests.push(args); return { success: 1, data } } } },
        })
        const tree = ModalHintAlert({ setGame: value => events.push(value), setModal: value => events.push(value) })
        await nodesOfType(tree, 'Button')[0].props.onPress()
        assert.deepEqual(events, [data, Number(status) === 1 ? 'hint2' : 'hint1'])
        assert.equal(requests.length, 1)
        assert.ok(requests[0][0].endsWith('/games/getHint/7'))
        assert.equal(requests[0][1], 'test-token')
    }
})

test('a failed hint request keeps the confirmation open without changing the game', async () => {
    for (const error of ['connection_error', 'Подсказок больше нет.']) {
        const events = [], state = []
        const { ModalHintAlert } = load('src/components/game/modal/ModalHintAlert.js', {
            react: { useState: initial => [initial, value => state.push(value)], useContext: () => ({ questId: 7, token: 'test-token' }) },
            'react/jsx-runtime': runtime, 'react-native': { View: 'View', Text: 'Text', TouchableOpacity: 'Button' },
            '../../../styles/mainStyle': styles, '../../../styles/gameStyle': styles,
            '../../common/Loader': { Loader: 'Loader' }, '../../common/Error': { Error: 'Error' },
            '../../../context/mainContext': { MainContext: {} },
            '../../../scripts/http': { Http: { get: async () => ({ success: 0, error }) } },
        })
        const tree = ModalHintAlert({ setGame: value => events.push(value), setModal: value => events.push(value) })
        await nodesOfType(tree, 'Button')[0].props.onPress()
        assert.deepEqual(events, [])
        assert.ok(state.includes(error === 'connection_error' ? 'Отсутствует подключение к интернету' : error))
    }
})

test('the used hint button can still reopen the same hint without a new request', () => {
    for (const answerNumber of [1, 2]) {
        let modal
        const { splitAnswerInput } = load('src/scripts/answerInput.js')
        const { TaskAnswerForm } = load('src/components/game/TaskAnswerForm.js', {
            react: { useContext: () => ({ answersState: {}, setAnswersState: () => {} }), useState: initial => [initial, () => {}], useRef: () => ({ current: [] }) },
            'react/jsx-runtime': runtime,
            'react-native': { View: 'View', Text: 'Text', TextInput: 'Input', TouchableOpacity: 'Button', Image: 'Image' },
            '../../styles/mainStyle': styles, '../../styles/gameStyle': styles,
            '../common/Loader': { Loader: 'Loader' }, '../../context/mainContext': { MainContext: {} },
            '../../scripts/http': { Http: { post: () => { throw new Error('Reopening must not consume another hint') } } },
            '../../scripts/answerInput': { splitAnswerInput }, '../../../assets/img/hint.png': 1,
        })
        const tree = TaskAnswerForm({ game: { inputs1: 1, inputs2: 1, ['sight_hint' + answerNumber]: { text: ['Подсказка'] } },
            answerNumber, setModal: value => { modal = value } })
        nodesOfType(tree, 'Button')[0].props.onPress()
        assert.equal(modal, 'hint' + answerNumber)
    }
})

const googleSignInHarness = ({ sdkError, playServicesError, output = { success: 1 }, cancelled = false } = {}) => {
    const errors = [], loading = [], screens = [], requests = []
    const { AuthGoogle } = load('src/components/auth/AuthGoogle.js', {
        'react/jsx-runtime': runtime,
        'react-native': { Text: 'Text', TouchableOpacity: 'Button', Image: 'Image' },
        '../../styles/authStyle': { authStyle: {} },
        '../../config/socialAuth': { SOCIAL_AUTH: { google: 'test-web-client.apps.googleusercontent.com' } },
        '@react-native-google-signin/google-signin': { GoogleSignin: {
            configure: () => {},
            hasPlayServices: async () => { if (playServicesError) throw playServicesError },
            signIn: async () => {
                if (sdkError) throw sdkError
                return cancelled ? { type: 'cancelled' } : { type: 'success', data: { idToken: 'test-id-token' } }
            },
        } },
        '../../scripts/http': { Http: { post: async (...args) => { requests.push(args); return output } } },
        '../../../assets/img/google.png': 1,
    })
    const tree = AuthGoogle({ token: 'test-app-token', screen: 'PROFILE', setError: value => errors.push(value),
        setLoader: value => loading.push(value), changeScreen: value => screens.push(value) })
    return { errors, loading, screens, requests, press: () => nodesOfType(tree, 'Button')[0].props.onPress() }
}

test('Google sign-in preserves the SDK error instead of masking it with custom text', async () => {
    for (const sdkError of [new Error('DEVELOPER_ERROR: original SDK details'), { code: '10' }, 'original rejection']) {
        const h = googleSignInHarness({ sdkError })
        await h.press()
        assert.deepEqual(h.errors, [null, sdkError.message || String(sdkError.code ?? sdkError)])
        assert.deepEqual(h.loading, [true, false])
        assert.deepEqual(h.requests, [])
        assert.deepEqual(h.screens, [])
    }
    const services = googleSignInHarness({ playServicesError: new Error('PLAY_SERVICES_NOT_AVAILABLE') })
    await services.press()
    assert.deepEqual(services.errors, [null, 'PLAY_SERVICES_NOT_AVAILABLE'])
    assert.deepEqual(services.requests, [])
})

test('Google API errors remain unchanged, while successful login and cancellation keep their existing behavior', async () => {
    const rejected = googleSignInHarness({ output: { success: 0, error: 'Ответ API без замены' } })
    await rejected.press()
    assert.deepEqual(rejected.errors, [null, 'Ответ API без замены'])
    assert.deepEqual(rejected.screens, [])
    const signedIn = googleSignInHarness()
    await signedIn.press()
    assert.equal(signedIn.requests.length, 1)
    assert.ok(signedIn.requests[0][0].endsWith('/auth/loginGoogle'))
    assert.deepEqual(signedIn.requests[0].slice(1), [{ idToken: 'test-id-token' }, 'test-app-token'])
    assert.deepEqual(signedIn.screens, ['PROFILE'])
    const cancelled = googleSignInHarness({ cancelled: true })
    await cancelled.press()
    assert.deepEqual(cancelled.errors, [null])
    assert.deepEqual(cancelled.requests, [])
    assert.deepEqual(cancelled.loading, [true, false])
})
