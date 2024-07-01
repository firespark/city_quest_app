import React, { useContext } from 'react'
import { TouchableOpacity, Image } from 'react-native'

import { gStyle, gStyleHeader } from '../../styles/style'

import { MainContext } from '../../context/mainContext'


export const Close = () => {

  const { previousScreen } = useContext(MainContext)

    return (
        <TouchableOpacity
           	activeOpacity={0.7}
           	onPress={() => {
  		        previousScreen()
  		    }}
        >
           	<Image source={require('../../../assets/img/close.png')} style={gStyleHeader.close} />
        </TouchableOpacity>
    )
}

