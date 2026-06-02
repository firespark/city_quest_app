import { View, Text, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

export const GameTitle = ({ title, description, setModal }) => {
    return (
        <View style={mainStyle.wrapper}>
            <Text selectable style={mainStyle.titleMain}>{title}</Text>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    setModal('progress')
                }}
            >
                <View style={mainStyle.badge}>
                    <Text selectable style={[mainStyle.badgeText, mainStyle.textCenter]}>{description}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
