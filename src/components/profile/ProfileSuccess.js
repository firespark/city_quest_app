import React from 'react'
import { View, Text } from 'react-native'

import { gStyle } from '../../styles/style'



export const ProfileSuccess = ({ text }) => {
	
    return (
    	<View style={gStyle.p}>
			<Text selectable style={gStyle.blue}>{ text }</Text>
    	</View>


    )
}

