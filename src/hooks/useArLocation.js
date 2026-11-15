import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { AR_LOCATION_MAX_AGE_MS, getArProximity } from '../scripts/arLocation'

const initialState = { status: 'locating', distance: null, accuracy: null, canAskAgain: true }

export const useArLocation = (point, enabled, retry) => {
    const [state, setState] = useState(initialState)
    const { latitude, longitude, activationRadius } = point

    useEffect(() => {
        setState(initialState)
        if (!enabled) return
        let cancelled = false
        let subscription
        let watchdog
        let lastFix = null
        let lastStatus = 'locating'
        let wasInside = false
        let receivedLiveFix = false
        const startedAt = Date.now()
        const target = { latitude, longitude, activationRadius }
        const publish = next => {
            if (!cancelled) {
                lastStatus = next.status
                setState({ ...initialState, ...next })
            }
        }
        const fail = () => {
            lastFix = null
            wasInside = false
            publish({ status: 'error' })
        }
        const acceptFix = (fix, cached = false) => {
            if (cancelled || !fix) return
            if (lastFix && fix.timestamp < lastFix.timestamp) return
            const proximity = getArProximity(target, fix, Date.now(), wasInside)
            // Do not replace usable coordinates with malformed native samples.
            if (proximity.status === 'locating') return
            if (proximity.status === 'stale') {
                if (!lastFix && !cached) publish(proximity)
                return
            }
            lastFix = fix
            if (proximity.status === 'inside') wasInside = true
            else if (proximity.status === 'outside') wasInside = false
            publish(proximity)
        }
        const start = async () => {
            try {
                const permission = await Location.getForegroundPermissionsAsync()
                if (cancelled) return
                if (!permission.granted) {
                    publish({ status: 'permission', canAskAgain: permission.canAskAgain })
                    return
                }
                const servicesEnabled = await Location.hasServicesEnabledAsync()
                if (cancelled) return
                if (!servicesEnabled) {
                    publish({ status: 'disabled' })
                    return
                }
                // Warm start without delaying the live watcher. Permission dialogs can
                // restart tracking; reuse only a recent fix, never an old cached location.
                Location.getLastKnownPositionAsync({ maxAge: AR_LOCATION_MAX_AGE_MS }).then(fix => {
                    if (!receivedLiveFix) acceptFix(fix, true)
                }).catch(() => {})
                const watching = await Location.watchPositionAsync({
                    accuracy: Location.Accuracy.Highest,
                    timeInterval: 1000,
                    distanceInterval: 0,
                    mayShowUserSettingsDialog: false,
                }, fix => {
                    receivedLiveFix = true
                    acceptFix(fix)
                }, () => {
                    receivedLiveFix = true
                    if (!cancelled) fail()
                })
                if (cancelled) {
                    watching.remove()
                    return
                }
                subscription = watching
                watchdog = setInterval(() => {
                    if (cancelled) return
                    if (lastFix) {
                        const proximity = getArProximity(target, lastFix, Date.now(), wasInside)
                        if (proximity.status !== lastStatus) publish(proximity)
                    } else if (lastStatus === 'locating' && Date.now() - startedAt > 20000) {
                        publish({ status: 'error' })
                    }
                }, 1000)
            } catch {
                if (!cancelled) fail()
            }
        }
        start()
        return () => {
            cancelled = true
            subscription?.remove()
            clearInterval(watchdog)
        }
    }, [enabled, retry, latitude, longitude, activationRadius])

    return enabled ? state : { ...initialState, status: 'inactive' }
}
