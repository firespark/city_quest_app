import React from 'react'
import { View, Image } from 'react-native'
import FullWidthImage from '../../common/FullWidthImage'
import { gStyle } from '../../../styles/style'




export const ModalImage = ({ image }) => {


    return (
    	<View style={gStyle.mt10}>
    		<FullWidthImage source={{ uri: image }} />
	    </View>


    )
}

