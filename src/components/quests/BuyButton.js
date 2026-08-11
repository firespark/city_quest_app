import { useContext, useState } from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'
import { RuStoreReactPay } from '../../libs/RuStoreReactPay'

export const BuyButton = ({ questId, onSuccess }) => {
    const { token, questScreenCleanup } = useContext(MainContext)
    const [loading, setLoading] = useState(false)

    const handlePurchase = async () => {
        if (loading) return
        setLoading(true)
        
        try {
            const check = await RuStoreReactPay.getPurchaseAvailability()
            if (!check.availability) {
                alert('Покупки временно недоступны: ' + check.cause)
                setLoading(false)
                return
            }

            const purchaseResult = await RuStoreReactPay.purchase({
                productId: 'quest_ticket',
                preferredPurchaseType: 'ONE_STEP'
            })

            const output = await Http.post(
                `${process.env.EXPO_PUBLIC_API_URL}/quests/buy`,
                {
                    quest_id: questId,
                    invoice_id: purchaseResult.invoiceId,
                    purchase_id: purchaseResult.purchaseId,
                    store: 'rustore'
                },
                token
            )

            if (output.success === 1) {
                questScreenCleanup()
                if (onSuccess) await onSuccess()
            } else {
                alert(output.error || 'Ошибка при активации квеста на сервере')
            }
        } catch (e) {
            console.error('Ошибка покупки квеста в RuStore:', e)
            
            const isUserCancel = RuStoreReactPay.isRuStorePayError(e)
                ? e.code === 'ProductPurchaseCancelled'
                : e?.message?.toLowerCase().includes('user cancel') || String(e).toLowerCase().includes('cancel')
            if (isUserCancel) return

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
