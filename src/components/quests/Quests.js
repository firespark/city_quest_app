import { useState, useEffect, useContext } from 'react'
import { View, Text } from 'react-native'
import { Quest } from './Quest'

import { Loader } from '../common/Loader'

import { mainStyle } from '../../styles/mainStyle'

import { Http } from '../../scripts/http'
import { MainContext } from '../../context/mainContext'

export const Quests = ({ cityId }) => {

    const [data, setData] = useState();
    const { token } = useContext(MainContext)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {

        setError(null)
        setLoader(true)

        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/quests/all/${cityId}`, token)

            if (output.success == 1) {
                setData(output.data.sort((a, b) => {
                    const statusOrder = ['in_progress', null, 'finished'];

                    const aIndex = statusOrder.indexOf(a.status);
                    const bIndex = statusOrder.indexOf(b.status);

                    return aIndex - bIndex;
                })
                )
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
            console.error('Error:', e)
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
        data.map((item, index) => (
            list.push(
                <View key={index}>
                    <Quest quest={item} />
                </View>
            )
        ))
    }

    if (loader) {
        return <Loader />
    }

    if (error) {
        return (
            <View style={mainStyle.mb20}>
                <Text style={mainStyle.errorText}>{error}</Text>
            </View>
        )
    }

    return (
        <View style={mainStyle.wrapper}>
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <View key={item.id || index}>
                        <Quest quest={item} />
                    </View>
                ))
            ) : (
                <Text style={[mainStyle.description, mainStyle.textCenter, mainStyle.mt20]}>
                    В этом городе пока нет доступных квестов.
                </Text>
            )}
        </View>
    )
}
