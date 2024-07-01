import React from 'react'
import { View } from 'react-native'

import { GameTitle } from '../GameTitle'
import { Finish } from '../Finish'
import { Quests } from '../../quests/Quests'

//import { gStyle, gStyleHeader } from '../../../styles/style'



export const FinishTemplate = ({ title, content }) => {

	
	
    return (
    	
	    <View>
            <GameTitle
                title={title}
                description="Финиш!"
            />
            <Finish
                text={content}
            />
            <Quests />

        </View>

    )
}

