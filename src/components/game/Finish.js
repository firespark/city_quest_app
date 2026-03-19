import { useContext, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { gStyle } from '../../styles/style'
import { MainContext } from '../../context/mainContext'
import { QUESTS_SCREEN, QUEST_SCREEN } from '../../context/types'
import { Sight } from './Sight'
import { TaskSign } from './TaskSign'

import { ResetButton } from '../quests/ResetButton'
import { ResetModal } from '../quests/ResetModal'

export const Finish = ({ text, game, setModal }) => {
    const { changeScreen, setCityData } = useContext(MainContext)
    const [resetModalVisible, setResetModalVisible] = useState(false)

    return (
        <View>
            <View style={gStyle.container}>
                <Text style={[gStyle.p, gStyle.textCenter]}>{text}</Text>
            </View>

            <View style={[gStyle.center, gStyle.mt30, gStyle.mb30]}>
                <Text style={[gStyle.p, gStyle.textCenter, gStyle.titleBold]}>
                    Финишная достопримечательность
                </Text>
                <Sight setModal={setModal} title={game.sight_title} image={game.sight_image} />
                <View style={gStyle.panelRowCenter}>
                    <TaskSign number="1" setModal={setModal} />
                    <TaskSign number="2" setModal={setModal} />
                </View>
            </View>

            <View style={[gStyle.center, gStyle.mt30, gStyle.mb30]}>
                <TouchableOpacity
                    style={gStyle.buttonCity}
                    activeOpacity={0.7}
                    onPress={() => {
                        changeScreen(QUESTS_SCREEN)
                        setCityData({ id: game.quest_city_id, title: game.quest_city })
                    }}
                >
                    <Text style={gStyle.buttonTextSmall}>Еще квесты в городе</Text>
                    <Text style={gStyle.buttonTextSmall}>{game.quest_city}</Text>
                </TouchableOpacity>
            </View>

            <ResetButton setModalVisible={setResetModalVisible} />

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