import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

import { Http } from '../../scripts/http'

export const Code = ({ email, setTemplate, setError, setCode, setLoader, token }) => {
    const [input, setInput] = useState(null)
    const [errorStyle, setErrorStyle] = useState(false)

    const checkCode = async () => {
        setLoader(true)
        setError(null)
        setErrorStyle(false)

        if (!input) {
            setErrorStyle(true)
            setLoader(false)
        } else {
            try {
                const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/checkCode`, { email, code: input }, token)
                if (output.success == 1) {
                    setCode(input)
                    setTemplate('newPassword')
                } else {
                    setErrorStyle(true)
                    setError(output.error || 'Неверный код')
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
            <Text style={[mainStyle.formTtitle, mainStyle.mb10]}>Подтверждение</Text>
            <Text style={[mainStyle.formSubtitle, mainStyle.mb25]}>Введите код, отправленный на {email}</Text>

            <TextInput
                placeholder="0000"
                style={[mainStyle.input, errorStyle && mainStyle.inputError]}
                placeholderTextColor={'#BDC3C7'}
                keyboardType="number-pad"
                onChangeText={(value) => {
                    setErrorStyle(false)
                    setInput(value)
                }}
            />

            <TouchableOpacity
                style={[mainStyle.primaryButton, mainStyle.mt15]}
                activeOpacity={0.7}
                onPress={() => checkCode()}
            >
                <Text style={mainStyle.primaryButtonText}>Дальше</Text>
            </TouchableOpacity>
        </View>
    )
}
