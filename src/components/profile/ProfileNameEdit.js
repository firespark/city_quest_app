import { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { profileStyle } from '../../styles/profileStyle'

import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const ProfileNameEdit = ({ user, setUser, setTemplate, setSuccess }) => {
    const { token } = useContext(MainContext)
    const [input, setInput] = useState(user.name)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const saveName = async () => {
        const postdata = { name: input }

        setError(null)
        setLoader(true)

        try {
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/users/saveName`, postdata, token)

            if (output.success == 1) {
                setUser({
                    ...user,
                    'name': input,
                })
                setSuccess('Изменения сохранены')
                setTemplate(null)
            }
            else {
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

    if (loader) return <Loader />

    return (
        <View style={profileStyle.editContainer}>
            <Text style={[profileStyle.label, mainStyle.mb10]}>Ваше имя</Text>

            <TextInput
                placeholder="Введите имя"
                style={profileStyle.inputModern}
                placeholderTextColor={'#BDC3C7'}
                value={input}
                onChangeText={(value) => setInput(value)}
            />

            {error && <View style={[mainStyle.mt10, mainStyle.mb10]}><Error text={error} /></View>}

            <TouchableOpacity
                style={[mainStyle.button, mainStyle.mt10]}
                activeOpacity={0.7}
                onPress={() => saveName()}
            >
                <Text style={mainStyle.buttonText}>Сохранить</Text>
            </TouchableOpacity>
        </View>
    )
}
