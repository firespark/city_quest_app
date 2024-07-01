import React from 'react'
import { View, Image, TextInput, TouchableOpacity } from 'react-native'

import { gStyle, gStyleSearch } from '../../styles/style'


export const SearchInput = ({ setInput, searchData }) => {


    return (
        <View
            style={[gStyle.panelRowCenter, gStyle.mt8]}
            
        >
        	<TextInput 
                placeholder="Город..."
                style={[gStyleSearch.searchBlock, gStyleSearch.searchText]}
                placeholderTextColor={'#C4C4C4'}
                onChangeText={(value) => {
                    //setInput(value)
                    searchData(value)
                }}
            />
            
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    searchData(null, true)
                }}
            >
                <Image source={require('../../../assets/img/loupe.png')} style={gStyleSearch.searchImage} />
            </TouchableOpacity>
        </View>
    )
}

