import { useEffect, useState } from 'react'
import { ActivityIndicator, AppState, Image, Linking, Platform, Text, TouchableOpacity, View } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import * as Location from 'expo-location'
import { useArLocation } from '../hooks/useArLocation'
import { useArOrientation } from '../hooks/useArOrientation'
import { projectArObject } from '../scripts/arMath'
import { getArActivationRadius } from '../scripts/arLocation'
import { arStyle } from '../styles/arStyle'
import { mainStyle } from '../styles/mainStyle'

const AndroidARSearch = ({ point, onClose }) => {
    const [permission, requestPermission, getPermission] = useCameraPermissions({ get: false })
    const [active, setActive] = useState(false)
    const [cameraReady, setCameraReady] = useState(false)
    const [cameraSession, setCameraSession] = useState(0)
    const [cameraRequested, setCameraRequested] = useState(false)
    const [cameraError, setCameraError] = useState('')
    const [permissionError, setPermissionError] = useState('')
    const [retry, setRetry] = useState(0)
    const [locationRetry, setLocationRetry] = useState(0)
    const [busy, setBusy] = useState(false)
    const [found, setFound] = useState(false)
    const [viewport, setViewport] = useState({ width: 0, height: 0 })
    const gps = useArLocation(point, active, locationRetry)
    const atPoint = gps.status === 'inside'
    const cameraEnabled = active && atPoint && cameraRequested && !!permission?.granted && !cameraError
    const { pose, error } = useArOrientation(cameraEnabled && cameraReady, retry)
    const projection = projectArObject(pose, point.direction, point.elevationAngle, viewport.width, viewport.height)

    useEffect(() => {
        let mounted = true
        const refreshPermission = async () => {
            try {
                await getPermission()
            } catch {
                if (mounted) setPermissionError('Не удалось проверить доступ к камере.')
            }
            if (mounted && AppState.currentState === 'active') {
                setCameraSession(value => value + 1)
                setActive(true)
            }
        }
        const subscription = AppState.addEventListener('change', (state) => {
            setCameraReady(false)
            setActive(false)
            if (state === 'active') refreshPermission()
        })
        if (AppState.currentState === 'active') refreshPermission()
        return () => {
            mounted = false
            subscription.remove()
        }
    }, [getPermission])

    useEffect(() => {
        if (!cameraEnabled) setCameraReady(false)
        if (gps.status === 'outside') setCameraRequested(false)
    }, [cameraEnabled, gps.status])

    useEffect(() => {
        if (cameraEnabled && cameraReady && !error && projection?.inView) setFound(true)
    }, [cameraEnabled, cameraReady, error, projection?.inView])

    const handleAction = async () => {
        if (busy || !active) return
        if (found) {
            onClose()
            return
        }
        setBusy(true)
        setPermissionError('')
        try {
            if (gps.status === 'permission') {
                if (gps.canAskAgain === false) await Linking.openSettings()
                else await Location.requestForegroundPermissionsAsync()
                setLocationRetry(value => value + 1)
            } else if (gps.status === 'disabled') {
                await Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS')
                setLocationRetry(value => value + 1)
            } else if (gps.status === 'error' || gps.status === 'stale') {
                setLocationRetry(value => value + 1)
            } else if (atPoint && error && cameraEnabled) {
                setRetry(value => value + 1)
            } else if (atPoint) {
                if (!permission?.granted && permission?.canAskAgain === false) await Linking.openSettings()
                else {
                    const result = permission?.granted ? permission : await requestPermission()
                    if (result.granted) {
                        setCameraError('')
                        setCameraRequested(true)
                    } else {
                        setPermissionError('Для поиска надписи нужен доступ к камере. Разреши его в следующем запросе или в настройках приложения.')
                    }
                }
            }
        } catch {
            setPermissionError('Не удалось продолжить. Проверь доступ к камере и точному местоположению в настройках приложения.')
        } finally {
            setBusy(false)
        }
    }

    const gpsMessages = {
        inactive: 'Поиск приостановлен, пока приложение не активно.',
        locating: 'Определяем твоё местоположение. Кнопка камеры станет доступна, когда ты подойдёшь к точке.',
        permission: 'Разреши точное местоположение, чтобы мы определили, дошёл ли ты до точки.',
        disabled: 'Включи геолокацию на телефоне, чтобы найти точку.',
        error: 'Не удалось получить координаты. Проверь, включена ли геолокация, и повтори поиск.',
        stale: 'Потеряли свежие координаты. Ждём новый сигнал GPS.',
        outside: `Подойди к координатам ниже. С учётом погрешности GPS камера доступна примерно в пределах ${Math.round(getArActivationRadius(point, gps.accuracy))} м от точки.`,
        inside: 'Ты у точки! Открой камеру, затем медленно поворачивай телефон и следуй подсказке на экране.',
    }
    let guidance = 'Медленно поворачивай телефон и ищи надпись.'
    if (projection) {
        guidance = projection.inView ? 'Надпись перед тобой! Запомни её и нажми «Ввести ответ».'
            : projection.behind || projection.horizontalError >= projection.verticalError ? projection.horizontalHint : projection.verticalHint
    }
    const title = found ? '3. Надпись найдена!' : atPoint ? '2. Найди надпись через камеру' : '1. Подойди к точке'
    const description = found ? 'Запомни надпись. Нажми «Ввести ответ» и впиши её в поле второго вопроса.'
        : cameraEnabled ? cameraReady ? guidance : 'Открываем камеру…' : gpsMessages[gps.status]
    let action = 'Открыть камеру'
    let disabled = !atPoint
    if (found) { action = 'Ввести ответ'; disabled = false }
    else if (gps.status === 'permission') { action = gps.canAskAgain === false ? 'Открыть настройки' : 'Разрешить геолокацию'; disabled = false }
    else if (gps.status === 'disabled') { action = 'Включить GPS'; disabled = false }
    else if (gps.status === 'error' || gps.status === 'stale') { action = 'Повторить поиск GPS'; disabled = false }
    else if (atPoint && !permission?.granted && permission?.canAskAgain === false) action = 'Открыть настройки камеры'
    else if (atPoint && (cameraError || error)) action = 'Повторить'
    else if (cameraEnabled) { action = 'Ищи надпись в камере'; disabled = true }
    disabled = disabled || busy || !active

    return (
        <>
            <View style={arStyle.status} accessibilityLiveRegion="polite">
                <Text style={arStyle.title}>{title}</Text>
                <Text style={arStyle.text}>{description}</Text>
                {!found ? <Text style={arStyle.hint}>До точки: {gps.distance === null ? 'определяем…' : `${Math.round(gps.distance)} м`} · точность GPS: {gps.accuracy === null ? 'определяем…' : `±${Math.ceil(gps.accuracy)} м`}</Text> : null}
            </View>
            <View style={arStyle.preview} onLayout={({ nativeEvent }) => setViewport(nativeEvent.layout)}>
                {cameraEnabled ? (
                    <>
                        <CameraView key={cameraSession} style={arStyle.camera} facing="back" mode="picture" zoom={0} onCameraReady={() => setCameraReady(true)} onMountError={() => {
                            setCameraReady(false)
                            setCameraError('Не удалось открыть камеру. Закрой другие приложения, использующие её, и нажми «Повторить».')
                        }} />
                        {cameraReady && !error && pose ? (
                            <View style={arStyle.camera} pointerEvents="none">
                                <View style={[arStyle.reticle, projection?.inView && arStyle.reticleActive]} />
                                {projection?.visible ? (
                                    <View style={[arStyle.object, { left: projection.x - viewport.width * 0.4, top: projection.y - 60 }]}>
                                        <Text style={arStyle.objectText} adjustsFontSizeToFit minimumFontScale={0.5}>{point.text}</Text>
                                    </View>
                                ) : null}
                                <View style={[arStyle.guidance, projection?.inView && arStyle.guidanceActive]}>
                                    <Text style={arStyle.message}>{guidance}</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={arStyle.center} pointerEvents="none">
                                {!error ? <ActivityIndicator color="#FFFFFF" /> : null}
                                <Text style={arStyle.message}>{error || (cameraReady ? 'Готовим поиск надписи…' : 'Открываем камеру…')}</Text>
                            </View>
                        )}
                    </>
                ) : (
                    <View style={arStyle.center}>
                        {active && gps.status === 'locating' ? <ActivityIndicator color="#FFFFFF" /> : null}
                        <Text style={arStyle.message}>{found ? 'Надпись найдена. Теперь введи ответ в задании.' : cameraError || (atPoint ? 'Камера готова к поиску. Нажми «Открыть камеру».' : 'Сначала подойди к точке. Затем здесь появится камера для поиска надписи.')}</Text>
                    </View>
                )}
            </View>
            <View style={arStyle.actions}>
                {!found ? <Text selectable style={arStyle.hint}>Координаты поиска: {point.latitude}, {point.longitude}</Text> : null}
                {permissionError ? <Text style={arStyle.error}>{permissionError}</Text> : null}
                <TouchableOpacity style={[found ? mainStyle.primaryButton : arStyle.utilityButton, disabled && arStyle.buttonDisabled]} accessibilityRole="button" accessibilityState={{ disabled, busy }} activeOpacity={0.7} disabled={disabled} onPress={handleAction}>
                    <Text style={found ? mainStyle.primaryButtonText : arStyle.utilityButtonText}>{busy ? 'Подожди…' : action}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const validPoint = point => point && Number.isFinite(point.latitude) && Math.abs(point.latitude) <= 90
    && Number.isFinite(point.longitude) && Math.abs(point.longitude) <= 180
    && Number.isFinite(point.activationRadius) && point.activationRadius > 0
    && Number.isFinite(point.direction) && Number.isFinite(point.elevationAngle)
    && typeof point.text === 'string' && point.text.trim().length > 0

export const ARPrototypeScreen = ({ point, onClose }) => (
    <View style={arStyle.page}>
        <View style={arStyle.header}>
            <TouchableOpacity style={mainStyle.backButton} accessibilityRole="button" accessibilityLabel="Вернуться к заданию" activeOpacity={0.7} onPress={onClose}>
                <Image source={require('../../assets/img/back.png')} style={mainStyle.backIcon} />
            </TouchableOpacity>
            <Text style={arStyle.title}>Поиск надписи</Text>
        </View>
        {!validPoint(point) ? null : Platform.OS === 'android' ? <AndroidARSearch point={point} onClose={onClose} /> : (
            <View style={arStyle.center}><Text style={arStyle.text}>Поиск AR-надписей доступен в приложении для Android.</Text></View>
        )}
    </View>
)
