import { View, Image } from 'react-native'

import { questsStyle } from '../../styles/questsStyle'

import { StatusBadge, AccessBadge } from './QuestBadges'

export const QuestImage = ({ data }) => {
    return (
        <View style={questsStyle.questImageWrapper}>
            <Image
                source={{ uri: data.image }}
                style={questsStyle.questHeroImage}
            />
            <View style={questsStyle.questBadgesTopLeft}>
                <AccessBadge paid={data.paid} available={data.available} />
            </View>
            <View style={questsStyle.questBadgesTopRight}>
                <StatusBadge status={data.status} />
            </View>
        </View>
    )
}
