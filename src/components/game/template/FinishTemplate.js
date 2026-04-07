import { View, Text } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

import { ProgressBar } from '../ProgressBar'
import { GameTitle } from '../GameTitle'
import { Finish } from '../Finish'
import { Quests } from '../../quests/Quests'

export const FinishTemplate = ({ title, content, game, setModal }) => {
    return (
        <View style={gameStyle.finishContainer}>
            <GameTitle
                title={title}
                description="Финиш!"
            />
            <View style={gameStyle.playTemplateProgressContainer}>
                <ProgressBar
                    game={game}
                    setModal={setModal}
                />
            </View>

            <Finish
                text={content}
                game={game}
                setModal={setModal}
            />

            <View style={mainStyle.mt30}>
                <Text style={[mainStyle.subtitle, mainStyle.textCenter, mainStyle.mb20]}>Еще квесты в г. {game.quest_city}</Text>
                <Quests cityId={game.quest_city_id} />
            </View>
        </View>
    )
}
