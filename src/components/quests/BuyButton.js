import { useContext, useState } from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'
import { useGoogleBilling, ErrorCode } from '../../context/GoogleBillingContext'

export const BuyButton = ({ questId, onSuccess }) => {
    const { token, questScreenCleanup } = useContext(MainContext)
    const [loading, setLoading] = useState(false)
    const { buyProduct, finishConsumable } = useGoogleBilling()

    const handlePurchase = async () => {
        if (loading) return

        setLoading(true)

        try {
            const purchase = await buyProduct('quest_ticket')

            if (!purchase.purchaseToken) {
                throw new Error('Google Play не вернул purchaseToken')
            }

            const output = await Http.post(
                `${process.env.EXPO_PUBLIC_API_URL}/quests/buy`,
                {
                    quest_id: questId,
                    store: 'google',
                    purchase_token: purchase.purchaseToken,
                },
                token
            )

            if (output.success === 1) {
                await finishConsumable(purchase)

                questScreenCleanup()

                if (onSuccess) {
                    await onSuccess()
                }
            } else {
                alert(output.error || 'Ошибка при активации квеста на сервере')
            }
        } catch (e) {
            if (e?.code === ErrorCode.UserCancelled) return

            console.error('Ошибка покупки квеста Google Play:', e)
            alert('Проверьте подключение к интернету и попробуйте снова')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={mainStyle.center}>
            <TouchableOpacity style={mainStyle.buttonBuy} onPress={handlePurchase} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={mainStyle.buttonText}>Купить тур</Text>}
            </TouchableOpacity>
        </View>
    )
}
