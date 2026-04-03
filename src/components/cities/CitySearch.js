import { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

import { QUESTS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const CitySearch = ({ city }) => {

    const { changeScreen, setCityData } = useContext(MainContext)

    return (
        <View>
            <TouchableOpacity
                style={mainStyle.mb8}
                activeOpacity={0.7}
                onPress={() => {
                    changeScreen(QUESTS_SCREEN)
                    setCityData({ id: city.id, title: city.title })
                }}
            >
                <Text style={mainStyle.text}>{city.title}</Text>
            </TouchableOpacity>
        </View>
    )
}
