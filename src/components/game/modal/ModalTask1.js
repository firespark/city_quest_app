import React from 'react'
import { View, Text } from 'react-native'

import { Template1 } from '../Template1'
import { Template2 } from '../Template2'
import { Hint } from '../Hint'

import { gStyle } from '../../../styles/style'



export const ModalTask1 = ({ game, setModal, setGame }) => {


	const task = game.task1
	
    return (
    	<View>
	        <Text selectable style={[gStyle.titleBold, gStyle.mt20]}>{game.sight_title}</Text>
			
	        {
	        	(task.template == 2)
   				? 
   				<Template2
   					game={game}
   					setModal={setModal}
					setGame={setGame}
					taskNumber={1}
   				/>
   				:
   				<Template1
   					tasks={task.tasks}
   				/>
	        }

	        {
	        	(game.sight_hint1)
   				? 
   				<Hint
   					text={game.sight_hint1.text}
   					image={game.sight_hint1.image}
   				/>
  				:
   				null
	        }
			<Text selectable style={[gStyle.titleBold, gStyle.mt20]}>{game.answer1}</Text>
		    
	    </View>


    )
}

