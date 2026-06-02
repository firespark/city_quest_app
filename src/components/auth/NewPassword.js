import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { mainStyle } from '../../styles/mainStyle'

import { PROFILE_SCREEN } from '../../context/types'

import { Http } from '../../scripts/http'
import { authStyle } from '../../styles/authStyle'

export const NewPassword = ({ email, code, setError, changeScreen, setLoader, token }) => {

    const [input, setInput] = useState(null)
    const [confirmInput, setConfirmInput] = useState(null)

    const [style, setStyle] = useState(null)
    const [confirmStyle, setConfirmStyle] = useState(null)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const changePassword = async () => {

        setLoader(true)
        setError(null)
        setStyle(null)
        setConfirmStyle(null)

        if (!input || input.length < 8) {
            setStyle(mainStyle.inputError)
            setError('Пароль должен содержать минимум 8 символов')
            setLoader(false)
            return
        }

        if (!confirmInput) {
            setConfirmStyle(mainStyle.inputError)
            setLoader(false)
            return
        }

        if (input !== confirmInput) {
            setStyle(mainStyle.inputError)
            setConfirmStyle(mainStyle.inputError)
            setError('Пароли не совпадают')
            setLoader(false)
            return
        }

        const postdata = { email: email, code: code, password: input }

        try {
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/changePassword`, postdata)

            if (output.success == 1) {
                const login = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, postdata, token)

                if (login.success == 1) {
                    changeScreen(PROFILE_SCREEN)
                }
            }
            else {
                setStyle(mainStyle.inputError)
                setConfirmStyle(mainStyle.inputError)
                if (output.error) {
                    setError(output.error)
                }
                else {
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
        }
        catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        }
        finally {
            setLoader(false)
        }
    }

    return (
        <View style={mainStyle.center}>
            <Text style={[mainStyle.subtitle, mainStyle.mb10, mainStyle.textCenter]}>А теперь задай пароль (минимум 8 символов)</Text>

            <View style={[mainStyle.blockRelative, mainStyle.mt15, mainStyle.mb10]}>
                <TextInput
                    placeholder="Новый пароль"
                    secureTextEntry={!showPassword}
                    style={[mainStyle.input, style, authStyle.eyePadding]}
                    placeholderTextColor={'#BDC3C7'}
                    onChangeText={(value) => setInput(value)}
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

            <View style={[mainStyle.blockRelative, mainStyle.mb10]}>
                <TextInput
                    placeholder="Повторите пароль"
                    secureTextEntry={!showConfirmPassword}
                    style={[mainStyle.input, confirmStyle, authStyle.eyePadding]}
                    placeholderTextColor={'#BDC3C7'}
                    onChangeText={(value) => setConfirmInput(value)}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={authStyle.eyeSign}
                    activeOpacity={0.7}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#BDC3C7" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[mainStyle.button, mainStyle.mt15]}
                activeOpacity={0.7}
                onPress={() => changePassword()}
            >
                <Text style={mainStyle.buttonText}>Задать пароль</Text>
            </TouchableOpacity>
        </View>
    )
}