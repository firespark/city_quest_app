import { View, Text, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'


export const NextGame = ({ nextGame }) => {

    return (
        <View style={[mainStyle.center, mainStyle.mt30, mainStyle.mb30]}>
            <TouchableOpacity
                style={mainStyle.button}
                activeOpacity={0.7}
                onPress={() => {
                    nextGame()
                }}
            >
                <Text style={mainStyle.buttonText}>Дальше</Text>
            </TouchableOpacity>
        </View>
    )
}
