import { useEffect, useRef } from 'react'
import { Keyboard, TextInput } from 'react-native'

const INPUT_GAP = 16

export const useKeyboardScroll = (enabled = true) => {
    const scrollRef = useRef(null)
    const focusedInput = useRef(null)
    const offset = useRef(0)
    const keyboardTop = useRef(null)
    const frame = useRef(null)

    useEffect(() => () => {
        if (frame.current !== null) cancelAnimationFrame(frame.current)
        focusedInput.current = null
        keyboardTop.current = null
    }, [enabled])

    const revealInput = () => {
        if (frame.current !== null) cancelAnimationFrame(frame.current)
        frame.current = requestAnimationFrame(() => {
            frame.current = null
            const input = focusedInput.current
            const scroll = scrollRef.current
            const isCurrent = () => enabled && input && scroll && focusedInput.current === input
                && scrollRef.current === scroll && keyboardTop.current !== null
                && TextInput.State.currentlyFocusedInput() === input
            if (!isCurrent()) return

            input.measureInWindow((x, inputY, width, inputHeight) => {
                if (!isCurrent()) return
                scroll.measureInWindow((scrollX, scrollY, scrollWidth, scrollHeight) => {
                    if (!isCurrent()) return
                    const bottom = Math.min(scrollY + scrollHeight, keyboardTop.current)
                    if (bottom <= scrollY) return
                    const delta = inputY + inputHeight + INPUT_GAP > bottom
                        ? inputY + inputHeight + INPUT_GAP - bottom
                        : inputY < scrollY + INPUT_GAP ? inputY - scrollY - INPUT_GAP : 0
                    if (delta !== 0) scroll.scrollTo({ y: Math.max(0, offset.current + delta), animated: true })
                })
            })
        })
    }

    return {
        ref: scrollRef,
        onFocus: () => {
            if (!enabled) return
            focusedInput.current = TextInput.State.currentlyFocusedInput()
            keyboardTop.current = Keyboard.metrics()?.screenY ?? null
            revealInput()
        },
        onScroll: event => { offset.current = event.nativeEvent.contentOffset.y },
        scrollEventThrottle: 16,
        onKeyboardDidShow: event => {
            if (!enabled) return
            keyboardTop.current = event.endCoordinates.screenY
            revealInput()
        },
        onKeyboardDidHide: () => { keyboardTop.current = null },
        onLayout: revealInput,
    }
}
