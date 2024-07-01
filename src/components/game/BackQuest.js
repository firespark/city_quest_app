import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import { gStyle, gStyleHeader } from '../../styles/style'


export const BackQuest = ({ setModal }) => {

    return (
        <TouchableOpacity
            style={gStyleHeader.headerButtonWidth}
           	activeOpacity={0.7}
           	onPress={() => {
  		        setModal('back')
  		    }}
        >
        	<Image source={require('../../../assets/img/back.png')} style={gStyleHeader.back} />
        </TouchableOpacity>
    )
}

