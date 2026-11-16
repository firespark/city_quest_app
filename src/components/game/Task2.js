
import { View, Image, Text, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'
import { arStyle } from '../../styles/arStyle'
import { isArEnabled } from '../../scripts/arMath'

import { TaskTemplate } from './TaskTemplate'
import { TaskAnswerForm } from './TaskAnswerForm'

export const Task2 = ({ game, setGame, setModal }) => {

    const task = game.task2
    const ar = isArEnabled(game.ar)

    if (ar) {
        const instruction = game.ar_point?.instruction?.trim() || 'Подойди к достопримечательности и найди скрытую надпись через камеру. Это ответ на второй вопрос - запомни его и введи ниже.'
        return (
            <View style={mainStyle.container}>
                <Text style={mainStyle.titleMain}>Найди надпись</Text>
                <View style={[mainStyle.card, arStyle.taskContent]}>
                    <Text style={arStyle.text}>{instruction}</Text>
                    {game.ar_point ? (
                        <>
                            <Text selectable style={arStyle.hint}>Координаты поиска: {game.ar_point.latitude}, {game.ar_point.longitude}</Text>
                            <TouchableOpacity style={arStyle.utilityButton} accessibilityRole="button" activeOpacity={0.7} onPress={() => setModal('ar')}>
                                <Text style={arStyle.utilityButtonText}>Найти надпись</Text>
                            </TouchableOpacity>
                        </>
                    ) : null}
                </View>
                <TaskAnswerForm game={game} setGame={setGame} setModal={setModal} answerNumber={2} />
            </View>
        )
    }

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
