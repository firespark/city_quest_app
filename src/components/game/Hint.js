import React from 'react'
import { View, Text, Image,StyleSheet,  Dimensions } from "react-native";
import FullWidthImage from '../common/FullWidthImage';
const windowWidth = Dimensions.get("window").width;
import { gStyle, gStyleGame } from '../../styles/style'

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: "center",
	  alignItems: "center",
	},
	image: {
		width: windowWidth * 0.8, // Adjust the percentage as needed
    	aspectRatio: 1
	},
  });
  

export const Hint = ({ text, image }) => {


	
	
    return (
    	<View style={gStyle.mt20}>
	    	<Text style={[gStyle.textThin2, gStyle.textCenter]}>Подсказка:</Text>
	    	{
	    		(image)
	    		?
					<FullWidthImage source={{ uri: image }} />
				:
				null
	    	}
		    	
	    	<Text selectable style={[gStyle.text2, gStyle.mt20]}>{text}</Text>
	    </View>


    )
}
