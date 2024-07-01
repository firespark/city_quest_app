import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { gStyle, gStyleCities } from '../../styles/style'

import { QUESTS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const CityChild = ({ city }) => {

	const { changeScreen, setCityData } = useContext(MainContext)

    return (
        <View>
        	<TouchableOpacity
                style={[gStyle.panelRowLeft, gStyleCities.cityLineBlock]}
    		    activeOpacity={0.7}
    		    onPress={() => {
    		        changeScreen(QUESTS_SCREEN)
                    setCityData({id: city.id, title: city.title})
    		    }}
    		>
                <Image 
                    source={{ uri: city.image }} 
                    style={gStyleCities.cityImageSmall}
                />
                <Text style={gStyleCities.cityTitleChild}>{city.title}</Text>
            </TouchableOpacity>

        </View>
    )


}


                