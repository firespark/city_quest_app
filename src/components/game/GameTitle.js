import React from 'react'
import { View, Text } from 'react-native'

import { gStyle, gStyleGame } from '../../styles/style'


export const GameTitle = ({title, description}) => {

    return (
    	<View>
	        <Text selectable style={[gStyleGame.gameTitle, gStyle.mt10]}>{title}</Text>
            <Text selectable style={[gStyle.titleBold, gStyle.mt10]}>{description}</Text>
	    </View>
    )
}

