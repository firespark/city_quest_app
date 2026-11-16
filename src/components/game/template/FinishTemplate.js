import { useContext, useState } from 'react'
import { View, Text } from 'react-native'

import { MainContext } from '../../../context/mainContext'
import { QUEST_SCREEN } from '../../../context/types'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

import { ProgressBar } from '../ProgressBar'
import { GameTitle } from '../GameTitle'

import { FinishQuest } from '../FinishQuest'
import { FinishTour } from '../FinishTour'
import { FinishQuestion } from '../FinishQuestion'
import { FinishButton } from '../FinishButton'

import { ResetModal } from '../../quests/ResetModal'
import { ResetButton } from '../../quests/ResetButton'
import { Quests } from '../../quests/Quests'

export const FinishTemplate = ({ title, content, game, setGame, setModal, formatId }) => {
    const { changeScreen } = useContext(MainContext)
    const [resetModalVisible, setResetModalVisible] = useState(false)
    const completedFinalQuestion = game.finish_answer_display != null

    return (
        <View style={gameStyle.finishContainer}>
            <GameTitle
                title={title}
                description={game.finish_question ? 'Финиш' : 'Финиш!'}
                setModal={setModal}
            />
            <View style={gameStyle.playTemplateProgressContainer}>
                <ProgressBar
                    game={game}
                    setModal={setModal}
                />
            </View>

            {game.finish_question ? (
                <FinishQuestion question={game.finish_question} setGame={setGame} />
            ) : (
                <>
                    {completedFinalQuestion ? (
                        <View style={[mainStyle.card, mainStyle.container]}>
                            {game.finish_answer_display ? (
                                <Text style={[mainStyle.subtitle, mainStyle.textCenter]}>
                                    {game.finish_answer_display.toUpperCase()}
                                </Text>
                            ) : null}
                            {content ? (
                                <Text style={[mainStyle.subtitle, mainStyle.textCenter]}>{content}</Text>
                            ) : null}
                            <FinishButton game={game} />
                            <ResetButton setModalVisible={setResetModalVisible} />
                        </View>
                    ) : formatId === 2 ? (
                        <FinishTour text={content} game={game} setResetModalVisible={setResetModalVisible} />
                    ) : (
                        <FinishQuest text={content} game={game} setModal={setModal}
                            setResetModalVisible={setResetModalVisible} />
                    )}

                    <View style={mainStyle.mt30}>
                        <Text style={[mainStyle.subtitle, mainStyle.textCenter, mainStyle.mb20]}>
                            {`Еще туры в г. ${game.quest_city}`}
                        </Text>
                        <Quests cityId={game.quest_city_id} />
                    </View>
                </>
            )}

            <ResetModal
                modalVisible={resetModalVisible}
                setModalVisible={setResetModalVisible}
                onSuccess={() => {
                    changeScreen(QUEST_SCREEN);
                }}
            />
        </View>
    )
}
