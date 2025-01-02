import React, { useContext } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native'

import { gStyle, gStyleQuests,gStyleGame } from '../../styles/style'

import { QUEST_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const Quest = ({ quest }) => {

	const { changeScreen, setQuestId, questScreenCleanup } = useContext(MainContext)
	const statusImages = {
		in_progress: require('../../../assets/img/in-progress.png'),
		finished: require('../../../assets/img/finished.png'),
	  };
    return (
    	<TouchableOpacity
    		style={gStyleQuests.questBlock}
		    activeOpacity={0.7}
		    onPress={() => {
		        changeScreen(QUEST_SCREEN)
				setQuestId(quest.id)
				questScreenCleanup();
		    }}
		>
			
	    	<ImageBackground 
	    		source={{ uri: quest.image }} 
	    		resizeMode="cover"
	    		style={gStyle.image300}
			>
				{
					quest.status ? (
						<Image 
						source={statusImages[quest.status]} 
						style={gStyleQuests.questProgressIcon} 
						/>
					) : null
				}

		        <View style={gStyleQuests.questCaption}>
		            <Text selectable style={gStyle.title}>{quest.title}</Text>
		            <Text selectable style={[gStyle.titleSights, gStyle.mt10]}>{quest.sights_count} достопримечательностей</Text>
		        </View>
		    </ImageBackground>
	    </TouchableOpacity>
    )


}


                