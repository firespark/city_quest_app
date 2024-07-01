import React from 'react'
import { View, Text } from 'react-native'

import { gStyleHeader } from '../../styles/style'

export const HeaderTitle = ({ title }) => {

    return (
        <View>
        	<Text style={gStyleHeader.headerTitle}>{title}</Text>
        </View>
    )
}

