import { View, Text, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { questsStyle } from '../../styles/questsStyle'

export const ResetButton = ({ setModalVisible }) => {
    return (
        <View style={mainStyle.mt20}>
            <TouchableOpacity
                style={questsStyle.buttonGhost}
                activeOpacity={0.7}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text style={questsStyle.buttonTextGhost}>Сбросить прогресс</Text>
            </TouchableOpacity>
        </View>
    )
}
