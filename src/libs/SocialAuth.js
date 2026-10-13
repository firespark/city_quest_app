import { NativeModules, Platform } from 'react-native'

const nativeSocialAuth = NativeModules.SocialAuth

const requireAndroidModule = () => {
    if (Platform.OS !== 'android') {
        throw new Error('Вход через VK и Яндекс доступен только в Android-приложении')
    }

    if (!nativeSocialAuth) {
        throw new Error('Нативный модуль SocialAuth не подключён. Пересоберите Android-приложение')
    }

    return nativeSocialAuth
}

export const SocialAuth = {
    loginVk: () => requireAndroidModule().loginVk(),
    loginYandex: () => requireAndroidModule().loginYandex(),
    isCancellationError: error => error?.code === 'AUTH_CANCELLED',
}
