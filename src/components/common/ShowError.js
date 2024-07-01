import React from 'react'
import { View, Text } from 'react-native'

import { gStyle } from '../../styles/style'

export const ShowError = ({ text }) => {

    return (
        <View>
        	<Text selectable>{text}</Text>
        </View>
    )
}

