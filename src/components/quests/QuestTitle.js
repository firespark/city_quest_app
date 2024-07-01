import React from 'react'
import { View, Text } from 'react-native'

import { gStyle, gStyleQuests } from '../../styles/style'


export const QuestTitle = ({ title, city }) => {

    
    return (
        <View style={gStyle.mt10}>
            <Text selectable style={gStyleQuests.questsTitleBold}>{city}</Text>
            <Text selectable style={gStyleQuests.questsTitle}>{title}</Text>
        </View>
    )


}