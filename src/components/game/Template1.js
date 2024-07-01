import React from 'react'
import { View, Text, Image } from 'react-native'

import { gStyle, gStyleGame } from '../../styles/style'



export const Template1 = ({ tasks }) => {

	const task = tasks[0]

	
    return (
    	
	    <View style={gStyle.mt20}>
	    	{
	    		(task.image) ?
	    		<Image 
				    source={{ uri: task.image }}
				    style={[gStyle.image300, gStyleGame.taskImageFull]}
				/>
				:
				null
	    	}
			
			<Text selectable style={[gStyle.p, gStyle.textCenter, gStyle.mt10]}>{task.text}</Text>				        		
	    </View>


    )
}

