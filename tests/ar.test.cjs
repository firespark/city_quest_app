const assert = require('node:assert/strict')
const { test } = require('node:test')
const path = require('node:path')
const { transformFileSync } = require('@babel/core')

const load = (file, mocks = {}, globals = {}) => {
    const compiled = transformFileSync(path.join(__dirname, '..', file), {
        babelrc: false, configFile: false,
        plugins: [[require.resolve('@babel/plugin-transform-react-jsx'), { runtime: 'automatic' }],
            require.resolve('@babel/plugin-transform-modules-commonjs')],
    })
    const module = { exports: {} }
    const resolve = name => {
        if (Object.hasOwn(mocks, name)) return mocks[name]
        throw new Error(`Unexpected dependency: ${name}`)
    }
    new Function('require', 'module', 'exports', ...Object.keys(globals), compiled.code)(
        resolve, module, module.exports, ...Object.values(globals))
    return module.exports
}
const math = load('src/scripts/arMath.js')
const locationMath = load('src/scripts/arLocation.js')
// Fixture representing the AR point returned by the game API.
const AR_POINT_FIXTURE = { latitude: 41.75, longitude: 44.9, activationRadius: 10,
    direction: 90, elevationAngle: 20, text: 'фонарь' }
const radians = degrees => degrees * Math.PI / 180
const close = (actual, expected, tolerance = 0.00001) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`)
const pose = (heading, elevation = 0) => math.getCameraPose(math.rotationToQuaternion({
    alpha: -radians(heading), beta: radians(90 + elevation), gamma: 0,
}))

test('AR flag accepts only enabled API values', () => {
    for (const value of [true, 1, '1']) assert.equal(math.isArEnabled(value), true)
    for (const value of [false, 0, '0', 'false', null, undefined]) assert.equal(math.isArEnabled(value), false)
})

test('rear camera faces the expected compass direction, including north seam', () => {
    for (const heading of [0, 45, 90, 180, 270, 359]) {
        close(pose(heading).heading, heading)
        close(pose(heading).elevation, 0)
    }
    assert.equal(math.normalizeDirection(360), 0)
    assert.equal(math.normalizeDirection(-5), 355)
})

test('elevation points up and down instead of using the top edge of the phone', () => {
    for (const elevation of [-60, -20, 20, 60]) {
        close(pose(90, elevation).heading, 90)
        close(pose(90, elevation).elevation, elevation)
    }
    assert.equal(pose(0, 90).heading, null)
})

test('target is centered when the rear camera faces its bearing and elevation', () => {
    for (const heading of [0, 90, 180, 270, 359]) {
        const projection = math.projectArObject(pose(heading, 20), heading, 20, 360, 480)
        assert.equal(projection.onTarget, true)
        assert.equal(projection.inView, true)
        close(projection.x, 180)
        close(projection.y, 240)
    }
})

test('turning and tilting moves the object in the correct screen direction', () => {
    const right = math.projectArObject(pose(0), 10, 0, 360, 480)
    const left = math.projectArObject(pose(0), 350, 0, 360, 480)
    const above = math.projectArObject(pose(0), 0, 10, 360, 480)
    const below = math.projectArObject(pose(0), 0, -10, 360, 480)
    assert.ok(right.x > 180)
    assert.ok(left.x < 180)
    assert.ok(above.y < 240)
    assert.ok(below.y > 240)
    assert.equal(right.horizontalHint, 'Поверни телефон вправо')
    assert.equal(above.verticalHint, 'Подними камеру')
})

test('objects behind the camera and outside its field of view are hidden', () => {
    const behind = math.projectArObject(pose(90), 270, 20, 360, 480)
    assert.equal(behind.visible, false)
    assert.equal(behind.x, null)
    assert.equal(behind.onTarget, false)
    assert.equal(math.projectArObject(pose(0), 70, 0, 360, 480).inView, false)
    assert.equal(math.projectArObject(pose(0), 0, 70, 360, 480).inView, false)
})

test('sideways phone roll rotates the projection instead of losing world anchoring', () => {
    // Heading north at elevation 20°, rolled by 90° around the rear camera axis.
    const base = math.rotationToQuaternion({ alpha: 0, beta: radians(110), gamma: 0 })
    const [x, y, z, w] = base
    const s = Math.SQRT1_2
    const rolled = math.getCameraPose([s * (x - y), s * (y + x), s * (z - w), s * (w + z)])
    close(rolled.heading, 0)
    close(rolled.elevation, 20)
    const projected = math.projectArObject(rolled, 0, 30, 360, 480)
    close(projected.y, 240)
    assert.ok(Math.abs(projected.x - 180) > 20)
})

test('quaternion smoothing follows the short route across north', () => {
    const before = math.rotationToQuaternion({ alpha: -radians(359), beta: Math.PI / 2, gamma: 0 })
    const after = math.rotationToQuaternion({ alpha: -radians(1), beta: Math.PI / 2, gamma: 0 })
    const smoothed = math.getCameraPose(math.smoothOrientation(before, after, 33))
    assert.ok(smoothed.heading > 358 || smoothed.heading < 2)
    const signFlipped = math.smoothOrientation(before, before.map(value => -value), 33)
    close(Math.abs(signFlipped.reduce((sum, value, index) => sum + value * before[index], 0)), 1)
})

test('smoothing is stable for different event frequencies', () => {
    const start = math.rotationToQuaternion({ alpha: 0, beta: Math.PI / 2, gamma: 0 })
    const end = math.rotationToQuaternion({ alpha: -radians(90), beta: Math.PI / 2, gamma: 0 })
    const once = math.smoothOrientation(start, end, 100)
    let repeated = start
    for (let step = 0; step < 10; step++) repeated = math.smoothOrientation(repeated, end, 10)
    close(math.getCameraPose(once).heading, math.getCameraPose(repeated).heading)
    assert.equal(math.rotationToQuaternion({ alpha: NaN, beta: 0, gamma: 0 }), null)
    assert.equal(math.projectArObject(pose(0), 0, 0, 0, 480), null)
    assert.equal(math.projectArObject(null, 0, 0, 360, 480), null)
})

const flush = () => new Promise(resolve => setImmediate(resolve))
const sensorHarness = (available = true) => {
    let state
    let cleanup
    let listener
    let watchdog
    let removed = 0
    let cleared = 0
    let starts = 0
    let now = 10000
    const sensor = {
        isAvailableAsync: () => Promise.resolve(available),
        setUpdateInterval: interval => assert.equal(interval, 33),
        addListener: callback => {
            starts++
            listener = callback
            return { remove: () => removed++ }
        },
    }
    const { useArOrientation } = load('src/hooks/useArOrientation.js', {
        react: {
            useState: () => [state, next => { state = next }],
            useEffect: effect => { cleanup = effect() },
        },
        'expo-sensors': { DeviceMotion: sensor },
        '../scripts/arMath': math,
    }, {
        setInterval: callback => { watchdog = callback; return 1 },
        clearInterval: id => { if (id === 1) cleared++ },
        Date: { now: () => now },
    })
    return {
        start: enabled => useArOrientation(enabled, 0),
        stop: () => cleanup?.(),
        emit: rotation => listener({ rotation }),
        watchdog: () => watchdog(),
        advance: elapsed => { now += elapsed },
        get state() { return state },
        get starts() { return starts },
        get removed() { return removed },
        get cleared() { return cleared },
    }
}

test('sensor lifecycle unsubscribes and clears watchdog on background or exit', async () => {
    const harness = sensorHarness()
    harness.start(true)
    await flush()
    harness.emit({ alpha: 0, beta: Math.PI / 2, gamma: 0, timestamp: 1 })
    close(harness.state.pose.heading, 0)
    harness.stop()
    const state = harness.state
    harness.emit({ alpha: -1, beta: 1, gamma: 0, timestamp: 2 })
    assert.equal(harness.state, state)
    assert.equal(harness.removed, 1)
    assert.equal(harness.cleared, 1)
})

test('disabled or unavailable sensors do not subscribe', async () => {
    const disabled = sensorHarness()
    disabled.start(false)
    await flush()
    assert.equal(disabled.starts, 0)
    const unavailable = sensorHarness(false)
    unavailable.start(true)
    await flush()
    assert.equal(unavailable.starts, 0)
    assert.ok(unavailable.state.error)
})

test('leaving before async availability resolves cannot start a late subscription', async () => {
    const harness = sensorHarness()
    harness.start(true)
    harness.stop()
    await flush()
    assert.equal(harness.starts, 0)
})

test('duplicate or invalid sensor samples do not move the object', async () => {
    const harness = sensorHarness()
    harness.start(true)
    await flush()
    harness.emit({ alpha: 0, beta: Math.PI / 2, gamma: 0, timestamp: 1 })
    const previous = harness.state
    harness.emit({ alpha: 2, beta: 0, gamma: 0, timestamp: 1 })
    assert.equal(harness.state, previous)
    harness.emit({ alpha: NaN, beta: 0, gamma: 0, timestamp: 2 })
    assert.equal(harness.state, previous)
    harness.stop()
})

test('stale sensors hide the object and a fresh reading recovers', async () => {
    const harness = sensorHarness()
    harness.start(true)
    await flush()
    harness.emit({ alpha: 0, beta: Math.PI / 2, gamma: 0, timestamp: 1 })
    harness.advance(4000)
    harness.watchdog()
    assert.equal(harness.state.pose, null)
    assert.ok(harness.state.error)
    harness.emit({ alpha: -Math.PI / 2, beta: Math.PI / 2, gamma: 0, timestamp: 2 })
    assert.equal(harness.state.error, '')
    close(harness.state.pose.heading, 90)
    harness.stop()
})

const cameraHarness = (canAskAgain = true) => {
    const slots = []
    const effects = []
    let cursor = 0
    let pending = []
    let appListener
    let enabled = false
    let currentPose = pose(0)
    let closed = 0
    let settingsOpened = 0
    let gpsStatus = 'inside'
    let gpsCanAskAgain = true
    let locationRequests = 0
    let locationSettingsOpened = 0
    let permission = { granted: false, canAskAgain }
    const getPermission = async () => permission
    const requestPermission = async () => { permission = { granted: true, canAskAgain: true }; return permission }
    const jsx = (type, props, key) => ({ type, props, key })
    const appState = {
        currentState: 'active',
        addEventListener: (_, callback) => { appListener = callback; return { remove: () => { appListener = null } } },
    }
    const react = {
        useState: initial => {
            const index = cursor++
            if (!Object.hasOwn(slots, index)) slots[index] = initial
            return [slots[index], value => { slots[index] = typeof value === 'function' ? value(slots[index]) : value }]
        },
        useEffect: (effect, dependencies) => {
            const index = cursor++
            const previous = effects[index]
            if (!previous || dependencies.some((value, i) => value !== previous.dependencies[i])) {
                pending.push(() => {
                    previous?.cleanup?.()
                    effects[index] = { dependencies, cleanup: effect() }
                })
            }
        },
    }
    const { ARPrototypeScreen } = load('src/screens/ARPrototypeScreen.js', {
        react,
        'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'Fragment' },
        'react-native': {
            ActivityIndicator: 'ActivityIndicator', AppState: appState, Linking: {
                openSettings: async () => { settingsOpened++ },
                sendIntent: async action => { assert.equal(action, 'android.settings.LOCATION_SOURCE_SETTINGS'); locationSettingsOpened++ },
            },
            Platform: { OS: 'android' }, Image: 'Image', Text: 'Text', TouchableOpacity: 'Button', View: 'View',
        },
        'expo-camera': { CameraView: 'Camera', useCameraPermissions: () => [permission, requestPermission, getPermission] },
        'expo-location': { requestForegroundPermissionsAsync: async () => { locationRequests++ } },
        '../../assets/img/back.png': 1,
        '../hooks/useArLocation': { useArLocation: (_, active) => ({ status: active ? gpsStatus : 'inactive', distance: 0, accuracy: 3, canAskAgain: gpsCanAskAgain }) },
        '../hooks/useArOrientation': { useArOrientation: value => { enabled = value; return { pose: value ? currentPose : null, error: '' } } },
        '../scripts/arMath': math,
        '../scripts/arLocation': locationMath,
        '../styles/arStyle': { arStyle: {} },
        '../styles/mainStyle': { mainStyle: {} },
    })
    const screenProps = { point: AR_POINT_FIXTURE, onClose: () => { closed++ } }
    const Screen = ARPrototypeScreen(screenProps).props.children[1].type
    return {
        render: () => {
            cursor = 0
            pending = []
            const tree = Screen(screenProps)
            pending.forEach(effect => effect())
            return tree
        },
        changeState: state => { appState.currentState = state; appListener(state) },
        setGps: (status, canAsk = true) => { gpsStatus = status; gpsCanAskAgain = canAsk },
        stop: () => effects.forEach(effect => effect.cleanup?.()),
        setPose: value => { currentPose = value },
        get closed() { return closed },
        get enabled() { return enabled },
        get settingsOpened() { return settingsOpened },
        get locationRequests() { return locationRequests },
        get locationSettingsOpened() { return locationSettingsOpened },
    }
}
const findElement = (tree, predicate) => {
    if (!tree || typeof tree !== 'object') return null
    if (Array.isArray(tree)) return tree.map(child => findElement(child, predicate)).find(Boolean) || null
    if (predicate(tree)) return tree
    return findElement(tree.props?.children, predicate)
}
const containsText = (tree, text) => {
    if (typeof tree === 'string') return tree.includes(text)
    if (Array.isArray(tree)) return tree.some(child => containsText(child, text))
    return tree && typeof tree === 'object' ? containsText(tree.props?.children, text) : false
}

test('camera waits for permission and restarts after returning from background', async () => {
    const harness = cameraHarness()
    harness.render()
    await flush()
    let tree = harness.render()
    assert.equal(findElement(tree, node => node.type === 'Camera'), null)
    assert.equal(harness.enabled, false)
    await findElement(tree, node => node.type === 'Button' && containsText(node, 'Открыть камеру')).props.onPress()
    tree = harness.render()
    const firstCamera = findElement(tree, node => node.type === 'Camera')
    assert.ok(firstCamera)
    assert.equal(harness.enabled, false)
    firstCamera.props.onCameraReady()
    harness.render()
    assert.equal(harness.enabled, true)
    harness.changeState('background')
    tree = harness.render()
    assert.equal(findElement(tree, node => node.type === 'Camera'), null)
    assert.equal(harness.enabled, false)
    harness.changeState('active')
    await flush()
    tree = harness.render()
    const resumedCamera = findElement(tree, node => node.type === 'Camera')
    assert.ok(resumedCamera)
    assert.notEqual(resumedCamera.key, firstCamera.key)
    assert.equal(harness.enabled, false)
    resumedCamera.props.onCameraReady()
    harness.render()
    assert.equal(harness.enabled, true)
    resumedCamera.props.onMountError()
    tree = harness.render()
    assert.equal(findElement(tree, node => node.type === 'Camera'), null)
    assert.equal(harness.enabled, false)
    harness.stop()
})

test('permanent camera denial opens settings without starting sensors', async () => {
    const harness = cameraHarness(false)
    harness.render()
    await flush()
    const tree = harness.render()
    await findElement(tree, node => node.type === 'Button' && containsText(node, 'Открыть настройки')).props.onPress()
    assert.equal(harness.settingsOpened, 1)
    assert.equal(harness.enabled, false)
    harness.stop()
})

const fixAt = (latitude, longitude, accuracy = 3, timestamp = 100000) => ({
    coords: { latitude, longitude, accuracy }, timestamp,
})

test('GPS distance is measured in metres and handles the date line', () => {
    close(locationMath.distanceToArPoint(AR_POINT_FIXTURE, AR_POINT_FIXTURE), 0)
    close(locationMath.distanceToArPoint({ latitude: 0, longitude: 0 }, { latitude: 0, longitude: 1 }), 111194.926645, 0.001)
    assert.ok(locationMath.distanceToArPoint({ latitude: 0, longitude: 179.999 }, { latitude: 0, longitude: -179.999 }) < 223)
    assert.equal(locationMath.distanceToArPoint({ latitude: NaN, longitude: 0 }, AR_POINT_FIXTURE), null)
})

test('camera gate allows 15 metres of GPS drift and respects the extended boundary', () => {
    const delta = metres => metres / 6371000 * 180 / Math.PI
    const inside = fixAt(AR_POINT_FIXTURE.latitude + delta(24.99), AR_POINT_FIXTURE.longitude)
    const outside = fixAt(AR_POINT_FIXTURE.latitude + delta(25.01), AR_POINT_FIXTURE.longitude)
    assert.equal(locationMath.getArProximity(AR_POINT_FIXTURE, inside, 100000).status, 'inside')
    assert.equal(locationMath.getArProximity(AR_POINT_FIXTURE, outside, 100000).status, 'outside')
    assert.equal(locationMath.getArProximity(AR_POINT_FIXTURE,
        fixAt(AR_POINT_FIXTURE.latitude + delta(15), AR_POINT_FIXTURE.longitude), 100000).status, 'inside')
})

test('accuracy does not veto a nearby fix, while stale or invalid coordinates still lock the camera', () => {
    const delta = metres => metres / 6371000 * 180 / Math.PI
    for (const accuracy of [null, undefined, -1, NaN, 15, 25, 100]) {
        const fix = fixAt(AR_POINT_FIXTURE.latitude + delta(5), AR_POINT_FIXTURE.longitude)
        fix.coords.accuracy = accuracy
        assert.equal(locationMath.getArProximity(AR_POINT_FIXTURE, fix, 100000).status, 'inside')
    }
    const exact = fixAt(41.75, 44.9)
    assert.equal(locationMath.getArProximity(AR_POINT_FIXTURE, exact, 116000).status, 'stale')
    assert.equal(locationMath.getArProximity(AR_POINT_FIXTURE, { ...exact, timestamp: 110000 }, 100000).status, 'stale')
    assert.equal(locationMath.getArProximity(AR_POINT_FIXTURE, null, 100000).status, 'locating')
    assert.equal(locationMath.getArProximity(AR_POINT_FIXTURE, fixAt(100, 44.9), 100000).status, 'locating')
})

test('reported uncertainty adds a capped allowance, never an unlimited activation radius', () => {
    const delta = metres => metres / 6371000 * 180 / Math.PI
    const fix = fixAt(AR_POINT_FIXTURE.latitude + delta(32), AR_POINT_FIXTURE.longitude, 25)
    assert.equal(locationMath.getArProximity(AR_POINT_FIXTURE, fix, 100000).status, 'inside')
    assert.equal(locationMath.getArActivationRadius(AR_POINT_FIXTURE, 1000), 40)
    const distant = fixAt(AR_POINT_FIXTURE.latitude + delta(60), AR_POINT_FIXTURE.longitude, 1000)
    assert.equal(locationMath.getArProximity(AR_POINT_FIXTURE, distant, 100000).status, 'outside')
    assert.equal(locationMath.getArProximity({ ...AR_POINT_FIXTURE, activationRadius: 50 }, distant, 100000).status, 'inside')
    assert.equal(locationMath.getArProximity({ ...AR_POINT_FIXTURE, activationRadius: 0 }, fix, 100000).status, 'locating')
})

const gpsHarness = ({ granted = true, services = true, delayed = false, cached = null, delayedCache = false, cacheError = false } = {}) => {
    let state
    let cleanup
    let callback
    let errorCallback
    let watchdog
    let removed = 0
    let starts = 0
    let now = 100000
    let release
    let releaseCache
    const subscription = { remove: () => removed++ }
    const location = {
        Accuracy: { Highest: 5 },
        getForegroundPermissionsAsync: async () => ({ granted, canAskAgain: false }),
        hasServicesEnabledAsync: async () => services,
        getLastKnownPositionAsync: async options => {
            assert.equal(options.maxAge, 15000)
            if (cacheError) throw new Error('No cached location')
            return delayedCache ? new Promise(resolve => { releaseCache = () => resolve(cached) }) : cached
        },
        watchPositionAsync: async (options, listener, onError) => {
            starts++
            assert.equal(options.distanceInterval, 0)
            assert.equal(options.timeInterval, 1000)
            assert.equal(options.accuracy, 5)
            callback = listener
            errorCallback = onError
            return delayed ? new Promise(resolve => { release = () => resolve(subscription) }) : subscription
        },
    }
    const { useArLocation } = load('src/hooks/useArLocation.js', {
        react: {
            useState: () => [state, value => { state = value }],
            useEffect: effect => { cleanup = effect() },
        },
        'expo-location': location,
        '../scripts/arLocation': locationMath,
    }, {
        Date: { now: () => now },
        setInterval: listener => { watchdog = listener; return 1 },
        clearInterval: () => {},
    })
    return {
        start: (enabled = true) => useArLocation(AR_POINT_FIXTURE, enabled, 0),
        stop: () => cleanup?.(),
        emit: fix => callback(fix),
        fail: () => errorCallback('Location unavailable'),
        advance: elapsed => { now += elapsed; watchdog() },
        release: () => release(),
        releaseCache: () => releaseCache(),
        get state() { return state },
        get removed() { return removed },
        get starts() { return starts },
    }
}

test('GPS permission denial and disabled services do not start tracking', async () => {
    const denied = gpsHarness({ granted: false })
    denied.start()
    await flush()
    assert.equal(denied.state.status, 'permission')
    assert.equal(denied.state.canAskAgain, false)
    assert.equal(denied.starts, 0)
    const disabled = gpsHarness({ services: false })
    disabled.start()
    await flush()
    assert.equal(disabled.state.status, 'disabled')
    assert.equal(disabled.starts, 0)
})

test('foreground GPS subscription is removed when leaving the AR screen', async () => {
    const harness = gpsHarness()
    harness.start()
    await flush()
    harness.emit(fixAt(41.75, 44.9))
    assert.equal(harness.state.status, 'inside')
    harness.stop()
    assert.equal(harness.removed, 1)
    const previous = harness.state
    harness.emit(fixAt(0, 0))
    assert.equal(harness.state, previous)
    const inactive = gpsHarness()
    assert.equal(inactive.start(false).status, 'inactive')
    await flush()
    assert.equal(inactive.starts, 0)
})

test('a late GPS subscription is removed even if the screen has already closed', async () => {
    const harness = gpsHarness({ delayed: true })
    harness.start()
    await flush()
    harness.stop()
    harness.release()
    await flush()
    assert.equal(harness.removed, 1)
})

test('GPS freshness expires and watch errors cannot reuse an earlier inside fix', async () => {
    const harness = gpsHarness()
    harness.start()
    await flush()
    harness.emit(fixAt(41.75, 44.9))
    assert.equal(harness.state.status, 'inside')
    harness.advance(16000)
    assert.equal(harness.state.status, 'stale')
    harness.emit(fixAt(41.75, 44.9, 3, 116000))
    assert.equal(harness.state.status, 'inside')
    harness.fail()
    assert.equal(harness.state.status, 'error')
    harness.advance(1000)
    assert.equal(harness.state.status, 'error')
    harness.stop()
})

test('GPS timeout reports missing coordinates while keeping the camera locked', async () => {
    const harness = gpsHarness()
    harness.start()
    await flush()
    harness.advance(21000)
    assert.equal(harness.state.status, 'error')
    assert.equal(harness.state.distance, null)
    harness.stop()
})

test('leaving the point closes the camera and disables orientation tracking', async () => {
    const harness = cameraHarness()
    harness.render()
    await flush()
    harness.setGps('outside')
    let tree = harness.render()
    let button = findElement(tree, node => node.type === 'Button' && containsText(node, 'Открыть камеру'))
    assert.equal(button.props.disabled, true)
    await button.props.onPress()
    tree = harness.render()
    assert.equal(findElement(tree, node => node.type === 'Camera'), null)
    harness.setGps('inside')
    tree = harness.render()
    button = findElement(tree, node => node.type === 'Button' && containsText(node, 'Открыть камеру'))
    assert.equal(button.props.disabled, false)
    await button.props.onPress()
    tree = harness.render()
    findElement(tree, node => node.type === 'Camera').props.onCameraReady()
    harness.render()
    assert.equal(harness.enabled, true)
    for (const status of ['stale', 'outside']) {
        harness.setGps(status)
        tree = harness.render()
        assert.equal(findElement(tree, node => node.type === 'Camera'), null)
        assert.equal(harness.enabled, false)
    }
    harness.stop()
})

test('GPS controls request permission or open the corresponding settings', async () => {
    const harness = cameraHarness()
    harness.render()
    await flush()
    harness.setGps('permission')
    let tree = harness.render()
    await findElement(tree, node => node.type === 'Button' && containsText(node, 'Разрешить геолокацию')).props.onPress()
    assert.equal(harness.locationRequests, 1)
    harness.setGps('permission', false)
    tree = harness.render()
    await findElement(tree, node => node.type === 'Button' && containsText(node, 'Открыть настройки')).props.onPress()
    assert.equal(harness.settingsOpened, 1)
    harness.setGps('disabled')
    tree = harness.render()
    await findElement(tree, node => node.type === 'Button' && containsText(node, 'Включить GPS')).props.onPress()
    assert.equal(harness.locationSettingsOpened, 1)
    assert.equal(harness.enabled, false)
    harness.stop()
})

test('search has one main action, no editing controls, and does not reveal text before aiming', async () => {
    const harness = cameraHarness()
    harness.render()
    await flush()
    for (const status of ['permission', 'disabled', 'locating', 'outside', 'inside', 'stale', 'error']) {
        harness.setGps(status)
        const tree = harness.render()
        const buttons = []
        const collect = node => {
            if (!node || typeof node !== 'object') return
            if (Array.isArray(node)) return node.forEach(collect)
            if (node.type === 'Button') buttons.push(node)
            collect(node.props?.children)
        }
        collect(tree)
        assert.equal(buttons.length, 1, status)
        assert.equal(findElement(tree, node => node.type === 'TextInput'), null)
        assert.equal(containsText(tree, AR_POINT_FIXTURE.text), false)
    }
    harness.stop()
})

test('finding the server inscription offers manual answer entry and does not submit it', async () => {
    const harness = cameraHarness()
    harness.render()
    await flush()
    let tree = harness.render()
    await findElement(tree, node => node.type === 'Button').props.onPress()
    tree = harness.render()
    const preview = findElement(tree, node => typeof node.props?.onLayout === 'function')
    preview.props.onLayout({ nativeEvent: { layout: { width: 360, height: 480 } } })
    findElement(tree, node => node.type === 'Camera').props.onCameraReady()
    tree = harness.render()
    assert.equal(containsText(tree, AR_POINT_FIXTURE.text), false)
    assert.equal(findElement(tree, node => node.type === 'Button').props.disabled, true)
    harness.setPose(pose(90, 20))
    harness.render()
    tree = harness.render()
    assert.equal(containsText(tree, AR_POINT_FIXTURE.text), true)
    assert.equal(containsText(tree, 'Надпись найдена'), true)
    assert.equal(harness.closed, 0)
    const enter = findElement(tree, node => node.type === 'Button')
    assert.equal(enter.props.disabled, false)
    assert.ok(containsText(enter, 'Ввести ответ'))
    await enter.props.onPress()
    assert.equal(harness.closed, 1)
    harness.stop()
})

const jsx = (type, props, key) => ({ type, props, key })
const jsxRuntime = { jsx, jsxs: jsx, Fragment: 'Fragment' }
const styles = { mainStyle: {}, gameStyle: {}, arStyle: {} }
const native = { View: 'View', Text: 'Text', Image: 'Image', TouchableOpacity: 'Button' }
const { Task2 } = load('src/components/game/Task2.js', {
    'react/jsx-runtime': jsxRuntime, 'react-native': native,
    '../../styles/mainStyle': styles, '../../styles/gameStyle': styles, '../../styles/arStyle': styles,
    '../../scripts/arMath': math,
    './TaskTemplate': { TaskTemplate: 'TaskTemplate' }, './TaskAnswerForm': { TaskAnswerForm: 'AnswerForm' },
})

test('only AR quests replace question two; answer form and its callbacks are unchanged', () => {
    const point = { ...AR_POINT_FIXTURE, text: 'server-secret-word' }
    const game = { ar: true, ar_point: point, inputs2: 1, task2: { tasks: [{ text: 'original question' }], question: 'original question' } }
    let modal = null
    const setGame = () => {}
    const setModal = value => { modal = value }
    const tree = Task2({ game, setGame, setModal })
    assert.ok(containsText(tree, 'Найди надпись'))
    assert.equal(containsText(tree, point.text), false)
    assert.equal(containsText(tree, 'original question'), false)
    assert.equal(findElement(tree, node => node.type === 'TaskTemplate'), null)
    const form = findElement(tree, node => node.type === 'AnswerForm')
    assert.equal(form.props.game, game)
    assert.equal(form.props.answerNumber, 2)
    assert.equal(form.props.setGame, setGame)
    assert.equal(form.props.setModal, setModal)
    findElement(tree, node => node.type === 'Button').props.onPress()
    assert.equal(modal, 'ar')
    for (const flag of [false, 0, '0', undefined]) {
        const normal = Task2({ game: { ...game, ar: flag }, setGame, setModal })
        assert.ok(containsText(normal, 'Ответь на вопрос'))
        assert.ok(containsText(normal, 'original question'))
        assert.ok(findElement(normal, node => node.type === 'TaskTemplate'))
        assert.equal(findElement(normal, node => node.type === 'Button'), null)
    }
    const unconfigured = Task2({ game: { ...game, ar_point: null }, setGame, setModal })
    assert.equal(findElement(unconfigured, node => node.type === 'Button'), null)
    assert.ok(findElement(unconfigured, node => node.type === 'AnswerForm'))
})

test('closing AR returns to the same game without reloading or clearing the typed answer', async () => {
    const game = { ar: true, ar_point: AR_POINT_FIXTURE, status: 1, step: 1 }
    const slots = [], effects = []
    let cursor = 0, pending = [], back, requests = 0, answerResets = 0
    const react = {
        useContext: () => ({ questId: 1, token: 'test', setAnswersState: () => { answerResets++ } }),
        useState: initial => {
            const index = cursor++
            if (!Object.hasOwn(slots, index)) slots[index] = initial
            return [slots[index], value => { slots[index] = typeof value === 'function' ? value(slots[index]) : value }]
        },
        useEffect: (effect, dependencies) => {
            const index = cursor++, previous = effects[index]
            if (!previous || dependencies.some((value, i) => value !== previous.dependencies[i])) pending.push(() => {
                previous?.cleanup?.()
                effects[index] = { dependencies, cleanup: effect() }
            })
        },
    }
    const { GameScreen } = load('src/screens/GameScreen.js', {
        react, 'react/jsx-runtime': jsxRuntime,
        'react-native': { View: 'View', Modal: 'NativeModal', Keyboard: { dismiss: () => {} }, BackHandler: { addEventListener: (_, handler) => { back = handler; return { remove: () => {} } } } },
        'react-native-safe-area-context': { SafeAreaView: 'SafeAreaView' },
        '../styles/mainStyle': styles,
        '../components/game/template/GameTemplate': { GameTemplate: 'Game' },
        '../components/game/template/ModalTemplate': { ModalTemplate: 'Modal' },
        '../components/common/Loader': { Loader: 'Loader' },
        '../components/common/Error': { Error: 'Error' },
        '../components/common/ConnectionError': { ConnectionError: 'ConnectionError' },
        '../context/mainContext': { MainContext: {} },
        '../scripts/http': { Http: { get: async () => { requests++; return { success: 1, data: game } } } },
        './ARPrototypeScreen': { ARPrototypeScreen: 'AR' },
    })
    const render = () => {
        cursor = 0; pending = []
        const tree = GameScreen()
        pending.forEach(effect => effect())
        return tree
    }
    render()
    await flush()
    let tree = render()
    findElement(tree, node => node.type === 'Game').props.setModal('ar')
    tree = render()
    assert.equal(findElement(tree, node => node.type === 'AR').props.point, AR_POINT_FIXTURE)
    assert.equal(findElement(tree, node => node.type === 'Game').props.game, game)
    assert.equal(findElement(tree, node => node.type === 'Game').props.keyboardEnabled, false)
    assert.equal(findElement(tree, node => node.type === 'NativeModal').props.visible, true)
    findElement(tree, node => node.type === 'AR').props.onClose()
    tree = render()
    assert.equal(findElement(tree, node => node.type === 'Game').props.game, game)
    assert.equal(findElement(tree, node => node.type === 'NativeModal').props.visible, false)
    assert.equal(findElement(tree, node => node.type === 'Game').props.keyboardEnabled, true)
    findElement(tree, node => node.type === 'Game').props.setModal('ar')
    render()
    assert.equal(back(), true)
    tree = render()
    assert.equal(findElement(tree, node => node.type === 'Game').props.game, game)
    assert.equal(requests, 1)
    assert.equal(answerResets, 0)
    effects.forEach(effect => effect.cleanup?.())
})

test('GPS jitter keeps the camera unlocked until the wider exit boundary is crossed', async () => {
    const harness = gpsHarness()
    harness.start()
    await flush()
    const emitAt = metres => harness.emit(fixAt(AR_POINT_FIXTURE.latitude + metres / 6371000 * 180 / Math.PI, AR_POINT_FIXTURE.longitude))
    emitAt(15)
    assert.equal(harness.state.status, 'inside')
    for (const metres of [24, 26, 30, 39.99, 27, 35]) {
        emitAt(metres)
        assert.equal(harness.state.status, 'inside', `GPS jump to ${metres} m`)
    }
    emitAt(40.01)
    assert.equal(harness.state.status, 'outside')
    emitAt(30)
    assert.equal(harness.state.status, 'outside')
    emitAt(20)
    assert.equal(harness.state.status, 'inside')
    harness.stop()
})

test('a recent cached position unlocks the point without waiting for the first live reading', async () => {
    const harness = gpsHarness({ cached: fixAt(AR_POINT_FIXTURE.latitude, AR_POINT_FIXTURE.longitude, 20, 95000) })
    harness.start()
    await flush()
    assert.equal(harness.starts, 1)
    assert.equal(harness.state.status, 'inside')
    assert.equal(harness.state.accuracy, 20)
    harness.emit(fixAt(0, 0))
    assert.equal(harness.state.status, 'outside')
    harness.stop()
})

test('stale, future and malformed cached positions cannot unlock the point', async () => {
    for (const cached of [fixAt(41.75, 44.9, 3, 80000), fixAt(41.75, 44.9, 3, 110000), fixAt(NaN, 44.9)]) {
        const harness = gpsHarness({ cached })
        harness.start()
        await flush()
        assert.equal(harness.state.status, 'locating')
        assert.equal(harness.starts, 1)
        harness.emit(fixAt(41.75, 44.9))
        assert.equal(harness.state.status, 'inside')
        harness.stop()
    }
})

test('cached position errors do not prevent live tracking', async () => {
    const harness = gpsHarness({ cacheError: true })
    harness.start()
    await flush()
    assert.equal(harness.starts, 1)
    harness.emit(fixAt(41.75, 44.9))
    assert.equal(harness.state.status, 'inside')
    harness.stop()
})

test('a pending cache lookup cannot delay the watcher or overwrite live results', async () => {
    for (const failure of [false, true]) {
        const harness = gpsHarness({ cached: fixAt(41.75, 44.9), delayedCache: true })
        harness.start()
        await flush()
        assert.equal(harness.starts, 1)
        if (failure) harness.fail()
        else harness.emit(fixAt(0, 0))
        harness.releaseCache()
        await flush()
        assert.equal(harness.state.status, failure ? 'error' : 'outside')
        harness.stop()
    }
})

test('a cache response arriving after closing the search cannot update its state', async () => {
    const harness = gpsHarness({ cached: fixAt(41.75, 44.9), delayedCache: true })
    harness.start()
    await flush()
    harness.stop()
    const previous = harness.state
    harness.releaseCache()
    await flush()
    assert.equal(harness.state, previous)
    assert.equal(harness.removed, 1)
})

test('malformed or future live samples do not poison the next valid GPS fix', async () => {
    const harness = gpsHarness()
    harness.start()
    await flush()
    harness.emit(fixAt(41.75, 44.9, 3, 200000))
    assert.equal(harness.state.status, 'stale')
    harness.emit(fixAt(41.75, 44.9))
    assert.equal(harness.state.status, 'inside')
    harness.emit(fixAt(NaN, 44.9))
    assert.equal(harness.state.status, 'inside')
    harness.advance(16000)
    assert.equal(harness.state.status, 'stale')
    harness.stop()
})

const gameMocks = {
    'react/jsx-runtime': jsxRuntime,
    'react-native': { View: 'View', ScrollView: 'ScrollView', KeyboardAvoidingView: 'KeyboardAvoidingView' },
    'react-native-safe-area-context': { useSafeAreaInsets: () => ({ top: 24 }) },
    '../../../hooks/useKeyboardScroll': { useKeyboardScroll: () => ({}) },
    '../../../styles/mainStyle': styles,
    '../../../styles/headerStyle': { headerStyle: {} },
    '../../../scripts/questOptions': { optionEnabled: value => value !== false && value !== 0 && value !== '0' },
    '../BackQuest': { BackQuest: 'BackQuest' },
    '../Skips': { Skips: 'Skips' },
    '../Hints': { Hints: 'Hints' },
    './FinishTemplate': { FinishTemplate: 'Finish' },
    './TourTemplate': { TourTemplate: 'Tour' },
    './GameFormatTemplate': { GameFormatTemplate: 'FormatSelection' },
    './PlayTemplate': { PlayTemplate: 'Play' },
}
const { GameTemplate } = load('src/components/game/template/GameTemplate.js', gameMocks)

test('format selection exists only at the start; active quests and tours have no switch control', () => {
    const callbacks = { setGame: () => {}, setModal: () => {}, nextGame: () => {} }
    const start = GameTemplate({ ...callbacks, game: { step: 0, format_id: 1 } })
    const selector = findElement(start, node => node.type === 'FormatSelection')
    assert.ok(selector)
    assert.equal(selector.props.setGame, callbacks.setGame)
    for (const [format, type] of [[1, 'Play'], [2, 'Tour']]) {
        const active = GameTemplate({ ...callbacks, game: { step: 1, format_id: format } })
        assert.ok(findElement(active, node => node.type === type))
        assert.equal(findElement(active, node => node.type === 'FormatSelection'), null)
        assert.equal(findElement(active, node => node.type === 'ChangeGameFormat'), null)
        assert.equal(!!findElement(active, node => node.type === 'Hints'), format === 1)
    }
    const finished = GameTemplate({ ...callbacks, game: { step: 2, step_total: 2, format_id: 1, finish: true } })
    assert.ok(findElement(finished, node => node.type === 'Finish'))
})

test('initial format selection still starts an excursion', async () => {
    const states = []
    let cursor = 0, submitted, updated
    const { GameFormatTemplate } = load('src/components/game/template/GameFormatTemplate.js', {
        react: {
            useContext: () => ({ questId: 1, token: 'test-token' }),
            useEffect: () => {},
            useState: initial => {
                const index = cursor++
                if (!Object.hasOwn(states, index)) states[index] = initial
                return [states[index], value => { states[index] = value }]
            },
        },
        'react/jsx-runtime': jsxRuntime,
        'react-native': { View: 'View', TouchableOpacity: 'Button', Text: 'Text' },
        '../../../styles/mainStyle': styles, '../../../styles/gameStyle': styles,
        '../../../context/mainContext': { MainContext: {} },
        '../../../scripts/questOptions': { optionEnabled: value => value !== false && value !== 0 && value !== '0' },
        '../GameFormat': { GameFormat: 'GameFormat' },
        '../../common/Loader': { Loader: 'Loader' }, '../../common/Error': { Error: 'Error' },
        '../../../scripts/http': { Http: { post: async (url, body, token) => {
            assert.ok(url.endsWith('/games/setFormat/1'))
            assert.equal(token, 'test-token')
            submitted = body
            return { success: 1, data: { step: 1, format_id: 2, status: 2 } }
        } } },
    })
    const render = () => { cursor = 0; return GameFormatTemplate({ setGame: value => { updated = value } }) }
    let tree = render()
    findElement(tree, node => node.type === 'GameFormat').props.setSelectedId(2)
    tree = render()
    await findElement(tree, node => node.type === 'Button').props.onPress()
    assert.deepEqual(submitted, { format_id: 2 })
    assert.deepEqual(updated, { step: 1, format_id: 2, status: 2 })
})

test('the in-game format-change dialog is disabled while ordinary dialogs still work', () => {
    const mocks = {
        'react/jsx-runtime': jsxRuntime,
        'react-native': { View: 'View', ScrollView: 'ScrollView', KeyboardAvoidingView: 'KeyboardAvoidingView' },
        'react-native-safe-area-context': { useSafeAreaInsets: () => ({ top: 24 }) },
        '../../../hooks/useKeyboardScroll': { useKeyboardScroll: () => ({}) },
        '../../../styles/mainStyle': styles, '../../../styles/gameStyle': styles,
    }
    for (const name of ['ModalClose', 'ModalAnswer1', 'ModalAnswer2', 'ModalTask1', 'ModalTask2', 'ModalFullTask', 'ModalHint', 'ModalHintAlert', 'ModalSkipAlert', 'ModalBackAlert', 'ModalProgress']) {
        mocks['../modal/' + name] = { [name]: name }
    }
    const { ModalTemplate } = load('src/components/game/template/ModalTemplate.js', mocks)
    const props = { game: {}, setModal: () => {}, setGame: () => {}, nextGame: () => {} }
    const disabled = ModalTemplate({ ...props, modal: 'changeFormat' })
    assert.equal(findElement(disabled, node => node.type === 'ModalChangeFormatAlert'), null)
    const answer = ModalTemplate({ ...props, modal: 'answer2' })
    assert.ok(findElement(answer, node => node.type === 'ModalAnswer2'))
    assert.equal(answer.type, 'KeyboardAvoidingView')
    assert.equal(answer.props.behavior, 'padding')
    assert.equal(answer.props.keyboardVerticalOffset, 24)
})

test('game keyboard avoidance reserves space and is disabled underneath a modal', () => {
    const props = { game: { step: 1, format_id: 1 } }
    const active = GameTemplate(props)
    assert.equal(active.type, 'KeyboardAvoidingView')
    assert.equal(active.props.behavior, 'padding')
    assert.equal(active.props.keyboardVerticalOffset, 24)
    assert.equal(active.props.enabled, true)
    assert.equal(GameTemplate({ ...props, keyboardEnabled: false }).props.enabled, false)
})

test('zero quest limits hide only the corresponding extra regardless of its current balance', () => {
    const callbacks = { setGame: () => {}, setModal: () => {}, nextGame: () => {} }
    for (const [hintsLimit, skipsLimit, hintsVisible, skipsVisible] of [
        [0, 0, false, false], [0, 3, false, true], [3, 0, true, false], ['0', '2', false, true],
    ]) {
        const tree = GameTemplate({ ...callbacks, game: {
            step: 1, format_id: 1, quest_hints_number: hintsLimit, quest_skips_number: skipsLimit,
            hints_number: 3, skips_number: 3, show_hint: true, show_skip: true,
        } })
        assert.equal(!!findElement(tree, node => node.type === 'Hints'), hintsVisible)
        assert.equal(!!findElement(tree, node => node.type === 'Skips'), skipsVisible)
    }
})

test('exhausting an initially positive allowance keeps the zero counter and purchase control visible', () => {
    const callbacks = { setGame: () => {}, setModal: () => {}, nextGame: () => {} }
    const tree = GameTemplate({ ...callbacks, game: {
        step: 1, format_id: 1, quest_hints_number: 3, quest_skips_number: 2,
        hints_number: 0, skips_number: 0, show_hint: false, show_skip: false,
    } })
    const hints = findElement(tree, node => node.type === 'Hints')
    const skips = findElement(tree, node => node.type === 'Skips')
    assert.ok(hints)
    assert.ok(skips)
    assert.equal(hints.props.hints, 0)
    assert.equal(hints.props.showHint, false)
    assert.equal(hints.props.setGame, callbacks.setGame)
    assert.equal(skips.props.skips, 0)
    assert.equal(skips.props.showSkip, false)
    assert.equal(skips.props.setGame, callbacks.setGame)
})

test('older API responses without quest allowances keep existing controls visible', () => {
    const tree = GameTemplate({ game: { step: 1, format_id: 1, hints_number: 0, skips_number: 0 } })
    assert.ok(findElement(tree, node => node.type === 'Hints'))
    assert.ok(findElement(tree, node => node.type === 'Skips'))
})
