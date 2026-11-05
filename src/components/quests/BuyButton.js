import { useContext, useState } from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { MainContext } from '../../context/mainContext'
import { useGoogleBilling, ErrorCode } from '../../context/GoogleBillingContext'

export const BuyButton = ({ questId, onSuccess }) => {
    const { token, questScreenCleanup } = useContext(MainContext)
    const [loading, setLoading] = useState(false)
    const { buyProduct } = useGoogleBilling()

    const handlePurchase = async () => {
        if (loading) return

        setLoading(true)

        try {
            const output = await buyProduct('quest', questId, token)

            if (output.success === 1) {

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
            alert(e?.message || 'Проверь подключение к интернету и попробуй снова')
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
