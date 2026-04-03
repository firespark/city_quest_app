import { useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { questsStyle } from '../../styles/questsStyle'
import { mainStyle } from '../../styles/mainStyle'

import { OpenQuest } from './OpenQuest'
import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

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
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/quests/opened`, token)
            if (output.success == 1) {
                const grouped = output.data.reduce((acc, quest) => {
                    const country = quest.country_title || 'Другие';
                    if (!acc[country]) acc[country] = [];
                    acc[country].push(quest);
                    return acc;
                }, {});
                setData(grouped);
            } else {
                setError(output.error || 'Ошибка загрузки')
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loader) return <Loader />

    return (
        <View>
            <Text style={questsStyle.blockTitle}>Открытые квесты</Text>

            {data && Object.keys(data).length > 0 ? (
                Object.keys(data).map((countryName) => (
                    <View key={countryName} style={questsStyle.countryBlock}>

                        <View style={questsStyle.countryHeader}>
                            <Ionicons 
                                name="globe-outline" 
                                size={18} 
                                color="#7F8C8D" 
                                style={mainStyle.mr10} 
                            />
                            <Text style={questsStyle.countryTitle}>{countryName}</Text>
                        </View>

                        {data[countryName].map((item, index) => (
                            <View key={item.id || index}>
                                <OpenQuest quest={item} />
                            </View>
                        ))}
                    </View>
                ))
            ) : (
                <Text style={questsStyle.emptyText}>Нет открытых квестов</Text>
            )}

            {error && <Error text={error} />}
        </View>
    )
}
