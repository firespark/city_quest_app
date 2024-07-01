import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { gStyle } from '../../styles/style'

import { Http } from '../../scripts/http'

export const Code = ({ email, setTemplate, setError, setCode, setLoader }) => {

    const [input, setInput] = useState(null)
    const [style, setStyle] = useState(null)

    const checkCode = async () => {

        setLoader(true)
        setError(null)
        setStyle(null)

        if(!input){     
            setStyle(gStyle.inputError)
        }
        else {
            const postdata = {email: email, code: input}

            try {
                    
                const output = await Http.post(`https://test2.gagara-web.ru/api/auth/checkCode`, postdata)

                if (output.success == 1) {
                    setCode(input)
                    setTemplate('newPassword') 
                            
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
        	<Text style={gStyle.title}>На указанный Email выслан код. Введи его:</Text>
	        <TextInput 
		        placeholder="Код"
		        style={[gStyle.input, gStyle.mt15, gStyle.mb10, style]}
		        placeholderTextColor={'#C4C4C4'}
                onChangeText={(value) => setInput(value)}
		    />
		    <TouchableOpacity
                style={[gStyle.button, gStyle.mt20]}
                activeOpacity={0.7}
                onPress={() => checkCode()}
            >
                <Text style={gStyle.buttonText}>Дальше</Text>
            </TouchableOpacity>
        </View>

    )


}

