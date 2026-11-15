const assert = require('node:assert/strict')
const { test } = require('node:test')
const path = require('node:path')
const { transformFileSync } = require('@babel/core')

const keyboardHarness = (enabled = true) => {
    let activeInput = null, metrics = null, cleanup, handlers
    const refs = [], frames = new Map(), scrolled = []
    let cursor = 0, frameId = 0
    const module = { exports: {} }
    const { code } = transformFileSync(path.join(__dirname, '../src/hooks/useKeyboardScroll.js'), {
        babelrc: false, configFile: false, plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
    })
    const mocks = {
        react: {
            useRef: value => {
                const index = cursor++
                if (!refs[index]) refs[index] = { current: value }
                return refs[index]
            },
            useEffect: effect => { cleanup = effect() },
        },
        'react-native': { Keyboard: { metrics: () => metrics }, TextInput: { State: { currentlyFocusedInput: () => activeInput } } },
    }
    new Function('require', 'module', 'exports', 'requestAnimationFrame', 'cancelAnimationFrame', code)(
        name => { assert.ok(Object.hasOwn(mocks, name)); return mocks[name] }, module, module.exports,
        callback => { frames.set(++frameId, callback); return frameId }, id => frames.delete(id),
    )
    const { useKeyboardScroll } = module.exports
    const viewport = { y: 80, height: 720 }
    const scroll = {
        measureInWindow: callback => callback(0, viewport.y, 360, viewport.height),
        scrollTo: options => scrolled.push(options),
    }
    const render = () => { cursor = 0; handlers = useKeyboardScroll(enabled); handlers.ref.current = scroll }
    render()
    return {
        scrolled, viewport,
        get handlers() { return handlers },
        get pendingFrames() { return frames.size },
        input: (y, height = 56) => ({ measureInWindow: callback => callback(0, y, 320, height) }),
        focus: input => { activeInput = input; handlers.onFocus() },
        changeFocus: input => { activeInput = input },
        show: screenY => { metrics = { screenY }; handlers.onKeyboardDidShow({ endCoordinates: metrics }) },
        hide: () => { metrics = null; handlers.onKeyboardDidHide() },
        offset: y => handlers.onScroll({ nativeEvent: { contentOffset: { y } } }),
        layout: () => handlers.onLayout(),
        frame: () => {
            const callbacks = [...frames.values()]
            frames.clear()
            callbacks.forEach(callback => callback())
        },
        stop: () => cleanup(),
    }
}

test('keyboard opening reveals a covered answer field without resetting the existing scroll position', () => {
    const h = keyboardHarness()
    h.offset(240)
    h.focus(h.input(680))
    h.frame()
    assert.deepEqual(h.scrolled, [])
    h.show(500)
    h.frame()
    assert.deepEqual(h.scrolled, [{ y: 492, animated: true }])
})

test('a visible answer field does not cause any jump when the keyboard appears', () => {
    const h = keyboardHarness()
    h.offset(240)
    h.focus(h.input(300))
    h.show(500)
    h.frame()
    assert.deepEqual(h.scrolled, [])
})

test('switching to another answer while the keyboard is already open reveals the new field', () => {
    const h = keyboardHarness()
    h.offset(240)
    h.show(500)
    h.focus(h.input(300))
    h.frame()
    h.focus(h.input(480))
    h.frame()
    assert.deepEqual(h.scrolled, [{ y: 292, animated: true }])
})

test('the visible scroll viewport is respected when it ends above the keyboard', () => {
    const h = keyboardHarness()
    h.viewport.height = 350
    h.offset(100)
    h.focus(h.input(440))
    h.show(500)
    h.frame()
    assert.deepEqual(h.scrolled, [{ y: 182, animated: true }])
})

test('a field above the visible area scrolls up only as far as needed and never below zero', () => {
    for (const [offset, expected] of [[240, 194], [10, 0]]) {
        const h = keyboardHarness()
        h.offset(offset)
        h.focus(h.input(50))
        h.show(500)
        h.frame()
        assert.deepEqual(h.scrolled, [{ y: expected, animated: true }])
    }
})

test('hiding the keyboard or disabling the background game prevents automatic scrolling', () => {
    const hidden = keyboardHarness()
    hidden.focus(hidden.input(680))
    hidden.show(500)
    hidden.hide()
    hidden.frame()
    assert.deepEqual(hidden.scrolled, [])
    const background = keyboardHarness(false)
    background.focus(background.input(680))
    background.show(500)
    background.layout()
    background.frame()
    assert.deepEqual(background.scrolled, [])
})

test('delayed measurements from a previously focused field cannot move the screen', () => {
    const h = keyboardHarness()
    let measure
    h.focus({ measureInWindow: callback => { measure = callback } })
    h.show(500)
    h.frame()
    h.changeFocus(h.input(300))
    measure(0, 680, 320, 56)
    assert.deepEqual(h.scrolled, [])
})

test('layout changes recheck the focused field and unmount cancels pending work', () => {
    const h = keyboardHarness()
    h.focus(h.input(400))
    h.show(600)
    h.frame()
    assert.deepEqual(h.scrolled, [])
    h.viewport.height = 300
    h.layout()
    h.frame()
    assert.deepEqual(h.scrolled, [{ y: 92, animated: true }])
    h.layout()
    assert.equal(h.pendingFrames, 1)
    h.stop()
    assert.equal(h.pendingFrames, 0)
})
