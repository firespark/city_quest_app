import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PasswordForgot } from './PasswordForgot'

import { mainStyle } from '../../styles/mainStyle'
import { authStyle } from '../../styles/authStyle'

import { Http } from '../../scripts/http'

export const Password = ({ email, setError, changeScreen, token, screen, setLoader }) => {
    const [input, setInput] = useState(null)
    const [errorStyle, setErrorStyle] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const checkPassword = async () => {
        setLoader(true)
        setError(null)
        setErrorStyle(false)

        if (!input) {
            setErrorStyle(true)
            setError('Введите пароль')
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
            <Text style={[mainStyle.formTitle, mainStyle.mb10]}>С возвращением!</Text>
            <Text style={[mainStyle.formSubtitle, mainStyle.mb25]}>Введи пароль для {email}:</Text>

            <View style={mainStyle.blockRelative}>
                <TextInput
                    placeholder="Пароль"
                    secureTextEntry={!showPassword}
                    style={[mainStyle.input, errorStyle && mainStyle.inputError, authStyle.eyePadding]}
                    placeholderTextColor={'#BDC3C7'}
                    onChangeText={setInput}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={authStyle.eyeSign}
                    activeOpacity={0.7}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#BDC3C7" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[mainStyle.primaryButton, mainStyle.mt15]} activeOpacity={0.7} onPress={checkPassword}>
                <Text style={mainStyle.primaryButtonText}>Войти</Text>
            </TouchableOpacity>

            <PasswordForgot changeScreen={changeScreen} />
        </View>
    )
}
