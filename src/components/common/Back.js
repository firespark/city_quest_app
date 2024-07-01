import React, { useContext } from 'react'
import { TouchableOpacity, Image } from 'react-native'

import { gStyle, gStyleHeader } from '../../styles/style'

import { MainContext } from '../../context/mainContext'


export const Back = () => {

	const { previousScreen } = useContext(MainContext)

    return (
        <TouchableOpacity
            style={gStyleHeader.headerButtonWidth}
           	activeOpacity={0.7}
           	onPress={() => {
  		        previousScreen()
  		    }}
        >
        	<Image source={require('../../../assets/img/back.png')} style={gStyleHeader.back} />
        </TouchableOpacity>
    )
}

