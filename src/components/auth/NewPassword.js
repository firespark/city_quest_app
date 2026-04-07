import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

import { PROFILE_SCREEN } from '../../context/types'

import { Http } from '../../scripts/http'

export const NewPassword = ({ email, code, setError, changeScreen, setLoader, token }) => {

    const [input, setInput] = useState(null)
    const [confirmInput, setConfirmInput] = useState(null)

    const [style, setStyle] = useState(null)
    const [confirmStyle, setConfirmStyle] = useState(null)

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
            <Text style={[mainStyle.formTtitle, mainStyle.mb10]}>А теперь задай пароль (минимум 8 символов)</Text>

            <TextInput
                placeholder="Новый пароль"
                secureTextEntry={true}
                style={[mainStyle.input, mainStyle.mt15, mainStyle.mb10, style]}
                placeholderTextColor={'#F1F5F9'}
                onChangeText={(value) => setInput(value)}
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Повторите пароль"
                secureTextEntry={true}
                style={[mainStyle.input, mainStyle.mb10, confirmStyle]}
                placeholderTextColor={'#F1F5F9'}
                onChangeText={(value) => setConfirmInput(value)}
                autoCapitalize="none"
            />

            <TouchableOpacity
                style={[mainStyle.button, mainStyle.mt15]}
                activeOpacity={0.7}
                onPress={() => changePassword()}
            >
                <Text style={mainStyle.buttonText}>Вперед!</Text>
            </TouchableOpacity>
        </View>
    )
}