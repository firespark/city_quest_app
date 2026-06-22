import { useState, useContext } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

import { Loader } from '../../common/Loader'
import { Error } from '../../common/Error'
import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'

export const ModalChangeFormatAlert = ({ game, setModal, setGame }) => {

    const { questId, token, setAnswersState } = useContext(MainContext)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const newFormatId = game.format_id === 1 ? 2 : 1;
    const newFormatName = newFormatId === 2 ? '«Экскурсия»' : '«Квест»';

    const changeFormat = async () => {
        setError(null)
        setLoader(true)

        const postdata = { format_id: newFormatId }

        try {
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/games/setFormat/${questId}`, postdata, token)

            if (output.success == 1) {
                setAnswersState([]);
                setGame(output.data);
                setModal(null);
            } else {
                setError(
                    output.error === 'connection_error' 
                    ? 'Отсутствует подключение к интернету' 
                    : (output.error || 'Произошла ошибка')
                );
            }
        } catch (e) {
            console.log('Error:', e.message);
            setError('Отсутствует подключение к интернету');
        } finally {
            setLoader(false);
        }
    }

    if (loader) return <Loader />

    return (
        <View style={[mainStyle.container, mainStyle.center]}>
             <Text style={mainStyle.titleMain}>Переключиться на формат {newFormatName}?</Text>
            <Text style={[mainStyle.formSubtitle, mainStyle.mb20]}>
                Вы уверены, что хотите сменить формат? Текущий прогресс будет сброшен.
                {/*newFormatId === 2 
                    ? ' Текущий прогресс будет сброшен.' 
                    : ' Вам нужно будет разгадать загадку.'*/}
            </Text>

            {error && <View style={mainStyle.mb20}><Error text={error} /></View>}

            <View style={gameStyle.gameActions}>
                <TouchableOpacity
                    style={mainStyle.primaryButton}
                    activeOpacity={0.7}
                    onPress={changeFormat}
                >
                    <Text style={mainStyle.primaryButtonText}>Да, сменить</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={gameStyle.gameCancelLink}
                    activeOpacity={0.7}
                    onPress={() => setModal(null)}
                >
                    <Text style={gameStyle.gameLinkText}>Отмена</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
