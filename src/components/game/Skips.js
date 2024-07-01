import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { gStyle, gStyleGame } from '../../styles/style'


export const Skips = ({ skips, showSkip, setModal }) => {

	
    return (

    	<View>
        {
            (showSkip)
            ? 
            <TouchableOpacity
                style={[gStyle.panelRowLeft, gStyle.ml10]}
                activeOpacity={0.7}
                onPress={() => {
                    setModal('skip')
                }}
            >
                <Image 
                    source={require('../../../assets/img/skip.png')}
                    style={gStyleGame.skipImage}
                />
                <Text style={gStyleGame.skipText}>x {skips}</Text>
            </TouchableOpacity>
            : 
            <View style={[gStyle.panelRowLeft, gStyle.ml10]}>
                <Image 
                    source={require('../../../assets/img/skip-disabled.png')}
                    style={gStyleGame.skipImage}
                />
                <Text style={gStyleGame.skipText}>x {skips}</Text>
            </View>
        }
        </View>
 
    )
}

