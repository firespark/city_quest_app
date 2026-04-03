import { View, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

export const ContentSimple = ({ ps }) => {

    return (
        <View>
            <Text selectable style={mainStyle.p}>{ps}</Text>
        </View>
    )
}

