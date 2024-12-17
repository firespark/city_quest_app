import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { gStyle, gStyleGame } from '../../styles/style'




export const TaskSign = ({ number, setModal, disabled }) => {


    return (
    	<View style={[gStyle.wrapper, gStyle.mt20]}>

	    	{
	    		(disabled)
	    		?
	    		<View>
				    <View style={[gStyleGame.questionBlockRow, gStyleGame.questionBlockDisabled]}>
				    	<Image source={require('../../../assets/img/question2-disabled.png')} style={gStyleGame.questionImage} />
			    		<Text style={[gStyleGame.questionText, gStyleGame.questionTextDisabled]}>Задание {number}</Text>
			    	</View>
			    </View>
			    :
			    <TouchableOpacity
			       	activeOpacity={0.7}
			       	onPress={() => {
	  		        	setModal(`task${number}`)
	  		      	}}
			    >
				    <View style={gStyleGame.questionBlockRow}>
				    	<Image source={require('../../../assets/img/question2.png')} style={gStyleGame.questionImage} />
			    		<Text style={gStyleGame.questionText}>Задание {number}</Text>
			    	</View>
			    </TouchableOpacity>
			    
	    	}
    		
		    

	    </View>


    )
}

