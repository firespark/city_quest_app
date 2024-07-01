import React from 'react'
import { View, ScrollView } from 'react-native'

import { ModalClose } from '../modal/ModalClose'

import { ModalAnswer1 } from '../modal/ModalAnswer1'
import { ModalAnswer2 } from '../modal/ModalAnswer2'
import { ModalTask1 } from '../modal/ModalTask1'
import { ModalTask2 } from '../modal/ModalTask2'
import { ModalImage } from '../modal/ModalImage'
import { ModalHintAlert } from '../modal/ModalHintAlert'
import { ModalSkipAlert } from '../modal/ModalSkipAlert'
import { ModalBackAlert } from '../modal/ModalBackAlert'

import { gStyle, gStyleHeader } from '../../../styles/style'



export const ModalTemplate = ({ game, modal, setModal, setGame, nextGame }) => {

	let content = null

	switch (modal) {
        case 'answer1': 
            const location = game.sight_latitude + ',' + game.sight_longitude
            content = 
            <ModalAnswer1
                title={game.sight_title}
                image={game.sight_image}
                address={game.sight_address}
                location={location}
                description={game.sight_content}
                setModal={setModal}
            />
            break

        case 'answer2': 
            content = <ModalAnswer2
                answer2={game.answer2}
                setModal={setModal}
                nextGame={nextGame}
            />
            break

        case 'task1': 
            content = 
            <ModalTask1
                game={game}
                setGame={setGame}
                setModal={setModal}
            />
            break

        case 'task2': 
            content = 
            <ModalTask2
                game={game}
                setGame={setGame}
                setModal={setModal}
            />
            break

        case 'image': 
            content = 
            <ModalImage 
            	image={game.show_full_image}
            />
            break

        case 'hint': 
            content = 
            <ModalHintAlert
                game={game}
                setGame={setGame}
                setModal={setModal}
            />
            break

        case 'skip': 
            content = 
            <ModalSkipAlert
                game={game}
                setGame={setGame}
                setModal={setModal}
            />
            break

        case 'back': 
            content = 
            <ModalBackAlert
                setModal={setModal}
            />
            break
    }

	
    return (
    	
	    <View style={gStyle.flex}>
    		<View style={[gStyle.panelRowRight, gStyleHeader.panelHeader]}>
                <ModalClose
                	setModal={setModal}
                />
	        </View>
    		<ScrollView 

                style={gStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                <View style={gStyle.container}>
                	{content}
                </View>
			</ScrollView>
	    	
	    </View>

    )
}

