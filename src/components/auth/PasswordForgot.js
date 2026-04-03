import { View, Text, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

import { PASSWORDRESET_SCREEN } from '../../context/types'


export const PasswordForgot = ({ changeScreen }) => {

    return (
        <View style={[mainStyle.center, mainStyle.mt30]}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => changeScreen(PASSWORDRESET_SCREEN)}
            >
                <Text style={mainStyle.link}>Не помню пароль</Text>
            </TouchableOpacity>
        </View>

    )


}

