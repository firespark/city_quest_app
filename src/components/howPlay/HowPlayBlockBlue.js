import { View, Text } from 'react-native'
import { howPlayStyle } from '../../styles/howPlayStyle'

export const HowPlayBlockBlue = ({ number, title, description }) => {
    return (
        <View style={[howPlayStyle.card, howPlayStyle.cardBlue]}>
            <View style={howPlayStyle.headerRow}>
                <View style={howPlayStyle.numberCircleBlue}>
                    <Text style={howPlayStyle.numberTextBlue}>{number}</Text>
                </View>
                <Text selectable style={howPlayStyle.titleBlue}>{title}</Text>
            </View>
            <View>
                <Text selectable style={howPlayStyle.descBlue}>{description}</Text>
            </View>
        </View>
    )
}
