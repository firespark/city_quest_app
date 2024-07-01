import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { Agreement } from './Agreement'

import { gStyle } from '../../styles/style'

import { Http } from '../../scripts/http'



export const EmailReset = ({ setEmail, setTemplate, setError, setLoader }) => {

    const [input, setInput] = useState(null)
    const [style, setStyle] = useState(null)
    const [agree, setAgree] = useState(true)

    const checkEmail = async () => {

        setLoader(true)
        setError(null)
        setStyle(null)

        if(!agree) {
            setError('Не отмечена галочка согласия обработки персональных данных')
        }
        else {

            if(!input){     
                setStyle(gStyle.inputError)
            }
            else {
                const postdata = {email: input}

                try {
                            
                    const output = await Http.post(`https://test2.gagara-web.ru/api/auth/sendCode`, postdata)

                    if (output.success == 1) {
                        setEmail(input)
                        setTemplate('code')
                                
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
                    console.log(e)
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                    
                }
                finally {
                    setLoader(false)
                }


                
            }
        }
        
    }

    return (
        <View style={gStyle.center}>
            <Text style={gStyle.title}>Введи Email:</Text>
            <TextInput 
                placeholder="Email"
                style={[gStyle.input, gStyle.mt15, gStyle.mb10, style]}
                placeholderTextColor={'#C4C4C4'}
                onChangeText={(value) => {
                    setStyle(null)
                    setInput(value)
                }}
            />

             
            <TouchableOpacity
                style={[gStyle.button, gStyle.mt20]}
                activeOpacity={0.7}
                onPress={() => checkEmail()}
            >
                <Text style={gStyle.buttonText}>Дальше</Text>
            </TouchableOpacity>
            
            <Agreement
                agree={agree}
                setAgree={setAgree}
            />   
        </View>

    )


}

