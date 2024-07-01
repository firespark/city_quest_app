import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle } from '../../styles/style'

import { PASSWORDRESET_SCREEN } from '../../context/types'


export const PasswordForgot = ({ changeScreen }) => {

    return (
    	<View style={[gStyle.center, gStyle.mt20]}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => changeScreen(PASSWORDRESET_SCREEN)}
            >
                <Text style={gStyle.link}>Не помню пароль</Text>
            </TouchableOpacity>
        </View>

    )


}

