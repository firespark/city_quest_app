import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import { gStyle, gStyleProgress } from '../../styles/style'


export const ProgressBar = ({game, setGame, setModal}) => {

    const content = []

    for (let i = 1; i <= game.levels; i++) {
        let st = gStyleProgress.progressDisabled
        if (i < game.step_total) st = gStyleProgress.progressDone
        if (i == game.levels) st = gStyleProgress.progressFinish
        if (i == game.step_total) st = gStyleProgress.progressInProgress
        if (i == game.levels && i == game.step_total) st = gStyleProgress.progressFinishDone
        if (i == game.step) st = gStyleProgress.progressCurrent
        if (i == game.step && i == game.levels) st = [gStyleProgress.progressCurrent, gStyleProgress.progressFinishDone]


        content.push(<View key={i} style={[gStyleProgress.progressPoint, st]}></View>)
    }

    
    return (
        <TouchableOpacity
            style={gStyle.panelRowLeft}
            activeOpacity={0.7}
            onPress={() => {
                /* setGame({
                    ...game, 
                    'levels_template': true,
                }) */
                setModal('progress')
            }}
        >
	       	{content}
        </TouchableOpacity>
	    
    )
}



