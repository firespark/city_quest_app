import { View, Text, TouchableOpacity } from 'react-native'
import { GAME_SCREEN } from '../../context/types'

import { mainStyle } from '../../styles/mainStyle'

export const StartButton = ({ changeScreen, progress }) => {
    return (
        <View>
            <TouchableOpacity
                style={mainStyle.primaryButton}
                activeOpacity={0.7}
                onPress={() => changeScreen(GAME_SCREEN)}
            >
                <Text style={mainStyle.primaryButtonText}>{progress}</Text>
            </TouchableOpacity>
        </View>
    )
}
