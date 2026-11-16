import { View, TouchableOpacity } from 'react-native'

import { gameStyle } from '../../styles/gameStyle'
import { mainStyle } from '../../styles/mainStyle'

export const ProgressBar = ({ game, setModal }) => {

    const content = []

    const steps = Array.isArray(game.step_numbers) ? game.step_numbers : Array.from({ length: game.levels }, (_, index) => index + 1)
    const lastStep = steps[steps.length - 1]
    for (const i of steps) {
        let st = gameStyle.progressDisabled
        if (i < game.step_total) st = gameStyle.progressDone
        if (i == lastStep) st = gameStyle.progressFinish
        if (i == game.step_total) st = gameStyle.progressInProgress
        if (i == lastStep && i == game.step_total) st = gameStyle.progressFinishDone
        if (i == game.step) st = gameStyle.progressCurrent
        if (i == game.step && i == lastStep) st = [gameStyle.progressCurrent, gameStyle.progressFinishDone]

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
