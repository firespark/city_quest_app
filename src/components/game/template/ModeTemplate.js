import React, { useContext, useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import { Modes } from '../modes/Modes'

import {Loader} from '../../common/Loader'
import {Error} from '../../common/Error'

import { gStyle } from '../../../styles/style'

import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'



export const ModeTemplate = ({ game, setGame }) => {

    const { questId, token } = useContext(MainContext)

	const [selectedId, setSelectedId] = useState(1);

    const [modes, setModes] = useState([])

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {

        setError(null)
        setLoader(true)

        try {
            const output = await Http.get(`https://test2.gagara-web.ru/api/modes`)

            if (output.success == 1) {
                setModes(output.data)
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

    const setMode = async () => {

        setError(null)
        setLoader(true)

        try {
            const postdata = {mode_id: selectedId}

            const output = await Http.post(`https://test2.gagara-web.ru/api/games/setMode/${questId}`, postdata, token)

            if (output.success == 1) {
                setGame(output.data)
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

    if (loader) {
        return <Loader />
    }
	
    return (
    	
	    <View>
            <View style={gStyle.mt10}>
                <Text style={gStyle.title}>Выбери сложность:</Text>
            </View>
            <Modes
                modes={modes}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />
            <View style={gStyle.center}>
                <TouchableOpacity
                    style={[gStyle.button, gStyle.mt20]}
                    activeOpacity={0.7}
                    onPress={() => {
                        setMode()
                    }}
                >
                    <Text style={gStyle.buttonText}>Вперед!</Text>
                </TouchableOpacity>
            </View>
        </View>  



    )
}

