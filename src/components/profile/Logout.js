import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle, gStyleProfile } from '../../styles/style'



export const Logout = () => {
	
    return (
    	<TouchableOpacity
			style={gStyle.mt20}
		    activeOpacity={0.7}
		>
			<Text style={gStyleProfile.settingsLogout}>Выйти</Text>
		</TouchableOpacity>


    )
}

