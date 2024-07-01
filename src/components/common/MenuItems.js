import React, { useContext } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'

import { gStyle, gStyleHeader } from '../../styles/style'

import { ABOUT_SCREEN, CONTACTS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const MenuItems = () => {

  const { changeScreen } = useContext(MainContext)


    return (
        <View style={gStyleHeader.menuBlock}>
            <TouchableOpacity
                style={[gStyle.panelRowLeft, gStyle.mt5]}
                activeOpacity={0.7}
                onPress={() => {
                    changeScreen(ABOUT_SCREEN)
                }}
            >
                <Image source={require('../../../assets/img/info.png')} style={gStyle.smallIcon} />
                <Text style={[gStyle.title, gStyle.ml5]}>О проекте</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[gStyle.panelRowLeft, gStyle.mt5]}
                activeOpacity={0.7}
                onPress={() => {
                    changeScreen(CONTACTS_SCREEN)
                }}
            >
                <Image source={require('../../../assets/img/envelope.png')} style={gStyle.smallIcon} />
                <Text style={[gStyle.title, gStyle.ml5]}>Контакты</Text>
            </TouchableOpacity>
        </View>
    )
}

