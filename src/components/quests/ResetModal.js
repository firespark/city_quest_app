import { useState, useContext } from 'react'
import { View, TouchableOpacity, Text, TextInput, Modal } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { questsStyle } from '../../styles/questsStyle'

import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const ResetModal = ({ modalVisible, setModalVisible, onSuccess }) => {

    const { questId, token } = useContext(MainContext)

    const [comment, setComment] = useState('');
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const resetProgress = async () => {
        if (comment.trim().toLowerCase() === 'подтверждаю') {
            const postdata = {}
            setError(null)
            setLoader(true)

            try {
                const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/games/reset/${questId}`, postdata, token)

                if (output.success == 1) {
                    setModalVisible(false);
                    setComment('');

                    if (onSuccess) {
                        onSuccess();
                    }
                }
                else {
                    setError(output.error || 'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
            catch (e) {
                console.error('Error:', e)
                setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            }
            finally {
                setLoader(false)
            }
        } else if (comment.trim().length > 0) {
            setError('Введите слово "Подтверждаю" без ошибок');
        }
    }

    return (
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
            <View style={mainStyle.modalOverlay}>
                <View style={mainStyle.card}>
                    {loader ? (
                        <Loader />
                    ) : (
                        <View style={[mainStyle.mt15, mainStyle.mb15]}>
                            <View style={mainStyle.center}>
                                <Text style={mainStyle.titleMain}>Сброс прогресса</Text>
                            </View>

                            <View style={mainStyle.mb25}>
                                <Text style={mainStyle.errorText}>
                                    Это действие нельзя отменить. Если вы действительно хотите сбросить прогресс и начать квест заново, введите слово <Text style={mainStyle.textBold}>Подтверждаю</Text> в поле ниже.
                                </Text>

                                <TextInput
                                    placeholder="Подтверждаю"
                                    style={[mainStyle.modernInput, mainStyle.mt25]}
                                    placeholderTextColor={'#BDC3C7'}
                                    onChangeText={(value) => {
                                        setComment(value);
                                        setError(null);
                                    }}
                                    value={comment}
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={mainStyle.center}>
                                <TouchableOpacity
                                    style={mainStyle.dangerButton}
                                    activeOpacity={0.7}
                                    onPress={resetProgress}
                                >
                                    <Text style={mainStyle.dangerButtonText}>Сбросить прогресс</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[questsStyle.resetCancelLink, mainStyle.mt10]}
                                    onPress={() => {
                                        setModalVisible(false);
                                        setError(null);
                                        setComment('');
                                    }}
                                >
                                    <Text style={mainStyle.description}>Отмена</Text>
                                </TouchableOpacity>
                            </View>

                            {error && <View style={mainStyle.mt15}><Error text={error} /></View>}
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    )
}
