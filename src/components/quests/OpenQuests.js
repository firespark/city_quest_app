import React, { useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { OpenQuest } from './OpenQuest'

import {Loader} from '../common/Loader'
import {Error} from '../common/Error'

import { gStyle } from '../../styles/style'

import { MainContext } from '../../context/mainContext'

import { Http } from '../../scripts/http'


export const OpenQuests = () => {

    const { token } = useContext(MainContext)
    const [data, setData] = useState()

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {

        setError(null)
        setLoader(true)

        try {
            //const token = await AsyncStorage.getItem('APP_TOKEN')
            
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/quests/opened`, token)

            if (output.success == 1) {
                setData(output.data)
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

    useEffect(() => {
        fetchData()
    }, [])

    const list = []

    if(data){
        data.map((item, index) => (  
            list.push(
                <View key={index}>
                    <OpenQuest quest={item} />
                </View>
            ) 
        ))
    }

    if (loader) {
        return <Loader />
    }

    return (
        <View>
            <Text style={[gStyle.title, gStyle.mt10]}>Открытые квесты</Text>
            <View style={gStyle.mt10}>
                {
                    (list.length > 0)
                    ? 
                    list
                    :
                    <Text style={[gStyle.textCenter, gStyle.mt10]}>Нет открытых квестов</Text>
                }
            </View>
        </View>
    )


}