import React, { useContext } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import {Loader} from '../../common/Loader'
import {Error} from '../../common/Error'

import { gStyle, gStyleProgress } from '../../../styles/style'

import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'



export const LevelsTemplate = ({ game, setGame }) => {

    const { questId, token } = useContext(MainContext)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const content = []


    for (let i = 1; i <= game.levels; i++) {
        let st = gStyleProgress.progressDisabled
        if(i < game.step_total) st = gStyleProgress.progressDone
        if(i == game.step) st = gStyleProgress.progressCurrentBig

        if(i <= game.step_total) {

            content.push(
                <TouchableOpacity
                    key={i} 
                    style={[gStyleProgress.progressPointBig, st]}
                    activeOpacity={0.7}
                    onPress={() => {
                        setLevel(i)
                    }}
                >
                    <Text style={gStyleProgress.progressCounter}>{i}</Text>
                </TouchableOpacity>
            )
        }
        else {
            content.push(
                <View
                    key={i} 
                    style={[gStyleProgress.progressPointBig, st]}
                >
                    <Text style={gStyleProgress.progressCounter}>{i}</Text>
                </View>
            )
        }
    }

    const setLevel = async (value) => {
        setError(null)
        setLoader(true)
        try {
            const output = await Http.get(`https://test2.gagara-web.ru/api/games/getLevel/${questId}/${value}`, token)

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
    	
	    <View style={[gStyle.center, gStyle.mt20]}>
            <View style={gStyleProgress.progressWrapper}>
                {content}
            </View>
        </View>

    )
}

