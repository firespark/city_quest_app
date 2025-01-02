import React from 'react'
import { View, Text, Image } from 'react-native'
import FullWidthImage from '../common/FullWidthImage';
import { gStyle, gStyleGame } from '../../styles/style'



export const Template1 = ({ tasks }) => {

	const task = tasks[0]

    return (
    	
	    <View style={gStyle.mt20}>
	    	{
	    		(task.image) ?
	    		<FullWidthImage source={{ uri: task.image + '?time=' + new Date().getMinutes() }} />
				:
				null
	    	}
			{
				(task.text != '') ?
				<Text selectable style={[gStyle.p, gStyle.textCenter, gStyle.mt10]}>{task.text.join('\n')}</Text>				        		
					:
				null
			}

	    </View>


    )
}

