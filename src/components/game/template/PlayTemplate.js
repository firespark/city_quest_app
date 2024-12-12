import React from 'react'
import { View } from 'react-native'

import { GameTitle } from '../GameTitle'
import { ProgressBar } from '../ProgressBar'
import { Sight } from '../Sight'
import { Task1 } from '../Task1'
import { Task2 } from '../Task2'
import { TaskSign } from '../TaskSign'
import { NextGame } from '../NextGame'

import { gStyle, gStyleHeader } from '../../../styles/style'



export const PlayTemplate = ({ game, setGame, setModal, nextGame }) => {

	
	
    return (
    	
	    <View>
            <GameTitle
                title={game.quest_title}
                description={`Уровень ${game.step}`}
            />
            <View style={[gStyle.center, gStyle.mt10]}>
                <ProgressBar
                    game={game}
                    setGame={setGame}
                    setModal={setModal}
                />
            </View>
                        
            { 
                (game.status == 0)
                ? 
                <View>
                    <Task1
                        game={game}
                        setGame={setGame}
                        setModal={setModal}
                    />
                </View>
                : null 
            }

            { 
                (game.status == 1)
                ? 
                <View>
                    <Sight
                        setModal={setModal}
                        title={game.sight_title}
                        image={game.sight_image}
                    />
                    <View style={gStyle.panelRowLeft}>
                        <TaskSign
                            number="1"
                            setModal={setModal}
                        />
                                    
                        <TaskSign
                            number="2"
                            disabled={true} 
                        />
                                    
                    </View>
                    <Task2
                        game={game}
                        setGame={setGame}
                        setModal={setModal}
                    />

                </View>
                : null 
            }

            { 
                (game.status == 2)
                ? 
                <View>
                    <Sight
                        setModal={setModal}
                        title={game.sight_title}
                        image={game.sight_image}
                    />
                    <View style={gStyle.panelRowLeft}>
                        <TaskSign
                            number="1"
                            setModal={setModal}
                        />
                        <TaskSign
                            number="2"
                            setModal={setModal}
                        />
                    </View>
                    <NextGame
                        nextGame={nextGame}
                    />

                </View>
                : null 
            }
                       
        </View> 


    )
}

