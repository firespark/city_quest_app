import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle, gStyleProfile } from '../../styles/style'



export const ProfileName = ({ name, setTemplate, setSuccess }) => {
	
    return (
    	<View style={[gStyle.panelRow, gStyle.mt20]}>
			<View style={gStyle.panelRow}>
				<Text style={gStyleProfile.settingsTitleThin}>Имя: </Text>
				<Text selectable style={gStyleProfile.settingsTitle}>{name}</Text>
			</View>
    					
			<TouchableOpacity
		        activeOpacity={0.7}
                onPress={() => {
                    setSuccess(null)
                    setTemplate('name')
                }}
		    >
				<Text style={gStyleProfile.settingsChange}>Изменить</Text>
			</TouchableOpacity>
		</View>


    )
}

