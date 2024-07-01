import React from 'react'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'

import { Social } from '../auth/Social'

import { gStyle } from '../../styles/style'


export const ContactsContent = () => {

    

    return (
    	<View style={gStyle.center}>
        	<View style={gStyle.mt10}>
                <Social
                    text="Подписывайся на наши соцсети"
                />
            </View>
            

            
            <View style={gStyle.mt10}>
                <Text style={gStyle.title}>Или напиши нам письмо:</Text>
                <TouchableOpacity
                    style={[gStyle.panelRowCenter, gStyle.mt5]}
                    activeOpacity={0.7}
                    onPress={() => Linking.openURL('mailto:info@gagara-web.ru')}
                >
                    <Image source={require('../../../assets/img/envelope.png')} style={gStyle.smallIcon} />
                    <Text selectable style={[gStyle.title, gStyle.ml5, gStyle.link]}>info@gagara-web.ru</Text>
                </TouchableOpacity>
            </View>
        </View>

    )


}

