import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { Agreement } from '../auth/Agreement'

import {Loader} from '../common/Loader'
import {Error} from '../common/Error'

import { gStyle } from '../../styles/style'

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
        name : null,
        email : null,
        message : null,
        
    })

    const sendEmail = async () => {

        setLoader(true)
        setError(null)
        setStyle({
            ...style,
            name: null,
            email: null,
            message: null
        })

        if(!agree) {
            setError('Не отмечена галочка согласия обработки персональных данных')
        }
        else {
            /*
            if(!name || !email || !message){ 
                if(!name) {
                    setStyle({
                        ...style, 
                        name: gStyle.inputError
                    })
                }
                if(!email) {
                    setStyle({
                        ...style, 
                        email: gStyle.inputError
                    })
                }  
                if(!message) {
                    setStyle({
                        ...style, 
                        message: gStyle.inputError
                    })
                }   
                
            }
            */
            if(!name){     
                setStyle({
                    ...style, 
                    name: gStyle.inputError
                })
            }
            else if(!email){     
                setStyle({
                    ...style, 
                    email: gStyle.inputError
                })
            }
            else if(!message){     
                setStyle({
                    ...style, 
                    message: gStyle.inputError
                })
            }
            else{
            
                const postdata = {name, email, message}

                try {
                    const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/contacts/send`, postdata)

                    if (output.success == 1) {
                        setSent(output.data.message)
                    }
                    else {
                        if(output.error) {
                            setError(output.error)
                        }
                        else {
                            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                        }
                    }
                    
                }
                catch(e) {
                    
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                    
                }
                finally {
                    setLoader(false)
                }

                
            }
        }
        
    }

    if (loader) {
        return <Loader />
    }


    return (
    	<View style={[gStyle.mt20, gStyle.center]}>
            { 
                (error)
                ? 
                <Error
                    text={error}
                />
                : null 
            }

            { 
                (sent)
                ? 
                <View>
                    <Text style={gStyle.correct}>{sent}</Text>
                </View>
                : 
                <View>
                    <TextInput 
                        placeholder="Имя"
                        style={[gStyle.input, style.name]}
                        placeholderTextColor={'#C4C4C4'}
                        onChangeText={(value) => {
                            setStyle({
                                ...style,
                                name: null,
                                email: null,
                                message: null
                            })
                            setName(value)
                        }}
                    />
                    <TextInput 
                        placeholder="Email или телефон для связи"
                        style={[gStyle.input, gStyle.mt5, style.email]}
                        placeholderTextColor={'#C4C4C4'}
                        onChangeText={(value) => {
                            setStyle({
                                ...style,
                                name: null,
                                email: null,
                                message: null
                            })
                            setEmail(value)
                        }}
                    />
                    <TextInput 
                        placeholder="Сообщение"
                        style={[gStyle.textarea, gStyle.mt5, style.message]}
                        placeholderTextColor={'#C4C4C4'}
                        multiline
                        numberOfLines={3}
                        onChangeText={(value) => {
                            setStyle({
                                ...style,
                                name: null,
                                email: null,
                                message: null
                            })
                            setMessage(value)
                        }}
                    />
                            
                    <Agreement
                        agree={agree}
                        setAgree={setAgree}
                    />
                            
                    <View style={gStyle.center}>
                        <TouchableOpacity
                            style={[gStyle.button, gStyle.mt20]}
                            activeOpacity={0.7}
                            onPress={() => sendEmail()}
                        >
                            <Text style={gStyle.buttonText}>Отправить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            
        </View>

    )


}

