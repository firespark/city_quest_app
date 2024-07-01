import React from 'react'
import { View, Text } from 'react-native'

import { gStyle } from '../../styles/style'

export const Error = ({ text }) => {

    return (
        <View>
        	<Text selectable style={[gStyle.red, gStyle.mb10]}>{text}</Text>
        </View>
    )
}

