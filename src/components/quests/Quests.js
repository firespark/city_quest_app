import { useState, useEffect, useContext } from 'react'
import { View, Text } from 'react-native'
import { Quest } from './Quest'
import { QuestFilters } from './QuestFilters'

import { Loader } from '../common/Loader'

import { mainStyle } from '../../styles/mainStyle'

import { Http } from '../../scripts/http'
import { MainContext } from '../../context/mainContext'

export const Quests = ({ cityId, showFilters = false }) => {

    const [data, setData] = useState(null);
    const { token } = useContext(MainContext)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)
    
    const [filter, setFilter] = useState('all');

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
                }))
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

    if (!data || data.length === 0) {
        return (
            <View style={mainStyle.wrapper}>
                <Text style={[mainStyle.description, mainStyle.textCenter, mainStyle.mt20]}>
                    В этом городе пока нет доступных квестов.
                </Text>
            </View>
        )
    }

    const filteredData = data.filter(item => {
        if (filter === 'free') return !item.paid;
        if (filter === 'paid') return item.paid;
        return true; 
    });

    return (
        <View style={mainStyle.wrapper}>
            
            {showFilters && (
                <QuestFilters filter={filter} setFilter={setFilter} />
            )}

            {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                    <View key={item.id || index}>
                        <Quest quest={item} />
                    </View>
                ))
            ) : (
                <Text style={[mainStyle.description, mainStyle.textCenter, mainStyle.mt20]}>
                    В этой категории пока нет квестов.
                </Text>
            )}

        </View>
    )
}
