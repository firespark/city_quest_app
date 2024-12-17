import React from 'react'
import { View, Text } from 'react-native'

import { gStyle } from '../../styles/style'


export const StartFinish = ({ start, finish, sights_count }) => {

    
    return (
        <View style={gStyle.mb10}>
            <View style={gStyle.panelRowLeft}>
                <Text style={gStyle.textThin}>Начало: </Text>
                <Text style={gStyle.text} selectable>{start}</Text>
            </View>
            <View style={gStyle.panelRowLeft}>
                <Text style={gStyle.textThin}>Финиш: </Text>
                <Text style={gStyle.text} selectable>{finish}</Text>
            </View>
            <View style={gStyle.panelRowLeft}>
                <Text style={gStyle.textThin}>Количество достопримечательностей: </Text>
                <Text style={gStyle.text} selectable>{sights_count}</Text>
            </View>
        </View>
    )


}