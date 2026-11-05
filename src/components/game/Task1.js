
import { View, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

import { TaskTemplate } from './TaskTemplate'
import { TaskAnswerForm } from './TaskAnswerForm'

export const Task1 = ({ game, setGame, setModal }) => {

    const task = game.task1

    return (
        <View style={mainStyle.container}>
            <Text style={mainStyle.titleMain}>
                Угадай достопримечательность
            </Text>

            <TaskTemplate
                tasks={task.tasks}
                game={game}
                setGame={setGame}
                setModal={setModal}
                taskNumber="1"
            />

            <TaskAnswerForm
                game={game}
                setGame={setGame}
                setModal={setModal}
                answerNumber={1}
            />
        </View>
    )
}
