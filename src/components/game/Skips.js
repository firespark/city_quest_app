import { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { gameStyle } from '../../styles/gameStyle'
import { MainContext } from '../../context/mainContext'
import { useGoogleBilling, ErrorCode } from '../../context/GoogleBillingContext'

export const Skips = ({ skips, showSkip, setModal, setGame }) => {
    const { token, questId } = useContext(MainContext)
    const [loading, setLoading] = useState(false)
    const { buyProduct } = useGoogleBilling()

    const buySkips = async () => {
        if (loading) return

        setLoading(true)

        try {
            const output = await buyProduct('skips', questId, token)

            if (output.success === 1) {
                setGame(output.data)
            } else {
                alert(output.error || 'Ошибка при выдаче товара на сервере')
            }
        } catch (e) {
            if (e?.code === ErrorCode.UserCancelled) return

            console.error('Ошибка покупки пропусков Google Play:', e)
            alert(e?.message || 'Не удалось завершить покупку. Попробуй ещё раз.')
        } finally {
            setLoading(false)
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
