import React from 'react'
import { View, Text } from 'react-native'

import { gStyle } from '../../styles/style'

export const ContentSimple = ({ ps }) => {

    

    return (
        <View>
            <Text selectable style={gStyle.p}>{ps}</Text>
        </View>
    )
}

