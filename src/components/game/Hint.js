import React from 'react'
import { View, Text, Image } from 'react-native'

import { gStyle, gStyleGame } from '../../styles/style'



export const Hint = ({ text, image }) => {


	
	
    return (
    	<View style={gStyle.mt20}>
	    	<Text style={[gStyle.textThin2, gStyle.textCenter]}>Подсказка:</Text>
	    	{
	    		(image)
	    		?
	    		<Image 
				    source={{ uri: image }}
				    style={[gStyle.image300, gStyleGame.taskImageFull, gStyle.mt20]}
				/>
				:
				null
	    	}
		    	
	    	<Text selectable style={[gStyle.text2, gStyle.mt20]}>{text}</Text>
	    </View>


    )
}

