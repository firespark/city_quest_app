import React from 'react'
import { View, Text } from 'react-native'

import { gStyle, gStyleHowPlay } from '../../styles/style'


export const HowPlayBlockBlue = ({ number, title, description }) => {

    

    return (
    	<View style={gStyleHowPlay.blockBlue}>
			<View style={gStyleHowPlay.circleWhite}>
				<Text style={gStyleHowPlay.textNumberWhite}>{number}</Text>
			</View>
			<View>
				<Text selectable style={gStyle.titleBoldWhite}>{title}</Text>
			</View>
			<View style={gStyleHowPlay.wrap30}>
				<Text selectable style={gStyle.titleWhite}>{description}</Text>
			</View>
		</View>

    )


}

