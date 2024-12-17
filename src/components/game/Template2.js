import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { gStyle, gStyleGame } from '../../styles/style'



export const Template2 = ({ game, setGame, setModal, taskNumber }) => {

	console.log(game)
	const setFullImage = (image) => {
		setGame({
            ...game, 
            'show_full_image': image
        })
		setModal('image')
	}

	const blocks = []

	const tasks = (taskNumber == 1) ? game.task1.tasks : game.task2.tasks

	if(tasks){

	    {tasks.map((task, index) => (
	    	blocks.push(
	        	<View 
	        		key={index}
	        		style={gStyleGame.taskBlock}
	        	>
		        	{
			    		(task.image) ?
			    		<TouchableOpacity
						    activeOpacity={0.7}
						    onPress={() => setFullImage(task.image)}
						>
							<Image 
							    source={{ uri: task.image }}
							    style={gStyleGame.taskImage}
							/>
							<Image source={require('../../../assets/img/zoom.png')} style={gStyleGame.zoomImage} />
						</TouchableOpacity>
						:
						null
			    	}

		        	
					<Text selectable style={gStyleGame.taskText}>{task.text.join('\n')}</Text>				        		
				</View>
		        
	        )    

	    ))}
	}

    return (
    	
	    <View style={[gStyle.panelRowCenter, gStyle.mt20]}>
	      	{blocks}
	    </View>

    )
}

