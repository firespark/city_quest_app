import { useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { PurchasedQuest } from './PurchasedQuest';
import { Loader } from '../common/Loader'
import { gStyle } from '../../styles/style'
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
        } catch(e) {
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
        <View style={gStyle.mt20}>
            <Text style={gStyle.title}>Купленные квесты</Text>
            <View style={gStyle.mt10}>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <View key={index}>
                            <PurchasedQuest quest={item} />
                        </View>
                    ))
                ) : (
                    <Text style={[gStyle.textCenter, gStyle.mt10]}>Нет купленных квестов</Text>
                )}
            </View>
        </View>
    )
}