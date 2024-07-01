import React from 'react'
import { View, Image } from 'react-native'

import { gStyle } from '../../styles/style'


export const QuestImage = ({ image }) => {


    return (
        <View>
            <Image 
                source={{ uri: image }} 
                style={[gStyle.mt10, gStyle.image300]}
            />
        </View>
    )


}