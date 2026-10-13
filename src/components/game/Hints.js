import { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { gameStyle } from '../../styles/gameStyle'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'
import { useGoogleBilling, ErrorCode } from '../../context/GoogleBillingContext'

export const Hints = ({ hints, showHint, setModal, setGame }) => {
    const { token, questId } = useContext(MainContext)
    const [loading, setLoading] = useState(false)
    const { buyProduct, finishConsumable } = useGoogleBilling()

    const productId = 'hints_pack_3'

    const buyHints = async () => {
        if (loading) return

        setLoading(true)

        try {
            const purchase = await buyProduct('hints_pack_3')

            if (!purchase.purchaseToken) {
                throw new Error('Google Play не вернул purchaseToken')
            }

            const output = await Http.post(
                `${process.env.EXPO_PUBLIC_API_URL}/games/buy-extras/${questId}`,
                {
                    type: 'hints',
                    store: 'google',
                    purchase_token: purchase.purchaseToken,
                },
                token
            )

            if (output.success === 1) {
                await finishConsumable(purchase)
                setGame(output.data)
            } else {
                alert(output.error || 'Ошибка при выдаче товара на сервере')
            }
        } catch (e) {
            if (e?.code === ErrorCode.UserCancelled) return

            console.error('Ошибка покупки подсказок Google Play:', e)
            alert('Не удалось завершить покупку. Попробуйте ещё раз.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View>
            {showHint ? (
                <TouchableOpacity
                    style={[gameStyle.pill, gameStyle.pillActiveOrange]}
                    activeOpacity={0.7}
                    onPress={() => setModal('hint')}
                >
                    <Image source={require('../../../assets/img/hint.png')} style={gameStyle.hintIcon} />
                    <Text style={gameStyle.hintTextActive}>{hints}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity 
                    style={[gameStyle.pill, gameStyle.pillDisabled]}
                    activeOpacity={0.7}
                    onPress={() => {
                        if (hints === 0) buyHints()
                    }}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" style={{ paddingHorizontal: 10 }} />
                    ) : (
                        <>
                            <Image source={require('../../../assets/img/hint-disabled.png')} style={gameStyle.hintIcon} />
                            <Text style={gameStyle.hintTextDisabled}>{hints}</Text>
                            {hints === 0 && (
                                <View style={gameStyle.pillPremiumSign}>
                                    <Ionicons name="diamond-outline" size={10} color="#FFFFFF" />
                                </View>
                            )}
                        </>
                    )}
                </TouchableOpacity>
            )}
        </View>
    )
}
