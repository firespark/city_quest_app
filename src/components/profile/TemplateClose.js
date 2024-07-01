import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import { gStyleHeader } from '../../styles/style'


export const TemplateClose = ({ setTemplate }) => {


    return (
        <TouchableOpacity
           	activeOpacity={0.7}
           	onPress={() => {
  		        setTemplate(null)
  		    }}
        >
           	<Image source={require('../../../assets/img/close.png')} style={gStyleHeader.close} />
        </TouchableOpacity>
    )
}

