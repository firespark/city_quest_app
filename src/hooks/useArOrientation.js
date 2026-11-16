import { useEffect, useState } from 'react'
import { DeviceMotion } from 'expo-sensors'
import { getCameraPose, rotationToQuaternion, smoothOrientation } from '../scripts/arMath'

// Only mounted by the Android prototype. iOS DeviceMotion has a different frame.
export const useArOrientation = (enabled, retry) => {
    const [state, setState] = useState({ pose: null, error: '' })

    useEffect(() => {
        setState({ pose: null, error: '' })
        if (!enabled) return
        let cancelled = false
        let subscription
        let watchdog
        let previous = null
        let previousTime = null
        let lastReading = Date.now()

        const start = async () => {
            try {
                const available = await DeviceMotion.isAvailableAsync()
                if (cancelled) return
                if (!available) {
                    setState({ pose: null, error: 'На телефоне недоступен компас или датчики движения. AR-тест не запустится.' })
                    return
                }
                DeviceMotion.setUpdateInterval(33)
                lastReading = Date.now()
                subscription = DeviceMotion.addListener(({ rotation }) => {
                    if (cancelled) return
                    const quaternion = rotationToQuaternion(rotation)
                    if (!quaternion) return
                    const now = Date.now()
                    // Repeated stale native samples must not keep the object visible.
                    const sampleTime = Number.isFinite(rotation.timestamp) ? rotation.timestamp * 1000 : now
                    if (previousTime !== null && sampleTime <= previousTime) return
                    previous = smoothOrientation(previous, quaternion, previousTime === null ? 33 : sampleTime - previousTime)
                    previousTime = sampleTime
                    lastReading = now
                    setState({ pose: getCameraPose(previous), error: '' })
                })
                watchdog = setInterval(() => {
                    if (!cancelled && Date.now() - lastReading > 3000) {
                        previous = null
                        setState({ pose: null, error: 'Нет данных от датчиков. Попробуй запустить их снова.' })
                    }
                }, 1000)
            } catch {
                if (!cancelled) setState({ pose: null, error: 'Не удалось включить датчики. Попробуй ещё раз.' })
            }
        }
        start()
        return () => {
            cancelled = true
            subscription?.remove()
            clearInterval(watchdog)
        }
    }, [enabled, retry])

    return enabled ? state : { pose: null, error: '' }
}
