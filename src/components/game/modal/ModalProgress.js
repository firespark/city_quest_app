import { useState, useContext } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

import { Loader } from '../../common/Loader'
import { Error } from '../../common/Error'

import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'

export const ModalProgress = ({ game, setGame, setModal }) => {

    const { questId, token } = useContext(MainContext)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const content = []

    for (let i = 1; i <= game.levels; i++) {
        let st = gameStyle.progressMedalDisabled
        let textSt = gameStyle.progressTextDisabled

        if (i < game.step_total) {
            st = gameStyle.progressMedalDone;
            textSt = gameStyle.progressTextLight;
        }

        if (i == game.levels) {
            st = gameStyle.progressMedalFinish;
        }

        if (i == game.step_total) {
            st = gameStyle.progressMedalInProgress;
            textSt = gameStyle.progressTextLight;
        }

        if (i == game.levels && i == game.step_total) {
            st = gameStyle.progressMedalFinishDone;
        }

        let isCurrent = (i == game.step)
        if (isCurrent) {
            textSt = gameStyle.progressTextLight;
        }

        if (i <= game.step_total) {
            content.push(
                <TouchableOpacity
                    key={i}
                    style={[gameStyle.progressMedal, st, isCurrent && gameStyle.progressMedalCurrent]}
                    activeOpacity={0.7}
                    onPress={() => {
                        setLevel(i)
                    }}
                >
                    {
                        (i == game.levels)
                            ?
                            <Image source={require('../../../../assets/img/finish.png')} style={gameStyle.progressFinishIcon} />
                            :
                            <Text style={textSt}>{i}</Text>
                    }
                </TouchableOpacity>
            )
        }
        else {
            content.push(
                <View
                    key={i}
                    style={[gameStyle.progressMedal, st, isCurrent && gameStyle.progressMedalCurrent]}
                >
                    {
                        (i == game.levels)
                            ?
                            <Image source={require('../../../../assets/img/finish.png')} style={gameStyle.progressFinishIcon} />
                            :
                            <Text style={textSt}>{i}</Text>
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

    if (loader) {
        return <Loader />
    }

    return (
        <View style={[mainStyle.container, mainStyle.center]}>
            <View style={mainStyle.mb20}>
                <Text style={mainStyle.titleMain}>Карта квеста</Text>
            </View>
            {error && <View style={mainStyle.mb15}><Error text={error} /></View>}

            <View style={gameStyle.progressGrid}>
                {content}
            </View>
        </View>
    )
}
