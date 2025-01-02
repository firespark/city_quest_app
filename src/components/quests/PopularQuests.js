import React, { useState, useEffect, useContext } from 'react'
import { View } from 'react-native'
import { Quest } from './Quest'

import {Loader} from '../common/Loader'
import {Error} from '../common/Error'

import { gStyle } from '../../styles/style'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'


export const PopularQuests = () => {

    const [data, setData] = useState();
    const { token } = useContext(MainContext)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {

        setError(null)
        setLoader(true)

        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/quests/featured`, token)

            if (output.success == 1) {
                setData(output.data.sort((a, b) => {
                    const statusOrder = ['in_progress', null, 'finished'];
                  
                    const aIndex = statusOrder.indexOf(a.status);
                    const bIndex = statusOrder.indexOf(b.status);
                  
                    return aIndex - bIndex;
                  }))
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
        <View>
            {list}
        </View>
    )


}