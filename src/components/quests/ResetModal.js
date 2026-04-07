import { useState, useContext } from 'react'
import { View, TouchableOpacity, Text, TextInput, Modal } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { modalStyle } from '../../styles/modalStyle'

import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const ResetModal = ({ modalVisible, setModalVisible, onSuccess }) => {

    const { questId, token } = useContext(MainContext)

    const [comment, setComment] = useState('');
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const closeModal = () => {
        setModalVisible(false);
        setError(null);
        setComment('');
    }

    const resetProgress = async () => {
        if (comment.trim().toLowerCase() === 'подтверждаю') {
            const postdata = {}
            setError(null)
            setLoader(true)

            try {
                const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/games/reset/${questId}`, postdata, token)

                if (output.success == 1) {
                    closeModal();
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
        <Modal
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={closeModal}
        >
            <TouchableOpacity
                style={modalStyle.countriesModalOverlay}
                activeOpacity={1}
                onPress={closeModal}
            >
                <View style={modalStyle.countriesBottomSheet} onStartShouldSetResponder={() => true}>
                    <View style={modalStyle.countriesDragIndicator} />

                    {loader ? (
                        <View style={{ paddingVertical: 40 }}>
                            <Loader />
                        </View>
                    ) : (
                        <>
                            <Text style={modalStyle.countriesSheetTitle}>Сброс прогресса</Text>

                            <View style={mainStyle.mb25}>
                                <Text style={[mainStyle.errorText, mainStyle.mb15]}>
                                    Это действие нельзя отменить. Если вы действительно хотите сбросить прогресс и начать квест заново, введите слово <Text style={mainStyle.textBold}>Подтверждаю</Text> в поле ниже.
                                </Text>

                                <TextInput
                                    placeholder="Подтверждаю"
                                    style={mainStyle.modernInput}
                                    placeholderTextColor={'#BDC3C7'}
                                    onChangeText={(value) => {
                                        setComment(value);
                                        setError(null);
                                    }}
                                    value={comment}
                                    autoCapitalize="none"
                                />
                                {error && <View style={mainStyle.mt10}><Error text={error} /></View>}
                            </View>

                            <View style={mainStyle.center}>
                                <TouchableOpacity
                                    style={[mainStyle.dangerButton, mainStyle.mb15]}
                                    activeOpacity={0.7}
                                    onPress={resetProgress}
                                >
                                    <Text style={mainStyle.dangerButtonText}>Сбросить прогресс</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={closeModal}
                                style={modalStyle.countriesCancelButton}
                            >
                                <Text style={modalStyle.countriesCancelText}>Отмена</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
