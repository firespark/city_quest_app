import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { PasswordForgot } from './PasswordForgot'

import { mainStyle } from '../../styles/mainStyle'

import { Http } from '../../scripts/http'

export const Password = ({ email, setError, changeScreen, token, screen, setLoader }) => {
    const [input, setInput] = useState(null)
    const [confirmInput, setConfirmInput] = useState(null)
    const [errorStyle, setErrorStyle] = useState(false)

    const checkPassword = async () => {
        setLoader(true)
        setError(null)
        setErrorStyle(false)

        if (!input || !confirmInput) {
            setErrorStyle(true)
            setLoader(false)
            return
        }

        if (input !== confirmInput) {
            setErrorStyle(true)
            setError('Пароли не совпадают')
            setLoader(false)
            return
        }

        try {
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, { email, password: input }, token)
            if (output.success == 1) {
                changeScreen(screen)
            } else {
                setErrorStyle(true)
                setError(output.error || 'Неверный пароль')
            }
        } catch (e) {
            console.error('Error:', e);
            setError('Ошибка сети')
        } finally {
            setLoader(false)
        }
    }

    return (
        <View style={mainStyle.center}>
            <Text style={[mainStyle.formTtitle, mainStyle.mb10]}>С возвращением!</Text>
            <Text style={[mainStyle.formSubtitle, mainStyle.mb25]}>Введи пароль для {email}:</Text>

            <TextInput
                placeholder="Пароль"
                secureTextEntry
                style={[mainStyle.input, errorStyle && mainStyle.inputError]}
                placeholderTextColor={'#BDC3C7'}
                onChangeText={setInput}
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Повтори пароль"
                secureTextEntry
                style={[mainStyle.input, { marginTop: 15 }, errorStyle && mainStyle.inputError]}
                placeholderTextColor={'#BDC3C7'}
                onChangeText={setConfirmInput}
                autoCapitalize="none"
            />

            <TouchableOpacity style={mainStyle.primaryButton} activeOpacity={0.7} onPress={checkPassword}>
                <Text style={mainStyle.primaryButtonText}>Войти</Text>
            </TouchableOpacity>

            <PasswordForgot changeScreen={changeScreen} />
        </View>
    )
}
