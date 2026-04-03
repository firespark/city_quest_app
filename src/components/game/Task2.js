import { useContext, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

import { TaskTemplate } from './TaskTemplate'

import { MainContext } from '../../context/mainContext';
import { Loader } from '../common/Loader';
import { Http } from '../../scripts/http';

export const Task2 = ({ game, setGame, setModal }) => {

    const { questId, token, answersState, setAnswersState } = useContext(MainContext)
    const [inputResults, setInputResults] = useState({});
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const task = game.task2
    const inputs = []

    for (let i = 0; i < game.inputs2; i++) {
        let style = null
        if (typeof inputResults[i] !== 'undefined') {
            style = (inputResults[i] == 1) ? mainStyle.inputCorrect : mainStyle.inputError
        }

        inputs.push(
            <View key={i} style={gameStyle.inputWrapper}>
                <TextInput
                    placeholder={game.inputs2 == 1 ? `Ответ` : `Слово ${i + 1}`}
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
            const postdata = { quest_answer: answersState, answer_number: 2 }
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/games/checkAnswer/${questId}`, postdata, token)
            
            if (output.success == 1) {
                setInputResults(output.data.inputResults || {})

                if (!output.data.errors) {
                    setGame(output.data)
                    setAnswersState([])
                    setModal('answer2')
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
            <Text style={mainStyle.titleMain}>Ответь на вопрос</Text>

            <TaskTemplate
                tasks={task.tasks}
                game={game}
                setGame={setGame}
                setModal={setModal}
                taskNumber="2"
            />

            {(task.sight_image || task.question) ? (
                <View style={[mainStyle.card, gameStyle.taskCard]}>
                    
                    {task.sight_image ? (
                        <View style={gameStyle.taskImageThumbWrapper}>
                            <Image
                                source={{ uri: task.sight_image }}
                                style={gameStyle.taskImageThumb}
                            />
                        </View>
                    ) : null}

                    {task.question ? (
                        <View style={gameStyle.taskTextWrapper}>
                            <Text style={gameStyle.questionText}>{task.question}</Text>
                        </View>
                    ) : null}
                    
                </View>
            ) : null}

            {
                (game.sight_hint2) ? (
                    <View style={gameStyle.hintContainer}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setModal('hint2')}
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