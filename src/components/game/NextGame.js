import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle } from '../../styles/style'


export const NextGame = ({ nextGame }) => {


    return (
    	<View style={[gStyle.center, gStyle.mt30]}>
            <TouchableOpacity
                style={gStyle.button}
                activeOpacity={0.7}
                onPress={() => {
                    nextGame()
                }}
            >
                <Text style={gStyle.buttonText}>Дальше</Text>
            </TouchableOpacity>
        </View>
    )
}

