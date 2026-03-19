import { View, Text } from 'react-native'

export const ShowError = ({ text }) => {

    return (
        <View>
        	<Text selectable>{text}</Text>
        </View>
    )
}

