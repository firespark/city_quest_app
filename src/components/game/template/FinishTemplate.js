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

import { ResetModal } from '../../quests/ResetModal'
import { Quests } from '../../quests/Quests'

export const FinishTemplate = ({ title, content, game, setModal, formatId }) => {
    const { changeScreen } = useContext(MainContext)
    const [resetModalVisible, setResetModalVisible] = useState(false)

    return (
        <View style={gameStyle.finishContainer}>
            <GameTitle
                title={title}
                description="Финиш!"
                setModal={setModal}
            />
            <View style={gameStyle.playTemplateProgressContainer}>
                <ProgressBar
                    game={game}
                    setModal={setModal}
                />
            </View>

            {formatId === 2 ? (
                <FinishTour 
                    text={content} 
                    game={game} 
                    setResetModalVisible={setResetModalVisible}
                />
            ) : (
                <FinishQuest 
                    text={content} 
                    game={game} 
                    setModal={setModal} 
                    setResetModalVisible={setResetModalVisible}
                />
            )}

            <View style={mainStyle.mt30}>
                <Text style={[mainStyle.subtitle, mainStyle.textCenter, mainStyle.mb20]}>
                    {formatId === 2 ? `Еще туры в г. ${game.quest_city}` : `Еще туры в г. ${game.quest_city}`}
                </Text>
                <Quests cityId={game.quest_city_id} />
            </View>

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