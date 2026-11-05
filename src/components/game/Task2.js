
import { View, Image, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

import { TaskTemplate } from './TaskTemplate'
import { TaskAnswerForm } from './TaskAnswerForm'

export const Task2 = ({ game, setGame, setModal }) => {

    const task = game.task2

    return (
        <View style={mainStyle.container}>
            <Text style={mainStyle.titleMain}>
                Ответь на вопрос
            </Text>

            <TaskTemplate
                tasks={task.tasks}
                game={game}
                setGame={setGame}
                setModal={setModal}
                taskNumber="2"
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
                            <Text style={gameStyle.questionText}>
                                {task.question}
                            </Text>
                        </View>
                    ) : null}

                </View>
            ) : null}

            <TaskAnswerForm
                game={game}
                setGame={setGame}
                setModal={setModal}
                answerNumber={2}
            />
        </View>
    )
}
