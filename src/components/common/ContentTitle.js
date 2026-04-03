import { View, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

export const ContentTitle = ({ title }) => {

    return (
        <View style={mainStyle.mb10}>
            <Text selectable style={mainStyle.titleBold}>{title}</Text>
        </View>
    )
}
