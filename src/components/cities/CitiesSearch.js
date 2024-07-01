import React from 'react'
import { View } from 'react-native'
import { CitySearch } from './CitySearch'

import { gStyle } from '../../styles/style'


export const CitiesSearch = ({ data }) => {

    const list = []

    if(data){
        data.map((item, index) => (  
            list.push(
                <View key={index}>
                    <CitySearch city={item} />
                </View>
            ) 
        ))
    }
    
    return (
        <View style={[gStyle.mt20, gStyle.container]}>
            {list}
        </View>
    )


}