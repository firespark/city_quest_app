import React, { useContext } from 'react'
import { TouchableOpacity, Image } from 'react-native'

import { gStyleProfile } from '../../styles/style'

import { PROFILESETTINGS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const Settings = () => {

	const { changeScreen } = useContext(MainContext)

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
	        	changeScreen(PROFILESETTINGS_SCREEN)
	      	}}
        >
        	<Image source={require('../../../assets/img/settings.png')} style={gStyleProfile.settingsIcon} />
        </TouchableOpacity>
    )
}

