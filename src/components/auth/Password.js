import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { gStyle } from '../../styles/style'

import { Http } from '../../scripts/http'


export const Password = ({ email, setError, changeScreen, token, screen, setLoader }) => {

    const [input, setInput] = useState(null)
    const [style, setStyle] = useState(null)


    const checkPassword = async () => {
        setLoader(true)
        setError(null)
        setStyle(null)

        if(!input){     
            setStyle(gStyle.inputError)
        }
        else {
            const postdata = {email: email, password: input}

            try {
                    
                const output = await Http.post(`https://test2.gagara-web.ru/api/auth/login`, postdata, token)

                if (output.success == 1) {
                    changeScreen(screen)
                            
                }
                else {
                    setStyle(gStyle.inputError)
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
	

    return (
    	<View style={gStyle.center}>
        	<Text style={gStyle.title}>Пароль:</Text>
		    <TextInput 
                placeholder="Пароль"
                secureTextEntry={true}
                style={[gStyle.input, gStyle.mt15, gStyle.mb10, style]}
                placeholderTextColor={'#C4C4C4'}
                onChangeText={(value) => setInput(value)}
            />

	        <TouchableOpacity
                style={[gStyle.button, gStyle.mt20]}
                activeOpacity={0.7}
                onPress={() => checkPassword()}
            >
                <Text style={gStyle.buttonText}>Вперед!</Text>
            </TouchableOpacity>
        </View>

    )


}

