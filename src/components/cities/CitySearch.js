import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle, gStyleCities } from '../../styles/style'

import { QUESTS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const CitySearch = ({ city }) => {

    const { changeScreen, setCityData } = useContext(MainContext)

    return (
        <View>
        	<TouchableOpacity
                style={gStyle.mb8}
                activeOpacity={0.7}
                onPress={() => {
                    changeScreen(QUESTS_SCREEN)
                    setCityData({id: city.id, title: city.title})
                }}
            >
                <Text style={gStyle.text2}>{city.title}</Text>
            </TouchableOpacity>
        </View>
    )


}


                