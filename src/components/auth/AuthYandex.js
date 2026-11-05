import { Image, Pressable, Text } from 'react-native'

import { SocialAuth } from '../../libs/SocialAuth'
import { Http } from '../../scripts/http'
import { authStyle } from '../../styles/authStyle'
import { SOCIAL_AUTH } from '../../config/socialAuth'

export const AuthYandex = ({ token, setLoader, setError, changeScreen, screen }) => {
    const login = async () => {
        setError(null)
        setLoader(true)

        try {
            const { accessToken } = await SocialAuth.loginYandex()
            const output = await Http.post(
                `${process.env.EXPO_PUBLIC_API_URL}/auth/loginYandex`,
                { accessToken, clientId: SOCIAL_AUTH.yandex },
                token
            )

            if (output.success == 1) {
                changeScreen(screen)
            } else {
                setError(output.error || 'Не удалось войти через Яндекс')
            }
        } catch (error) {
            if (!SocialAuth.isCancellationError(error)) {
                setError(error?.message || 'Не удалось войти через Яндекс')
            }
        } finally {
            setLoader(false)
        }
    }

    return (
        <Pressable style={[authStyle.socialButton, authStyle.yandexButton]} onPress={login} disabled={!SOCIAL_AUTH.yandex} accessibilityState={{ disabled: !SOCIAL_AUTH.yandex }}>
            <Image source={require('../../../assets/img/yandex.png')} style={authStyle.socialIcon} resizeMode="contain" />
            <Text style={authStyle.yandexButtonText}>Войти через Яндекс</Text>
        </Pressable>
    )
}
