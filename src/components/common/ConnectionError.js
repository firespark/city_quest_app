import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { mainStyle } from '../../styles/mainStyle'

export const ConnectionError = ({ onRetry }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    if (!visible) return null

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