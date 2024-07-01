import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle } from '../../styles/style'

import { AUTH_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'



export const ProfileRegister = () => {

	const { changeScreen } = useContext(MainContext)
	
    return (
    	<View>
	    	<View style={gStyle.p}>
				<Text style={gStyle.textCenter}>Хочешь сохранять результаты своих игр на всех устройствах?</Text>
	    	</View>
	    	<TouchableOpacity
	    		style={gStyle.p}
	            activeOpacity={0.7}
	            onPress={() => {
		        	changeScreen(AUTH_SCREEN)
		      	}}
	        >
				<Text style={gStyle.link}>Зарегистрируйся</Text>
	    	</TouchableOpacity>
	    </View>

    )
}

