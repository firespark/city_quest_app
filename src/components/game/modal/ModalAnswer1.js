import React from 'react'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'

import { gStyle, gStyleGame } from '../../../styles/style'




export const ModalAnswer1 = ({ title, image, address, location, description, setModal }) => {

	const ps = []

	if(description){

	    for (let i = 0; i < description.length; i++) {
	        
	        ps.push(

	       		<Text style={gStyle.p} key={i}>
	            	{description[i]}
		        </Text>
	        )
	    }
	}


    return (
    	<View style={gStyle.mt10}>
			<Text style={gStyleGame.answerCorrect}>Верно!</Text>
			{
				(title)
				? 
				<Text selectable style={[gStyle.titleBold, gStyle.mt20]}>{title}</Text>
				:
				null
			}
			
			 {
				(image)
				? 
				<Image 
					source={{ uri: image }} 
					style={[gStyle.mt20, gStyle.image300]}
	        	/>
				:
				null
			}
	        
	        <View style={gStyle.container}>
				<View>
					{
						(address)
						? 
						<View style={gStyle.panelRowLeftTop}>
	    					<Text style={gStyle.textThin}>Адрес: </Text>
	    					<Text selectable style={[gStyle.text, gStyleGame.address]}>{address}</Text>
	    				</View>
						:
						null
					}
					{
						(location)
						? 
						<View style={gStyle.panelRowLeft}>
	    					<Text style={gStyle.textThin}>Координаты: </Text>
	    					<TouchableOpacity
		                    	activeOpacity={0.7}
		                    	onPress={() => Linking.openURL(`geo:0,0?q=${location}`)}
		               		>
	    						<Text selectable style={[gStyle.text, gStyle.link]}>{location}</Text>
	    					</TouchableOpacity>
	    				</View>
						:
						null
					}
	    			
		        </View>
		        <View style={gStyle.mt10}>
		            {ps}
		        </View>
	        </View>
	        <View style={[gStyle.center, gStyle.mt10]}>
			   	<TouchableOpacity
			       	style={gStyle.button}
			       	activeOpacity={0.7}
			       	onPress={() => {
  		    			setModal(null)
  		    		}}
			   	>
			       	<Text style={gStyle.buttonText}>Продолжить</Text>
			   	</TouchableOpacity>
			</View>
	    </View>


    )
}

