
import { useContext, useState } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

import { Loader } from '../common/Loader'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const TaskAnswerForm = ({ game, setGame, setModal, answerNumber }) => {

    const { questId, token, answersState, setAnswersState } = useContext(MainContext)

    const [inputResults, setInputResults] = useState({})
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const inputCount = answerNumber === 1 ? game.inputs1 : game.inputs2
    const showHint = answerNumber === 1 ? game.sight_hint1 : game.sight_hint2

    const answersHandler = (key, value) => {
        value = value.replace(/\s/g, '')
        setAnswersState({ ...answersState, [key]: value })
    }

    const checkAnswer = async () => {
        setError(null)

        const allEmpty = Array.from(
            { length: inputCount },
            (_, i) => !String(answersState[i] ?? '').trim()
        ).every(Boolean)

        if (allEmpty) {
            const results = {}

            for (let i = 0; i < inputCount; i++) {
                results[i] = 0
            }

            setInputResults(results)
            return
        }

        setLoader(true)

        try {
            const postdata = {
                quest_answer: answersState,
                answer_number: answerNumber
            }

            const output = await Http.post(
                `${process.env.EXPO_PUBLIC_API_URL}/games/checkAnswer/${questId}`,
                postdata,
                token
            )

            if (output.success == 1) {
                setInputResults(output.data.inputResults || {})

                if (!output.data.errors) {
                    setGame(output.data)
                    setAnswersState([])
                    setModal(`answer${answerNumber}`)
                }
            } else {
                setError(output.error || 'Произошла ошибка при проверке ответа')
            }

        } catch (e) {
            console.error('Error:', e)
            setError('Произошла ошибка при отправке')
        } finally {
            setLoader(false)
        }
    }

    const inputs = []

    for (let i = 0; i < inputCount; i++) {
        let style = null

        if (typeof inputResults[i] !== 'undefined') {
            style = inputResults[i] == 1
                ? mainStyle.inputCorrect
                : mainStyle.inputError
        }

        inputs.push(
            <View key={i} style={gameStyle.inputWrapper}>
                <TextInput
                    placeholder={inputCount == 1 ? 'Ответ' : `Слово ${i + 1}`}
                    style={[mainStyle.modernInput, style]}
                    placeholderTextColor={'#BDC3C7'}
                    value={answersState[i] || ''}
                    onChangeText={(value) => answersHandler(i, value)}
                    autoCapitalize="none"
                    importantForAutofill="no"
                    autoComplete="off"
                    textContentType="none"
                    dataDetectorTypes="none"
                    autoCorrect={false}
                    spellCheck={false}
                />
            </View>
        )
    }

    return (
        <>
            {showHint ? (
                <View style={gameStyle.hintContainer}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setModal(`hint${answerNumber}`)}
                    >
                        <View style={gameStyle.hintPill}>
                            <Image
                                source={require('../../../assets/img/hint.png')}
                                style={gameStyle.hintIcon}
                            />
                            <Text style={gameStyle.hintTextActive}>
                                Подсказка
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : null}

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
                            onPress={checkAnswer}
                        >
                            <Text style={mainStyle.buttonText}>
                                Ответ
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {error ? (
                <View style={mainStyle.errorContainer}>
                    <Text style={mainStyle.errorText}>
                        {error}
                    </Text>
                </View>
            ) : null}
        </>
    )
}
