import React from 'react'
import { View, Text } from 'react-native'

import { gStyle } from '../../styles/style'

export const ContentTitle = ({ title }) => {

    return (
        <View style={gStyle.mb10}>
        	<Text selectable style={gStyle.titleBold}>{title}</Text>
        </View>
    )
}

