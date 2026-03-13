import React, { useContext, useState } from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator, Modal, StyleSheet } from 'react-native'
import { gStyle, gStylePaid } from '../../styles/style'
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
            setShowGoogleModal(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={gStyle.center}>
            <TouchableOpacity style={gStyle.buttonBuy} onPress={startPurchase} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={gStyle.buttonText}>Купить квест</Text>}
            </TouchableOpacity>

            <Modal visible={showGoogleModal} transparent={true} animationType="slide">
                <View style={gStylePaid.modalOverlay}>
                    <View style={gStylePaid.googleWindow}>
                        {!isSuccess ? (
                            <>
                                <Text style={gStylePaid.googleTitle}>Google Play (Имитация)</Text>
                                <Text style={gStylePaid.itemName}>Квест-экскурсия (полная версия)</Text>
                                <Text style={gStylePaid.price}>199,00 ₽</Text>
                                
                                <TouchableOpacity 
                                    style={gStylePaid.payBtn} 
                                    onPress={confirmPurchase}
                                    disabled={loading}
                                >
                                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={gStylePaid.payBtnText}>1-TAP BUY</Text>}
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => setShowGoogleModal(false)}>
                                    <Text style={gStylePaid.cancelText}>Отмена</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <View style={gStylePaid.successContainer}>
                                <Text style={gStylePaid.checkText}>✓</Text>
                                <Text style={gStylePaid.successText}>Платеж выполнен!</Text>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    )
}
