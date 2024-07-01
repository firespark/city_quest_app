import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { gStyle, gStyleCities } from '../../styles/style'

import { QUESTS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const PopularCity = ({ city }) => {

	const { changeScreen, setCityData } = useContext(MainContext)

    return (
    	<TouchableOpacity
            style={gStyleCities.cityBlock}
		    activeOpacity={0.7}
		    onPress={() => {
		        changeScreen(QUESTS_SCREEN)
                setCityData({id: city.id, title: city.title})
		    }}
		>
            <Image source={{ uri: city.image }} style={gStyleCities.cityImage} />
            <Text style={[gStyle.title, gStyleCities.cityTitle]}>{city.title}</Text>
        </TouchableOpacity>
    )


}


                