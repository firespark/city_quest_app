import { View, ActivityIndicator, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

export const Loader = () => {
    return (
        <View style={mainStyle.loaderOverlay}>
            <ActivityIndicator size="large" color="#17A2B8" />
            <Text style={mainStyle.loaderText}>Загрузка</Text>
        </View>
    )
}
