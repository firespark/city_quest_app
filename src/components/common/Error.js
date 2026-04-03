import { View, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

export const Error = ({ text }) => {

    return (
        <View>
            <Text selectable style={[mainStyle.red, mainStyle.mb10]}>{text}</Text>
        </View>
    )
}
