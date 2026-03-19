import { useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { OpenQuest } from './OpenQuest'

import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { gStyle, gStyleCommon } from '../../styles/style'
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

    if (data) {
        Object.keys(data).map((countryName) => {
            list.push(
                <Text key={countryName} style={gStyleCommon.textTitle}>
                    {countryName}
                </Text>
            );

            data[countryName].map((item, index) => {
                list.push(
                    <View key={item.id}>
                        <OpenQuest quest={item} />
                    </View>
                )
            })
        })
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
                        (data && !loader) ? <Text style={[gStyle.textCenter, gStyle.mt10]}>Нет открытых квестов</Text> : null
                }
                {error && <Error text={error} />}
            </View>
        </View>
    )
}