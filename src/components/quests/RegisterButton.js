import { useContext } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { AUTH_SCREEN } from '../../context/types'
import { gStyle } from '../../styles/style'
import { MainContext } from '../../context/mainContext'

export const RegisterButton = () => {

    const { changeScreen } = useContext(MainContext) 

    return (
        <View style={gStyle.center}>
            <Text style={[gStyle.textCenter, gStyle.mb20, gStyle.textRed]}>
                Чтобы приобрести этот квест, необходимо авторизоваться.
                Иначе мы не сможем сохранить вашу покупку.
            </Text>
            <TouchableOpacity
                style={[gStyle.buttonBuy]}
                onPress={() => changeScreen(AUTH_SCREEN)}
            >
                <Text style={gStyle.buttonText}>Авторизоваться</Text>
            </TouchableOpacity>
        </View>
    )
}