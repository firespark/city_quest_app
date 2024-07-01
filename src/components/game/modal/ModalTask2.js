import React from 'react'
import { View, Text } from 'react-native'

import { Template1 } from '../Template1'
import { Template2 } from '../Template2'
import { Hint } from '../Hint'

import { gStyle } from '../../../styles/style'



export const ModalTask2 = ({ game, setModal, setGame }) => {


	const task = game.task2
	
    return (
    	<View>
	        <Text selectable style={[gStyle.titleBold, gStyle.mt20]}>{game.answer2}</Text>

	        {
	        	(task.template == 2)
				? 
	    		<Template2
	    			game={game}
	    			setModal={setModal}
	    			setGame={setGame}
	    		/>
	    		:
	    		<Template1
	    			tasks={task.tasks}
	    		/>
	        }

	        {
	        	(game.sight_hint2)
	    		? 
	    		<Hint
	    			text={game.sight_hint2.text}
	    			image={game.sight_hint2.image}
	    		/>
	    		:
	    		null
	        }

		    
	    </View>


    )
}
