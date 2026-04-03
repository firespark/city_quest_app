import { useState, useContext } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

import { Loader } from '../../common/Loader'
import { Error } from '../../common/Error'
import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'

export const ModalHintAlert = ({ setModal, setGame }) => {

    const { questId, token, scrollViewRef } = useContext(MainContext)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const getHint = async () => {
        setError(null)
        setLoader(true)

        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/games/getHint/${questId}`, token)

            if (output.success == 1) {
                setGame(output.data)
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
            <Text style={mainStyle.titleMain}>Применить подсказку?</Text>

            {error && <View style={mainStyle.mb20}><Error text={error} /></View>}

            <View style={gameStyle.gameActions}>
                <TouchableOpacity
                    style={mainStyle.primaryButton}
                    activeOpacity={0.7}
                    onPress={() => {
                        getHint()
                        setModal(null)

                        if (scrollViewRef)
                            scrollViewRef.current?.scrollToEnd({ animated: true })
                    }}
                >
                    <Text style={mainStyle.primaryButtonText}>Показать подсказку</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={gameStyle.gameCancelLink}
                    activeOpacity={0.7}
                    onPress={() => setModal(null)}
                >
                    <Text style={gameStyle.gameLinkText}>Не нужно</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
