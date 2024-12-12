import React, { useState, useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { PopularCity } from './PopularCity'

import {Loader} from '../common/Loader'
import {Error} from '../common/Error'

import { gStyle } from '../../styles/style'

import { Http } from '../../scripts/http'


export const PopularCities = () => {

    const [data, setData] = useState();

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {

        setError(null)
        setLoader(true)

        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/cities/featured`)

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
            console.log(e)
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
                    <PopularCity city={item} />
                </View>
            ) 
        ))
    }

    
    if (loader) {
        return <Loader />
    }

    if (error) {
        return <Error text={error} />
    }

    return (
        <ScrollView
            horizontal={true}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
        >
            {list}
        </ScrollView>
    )


}