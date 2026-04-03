import { View, Text, Image, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

export const Template2 = ({ game, setGame, setModal, taskNumber, isModal }) => {

    const setFullImage = (image) => {
        setGame({
            ...game,
            'show_full_image': image,
            'return_to_task': isModal ? taskNumber : null
        })
        setModal('image')
    }

    const tasks = (taskNumber == 1) ? game.task1.tasks : game.task2.tasks

    if (!tasks) return null;

    return (
        <View style={[mainStyle.panelRowCenter, mainStyle.mt20]}>

            {tasks.map((task, index) => (
                <View key={index} style={gameStyle.taskBlock}>
                    {task.image ? (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setFullImage(task.image)}
                        >
                            <Image
                                source={{ uri: task.image }}
                                style={gameStyle.taskImage}
                            />
                            <Image source={require('../../../assets/img/zoom.png')} style={gameStyle.zoomImage} />
                        </TouchableOpacity>
                    ) : null}

                    {task.text != '' ? (
                        <Text selectable style={gameStyle.taskText}>
                            {task.text.join('\n')}
                        </Text>
                    ) : null}
                </View>
            ))}
        </View>
    )
}
