import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { ProgressBar } from '../game/ProgressBar';

import { gStyle, gStyleQuests } from '../../styles/style';

import { GAME_SCREEN } from '../../context/types';
import { MainContext } from '../../context/mainContext';

export const OpenQuest = ({ quest }) => {
	const { changeScreen, setQuestId } = useContext(MainContext);

	return (
		<View style={gStyle.mb20}>
			<TouchableOpacity
				style={gStyle.panelRowLeft}
				activeOpacity={0.7}
				onPress={() => {
					changeScreen(GAME_SCREEN);
					setQuestId(quest.id);
				}}
			>
				<Image source={{ uri: quest.quest_image }} style={gStyleQuests.questOpenImage} />
				<View style={[gStyle.ml15, gStyleQuests.questOpenBlock]}>
					<Text selectable style={gStyleQuests.questOpenTitle}
					>
						{quest.quest_title}
					</Text>
					<Text selectable style={gStyleQuests.questOpenCity}>
						{quest.city}
					</Text>
					<Text style={gStyle.text}>
						Уровень {quest.step} из {quest.levels}
					</Text>
					<View style={gStyle.panelRowLeft}>
						<Text style={gStyle.textThin}>Статус: </Text>
						<Text style={gStyle.text}>{quest.mode_text}</Text>
					</View>
				</View>
			</TouchableOpacity>
			{/*<TouchableOpacity
		    	style={gStyle.mt5}
		    	activeOpacity={0.7}
		    >
		       	<ProgressBar
		       		levels="25"
		            step="18"
		       	/>
		    </TouchableOpacity>*/}
		</View>
	);
};
