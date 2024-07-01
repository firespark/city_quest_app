import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

import {Loader} from '../common/Loader'
import {Error} from '../common/Error'

import { gStyle } from '../../styles/style'

import { MainContext } from '../../context/mainContext'

import { Http } from '../../scripts/http'



export const ProfilePasswordEdit = ({ user, setUser, setTemplate, setSuccess }) => {

	const { token } = useContext(MainContext)

	const [input, setInput] = useState(null)

	const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

	const savePassword = async () => {

		setError(null)
        setLoader(true)

    	const postdata = {password: input}

    	try {
            const output = await Http.post(`https://test2.gagara-web.ru/api/users/savePassword`, postdata, token)

            if (output.success == 1) {
                setSuccess('Изменения сохранены')
	    		setTemplate(null)
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

    if (loader) {
        return <Loader />
    }
	
    return (
    	<View style={gStyle.center}>
			<Text style={gStyle.title}>Пароль:</Text>
			<TextInput 
			    placeholder="Пароль"
			    secureTextEntry={true}
			    style={[gStyle.input, gStyle.mt15, gStyle.mb10]}
			    placeholderTextColor={'#C4C4C4'}
			    onChangeText={(value) => setInput(value)}
			/>

			<TouchableOpacity
			    style={[gStyle.button, gStyle.mt20]}
			    activeOpacity={0.7}
			    onPress={() => savePassword()}
			>
			    <Text style={gStyle.buttonText}>Сохранить</Text>
			</TouchableOpacity>
		</View>


    )
}

