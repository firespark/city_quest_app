import React from 'react'
import { View, ScrollView, Text } from 'react-native'

import { BackQuest } from '../BackQuest'
import { Skips } from '../Skips'
import { Hints } from '../Hints'

import { FinishTemplate } from './FinishTemplate'
import { LevelsTemplate } from './LevelsTemplate'
import { ModeTemplate } from './ModeTemplate'
import { PlayTemplate } from './PlayTemplate'

import { gStyle, gStyleHeader } from '../../../styles/style'



export const GameTemplate = ({ game, setGame, setModal, nextGame }) => {

    let template = <PlayTemplate
                        game={game}
                        setGame={setGame}
                        setModal={setModal}
                        nextGame={nextGame}
                    />

    if(game.finish){
        template = <FinishTemplate 
                        title={game.quest_title}
                        content={game.finish_content}
                    />
    }

    if(game.levels_template){
        template = <LevelsTemplate 
                        game={game}
                        setGame={setGame}
                    />
    }

    if(game.step == 0){
        template = <ModeTemplate 
                        game={game}
                        setGame={setGame}
                    />
    }

    
	
    return (
    	
	    <View style={gStyle.flex}>
    		<View style={[gStyle.panelRow, gStyleHeader.panelHeader]}>
	            <BackQuest
                    setModal={setModal}
                />
                
        		<View style={gStyle.panelRow}>

        			<Skips
        				skips={game.skips_number}
                        showSkip={game.show_skip}
                        setModal={setModal}
        			/>
        			<Hints
        				hints={game.hints_number}
                        showHint={game.show_hint}
                        setModal={setModal}

        			/>
        		</View>
                
                {/*
                <Close />
                */}
	        </View>
    		<ScrollView
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                <View style={gStyle.container}>
                    {template}

                </View>
			</ScrollView>
	    	
	    </View>



    )
}

