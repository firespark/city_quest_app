import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { mainStyle } from '../../styles/mainStyle'
import { questsStyle } from '../../styles/questsStyle'

export const StatusBadge = ({ status }) => {
    if (status === 'finished') {
        return (
            <View style={[questsStyle.questBadge, mainStyle.bgBlue]}>
                <Ionicons name="checkmark-sharp" size={12} color="#FFFFFF" />
                <Text style={questsStyle.questBadgeText}>Пройден</Text>
            </View>
        )
    }
    if (status === 'in_progress') {
        return (
            <View style={[questsStyle.questBadge, mainStyle.bgOrange]}>
                <Ionicons name="hourglass-outline" size={12} color="#FFFFFF" />
                <Text style={questsStyle.questBadgeText}>В процессе</Text>
            </View>
        )
    }
    return null
}

export const AccessBadge = ({ paid, available }) => {
    if (paid && !available) {
        return (
            <View style={[questsStyle.questBadge, mainStyle.bgPurple]}>
                <Ionicons name="diamond-outline" size={12} color="#FFFFFF" />
                <Text style={questsStyle.questBadgeText}>Премиум</Text>
            </View>
        )
    }
    if (paid && available) {
        return (
            <View style={[questsStyle.questBadge, mainStyle.bgGreen]}>
                <Ionicons name="checkmark-sharp" size={12} color="#FFFFFF" />
                <Text style={questsStyle.questBadgeText}>Куплен</Text>
            </View>
        )
    }
    return null
}
