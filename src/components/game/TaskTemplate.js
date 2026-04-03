import { View, Text, Image, TouchableOpacity } from 'react-native'
import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

export const TaskTemplate = ({ tasks, game, setGame, setModal, taskNumber, isModal }) => {

    if (!tasks || tasks.length === 0) return null;

    const setFullTask = (task) => {
        if (setGame && setModal) {
            setGame({
                ...game,
                'show_full_task': task,
                'return_to_task': isModal ? taskNumber : null
            })
            setModal('full_task') 
        }
    }

    const isGrid = tasks.length > 1;
    const gridWidth = tasks.length >= 3 ? '31%' : '48%';

    return (
        <View style={[mainStyle.mt10, isGrid && gameStyle.taskGridWrapper]}>
            {tasks.map((task, index) => {

                const taskText = Array.isArray(task.text) ? task.text.join('\n').trim() : (task.text || '').trim();
                
                const isTextOnlySingle = !isGrid && !task.image && !!taskText;

                const CardWrapper = isTextOnlySingle ? View : TouchableOpacity;

                return (
                    <CardWrapper
                        activeOpacity={isTextOnlySingle ? undefined : 0.8} 
                        onPress={isTextOnlySingle ? undefined : () => setFullTask(task)} 
                        key={index}
                        style={[
                            mainStyle.card, 
                            gameStyle.taskCard,
                            isGrid && gameStyle.taskCardGridItem,
                            isGrid && { width: gridWidth, aspectRatio: 0.85 }
                        ]}
                    >

                        {task.image ? (
                            <View style={[
                                gameStyle.taskImageThumbWrapper,
                                isGrid && { flex: 1, aspectRatio: undefined }
                            ]}>
                                <Image
                                    source={{ uri: task.image }}
                                    style={[gameStyle.taskImageThumb]}
                                />
                            </View>
                        ) : null}

                        {taskText ? (
                            <View style={[
                                gameStyle.taskTextWrapper,
                                (!task.image && isGrid) && gameStyle.taskTextPreviewContainer
                            ]}>
                                <Text 
                                    selectable={true}
                                    numberOfLines={isGrid ? (task.image ? 2 : 5) : undefined} 
                                    style={[
                                        mainStyle.paragraph, 
                                        mainStyle.textCenter, 
                                        isGrid && gameStyle.taskTextPreview 
                                    ]}
                                >
                                    {taskText}
                                </Text>
                            </View>
                        ) : null}

                        {!isTextOnlySingle && (
                            <View style={gameStyle.taskLoupeWrapper}>
                                <Image
                                    source={require('../../../assets/img/loupe.png')}
                                    style={gameStyle.taskLoupe}
                                />
                            </View>
                        )}
                        
                    </CardWrapper>
                )
            })}
        </View>
    )
}