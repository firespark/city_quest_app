import { useContext, useState } from 'react'
import { Keyboard, Text, View } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'
import { AnswerForm } from './AnswerForm'

export const FinishQuestion = ({ question, setGame }) => {
    const { questId, token } = useContext(MainContext)
    const [answers, setAnswers] = useState({})

    const submitAnswers = values => Http.post(
        `${process.env.EXPO_PUBLIC_API_URL}/games/checkFinishAnswer/${questId}`,
        { quest_answer: values },
        token
    )

    const onCorrect = data => {
        Keyboard.dismiss()
        setGame(data)
    }

    return (
        <View style={[mainStyle.card, mainStyle.container]}>
            <Text style={mainStyle.subtitle}>Последняя загадка</Text>
            <Text style={mainStyle.paragraph}>{question.text}</Text>
            {question.answers.length > 0 && (
                <Text selectable style={[mainStyle.paragraph, mainStyle.textBold]}>
                    {question.answers.join(', ').toUpperCase()}
                </Text>
            )}
            <AnswerForm
                inputCount={Number(question.inputs ?? 1)}
                answers={answers}
                onChangeAnswers={setAnswers}
                submitAnswers={submitAnswers}
                onCorrect={onCorrect}
                allowSinglePhrase
            />
        </View>
    )
}
