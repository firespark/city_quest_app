import React from 'react'
import { View, Image } from 'react-native'

import { gStyle } from '../../../styles/style'




export const ModalImage = ({ image }) => {


    return (
    	<View style={gStyle.mt10}>
    		<Image 
	            source={{ uri: image }} 
	            style={[gStyle.mt20, gStyle.image300]}
	        />
	    </View>


    )
}

