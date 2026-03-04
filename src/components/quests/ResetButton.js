import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle } from '../../styles/style'

import { GAME_SCREEN } from '../../context/types'


export const ResetButton = ({ changeScreen }) => {


    return (
        <View style={[gStyle.center, gStyle.mt20]}>
            <TouchableOpacity
                style={gStyle.buttonReset}
                activeOpacity={0.7}
                onPress={() => {
                    changeScreen(GAME_SCREEN);
                    setModal('resetProgress')
                }}
            >
                <Text style={gStyle.buttonTextSmall}>Сбросить прогресс</Text>
            </TouchableOpacity>
        </View>
    )


}