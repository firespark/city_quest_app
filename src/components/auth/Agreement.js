import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { gStyle } from '../../styles/style'


export const Agreement = ({ agree, setAgree }) => {

    

    return (
    	<View style={[gStyle.panelRowLeft, gStyle.mt10]}>
		    <TouchableOpacity
			    activeOpacity={0.7}
			    onPress={() => setAgree(!agree)}
			>
			            	
			   	{
                    ( agree ) 
                    ?
	                <Image source={require('../../../assets/img/check-true.png')} style={gStyle.checkbox} />
	                :
	                <Image source={require('../../../assets/img/check-false.png')} style={gStyle.checkbox} />
	            }
			</TouchableOpacity>
			
			<Text style={[gStyle.smallText, gStyle.ml5]}>Соглашаюсь на обработку моих персональных данных</Text>
		</View>

    )


}

