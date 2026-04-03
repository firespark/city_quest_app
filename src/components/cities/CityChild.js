import { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { citiesStyle } from '../../styles/citiesStyle'

import { QUESTS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const CityChild = ({ city }) => {

    const { changeScreen, setCityData } = useContext(MainContext)

    return (
        <View>
            <TouchableOpacity
                style={[mainStyle.panelRowLeft, citiesStyle.cityLineBlock]}
                activeOpacity={0.7}
                onPress={() => {
                    changeScreen(QUESTS_SCREEN)
                    setCityData({ id: city.id, title: city.title })
                }}
            >
                <Image
                    source={{ uri: city.image }}
                    style={citiesStyle.cityImageSmall}
                />
                <Text style={citiesStyle.cityTitleChild}>{city.title}</Text>
            </TouchableOpacity>

        </View>
    )


}


