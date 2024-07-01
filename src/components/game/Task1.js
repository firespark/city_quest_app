import React, { useState, useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { Template1 } from './Template1'
import { Template2 } from './Template2'
import { Hint } from './Hint'

import {Loader} from '../common/Loader'
import {Error} from '../common/Error'

import { gStyle } from '../../styles/style'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'



export const Task1 = ({ game, setGame, setModal }) => {

	const { questId, token } = useContext(MainContext)

	const [answers, setAnswers] = useState([]);
	const [inputResults, setInputResults] = useState({});

	const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

	const task = game.task1
	const inputs = []

    for (let i = 0; i < game.inputs1; i++) {

    	let style = null
    	if(typeof inputResults[i] !== 'undefined'){

    		style = (inputResults[i] == 1) ? gStyle.inputCorrect : gStyle.inputError

    	}
        
        inputs.push(
        	<View key={i}>
        		<TextInput 
		            placeholder={`Слово ${i+1}`}
		            style={[gStyle.input, gStyle.mb20, style]}
		            placeholderTextColor={'#C4C4C4'}
		            onChangeText={(value) => answersHandler(i, value)}
		        />
	        </View>
	        
        )
    }

    const answersHandler = (key, value) => {
        setAnswers({...answers, [key]: value})
    }

    const checkAnswer = async () => {

    	setError(null)
        setLoader(true)

    	try {
    		
            const postdata = {quest_answer: answers, answer_number: 1}

            const output = await Http.post(`http://test2.gagara-web.ru/api/games/checkAnswer/${questId}`, postdata, token)

            if (output.success == 1) {
            	setInputResults(output.data.inputResults)
            	if(!output.data.errors) {
            		setGame(output.data)
			        setModal('answer1')
            	}
                
            }
            else {
                if(output.error) {
                    setError(output.error)
                }
                else {
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
            
        }
        catch(e) {
            console.log(e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            
        }
        finally {
            setLoader(false)
        }



	}

	if (loader) {
        return <Loader />
    }
	
    return (
    	<View>
	        <Text style={[gStyle.titleBold, gStyle.mt20]}>Угадай достопримечательность</Text>
	        { 
				(task.template == 2)
				? 
				<Template2
					game={game}
					setGame={setGame}
					setModal={setModal}
					taskNumber="1"
				/>
				:
				<Template1
					tasks={task.tasks}
				/>
			}

			{
	        	(game.sight_hint1)
	        	? 
	        	<Hint
	        		text={game.sight_hint1.text}
	        		image={game.sight_hint1.image}
	        	/>
	        	:
	        	null
	        }
	        
		    <View style={[gStyle.center, gStyle.mt20]}>
		    	{inputs}
		        
		    </View>
		    <View style={gStyle.center}>
			    <TouchableOpacity
				    style={gStyle.button}
				    activeOpacity={0.7}
				    onPress={() => checkAnswer()}
				>
				   	<Text style={gStyle.buttonText}>Ответ</Text>
				</TouchableOpacity>
			</View>
	    </View>


    )
}

