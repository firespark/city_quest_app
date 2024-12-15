import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle } from '../../styles/style'
import { Http } from '../../scripts/http'


export const CreateProfile = ({ email, setTemplate, setError, setLoader }) => {

    const sendCode = async () => {

        setError(null)
        setLoader(true)

        const postdata = {email: email}

        try {
                    
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/sendCode`, postdata)
            console.log(output)
            if (output.success == 1) {
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

    

    return (
    	<View style={gStyle.center}>
        	<Text style={gStyle.title}>Такой email еще не зарегистрирован. Создать учетную запись?</Text>

        	<TouchableOpacity
                style={[gStyle.button, gStyle.mt20]}
                activeOpacity={0.7}
                onPress={() => sendCode()}
            >
                <Text style={gStyle.buttonText}>Создать</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setTemplate(null)}
            >
                <Text style={[gStyle.link, gStyle.mt20]}>Нет, введу другой емейл</Text>
            </TouchableOpacity>
        </View>

    )


}

