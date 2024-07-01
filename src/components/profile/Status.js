import React from 'react'
import { View, Text } from 'react-native'

import { gStyle } from '../../styles/style'



export const Status = () => {
	
    return (
    	<View style={gStyle.panelRowRight}>
	        <Text style={gStyle.textThin}>Статус: </Text>
	        <Text style={gStyle.text}>Турист</Text>
	    </View>


    )
}

