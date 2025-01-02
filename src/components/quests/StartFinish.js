import React from 'react'
import { View, Text } from 'react-native'

import { gStyle, gStyleGame } from '../../styles/style'


export const StartFinish = ({ start, finish, sights_count }) => {

    
    return (
        <View style={gStyle.mb10}>
            <View style={gStyle.panelRowLeftTop}>
                <Text style={gStyle.textThin}>Начало: </Text>
                <Text style={[gStyle.text, gStyleGame.address]} selectable>{start}</Text>
            </View>
            <View style={gStyle.panelRowLeftTop}>
                <Text style={gStyle.textThin}>Финиш: </Text>
                <Text style={[gStyle.text, gStyleGame.address]} selectable>{finish}</Text>
            </View>
            <View style={gStyle.panelRowLeftTop}>
                <Text style={gStyle.textThin}>Количество достопримечательностей: </Text>
                <Text style={gStyle.text} selectable>{sights_count}</Text>
            </View>
        </View>
    )


}