import { useState, useContext } from 'react'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'

import { Loader } from '../../common/Loader'
import { Error } from '../../common/Error'
import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'

export const ModalSkipAlert = ({ setModal, setGame }) => {

    const { questId, token } = useContext(MainContext)

    const [reason, setReason] = useState(1);
    const [comment, setComment] = useState(null);

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const getSkip = async () => {
        setError(null)
        setLoader(true)

        const postdata = { reason_id: reason, comment: comment }

        try {
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/games/getSkip/${questId}`, postdata, token)

            if (output.success == 1) {
                setGame(output.data)
            }
            else {
                if (output.error) {
                    setError(output.error)
                }
                else {
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
        }
        catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        }
        finally {
            setLoader(false)
        }
    }

    if (loader) return <Loader />

    const renderRadioItem = (id, text) => {
        const isSelected = reason === id;
        return (
            <TouchableOpacity
                style={[mainStyle.radioCard, isSelected && mainStyle.radioCardActive]}
                activeOpacity={0.7}
                onPress={() => setReason(id)}
            >
                <View style={[mainStyle.radioOuter, isSelected && mainStyle.radioOuterActive]}>
                    {isSelected ? <View style={mainStyle.radioInner} /> : null}
                </View>
                <Text style={[mainStyle.radioText, isSelected && mainStyle.radioTextActive]}>{text}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={mainStyle.container}>
            <Text style={mainStyle.titleMain}>Пропустить задание?</Text>
            <Text style={mainStyle.formSubtitle}>Пожалуйста, укажите причину:</Text>

            <View style={mainStyle.mt20}>
                {renderRadioItem(1, "Я не знаю правильный ответ")}
                {renderRadioItem(2, "Я знаю правильный ответ, но он не подходит")}
                {renderRadioItem(3, "Другая причина")}

                {reason === 3 && (
                    <TextInput
                        placeholder="Напишите причину"
                        style={mainStyle.modernTextarea}
                        placeholderTextColor={'#BDC3C7'}
                        multiline
                        numberOfLines={3}
                        onChangeText={(value) => setComment(value)}
                    />
                )}
            </View>

            {error && <View style={mainStyle.mb15}><Error text={error} /></View>}

            <View style={[mainStyle.textCenter, mainStyle.mt15]}>
                <TouchableOpacity
                    style={mainStyle.primaryButton}
                    activeOpacity={0.7}
                    onPress={() => {
                        getSkip()
                        setModal(null)
                    }}
                >
                    <Text style={mainStyle.primaryButtonText}>Пропустить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
