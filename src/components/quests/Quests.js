import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Quest } from './Quest'

import {Loader} from '../common/Loader'
import {Error} from '../common/Error'

import { gStyle } from '../../styles/style'

import { Http } from '../../scripts/http'


export const Quests = ({cityId}) => {

    const [data, setData] = useState();

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {

        setError(null)
        setLoader(true)

        try {
            const output = await Http.get(`https://test2.gagara-web.ru/api/quests/all/${cityId}`)

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
                    <Quest quest={item} />
                </View>
            ) 
        ))
    }

    if (loader) {
        return <Loader />
    }


    return (
        <View style={gStyle.mt10}>
            {list}
        </View>
    )


}