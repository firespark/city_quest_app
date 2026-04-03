import { useContext, useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

import { Modes } from '../modes/Modes'
import { Loader } from '../../common/Loader'
import { Error } from '../../common/Error'

import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'

export const ModeTemplate = ({ setGame }) => {

    const { questId, token } = useContext(MainContext)
    const [selectedId, setSelectedId] = useState(1);
    const [modes, setModes] = useState([])

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setError(null)
        setLoader(true)
        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/modes`)
            if (output.success == 1) {
                setModes(output.data)
            } else {
                if (output.error) {
                    setError(output.error)
                } else {
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        } finally {
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
            const postdata = { mode_id: selectedId }
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/games/setMode/${questId}`, postdata, token)

            if (output.success == 1) {
                setGame(output.data)
            } else {
                if (output.error) {
                    setError(output.error)
                } else {
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        } finally {
            setLoader(false)
        }
    }

    if (loader) {
        return <Loader />
    }

    return (
        <View style={gameStyle.modeTemplateContainer}>
            <View style={[mainStyle.center]}>
                <Text style={mainStyle.titleMain}>Выбери сложность</Text>
            </View>

            <Modes
                modes={modes}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />

            {error && <View><Error text={error} /></View>}

            <View style={[mainStyle.center, mainStyle.mt5]}>
                <TouchableOpacity
                    style={mainStyle.primaryButton}
                    activeOpacity={0.7}
                    onPress={() => { setMode() }}
                >
                    <Text style={mainStyle.primaryButtonText}>Вперед!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
