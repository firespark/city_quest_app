import { View, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

import { Sight } from './Sight'
import { TaskSign } from './TaskSign'
import { ResetButton } from '../quests/ResetButton'

export const FinishQuest = ({ text, game, setModal, setResetModalVisible }) => {
    return (
        <View style={mainStyle.card}>
            <View style={mainStyle.container}>
                <Text style={[mainStyle.subtitle, mainStyle.textCenter]}>{text}</Text>
            </View>

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
        </View>
    )
}