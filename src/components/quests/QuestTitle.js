import React from 'react'
import { View, Text } from 'react-native'

import { gStyle, gStyleQuests } from '../../styles/style'


export const QuestTitle = ({ title, city }) => {

    
    return (
        <View style={[gStyle.container]}>
            <Text selectable style={gStyleQuests.questsTitleBold}>{city}</Text>
            <Text selectable style={[gStyleQuests.questsTitle, gStyle.mt10]}>{title}</Text>
        </View>
    )


}