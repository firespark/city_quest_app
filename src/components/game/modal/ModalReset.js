import React, { useState, useContext } from 'react'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'

import {Loader} from '../../common/Loader'
import {Error} from '../../common/Error'

import { gStyle } from '../../../styles/style'
import { QUEST_SCREEN } from '../../../context/types'
import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'


export const ModalReset = ({ setModal, setGame }) => {

    const { questId, token, changeScreen, setQuestId, questScreenCleanup } = useContext(MainContext)

    const [comment, setComment] = useState(null);

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const resetProgress = async () => {

        if (comment == 'Подтверждаю') {
            const postdata = {}

            setError(null)
            setLoader(true)
            try {
                const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/games/reset/${questId}`, postdata, token)
                console.log(output)
                if (output.success == 1) {
                    setGame([]);
                    changeScreen(QUEST_SCREEN);
                    setQuestId(questId);
                    questScreenCleanup();
                    setModal(null);
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
        

    }

    if (loader) {
        return <Loader />
    }


    return (
        <View>
            <View style={gStyle.mt10}>
                <Text style={gStyle.title}>Вы действительно хотите сбросить</Text>
                <Text style={gStyle.title}>прогресс квеста?</Text>
            </View>
            <View style={[gStyle.mt20, gStyle.block320]}>
               
                <Text style={gStyle.textRed}>Это действие нельзя отменить, если вы действительно хотите сбросить прогресс текущего квеста и начать заново - введите "Подтверждаю" без кавычек в поле снизу и нажмите на кнопку</Text>

                <View style={gStyle.mt10}>
                    <TextInput 
                        placeholder="Сова, подтверди"
                        style={[gStyle.textarea, gStyle.mt5]}
                        placeholderTextColor={'#C4C4C4'}
                        multiline
                        numberOfLines={3}
                        onChangeText={(value) => setComment(value)}
                    />
                </View>
            
            </View>

          
            <View style={gStyle.center}>
                <TouchableOpacity
                    style={[gStyle.button, gStyle.mt20]}
                    activeOpacity={0.7}
                    onPress={() => {
                        resetProgress()
                    }}
                >
                    <Text style={gStyle.buttonText}>Сбросить прогресс</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

