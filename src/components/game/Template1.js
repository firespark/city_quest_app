import { View, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

import FullWidthImage from '../common/FullWidthImage';

export const Template1 = ({ tasks }) => {
    const task = tasks[0]

    if (!task) return null;

    return (
        <View style={mainStyle.card}>
            {task.image ? (
                <View style={gameStyle.templateImageWrapper}>
                    <FullWidthImage
                        source={{ uri: task.image }}
                        style={gameStyle.templateImage}
                    />
                </View>
            ) : null}

            {task.text && task.text.length > 0 ? (
                <View style={gameStyle.templateTextContent}>
                    <Text selectable style={mainStyle.description}>
                        {task.text.join('\n')}
                    </Text>
                </View>
            ) : null}
        </View>
    )
}
