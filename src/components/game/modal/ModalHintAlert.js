import React, { useState, useContext } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import {Loader} from '../../common/Loader'
import {Error} from '../../common/Error'

import { gStyle } from '../../../styles/style'

import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'


export const ModalHintAlert = ({ setModal, setGame }) => {

    const { questId, token, scrollViewRef } = useContext(MainContext)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const getHint = async () => {

        setError(null)
        setLoader(true)
    
        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/games/getHint/${questId}`, token)

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
        <View style={[gStyle.flex, gStyle.centerBlock]}>
            <Text style={gStyle.title}>Применить подсказку?</Text>
            <View style={[gStyle.center, gStyle.mt20]}>
            
                <TouchableOpacity
                    style={gStyle.button}
                    activeOpacity={0.7}
                    onPress={() => {
                        getHint()
                        setModal(null)
                        
                        if (scrollViewRef)
                            scrollViewRef.current?.scrollToEnd({animated: true})
                    }}
                >
                    <Text style={gStyle.buttonText}>Подсказка</Text>
                </TouchableOpacity>

            </View>
            <View style={[gStyle.center, gStyle.mt20]}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setModal(null)}
                >
                    <Text style={gStyle.link}>Не нужно</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

