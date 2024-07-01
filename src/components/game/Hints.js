import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { gStyle, gStyleGame } from '../../styles/style'


export const Hints = ({ hints, showHint, setModal }) => {

    
    return (
        <View>
        {
            (showHint)
            ? 
            <TouchableOpacity
                style={[gStyle.panelRowLeft, gStyle.ml10]}
                activeOpacity={0.7}
                onPress={() => {
                    setModal('hint')
                }}
            >
                <Image 
                    source={require('../../../assets/img/hint.png')}
                    style={gStyleGame.hintImage}
                />
                <Text style={gStyleGame.skipText}>x {hints}</Text>
            </TouchableOpacity>
            : 
            <View style={[gStyle.panelRowLeft, gStyle.ml10]}>
                <Image 
                    source={require('../../../assets/img/hint-disabled.png')}
                    style={gStyleGame.hintImage}
                />
                <Text style={gStyleGame.skipText}>x {hints}</Text>
            </View>
        }
        </View>
    )
}

