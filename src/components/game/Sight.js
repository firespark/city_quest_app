import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { gStyle, gStyleGame } from '../../styles/style'



export const Sight = ({ setModal, title, image }) => {


    return (
    	<View style={[gStyle.wrapper, gStyle.mt15]}>
    		<TouchableOpacity
		       	style={gStyle.panelRowLeft}
		       	activeOpacity={0.7}
		       	onPress={() => {
  		        	setModal('answer1')
  		      	}}
		    >
	    		<Image 
					source={{ uri: image }}
					style={gStyleGame.answerImage}
				/>
				<View style={gStyle.ml10}>
	    			<Text style={gStyle.answerText}>{title}</Text>
	    		</View>	        
		    </TouchableOpacity>
		    

	    </View>


    )
}

