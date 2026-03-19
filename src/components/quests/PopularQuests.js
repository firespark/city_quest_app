import React, { useState, useEffect, useContext } from 'react'
import { View } from 'react-native'
import { Quest } from './Quest'

import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { gStyle } from '../../styles/style'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const PopularQuests = () => {

    const { token, countryId } = useContext(MainContext)
    
    const [data, setData] = useState();
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {

        if (!countryId) return

        setError(null)
        setLoader(true)

        try {
            const url = `${process.env.EXPO_PUBLIC_API_URL}/quests/featured?country_id=${countryId}`
            const output = await Http.get(url, token)


            if (output.success == 1) {
                setData(output.data.sort((a, b) => {
                    const statusOrder = ['in_progress', null, 'finished'];
                    const aIndex = statusOrder.indexOf(a.status);
                    const bIndex = statusOrder.indexOf(b.status);
                    return aIndex - bIndex;
                }))
            }
            else {
                setError(output.error || 'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
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
    }, [countryId])

    if (loader) {
        return <Loader />
    }

    if (error) {
        return <Error text={error} />
    }

    return (
        <View>
            {data && data.map((item, index) => (
                <View key={item.id || index}>
                    <Quest quest={item} />
                </View>
            ))}
        </View>
    )
}