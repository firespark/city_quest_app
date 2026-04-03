import { useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'

import { headerStyle } from '../../styles/headerStyle'

import { MENU_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

export const Menu = () => {
    const { changeScreen } = useContext(MainContext)

    return (
        <TouchableOpacity
            style={headerStyle.menuButton}
            activeOpacity={0.7}
            onPress={() => {
                changeScreen(MENU_SCREEN)
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <View style={headerStyle.menuIconContainer}>
                <View style={[headerStyle.menuLine, headerStyle.menuLine1]}></View>
                <View style={[headerStyle.menuLine, headerStyle.menuLine2]}></View>
                <View style={[headerStyle.menuLine, headerStyle.menuLine3]}></View>
            </View>
        </TouchableOpacity>
    )
}
