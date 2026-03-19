import { useState, useContext } from 'react'
import { View, TouchableOpacity, Text, TextInput, Modal } from 'react-native'

import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { gStyle, gStyleCommon } from '../../styles/style'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const ResetModal = ({ modalVisible, setModalVisible, onSuccess }) => {

    const { questId, token } = useContext(MainContext)

    const [comment, setComment] = useState('');
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const resetProgress = async () => {
        if (comment.trim() === 'Подтверждаю') {
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
                setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            }
            finally {
                setLoader(false)
            }
        }
    }

    return (
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
            <View style={gStyleCommon.modalOverlay}>
                <View style={gStyleCommon.modalWindow}>
                    {loader ? (
                        <Loader />
                    ) : (
                        <View>
                            <View style={gStyle.mt10}>
                                <Text style={gStyle.title}>Вы действительно хотите сбросить</Text>
                                <Text style={gStyle.title}>прогресс квеста?</Text>
                            </View>

                            <View style={[gStyle.mt20, gStyle.block320]}>
                                <Text style={gStyle.textRed}>
                                    Это действие нельзя отменить, если вы действительно хотите сбросить прогресс текущего квеста и начать заново - введите "Подтверждаю" без кавычек в поле снизу и нажмите на кнопку
                                </Text>

                                <View style={gStyle.mt10}>
                                    <TextInput
                                        placeholder="Сова, подтверди"
                                        style={[gStyle.textarea, gStyle.mt5]}
                                        placeholderTextColor={'#C4C4C4'}
                                        multiline
                                        numberOfLines={3}
                                        onChangeText={(value) => setComment(value)}
                                        value={comment}
                                    />
                                </View>
                            </View>

                            <View style={gStyle.center}>
                                <TouchableOpacity
                                    style={[gStyle.buttonReset, gStyle.mt30]}
                                    activeOpacity={0.7}
                                    onPress={resetProgress}
                                >
                                    <Text style={gStyle.buttonTextSmall}>Сбросить прогресс</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={gStyle.mt20}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={gStyle.link}>Отмена</Text>
                                </TouchableOpacity>
                            </View>

                            {error && <Error text={error} />}
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    )
}
