import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle, gStyleProfile } from '../../styles/style'



export const ProfileEmail = ({ email }) => {
	
    return (
    	<View>
    		<View style={gStyle.panelRowLeft}>
    			<Text style={gStyleProfile.settingsTitleThin}>Email: </Text>
    			<Text selectable style={gStyleProfile.settingsTitle}>{email}</Text>
    		</View>
    	</View>


    )
}

