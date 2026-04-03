import { useContext } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { AUTH_SCREEN } from '../../context/types'
import { mainStyle } from '../../styles/mainStyle'
import { MainContext } from '../../context/mainContext'

export const RegisterButton = () => {

    const { changeScreen } = useContext(MainContext)

    return (
        <View style={mainStyle.center}>
            <Text style={[mainStyle.textCenter, mainStyle.mb20, mainStyle.textRed]}>
                Чтобы приобрести этот квест, необходимо авторизоваться.
                Иначе мы не сможем сохранить вашу покупку.
            </Text>
            <TouchableOpacity
                style={[mainStyle.buttonBuy]}
                onPress={() => changeScreen(AUTH_SCREEN)}
            >
                <Text style={mainStyle.buttonText}>Авторизоваться</Text>
            </TouchableOpacity>
        </View>
    )
}
