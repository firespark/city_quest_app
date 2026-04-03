import { useContext } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'

import { headerStyle } from '../../styles/headerStyle'

import { ABOUT_SCREEN, CONTACTS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const MenuItems = () => {

    const { changeScreen } = useContext(MainContext)

    return (
        <View style={headerStyle.menuContainer}>
            <TouchableOpacity
                style={headerStyle.menuButtonPanel}
                activeOpacity={0.7}
                onPress={() => changeScreen(ABOUT_SCREEN)}
            >
                <View style={headerStyle.leftContent}>
                    <View style={headerStyle.iconWrapper}>
                        <Image source={require('../../../assets/img/info.png')} style={headerStyle.icon} />
                    </View>
                    <Text style={headerStyle.buttonText}>О проекте</Text>
                </View>
                <Text style={headerStyle.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={headerStyle.menuButtonPanel}
                activeOpacity={0.7}
                onPress={() => changeScreen(CONTACTS_SCREEN)}
            >
                <View style={headerStyle.leftContent}>
                    <View style={headerStyle.iconWrapper}>
                        <Image source={require('../../../assets/img/envelope.png')} style={headerStyle.icon} />
                    </View>
                    <Text style={headerStyle.buttonText}>Контакты</Text>
                </View>
                <Text style={headerStyle.chevron}>›</Text>
            </TouchableOpacity>
        </View>
    );

}
