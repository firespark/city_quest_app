import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { gStyle, gStyleGame } from '../../styles/style'



export const Sight = ({ setModal, title, image }) => {


    return (
    	<View style={[gStyle.wrapper, gStyle.mt15, gStyle.panelBlockCenter]}>
    		<TouchableOpacity
		       	style={gStyle.panelBlockCenter}
		       	activeOpacity={0.7}
		       	onPress={() => {
  		        	setModal('answer1')
  		      	}}
		    >
	    		<Image 
					source={{ uri: image }}
					style={gStyleGame.answerImage}
				/>
				{
					(title)
					?
					<View style={gStyle.mt15}>
					<Text style={gStyle.titleBold}>{title}</Text>
					</View>
					:
					null
				}       
		    </TouchableOpacity>
		    

	    </View>


    )
}

