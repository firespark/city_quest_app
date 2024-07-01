import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle } from '../../styles/style'

import { GAME_SCREEN } from '../../context/types'


export const StartButton = ({ changeScreen }) => {

    
    return (
        <View style={gStyle.center}>
            <TouchableOpacity
                style={gStyle.button}
                activeOpacity={0.7}
                onPress={() => changeScreen(GAME_SCREEN)}
            >
                <Text style={gStyle.buttonText}>Старт</Text>
            </TouchableOpacity>
        </View>
    )


}