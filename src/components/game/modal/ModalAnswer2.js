import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle, gStyleGame } from '../../../styles/style'



export const ModalAnswer2 = ({ answer2, setModal, nextGame }) => {


    return (
    	<View style={gStyle.mt10}>
    		<Text style={gStyleGame.answerCorrect}>Верно!</Text>
    		<Text selectable style={[gStyle.titleBold, gStyle.mt20, gStyle.textUpperCase]}>{answer2}</Text>
    		
	        <View style={[gStyle.center, gStyle.mt30]}>
			   	<TouchableOpacity
			       	style={gStyle.button}
			       	activeOpacity={0.7}
			       	onPress={() => {
			            nextGame()
			            setModal(null)
			        }}
			   	>
			       	<Text style={gStyle.buttonText}>Продолжить</Text>
			   	</TouchableOpacity>
			</View>

			<View style={[gStyle.center, gStyle.mt20]}>
			   	<TouchableOpacity
			       	activeOpacity={0.7}
			       	onPress={() => {
  		    			setModal(null)
  		    		}}
			   	>
			       	<Text style={gStyle.link}>Вернуться на предыдущий экран</Text>
			   	</TouchableOpacity>
			</View>
	    </View>


    )
}

