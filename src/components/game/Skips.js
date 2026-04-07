import { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { gameStyle } from '../../styles/gameStyle'
import { MockGoogleModal } from '../common/MockGoogleModal'

export const Skips = ({ skips, showSkip, setModal, setGame }) => {
    const [showBuyModal, setShowBuyModal] = useState(false)

    return (
        <View>
            {
                (showSkip)
                    ?
                    <TouchableOpacity
                        style={[gameStyle.pill, gameStyle.pillActive]}
                        activeOpacity={0.7}
                        onPress={() => setModal('skip')}
                    >
                        <Image source={require('../../../assets/img/skip.png')} style={gameStyle.hintIcon} />
                        <Text style={gameStyle.skipTextActive}>{skips}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity 
                        style={[gameStyle.pill, gameStyle.pillDisabled]}
                        activeOpacity={0.7}
                        onPress={() => {
                            if (skips === 0) setShowBuyModal(true)
                        }}
                    >
                        <Image source={require('../../../assets/img/skip-disabled.png')} style={gameStyle.hintIcon} />
                        <Text style={gameStyle.textDisabled}>{skips}</Text>

                        {skips === 0 && (
                            <View style={gameStyle.pillPremiumSign}>
                                <Ionicons name="diamond-outline" size={10} color="#FFFFFF" />
                            </View>
                        )}
                    </TouchableOpacity>
            }

            <MockGoogleModal
                visible={showBuyModal}
                onClose={() => setShowBuyModal(false)}
                onSuccess={(newData) => setGame(newData)}
                type="skips"
                itemName="3 Пропуска заданий"
                price="99,00 ₽"
            />
        </View>
    )
}
