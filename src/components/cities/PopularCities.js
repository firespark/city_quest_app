import { useState, useEffect, useContext } from 'react'

import { mainStyle } from '../../styles/mainStyle'

import { View } from 'react-native'
import { PopularCity } from './PopularCity'

import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { Http } from '../../scripts/http'
import { MainContext } from '../../context/mainContext'

export const PopularCities = () => {

    const { countryId } = useContext(MainContext)

    const [data, setData] = useState();
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {

        if (!countryId) return

        setError(null)
        setLoader(true)

        try {

            const url = `${process.env.EXPO_PUBLIC_API_URL}/cities/featured?country_id=${countryId}`
            const output = await Http.get(url)

            if (output.success == 1) {
                setData(output.data)
            }
            else {
                setError(output.error || 'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
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
    }, [countryId])

    if (loader) {
        return <Loader />
    }

    if (error) {
        return <Error text={error} />
    }

    return (
        <View style={mainStyle.container}>
            {data && data.map((item, index) => (
                <View key={item.id || index}>
                    <PopularCity city={item} />
                </View>
            ))}
        </View>
    )
}