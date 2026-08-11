import { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { gameStyle } from '../../styles/gameStyle'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'
import { RuStoreReactPay } from '../../libs/RuStoreReactPay'

export const Skips = ({ skips, showSkip, setModal, setGame }) => {
    const { token, questId } = useContext(MainContext)
    const [loading, setLoading] = useState(false)

    // Твой Product ID из консоли RuStore
    const productId = 'skips_pack_3'

    const buySkips = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const check = await RuStoreReactPay.getPurchaseAvailability();
            if (!check.availability) {
                alert('Покупки временно недоступны: ' + check.cause);
                setLoading(false);
                return;
            }

            const purchaseResult = await RuStoreReactPay.purchase({
                productId: productId,
                preferredPurchaseType: 'ONE_STEP'
            });
 
            const output = await Http.post(
                `${process.env.EXPO_PUBLIC_API_URL}/games/buy-extras/${questId}`,
                {
                    type: 'skips',
                    invoice_id: purchaseResult.invoiceId,
                    purchase_id: purchaseResult.purchaseId,
                    store: 'rustore'
                },
                token
            )
                 
            if (output.success === 1) {
                setGame(output.data);
            } else {
                alert(output.error || 'Ошибка при выдаче товара на сервере');
            }
        } catch (e) {
            console.error('Ошибка покупки RuStore:', e);
            if (RuStoreReactPay.isRuStorePayError(e) && e.code === 'ProductPurchaseCancelled') return;
            alert('Не удалось завершить покупку. Попробуйте ещё раз.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View>
            {showSkip ? (
                <TouchableOpacity
                    style={[gameStyle.pill, gameStyle.pillActive]}
                    activeOpacity={0.7}
                    onPress={() => setModal('skip')}
                >
                    <Image source={require('../../../assets/img/skip.png')} style={gameStyle.hintIcon} />
                    <Text style={gameStyle.skipTextActive}>{skips}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity 
                    style={[gameStyle.pill, gameStyle.pillDisabled]}
                    activeOpacity={0.7}
                    onPress={() => {
                        if (skips === 0) buySkips()
                    }}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" style={{ paddingHorizontal: 10 }} />
                    ) : (
                        <>
                            <Image source={require('../../../assets/img/skip-disabled.png')} style={gameStyle.hintIcon} />
                            <Text style={gameStyle.textDisabled}>{skips}</Text>
                            {skips === 0 && (
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
