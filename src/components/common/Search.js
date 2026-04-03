import { useContext } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { searchStyle } from '../../styles/searchStyle'

import { SEARCH_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

export const Search = () => {

    const { changeScreen } = useContext(MainContext)

    return (
        <TouchableOpacity
            style={[mainStyle.panelRowCenter, mainStyle.mt8]}
            activeOpacity={0.7}
            onPress={() => {
                changeScreen(SEARCH_SCREEN)
            }}
        >
            <View style={searchStyle.searchBlock}>
                <Text style={searchStyle.searchText}>Город...</Text>
            </View>
            <Image source={require('../../../assets/img/loupe.png')} style={searchStyle.searchImage} />
        </TouchableOpacity>
    )
}
