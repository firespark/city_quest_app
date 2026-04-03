import { useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'

import { questsStyle } from '../../styles/questsStyle'
import { mainStyle } from '../../styles/mainStyle'

import { PurchasedQuest } from './PurchasedQuest';
import { Loader } from '../common/Loader'
import { Error } from '../common/Error'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const PurchasedQuests = () => {
    const { token } = useContext(MainContext)
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setError(null)
        setLoader(true)
        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/quests/purchased`, token)
            if (output.success == 1) {
                setData(output.data)
            } else {
                setError(output.error || 'Ошибка загрузки')
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки при загрузке купленных квестов')
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
            <Text style={questsStyle.blockTitle}>Купленные квесты</Text>

            {error && (
                <View style={mainStyle.mb20}>
                    <Error text={error} />
                </View>
            )}

            <View>
                {data.length > 0 && data.map((item, index) => (
                    <View key={index}>
                        <PurchasedQuest quest={item} />
                    </View>
                ))}

                {data.length === 0 && !error && (
                    <Text style={questsStyle.emptyText}>Нет купленных квестов</Text>
                )}
            </View>
        </View>
    )
}
