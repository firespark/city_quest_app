import { View, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

export const GameTitle = ({ title, description }) => {
    return (
        <View style={mainStyle.wrapper}>
            <Text selectable style={mainStyle.titleMain}>{title}</Text>

            <View style={mainStyle.badge}>
                <Text selectable style={[mainStyle.badgeText, mainStyle.textCenter]}>{description}</Text>
            </View>
        </View>
    )
}
