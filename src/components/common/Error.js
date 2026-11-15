import { View, Text, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { isCriticalResponse, requestAppRestart } from '../../scripts/appRecovery'

export const Error = ({ text, onRetry }) => {
    const canRestart = isCriticalResponse(undefined, text) || text === 'Не удалось загрузить данные'

    return (
        <View>
            <Text selectable style={[mainStyle.red, mainStyle.mb10]}>{text}</Text>
            {(onRetry || canRestart) && (
                <TouchableOpacity style={mainStyle.primaryButton} activeOpacity={0.7} onPress={onRetry || requestAppRestart}>
                    <Text style={mainStyle.primaryButtonText}>{onRetry ? 'Повторить' : 'Перезагрузить приложение'}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}
