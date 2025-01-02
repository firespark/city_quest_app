import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

import {Loader} from '../common/Loader'
import {Error} from '../common/Error'

import { gStyle } from '../../styles/style'

import { MainContext } from '../../context/mainContext'

import { Http } from '../../scripts/http'



export const ProfileNameEdit = ({ user, setUser, setTemplate, setSuccess }) => {

	const { token } = useContext(MainContext)

	const [input, setInput] = useState(user.name)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

	const saveName = async () => {
    	const postdata = {name: input}

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

    if (loader) {
        return <Loader />
    }
	
    return (
    	<View style={gStyle.center}>
		   	<Text style={gStyle.title}>Имя:</Text>
		   	<TextInput 
		        placeholder="Имя"
		        style={[gStyle.input, gStyle.mt15, gStyle.mb10]}
		        placeholderTextColor={'#C4C4C4'}
		        value={input}
		        onChangeText={(value) => setInput(value)}
		    />
		    <TouchableOpacity
                style={[gStyle.button, gStyle.mt20]}
                activeOpacity={0.7}
                onPress={() => saveName()}
            >
                <Text style={gStyle.buttonText}>Сохранить</Text>
            </TouchableOpacity>
					          
        </View>


    )

}

