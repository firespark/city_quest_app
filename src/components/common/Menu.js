import React, { useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'

import { gStyle, gStyleHeader } from '../../styles/style'

import { MENU_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const Menu = () => {

	const { changeScreen } = useContext(MainContext)

    return (
        <TouchableOpacity
        	style={gStyleHeader.headerButtonWidth}
	      	activeOpacity={0.7}
	      	onPress={() => {
	        	changeScreen(MENU_SCREEN)
	      	}}
	    >
	        <View style={gStyle.panelBlockRight}>
	        	<View style={gStyleHeader.menuLine1}></View>
	        	<View style={gStyleHeader.menuLine2}></View>
	        	<View style={gStyleHeader.menuLine3}></View>
	        </View>
        </TouchableOpacity>
    )
}

