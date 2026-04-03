import { useState, useContext } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

import { TaskTemplate } from './TaskTemplate' 
import { Loader } from '../common/Loader'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const Task1 = ({ game, setGame, setModal }) => {

    const { questId, token, answersState, setAnswersState } = useContext(MainContext)
    const [inputResults, setInputResults] = useState({});
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const task = game.task1
    const inputs = []

    for (let i = 0; i < game.inputs1; i++) {
        let style = null
        if (typeof inputResults[i] !== 'undefined') {
            style = (inputResults[i] == 1) ? mainStyle.inputCorrect : mainStyle.inputError
        }

        inputs.push(
            <View key={i} style={gameStyle.inputWrapper}>
                <TextInput
                    placeholder={game.inputs1 == 1 ? `Ответ` : `Слово ${i + 1}`}
                    style={[mainStyle.modernInput, style]}
                    placeholderTextColor={'#BDC3C7'}
                    value={answersState[i] || ''}
                    onChangeText={(value) => answersHandler(i, value)}
                    autoCapitalize="none"
                />
            </View>
        )
    }

    const answersHandler = (key, value) => {
        value = value.replace(/\s/g, "");
        setAnswersState({ ...answersState, [key]: value })
    }

    const checkAnswer = async () => {
        setLoader(true)
        setError(null)
        try {
            const postdata = { quest_answer: answersState, answer_number: 1 }
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/games/checkAnswer/${questId}`, postdata, token)

            if (output.success == 1) {
                setInputResults(output.data.inputResults)

                if (!output.data.errors) {
                    setGame(output.data)
                    setAnswersState([]);
                    setModal('answer1')
                }
            }

        } catch (e) {
            console.error('Error:', e)
            setError('Произошла ошибка при отправке')
        } finally {
            setLoader(false)
        }
    }


    return (
        <View style={mainStyle.container}>
            <Text style={mainStyle.titleMain}>Угадай достопримечательность</Text>

            <TaskTemplate 
                tasks={task.tasks} 
                game={game} 
                setGame={setGame} 
                setModal={setModal} 
                taskNumber="1" 
            />

            {
                (game.sight_hint1) ? (
                    <View style={gameStyle.hintContainer}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setModal('hint1')}
                        >
                            <View style={gameStyle.hintPill}>
                                <Image source={require('../../../assets/img/hint.png')} style={gameStyle.hintIcon} />
                                <Text style={gameStyle.hintTextActive}>Подсказка</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : null
            }

            {loader ? (
                <View style={mainStyle.mt30}>
                    <Loader />
                </View>
            ) : (
                <>
                    <View style={mainStyle.mt15}>
                        {inputs}
                    </View>

                    <View style={mainStyle.mt15}>
                        <TouchableOpacity
                            style={mainStyle.primaryButton}
                            activeOpacity={0.7}
                            onPress={() => checkAnswer()}
                        >
                            <Text style={mainStyle.buttonText}>Ответ</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {
                (error) ? (
                    <View style={mainStyle.errorContainer}>
                        <Text style={mainStyle.errorText}>{error}</Text>
                    </View>
                ) : null
            }
        </View>
    )
}
