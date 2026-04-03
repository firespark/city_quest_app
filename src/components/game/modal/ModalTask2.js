import { View, Text, Image } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

import { TaskTemplate } from '../TaskTemplate'
import { Hint } from '../Hint'

export const ModalTask2 = ({ game, setModal, setGame }) => {
    const task = game.task2

    return (
        <View style={mainStyle.mt5}>
            <Text style={mainStyle.preTitle}>Задание выполнено</Text>
            <Text selectable style={mainStyle.titleMain}>{game.answer2}</Text>

            <View style={mainStyle.divider} />

            <View style={mainStyle.mb20}>
                
                <TaskTemplate 
                    tasks={task.tasks} 
                    game={game} 
                    setModal={setModal} 
                    setGame={setGame} 
                    taskNumber="2" 
                    isModal={true} 
                />

                {(task.sight_image || task.question) ? (
                    <View style={[mainStyle.card, gameStyle.taskCard]}>
                        
                        {task.sight_image ? (
                            <View style={gameStyle.taskImageThumbWrapper}>
                                <Image
                                    source={{ uri: task.sight_image }}
                                    style={gameStyle.taskImageThumb}
                                />
                            </View>
                        ) : null}

                        {task.question ? (
                            <View style={gameStyle.taskTextWrapper}>
                                <Text style={gameStyle.questionText}>{task.question}</Text>
                            </View>
                        ) : null}
                        
                    </View>
                ) : null}

            </View>

            {
                (game.sight_hint2)
                    ? (
                        <View style={gameStyle.gameHintSection}>
                            <Text style={gameStyle.gameSectionLabel}>Использованная подсказка:</Text>
                            <Hint text={game.sight_hint2.text} image={game.sight_hint2.image} />
                        </View>
                    )
                    : null
            }

            <View style={gameStyle.gameAnswerCard}>
                <View style={gameStyle.gameSuccessBadge}>
                    <Text style={gameStyle.gameSuccessIcon}>✓</Text>
                </View>
                <Text style={gameStyle.gameAnswerLabel}>Ваш ответ</Text>
                <Text selectable style={gameStyle.gameAnswerText}>{game.answer2}</Text>
            </View>
        </View>
    )
}