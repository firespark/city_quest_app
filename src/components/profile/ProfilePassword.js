import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle, gStyleProfile } from '../../styles/style'



export const ProfilePassword = ({ setTemplate, setSuccess }) => {

    /*let passwordStr = '';

    for (let i = 1; i <= passwordLength; i++) {

        passwordStr += '*'
    }*/
	
    return (
    	<View style={[gStyle.panelRow, gStyle.mt20]}>
			<View style={gStyle.panelRow}>
				<Text style={gStyleProfile.settingsTitleThin}>Пароль: </Text>
				<Text style={gStyleProfile.settingsTitle}>********</Text>
			</View>
			<TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    setSuccess(null)
                    setTemplate('password')
                }}
            >
                <Text style={gStyleProfile.settingsChange}>Изменить</Text>
            </TouchableOpacity>
		</View>


    )
}

