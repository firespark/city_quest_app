import { View, Text } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

import { TaskTemplate } from '../TaskTemplate'
import { Hint } from '../Hint'

export const ModalTask1 = ({ game, setModal, setGame }) => {
    const task = game.task1

    return (
        <View style={mainStyle.mt5}>

            <Text style={mainStyle.preTitle}>Задание выполнено</Text>
            <Text selectable style={mainStyle.titleMain}>{game.sight_title}</Text>

            <View style={mainStyle.divider} />

            <View style={mainStyle.mb20}>
                <TaskTemplate 
                    tasks={task.tasks} 
                    game={game} 
                    setModal={setModal} 
                    setGame={setGame} 
                    taskNumber="1" 
                    isModal={true} 
                />
            </View>

            {(game.sight_hint1) && (
                <View style={gameStyle.gameHintSection}>
                    <Text style={gameStyle.gameSectionLabel}>Использованная подсказка:</Text>
                    <Hint text={game.sight_hint1.text} image={game.sight_hint1.image} />
                </View>
            )}

            <View style={gameStyle.gameAnswerCard}>
                <View style={gameStyle.gameSuccessBadge}>
                    <Text style={gameStyle.gameSuccessIcon}>✓</Text>
                </View>
                <Text style={gameStyle.gameAnswerLabel}>Ваш ответ</Text>
                <Text selectable style={gameStyle.gameAnswerText}>{game.answer1}</Text>
            </View>
        </View>
    )
}