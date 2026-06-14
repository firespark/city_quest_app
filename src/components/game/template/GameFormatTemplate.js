import { useContext, useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

import { GameFormat } from '../GameFormat'

import { Loader } from '../../common/Loader'
import { Error } from '../../common/Error'

import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'

export const GameFormatTemplate = ({ setGame }) => {

    const { questId, token } = useContext(MainContext)
    const [selectedId, setSelectedId] = useState(1);

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const setFormat = async () => {
        setError(null)
        setLoader(true)
        try {
            const postdata = { format_id: selectedId }
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/games/setFormat/${questId}`, postdata, token)

            if (output.success == 1) {
                setGame(output.data)
            } else {
                setError(output.error || 'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        } finally {
            setLoader(false)
        }
    }

    if (loader) return <Loader />

    return (
        <View style={gameStyle.modeTemplateContainer}>
            <View style={mainStyle.center}>
                <Text style={mainStyle.titleMain}>Выбери формат</Text>
            </View>

            <GameFormat
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />

            {error && <View><Error text={error} /></View>}

            <View style={[mainStyle.center, mainStyle.mt5]}>
                <TouchableOpacity
                    style={mainStyle.primaryButton}
                    activeOpacity={0.7}
                    onPress={setFormat}
                >
                    <Text style={mainStyle.primaryButtonText}>Начать</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
