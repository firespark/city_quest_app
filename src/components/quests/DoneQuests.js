import React, { useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { OpenQuest } from './OpenQuest'

import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { gStyle } from '../../styles/style'

import { MainContext } from '../../context/mainContext'

import { Http } from '../../scripts/http'


export const DoneQuests = () => {
    const { token } = useContext(MainContext)
    const [data, setData] = useState()
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setError(null)
        setLoader(true)
        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/quests/done`, token)
            if (output.success == 1) {

                const grouped = output.data.reduce((acc, quest) => {
                    const country = quest.country_title || 'Другие';
                    if (!acc[country]) {
                        acc[country] = [];
                    }
                    acc[country].push(quest);
                    return acc;
                }, {});
                setData(grouped);
            } else {
                setError(output.error || 'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом');
            }
        } catch (e) {
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом');
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loader) return <Loader />
    if (error) return <Error text={error} />

    return (
        <View style={gStyle.mb20}>
            <Text style={[gStyle.title, gStyle.mt10]}>Пройденные квесты</Text>

            {data && Object.keys(data).length > 0 ? (
                Object.keys(data).map((countryName) => (
                    <View key={countryName} style={gStyle.mt20}>

                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#333',
                            marginBottom: 10,
                            paddingLeft: 10,
                            borderLeftWidth: 4,
                            borderLeftColor: '#007AFF'
                        }}>
                            {countryName}
                        </Text>

                        {data[countryName].map((item, index) => (
                            <View key={item.id || index}>
                                <OpenQuest quest={item} />
                            </View>
                        ))}
                    </View>
                ))
            ) : (
                <Text style={[gStyle.textCenter, gStyle.mt10]}>Нет пройденных квестов</Text>
            )}
        </View>
    )
}