import { View, Text } from 'react-native'
import { howPlayStyle } from '../../styles/howPlayStyle'

export const HowPlayBlock = ({ number, title, description }) => {
    return (
        <View style={[howPlayStyle.card, howPlayStyle.cardLight]}>
            <View style={howPlayStyle.headerRow}>
                <View style={howPlayStyle.numberCircleLight}>
                    <Text style={howPlayStyle.numberTextLight}>{number}</Text>
                </View>
                <Text selectable style={howPlayStyle.titleLight}>{title}</Text>
            </View>
            <View>
                <Text selectable style={howPlayStyle.descLight}>{description}</Text>
            </View>
        </View>
    )
}
