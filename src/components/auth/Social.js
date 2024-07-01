import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'

import { gStyle, gStyleAuth } from '../../styles/style'


export const Social = ({ text }) => {


    return (
    	<View>
            { 
                (text)
                ? 
                <View>
                    <Text selectable style={[gStyle.title, gStyle.mb8]}>{text}</Text>
                </View>
                : null 
            }
        	
        	<View style={gStyle.panelRowCenter}>
        		<TouchableOpacity
			       	activeOpacity={0.7}
                    onPress={() => Linking.openURL('https://www.facebook.com/elena.kochevatkina')}
			   	>
        			<Image source={require('../../../assets/img/fb.png')} style={gStyleAuth.authIcon} />
        		</TouchableOpacity>
        		<TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => Linking.openURL('https://vk.com/fireleit')}
                >
                    <Image source={require('../../../assets/img/vk.png')} style={gStyleAuth.authIcon} />
                </TouchableOpacity>
        		<TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => Linking.openURL('https://www.instagram.com/firelieter')}
                >
                    <Image source={require('../../../assets/img/ok.png')} style={gStyleAuth.authIcon} />
                </TouchableOpacity>
        	</View>
        </View>

    )


}

