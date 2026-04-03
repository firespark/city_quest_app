import { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { profileStyle } from '../../styles/profileStyle'

import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const ProfilePasswordEdit = ({ setTemplate, setSuccess }) => {

    const { token } = useContext(MainContext)

    const [input, setInput] = useState(null)
    const [confirmInput, setConfirmInput] = useState(null)

    const [style, setStyle] = useState(null)
    const [confirmStyle, setConfirmStyle] = useState(null)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const savePassword = async () => {
        setError(null)
        setStyle(null)
        setConfirmStyle(null)

        if (!input || input.length < 8) {
            setStyle(profileStyle.inputError)
            setError('Пароль должен содержать минимум 8 символов')
            return
        }

        if (!confirmInput) {
            setConfirmStyle(profileStyle.inputError)
            setError('Пожалуйста, повторите пароль')
            return
        }

        if (input !== confirmInput) {
            setStyle(profileStyle.inputError)
            setConfirmStyle(profileStyle.inputError)
            setError('Пароли не совпадают')
            return
        }

        setLoader(true)
        const postdata = { password: input }

        try {
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/users/savePassword`, postdata, token)

            if (output.success == 1) {
                setSuccess('Изменения сохранены')
                setTemplate(null)
            }
            else {
                setStyle(profileStyle.inputError)
                setConfirmStyle(profileStyle.inputError)
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

    if (loader) {
        return <Loader />
    }

    return (
        <View style={profileStyle.editContainer}>
            <Text style={[profileStyle.label, mainStyle.mb10]}>Новый пароль</Text>

            <TextInput
                placeholder="Минимум 8 символов"
                secureTextEntry={true}
                style={[profileStyle.inputModern, style]}
                placeholderTextColor={'#BDC3C7'}
                onChangeText={(value) => setInput(value)}
                autoCapitalize="none"
            />

            <Text style={[profileStyle.label, mainStyle.mb10, mt5]}>Повторите пароль</Text>

            <TextInput
                placeholder="Повторите пароль"
                secureTextEntry={true}
                style={[profileStyle.inputModern, confirmStyle]}
                placeholderTextColor={'#BDC3C7'}
                onChangeText={(value) => setConfirmInput(value)}
                autoCapitalize="none"
            />

            {error && (
                <View style={mainStyle.mb15}>
                    <Error text={error} />
                </View>
            )}

            <TouchableOpacity
                style={[mainStyle.button, mainStyle.mt10]}
                activeOpacity={0.7}
                onPress={() => savePassword()}
            >
                <Text style={mainStyle.buttonText}>Сохранить</Text>
            </TouchableOpacity>
        </View>
    )
}
