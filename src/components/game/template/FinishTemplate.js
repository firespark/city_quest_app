import React from 'react'
import { View } from 'react-native'
import { ProgressBar } from '../ProgressBar'
import { GameTitle } from '../GameTitle'
import { Finish } from '../Finish'
import { Quests } from '../../quests/Quests'
import { gStyle } from '../../../styles/style'



export const FinishTemplate = ({ title, content, game, setGame, setModal }) => {

	
	
    return (   
	    <View>
            <GameTitle
                title={title}
                description="Финиш!"
            />
            <View style={[gStyle.center, gStyle.mt10]}>
                <ProgressBar
                    game={game}
                    setGame={setGame}
                    setModal={setModal}
                />
            </View>
            <Finish
                text={content}
            />
            <Quests />

        </View>

    )
}

