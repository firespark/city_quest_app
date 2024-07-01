import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import { gStyle, gStyleProgress } from '../../styles/style'


export const ProgressBar = ({game, setGame}) => {

    const content = []

    for (let i = 1; i <= game.levels; i++) {
        let st = gStyleProgress.progressDisabled
        if(i < game.step_total)  st = gStyleProgress.progressDone
        if(i == game.step)  st = gStyleProgress.progressCurrent

        content.push(<View key={i} style={[gStyleProgress.progressPoint, st]}></View>)
    }

    
    return (
        <TouchableOpacity
            style={gStyle.panelRowLeft}
            activeOpacity={0.7}
            onPress={() => {
                setGame({
                    ...game, 
                    'levels_template': true,
                })
            }}
        >
	       	{content}
        </TouchableOpacity>
	    
    )
}



