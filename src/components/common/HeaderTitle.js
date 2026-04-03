import { View, Text } from 'react-native'

import { headerStyle } from '../../styles/headerStyle'

export const HeaderTitle = ({ title }) => {

    return (
        <View>
            <Text style={headerStyle.headerTitle}>{title}</Text>
        </View>
    )
}
