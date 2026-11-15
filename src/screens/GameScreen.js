import { useContext, useState, useEffect } from 'react'
import { View, BackHandler, Modal, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { mainStyle } from '../styles/mainStyle'

import { GameTemplate } from '../components/game/template/GameTemplate'
import { ModalTemplate } from '../components/game/template/ModalTemplate'

import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'
import { ConnectionError } from '../components/common/ConnectionError'

import { MainContext } from '../context/mainContext'
import { Http } from '../scripts/http'
import { ARPrototypeScreen } from './ARPrototypeScreen'

export const GameScreen = () => {
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(null)

    const { questId, token, setAnswersState } = useContext(MainContext)

    const [modal, setModal] = useState(null)
    const [game, setGame] = useState([])

    useEffect(() => {
        if (modal) Keyboard.dismiss()
        const backAction = () => {
            if (modal) {
                setModal(null)
            } else {
                setModal('back')
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [modal]);

    const fetchData = async () => {
        setError(null)
        setLoader(true)

        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/games/get/${questId}`, token)

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

    useEffect(() => {
        fetchData()
    }, [])

    const nextGame = async () => {
        setAnswersState([]);
        setError(null)
        setLoader(true)

        let method = null

        if (game.is_level) {
            const level = Array.isArray(game.step_numbers)
                ? game.step_numbers.find(step => step > Number(game.step)) ?? Number(game.step) + 1
                : Number(game.step) + 1
            method = `${process.env.EXPO_PUBLIC_API_URL}/games/getLevel/${questId}/${level}`
        } else {
            method = `${process.env.EXPO_PUBLIC_API_URL}/games/next/${questId}`
        }

        try {
            const output = await Http.get(method, token)

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

    if (error === 'connection_error') {
        return <ConnectionError onRetry={fetchData} />
    }
    if (error) {
        return <Error text={error} onRetry={fetchData} />
    }

    return (
        <View style={mainStyle.pageBackground}>
            <GameTemplate
                game={game}
                setGame={setGame}
                setModal={setModal}
                nextGame={nextGame}
                keyboardEnabled={!modal}
            />
            <Modal visible={!!modal} animationType="none" onRequestClose={() => setModal(null)}>
                <SafeAreaView style={mainStyle.pageBackground} edges={['top', 'bottom']}>
                    {modal === 'ar' ? (
                        <ARPrototypeScreen point={game.ar_point} onClose={() => setModal(null)} />
                    ) : modal ? (
                        <ModalTemplate
                            game={game}
                            modal={modal}
                            setModal={setModal}
                            setGame={setGame}
                            nextGame={nextGame}
                        />
                    ) : null}
                </SafeAreaView>
            </Modal>
        </View>
    )
}
