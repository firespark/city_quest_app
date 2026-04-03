import { useContext, useState } from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator, Modal } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { questsStyle } from '../../styles/questsStyle'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const BuyButton = ({ questId, onSuccess }) => {
    const { token, questScreenCleanup } = useContext(MainContext)
    const [loading, setLoading] = useState(false)
    const [showGoogleModal, setShowGoogleModal] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const startPurchase = () => {
        setIsSuccess(false)
        setShowGoogleModal(true)
    }

    const confirmPurchase = async () => {
        setLoading(true)
        try {
            const output = await Http.post(
                `${process.env.EXPO_PUBLIC_API_URL}/quests/buy`,
                {
                    quest_id: questId,
                    mock_google_token: 'fake_token_12345'
                },
                token
            )

            if (output.success === 1) {
                setIsSuccess(true)

                setTimeout(async () => {
                    setShowGoogleModal(false)
                    questScreenCleanup()
                    if (onSuccess) await onSuccess()
                }, 1500)
            } else {
                setShowGoogleModal(false)
            }
        } catch (e) {
            console.error('Error:', e)
            setShowGoogleModal(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={mainStyle.center}>
            <TouchableOpacity style={mainStyle.buttonBuy} onPress={startPurchase} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={mainStyle.buttonText}>Купить квест</Text>}
            </TouchableOpacity>

            <Modal visible={showGoogleModal} transparent={true} animationType="slide">
                <View style={questsStyle.modalOverlay}>
                    <View style={questsStyle.googleWindow}>
                        {!isSuccess ? (
                            <>
                                <Text style={questsStyle.googleTitle}>Google Play (Имитация)</Text>
                                <Text style={questsStyle.itemName}>Квест-экскурсия (полная версия)</Text>
                                <Text style={questsStyle.price}>199,00 ₽</Text>

                                <TouchableOpacity
                                    style={questsStyle.payBtn}
                                    onPress={confirmPurchase}
                                    disabled={loading}
                                >
                                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={questsStyle.payBtnText}>1-TAP BUY</Text>}
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setShowGoogleModal(false)}>
                                    <Text style={questsStyle.cancelText}>Отмена</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <View style={questsStyle.successContainer}>
                                <Text style={questsStyle.checkText}>✓</Text>
                                <Text style={questsStyle.successText}>Платеж выполнен!</Text>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    )
}
