import React from 'react'
import { View } from 'react-native'
import { City } from './City'

import { gStyle } from '../../styles/style'

export const Cities = ({ cities }) => {

    const list = []

    if(cities){
        cities.map((item, index) => (  
            list.push(
                <View key={index}>
                    <City city={item} />
                </View>
            ) 
        ))
    }
    

    return (
        <View style={gStyle.container}>
            {list}
        </View>
    )


}