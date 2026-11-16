import { useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'
import { getAnswerValues, splitAnswerInput } from '../../scripts/answerInput'
import { Loader } from '../common/Loader'

export const AnswerForm = ({ inputCount, answers, onChangeAnswers, submitAnswers, onCorrect, allowSinglePhrase = false }) => {
    const [inputResults, setInputResults] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const inputRefs = useRef([])
    const values = getAnswerValues(answers, inputCount)

    const changeAnswer = (index, value) => {
        const next = splitAnswerInput(value, index, inputCount, answers, allowSinglePhrase)
        onChangeAnswers(next.answers)
        if (next.focusIndex !== index) inputRefs.current[next.focusIndex]?.focus()
    }

    const checkAnswer = async () => {
        setError(null)
        if (values.every(value => !value.trim())) {
            setInputResults(values.map(() => 0))
            return
        }

        setLoading(true)
        try {
            const output = await submitAnswers(values)
            if (output.success == 1) {
                setInputResults(output.data.inputResults || {})
                if (!output.data.errors) onCorrect(output.data)
            } else {
                setError(output.error || 'Произошла ошибка при проверке ответа')
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Произошла ошибка при отправке')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? (
                <View style={mainStyle.mt30}>
                    <Loader />
                </View>
            ) : (
                <>
                    <View style={mainStyle.mt15}>
                        {values.map((value, index) => {
                            const result = inputResults[index]
                            const resultStyle = result == null ? null : result == 1 ? mainStyle.inputCorrect : mainStyle.inputError
                            const lastInput = index === inputCount - 1
                            return (
                                <View key={index} style={gameStyle.inputWrapper}>
                                    <TextInput
                                        ref={element => { inputRefs.current[index] = element }}
                                        returnKeyType={lastInput ? 'done' : 'next'}
                                        blurOnSubmit={lastInput}
                                        onSubmitEditing={() => inputRefs.current[index + 1]?.focus()}
                                        placeholder={inputCount === 1 ? 'Ответ' : `Слово ${index + 1}`}
                                        style={[mainStyle.modernInput, resultStyle]}
                                        placeholderTextColor={mainStyle.textDisabled.color}
                                        value={value}
                                        onChangeText={text => changeAnswer(index, text)}
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
                        })}
                    </View>
                    <View style={mainStyle.mt15}>
                        <TouchableOpacity style={mainStyle.primaryButton} activeOpacity={0.7} onPress={checkAnswer}>
                            <Text style={mainStyle.buttonText}>Ответ</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {error ? (
                <View style={mainStyle.errorContainer}>
                    <Text style={mainStyle.errorText}>{error}</Text>
                </View>
            ) : null}
        </>
    )
}
