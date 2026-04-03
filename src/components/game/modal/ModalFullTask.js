import { View, Text, ScrollView } from 'react-native'
import { mainStyle } from '../../../styles/mainStyle'
import FullWidthImage from '../../common/FullWidthImage'

export const ModalFullTask = ({ task }) => {

    if (!task) return null;

    const taskText = Array.isArray(task.text) ? task.text.join('\n').trim() : (task.text || '').trim();

    return (
        <ScrollView style={mainStyle.mt20}>

            {task.image ? (
                <View>
                    <FullWidthImage source={{ uri: task.image }} />
                </View>
            ) : null}

            {taskText ? (
                <View style={mainStyle.wrapper}>
                    <Text selectable style={[mainStyle.paragraph, mainStyle.textCenter, mainStyle.mt20]}>
                        {taskText}
                    </Text>
                </View>
            ) : null}

        </ScrollView>
    )
}