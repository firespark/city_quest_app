import { useContext, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MainContext } from '../../context/mainContext'
import { QUESTS_SCREEN, QUEST_SCREEN } from '../../context/types'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

import { Sight } from './Sight'
import { TaskSign } from './TaskSign'

import { ResetButton } from '../quests/ResetButton'
import { ResetModal } from '../quests/ResetModal'

import { FormattedContent } from '../common/FormattedContent'

export const Finish = ({ text, game, setModal }) => {
    const { changeScreen, setCityData } = useContext(MainContext)
    const [resetModalVisible, setResetModalVisible] = useState(false)

    return (
        <View style={mainStyle.card}>

            <FormattedContent text={text} />

            <View style={[mainStyle.divider, mainStyle.mb20]} />

            <View style={mainStyle.center}>
                <Text style={[mainStyle.preTitle, mainStyle.mb20]}>
                    Финишная достопримечательность
                </Text>
                <Sight
                    setModal={setModal}
                    title={game.sight_title}
                    image={game.sight_image}
                />

                <View style={gameStyle.playTemplateSignsRow}>
                    <TaskSign number="1" setModal={setModal} />
                    <TaskSign number="2" setModal={setModal} />
                </View>
            </View>

            <View style={[mainStyle.divider, mainStyle.mt20]} />



            <View style={mainStyle.mb30}>
                <ResetButton setModalVisible={setResetModalVisible} />
            </View>

            <ResetModal
                modalVisible={resetModalVisible}
                setModalVisible={setResetModalVisible}
                onSuccess={() => {
                    changeScreen(QUEST_SCREEN);
                }}
            />

            {/*<View style={[mainStyle.center, mainStyle.mb15]}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        changeScreen(QUESTS_SCREEN)
                        setCityData({ id: game.quest_city_id, title: game.quest_city })
                    }}
                >
                    <Text style={mainStyle.link}>Еще квесты в г. {game.quest_city}</Text>
                </TouchableOpacity>
            </View>*/}
        </View>
    )
}
