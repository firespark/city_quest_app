import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { contactsStyle } from '../../styles/contactsStyle'

import { Agreement } from '../auth/Agreement'
import { Loader } from '../common/Loader'
import { Error } from '../common/Error'
import { Http } from '../../scripts/http'

export const ContactsForm = () => {
    const [loader, setLoader] = useState(false)

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [message, setMessage] = useState(null)

    const [agree, setAgree] = useState(true)
    const [error, setError] = useState(null)
    const [sent, setSent] = useState(null)

    const [style, setStyle] = useState({
        name: null,
        email: null,
        message: null,
    })

    const sendEmail = async () => {
        setLoader(true)
        setError(null)
        setStyle({ name: null, email: null, message: null })

        if (!agree) {
            setError('Не отмечена галочка согласия обработки персональных данных')
            setLoader(false)
        }
        else if (!name) {
            setStyle({ ...style, name: mainStyle.inputError })
            setLoader(false)
        }
        else if (!email) {
            setStyle({ ...style, email: mainStyle.inputError })
            setLoader(false)
        }
        else if (!message) {
            setStyle({ ...style, message: mainStyle.inputError })
            setLoader(false)
        }
        else {
            const postdata = { name, email, message }
            try {
                const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/contacts/send`, postdata)

                if (output.success == 1) {
                    setSent(output.data.message)
                }
                else {
                    setError(output.error || 'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
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
    }

    if (loader) return <Loader />

    return (
        <View style={contactsStyle.contactsCard}>
            {error && <View style={mainStyle.mb15}><Error text={error} /></View>}

            {sent ? (
                <View style={mainStyle.successBlock}>
                    <Text style={mainStyle.successText}>{sent}</Text>
                </View>
            ) : (
                <View style={contactsStyle.contactsFormWrapper}>
                    <Text style={[mainStyle.titleMain, mainStyle.textCenter]}>Написать разработчикам</Text>

                    <TextInput
                        placeholder="Имя"
                        style={[mainStyle.modernInput, style.name]}
                        placeholderTextColor={'#BDC3C7'}
                        onChangeText={(value) => {
                            setStyle({ ...style, name: null })
                            setName(value)
                        }}
                    />
                    <TextInput
                        placeholder="Email или телефон для связи"
                        style={[mainStyle.modernInput, style.email]}
                        placeholderTextColor={'#BDC3C7'}
                        onChangeText={(value) => {
                            setStyle({ ...style, email: null })
                            setEmail(value)
                        }}
                    />
                    <TextInput
                        placeholder="Сообщение"
                        style={[mainStyle.modernTextarea, style.message]}
                        placeholderTextColor={'#BDC3C7'}
                        multiline
                        numberOfLines={4}
                        onChangeText={(value) => {
                            setStyle({ ...style, message: null })
                            setMessage(value)
                        }}
                    />

                    <Agreement agree={agree} setAgree={setAgree} />

                    <View style={[mainStyle.center, mainStyle.mt20]}>
                        <TouchableOpacity
                            style={mainStyle.primaryButton}
                            activeOpacity={0.7}
                            onPress={() => sendEmail()}
                        >
                            <Text style={mainStyle.primaryButtonText}>Отправить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}
