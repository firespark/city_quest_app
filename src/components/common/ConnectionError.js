import { View, Text, TouchableOpacity } from 'react-native'
import { mainStyle } from '../../styles/mainStyle'

export const ConnectionError = ({ onRetry }) => {
    return (
        <View style={[mainStyle.center, mainStyle.mt30, mainStyle.p20]}>
            <Text style={[mainStyle.titleMain, mainStyle.mb10]}>
                Нет подключения
            </Text>
            <Text style={[mainStyle.description, mainStyle.textCenter, mainStyle.mb20]}>
                Не удалось загрузить данные. Проверьте подключение к интернету и попробуйте снова.
            </Text>
            <TouchableOpacity
                style={mainStyle.primaryButton}
                activeOpacity={0.7}
                onPress={onRetry}
            >
                <Text style={mainStyle.primaryButtonText}>Повторить</Text>
            </TouchableOpacity>
        </View>
    )
}