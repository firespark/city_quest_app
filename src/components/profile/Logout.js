import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MainContext } from '../../context/mainContext'
import { gStyle, gStyleProfile } from '../../styles/style'
import { MAIN_SCREEN } from '../../context/types'


export const Logout = () => {

	const { resetToken, changeScreen } = useContext(MainContext)

    return (
    	<TouchableOpacity
			style={gStyle.mt20}
			activeOpacity={0.7}
			onPress={() => {
				changeScreen(MAIN_SCREEN);
				resetToken();
			}}
		>
			
			<Text style={gStyleProfile.settingsLogout}>Выйти</Text>
		</TouchableOpacity>


    )
}

