import { useContext } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { citiesStyle } from '../../styles/citiesStyle'

import { QUESTS_SCREEN } from '../../context/types'

import { MainContext } from '../../context/mainContext'

export const PopularCity = ({ city }) => {

    const { changeScreen, setCityData } = useContext(MainContext)

    return (
        <TouchableOpacity
            style={citiesStyle.cityCardWrapper}
            activeOpacity={0.8}
            onPress={() => {
                changeScreen(QUESTS_SCREEN)
                setCityData({ id: city.id, title: city.title })
            }}
        >
            <Image
                source={{ uri: city.image }}
                style={citiesStyle.cityCardImage}
            />

            <View style={citiesStyle.cityInfoContainer}>
                <Text style={citiesStyle.cityTitle} numberOfLines={1}>
                    {city.title}
                </Text>

                <View style={mainStyle.arrowContainer}>
                    <Text style={mainStyle.pureArrow}>→</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
