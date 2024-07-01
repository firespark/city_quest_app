import React, { useContext } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'

import { gStyle, gStyleSearch } from '../../styles/style'

import { SEARCH_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

export const Search = () => {

  const { changeScreen } = useContext(MainContext)

    return (
        <TouchableOpacity
            style={[gStyle.panelRowCenter, gStyle.mt8]}
            activeOpacity={0.7}
            onPress={() => {
                changeScreen(SEARCH_SCREEN)
            }}
        >
        	<View style={gStyleSearch.searchBlock}>
                <Text style={gStyleSearch.searchText}>Город...</Text>
            </View>
            <Image source={require('../../../assets/img/loupe.png')} style={gStyleSearch.searchImage} />
        </TouchableOpacity>
    )
}

