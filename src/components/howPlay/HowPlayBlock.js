import React from 'react'
import { View, Text } from 'react-native'

import { gStyle, gStyleHowPlay } from '../../styles/style'


export const HowPlayBlock = ({ number, title, description }) => {

    

    return (
    	<View style={gStyleHowPlay.blockBordered}>
			<View style={gStyleHowPlay.circleBordered}>
				<Text style={gStyleHowPlay.textNumber}>{number}</Text>
			</View>
			<View>
				<Text selectable style={gStyle.titleBold}>{title}</Text>
			</View>
			<View style={gStyleHowPlay.wrap30}>
    			<Text selectable style={gStyle.title}>{description}</Text>
        	</View>
    	</View>

    )


}

