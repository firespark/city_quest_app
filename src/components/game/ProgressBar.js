import { View, TouchableOpacity } from 'react-native'

import { gameStyle } from '../../styles/gameStyle'
import { mainStyle } from '../../styles/mainStyle'

export const ProgressBar = ({ game, setModal }) => {

    const content = []

    for (let i = 1; i <= game.levels; i++) {
        let st = gameStyle.progressDisabled
        if (i < game.step_total) st = gameStyle.progressDone
        if (i == game.levels) st = gameStyle.progressFinish
        if (i == game.step_total) st = gameStyle.progressInProgress
        if (i == game.levels && i == game.step_total) st = gameStyle.progressFinishDone
        if (i == game.step) st = gameStyle.progressCurrent
        if (i == game.step && i == game.levels) st = [gameStyle.progressCurrent, gameStyle.progressFinishDone]

        content.push(<View key={i} style={[gameStyle.progressPoint, st]}></View>)
    }

    return (
        <TouchableOpacity
            style={[gameStyle.barContainer, mainStyle.mt10]}
            activeOpacity={0.7}
            onPress={() => {
                setModal('progress')
            }}
        >
            {content}
        </TouchableOpacity>
    )
}
