import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Agreement } from './Agreement'

import { mainStyle } from '../../styles/mainStyle'

import { Http } from '../../scripts/http'

export const Email = ({ setEmail, setTemplate, setError, setLoader }) => {
    const [input, setInput] = useState(null)
    const [errorStyle, setErrorStyle] = useState(false)
    const [agree, setAgree] = useState(true)

    const checkEmail = async () => {
        setLoader(true)
        setError(null)
        setErrorStyle(false)

        if (!agree) {
            setError('Не отмечена галочка согласия обработки персональных данных')
            setLoader(false)
        } else if (!input) {
            setErrorStyle(true)
            setLoader(false)
        } else {
            try {
                const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/checkEmail`, { email: input })
                if (output.success == 1) {
                    setEmail(input)
                    setTemplate(output.data.email_exists == 1 ? 'password' : 'createProfile')
                } else {
                    setErrorStyle(true)
                    setError(output.error || 'Ошибка проверки Email')
                }
            } catch (e) {
                console.error('Error:', e);
                setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            } finally {
                setLoader(false)
            }
        }
    }

    return (
        <View style={mainStyle.center}>
            <Text style={[mainStyle.formTtitle, mainStyle.mb10]}>Добро пожаловать!</Text>
            <Text style={[mainStyle.formSubtitle, mainStyle.mb25]}>Введи Email, чтобы продолжить:</Text>

            <TextInput
                placeholder="email@example.com"
                style={[mainStyle.input, errorStyle && mainStyle.inputError]}
                placeholderTextColor={'#BDC3C7'}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) => {
                    setErrorStyle(false)
                    setInput(value)
                }}
            />

            <Agreement agree={agree} setAgree={setAgree} />

            <TouchableOpacity style={mainStyle.primaryButton} activeOpacity={0.7} onPress={checkEmail}>
                <Text style={mainStyle.primaryButtonText}>Дальше</Text>
            </TouchableOpacity>
        </View>
    )
}
