import React, { useState, useContext } from 'react'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'

import {Loader} from '../../common/Loader'
import {Error} from '../../common/Error'

import { gStyle } from '../../../styles/style'

import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'


export const ModalSkipAlert = ({ setModal, game, setGame }) => {

    const { questId, token } = useContext(MainContext)

    const [reason, setReason] = useState(1);
    const [comment, setComment] = useState(null);

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const getSkip = async () => {

        setError(null)
        setLoader(true)
        
        const postdata = {reason_id: reason, comment: comment}
    
        try {
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/games/getSkip/${questId}`, postdata, token)

            if (output.success == 1) {
                setGame(output.data)
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
            <View style={gStyle.mt10}>
                <Text style={gStyle.title}>Почему ты хочешь пропустить задание?</Text>
            </View>
            <View style={[gStyle.mt20, gStyle.block320]}>
                <TouchableOpacity
                    style={[gStyle.panelRowLeft, gStyle.mb15]}
                    activeOpacity={0.7}
                    onPress={() => setReason(1)}
                >
                    <View style={gStyle.radioBoxOuter}>
                        {
                            (reason == 1) ?
                            <View style={gStyle.radioBoxInner}></View>
                            : null
                        }

                    </View>
                    <Text style={[gStyle.smallText, gStyle.ml10]}>Я не знаю правильный ответ</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={[gStyle.panelRowLeft, gStyle.mb15]}
                    activeOpacity={0.7}
                    onPress={() => setReason(2)}
                >
                    <View style={gStyle.radioBoxOuter}>
                        {
                            (reason == 2) ?
                            <View style={gStyle.radioBoxInner}></View>
                            : null
                        }
                    </View>
                    <Text style={[gStyle.smallText, gStyle.ml10]}>Я знаю правильный ответ, но он не подходит</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={[gStyle.panelRowLeft, gStyle.mb15]}
                    activeOpacity={0.7}
                    onPress={() => setReason(3)}
                >
                    <View style={gStyle.radioBoxOuter}>
                        {
                            (reason == 3) ?
                            <View style={gStyle.radioBoxInner}></View>
                            : null
                        }
                    </View>
                    <Text style={[gStyle.smallText, gStyle.ml10]}>Другая причина</Text>
                </TouchableOpacity>

                <View style={gStyle.mt10}>
                    <TextInput 
                        placeholder="Причина"
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
                        getSkip()
                        setModal(null)
                    }}
                >
                    <Text style={gStyle.buttonText}>Пропуск</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

