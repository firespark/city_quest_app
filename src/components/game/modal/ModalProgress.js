import React, { useState, useContext } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'

import {Loader} from '../../common/Loader'
import {Error} from '../../common/Error'

import { gStyle, gStyleProgress } from '../../../styles/style'

import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'




export const ModalProgress = ({ game, setGame, setModal }) => {

    const { questId, token } = useContext(MainContext)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const content = []


    for (let i = 1; i <= game.levels; i++) {
        let st = gStyleProgress.progressDisabled
        if(i < game.step_total) st = gStyleProgress.progressDone
        if (i == game.levels) st = gStyleProgress.progressFinish
        if (i == game.step_total) st = gStyleProgress.progressInProgress
        if (i == game.levels && i == game.step_total) st = gStyleProgress.progressFinishDone
        if (i == game.step) st = gStyleProgress.progressCurrentBig
        if (i == game.step && i == game.levels) st = [gStyleProgress.progressCurrentBig, gStyleProgress.progressFinishDone]

        if (i <= game.step_total) {

            content.push(
                <TouchableOpacity
                    key={i}
                    style={[gStyleProgress.progressPointBig, st]}
                    activeOpacity={0.7}
                    onPress={() => {
                        setLevel(i)
                    }}
                >
                    {
                        (i == game.levels)
                        ?
                        <Image source={require('../../../../assets/img/finish.png')} style={gStyleProgress.finish} />
                        :
                        <Text style={gStyleProgress.progressCounter}>{i}</Text>
                    }
                    
                </TouchableOpacity>
            )
        }
        else {
            content.push(
                <View
                    key={i} 
                    style={[gStyleProgress.progressPointBig, st]}
                >
                    {
                        (i == game.levels)
                        ?
                        <Image source={require('../../../../assets/img/finish.png')} style={gStyleProgress.finish} />
                        :
                        <Text style={gStyleProgress.progressCounter}>{i}</Text>
                    }
                </View>
            )
        }
    }

    const setLevel = async (value) => {
        setError(null)
        setLoader(true)
        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/games/getLevel/${questId}/${value}`, token)
          
            if (output.success == 1) {
                setGame(output.data)
                setModal(null)
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

	if (loader) {
        return <Loader />
    }
	
    return (
    	
	    <View style={[gStyle.center, gStyle.mt20]}>
            <View style={gStyleProgress.progressWrapper}>
                {content}
            </View>
        </View>

    )
}

