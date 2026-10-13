import { Pressable, Text } from 'react-native'

import { SocialAuth } from '../../libs/SocialAuth'
import { Http } from '../../scripts/http'
import { authStyle } from '../../styles/authStyle'

export const AuthVK = ({ token, setLoader, setError, changeScreen, screen }) => {
    const login = async () => {
        setError(null)
        setLoader(true)

        try {
            const { accessToken } = await SocialAuth.loginVk()
            const output = await Http.post(
                `${process.env.EXPO_PUBLIC_API_URL}/auth/loginVk`,
                { accessToken },
                token
            )

            if (output.success == 1) {
                changeScreen(screen)
            } else {
                setError(output.error || 'Не удалось войти через VK')
            }
        } catch (error) {
            if (!SocialAuth.isCancellationError(error)) {
                setError(error?.message || 'Не удалось войти через VK')
            }
        } finally {
            setLoader(false)
        }
    }

    return (
        <Pressable style={[authStyle.socialButton, authStyle.vkButton]} onPress={login}>
            <Text style={authStyle.vkButtonText}>Войти через VK</Text>
        </Pressable>
    )
}
