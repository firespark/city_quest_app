import { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { profileStyle } from '../../styles/profileStyle'

import { AUTH_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

export const ProfileRegister = () => {
    const { changeScreen } = useContext(MainContext)

    return (
        <View style={profileStyle.profileContainer}>
            <View style={mainStyle.mb15}>
                <Text style={mainStyle.description}>
                    Хочешь сохранять результаты своих игр навсегда?
                </Text>
            </View>

            <TouchableOpacity
                style={mainStyle.primaryButton}
                activeOpacity={0.8}
                onPress={() => changeScreen(AUTH_SCREEN)}
            >
                <Text style={mainStyle.primaryButtonText}>Войти / Зарегистрироваться</Text>
            </TouchableOpacity>
        </View>
    )
}
