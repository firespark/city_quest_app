import { useContext, useState } from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator, Modal } from 'react-native'

import { questsStyle } from '../../styles/questsStyle'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const MockGoogleModal = ({ visible, onClose, onSuccess, type, itemName, price }) => {

    const { token, questId } = useContext(MainContext)
    
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const confirmPurchase = async () => {
        setLoading(true)
        try {
            const output = await Http.post(
                `${process.env.EXPO_PUBLIC_API_URL}/games/buy-extras/${questId}`,
                { type: type, mock_google_token: 'fake_token_123' },
                token
            )

            if (output.success === 1) {
                setIsSuccess(true)

                setTimeout(() => {
                    setIsSuccess(false)
                    onClose()
                    if (onSuccess) {
                        onSuccess(output.data)
                    }
                }, 1500)
            } else {
                alert('Ошибка при покупке')
                onClose()
            }
        } catch (e) {
            console.error('Error:', e)
            alert('Проверьте подключение к сети')
            onClose()
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={questsStyle.modalOverlay}>
                <View style={questsStyle.googleWindow}>
                    {!isSuccess ? (
                        <>
                            <Text style={questsStyle.googleTitle}>Google Play (Имитация)</Text>
                            <Text style={questsStyle.itemName}>{itemName}</Text>
                            <Text style={questsStyle.price}>{price}</Text>

                            <TouchableOpacity
                                style={questsStyle.payBtn}
                                onPress={confirmPurchase}
                                disabled={loading}
                            >
                                {loading ? <ActivityIndicator color="#fff" /> : <Text style={questsStyle.payBtnText}>1-TAP BUY</Text>}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onClose} disabled={loading}>
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
    )
}
