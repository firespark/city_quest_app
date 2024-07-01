import React, { useContext } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'

import { gStyle, gStyleQuests } from '../../styles/style'

import { QUEST_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const Quest = ({ quest }) => {

	const { changeScreen, setQuestId } = useContext(MainContext)


    return (
    	<TouchableOpacity
    		style={gStyleQuests.questBlock}
		    activeOpacity={0.7}
		    onPress={() => {
		        changeScreen(QUEST_SCREEN)
		        setQuestId(quest.id)
		    }}
		>
	    	<ImageBackground 
	    		source={{ uri: quest.image }} 
	    		resizeMode="cover"
	    		style={gStyle.image300}
	    	>
		        <View style={gStyleQuests.questCaption}>
		            <Text selectable style={gStyle.title}>{quest.title}</Text>
		        </View>
		    </ImageBackground>
	    </TouchableOpacity>
    )


}


                