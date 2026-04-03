import { View, Text, TouchableOpacity } from 'react-native'
import { Http } from '../../scripts/http'

import { mainStyle } from '../../styles/mainStyle'

export const CreateProfile = ({ email, setTemplate, setError, setLoader }) => {

    const sendCode = async () => {
        setError(null)
        setLoader(true)
        try {
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/sendCode`, { email })
            if (output.success == 1) {
                setTemplate('code')
            } else {
                setError(output.error || 'Ошибка отправки кода')
            }
        } catch (e) {
            console.error('Error:', e);
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        } finally {
            setLoader(false)
        }
    }

    return (
        <View style={mainStyle.center}>
            <Text style={[mainStyle.formTtitle, mainStyle.mb10]}>Новый аккаунт?</Text>
            <Text style={[mainStyle.formSubtitle, mainStyle.mb25]}>
                Email <Text style={mainStyle.formThirdtitle}>{email}</Text> еще не зарегистрирован. Создать учетную запись?
            </Text>

            <TouchableOpacity
                style={mainStyle.primaryButton}
                activeOpacity={0.7}
                onPress={() => sendCode()}
            >
                <Text style={mainStyle.primaryButtonText}>Создать</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setTemplate(null)}
                style={mainStyle.secondButton}
            >
                <Text style={mainStyle.secondButtonText}>Ввести другой емейл</Text>
            </TouchableOpacity>
        </View>
    )
}
