import { View, Text, TouchableOpacity } from 'react-native'
import { gStyle } from '../../styles/style'

export const ResetButton = ({ setModalVisible }) => {
    return (
        <View style={[gStyle.center, gStyle.mt20]}>
            <TouchableOpacity
                style={gStyle.buttonReset}
                activeOpacity={0.7}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text style={gStyle.buttonTextSmall}>Сбросить прогресс</Text>
            </TouchableOpacity>
        </View>
    )
}