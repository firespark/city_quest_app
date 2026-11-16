import { useContext } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import { gameStyle } from '../../styles/gameStyle'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'
import { AnswerForm } from './AnswerForm'

export const TaskAnswerForm = ({ game, setGame, setModal, answerNumber }) => {
    const { questId, token, answersState, setAnswersState } = useContext(MainContext)
    const firstQuestion = answerNumber === 1
    const inputCount = Number(firstQuestion ? game.inputs1 : game.inputs2)
    const showHint = firstQuestion ? game.sight_hint1 : game.sight_hint2

    const submitAnswers = () => Http.post(
        `${process.env.EXPO_PUBLIC_API_URL}/games/checkAnswer/${questId}`,
        { quest_answer: answersState, answer_number: answerNumber },
        token
    )

    const onCorrect = data => {
        setGame(data)
        setAnswersState([])
        setModal(`answer${answerNumber}`)
    }

    return (
        <>
            {showHint ? (
                <View style={gameStyle.hintContainer}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setModal(`hint${answerNumber}`)}>
                        <View style={gameStyle.hintPill}>
                            <Image source={require('../../../assets/img/hint.png')} style={gameStyle.hintIcon} />
                            <Text style={gameStyle.hintTextActive}>Подсказка</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : null}
            <AnswerForm
                inputCount={inputCount}
                answers={answersState}
                onChangeAnswers={setAnswersState}
                submitAnswers={submitAnswers}
                onCorrect={onCorrect}
            />
        </>
    )
}
