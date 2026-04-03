import { View, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { questsStyle } from '../../styles/questsStyle'

export const QuestTitle = ({ title, city }) => {
    return (
        <View style={mainStyle.mt15}>
            <Text selectable style={[questsStyle.city, questsStyle.cityText, mainStyle.textCenter]}>{city}</Text>
            <Text selectable style={[mainStyle.titleMain, mainStyle.mt5]}>{title}</Text>
        </View>
    )
}
