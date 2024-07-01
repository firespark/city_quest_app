import React from 'react'
import { View, Text, Image } from 'react-native'

import { gStyle, gStyleHeader } from '../../styles/style'


export const Logo = () => {

    return (
        <View style={gStyle.panelRow}>
           	<Image source={require('../../../assets/img/logo-fun-black.png')} style={gStyleHeader.logo} />
            <Text style={[gStyleHeader.headerTitle, gStyle.ml8]}>Гагара-Квест</Text>
        </View>
    )


}

