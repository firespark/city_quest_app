import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { mainStyle } from '../../styles/mainStyle'
import { questsStyle } from '../../styles/questsStyle'

export const StartFinish = ({ start, finish, sights_count }) => {
    return (
        <View style={[mainStyle.wrapper, mainStyle.mt5, mainStyle.mb15]}>

            <View style={questsStyle.questStatRow}>
                <View style={questsStyle.questIconCircle}>
                    <Ionicons name="location" size={20} color="#4CAF50" />
                </View>
                <View style={questsStyle.questTextContainer}>
                    <Text style={questsStyle.questLabel}>Точка старта</Text>
                    <Text style={questsStyle.questValue}>{start}</Text>
                </View>
            </View>

            <View style={[mainStyle.divider, mainStyle.mt10]} />

            <View style={questsStyle.questStatRow}>
                <View style={questsStyle.questIconCircle}>
                    <Ionicons name="flag" size={20} color="#E74C3C" />
                </View>
                <View style={questsStyle.questTextContainer}>
                    <Text style={questsStyle.questLabel}>Финиш</Text>
                    <Text style={questsStyle.questValue}>{finish}</Text>
                </View>
            </View>

             <View style={[mainStyle.divider, mainStyle.mt10]} />

            <View style={questsStyle.questStatRow}>
                <View style={questsStyle.questIconCircle}>
                    <Ionicons name="library" size={20} color="#17A2B8" />
                </View>
                <View style={questsStyle.questTextContainer}>
                    <Text style={questsStyle.questLabel}>Что посмотрим</Text>
                    <Text style={questsStyle.questValue} selectable>{sights_count} локаций</Text>
                </View>
            </View>

        </View>
    )
}
