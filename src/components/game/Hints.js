import { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { gameStyle } from '../../styles/gameStyle'
import { MockGoogleModal } from '../common/MockGoogleModal'

export const Hints = ({ hints, showHint, setModal, setGame }) => {
    const [showBuyModal, setShowBuyModal] = useState(false)

    return (
        <View>
            {
                (showHint)
                    ?
                    <TouchableOpacity
                        style={[gameStyle.pill, gameStyle.pillActiveOrange]}
                        activeOpacity={0.7}
                        onPress={() => setModal('hint')}
                    >
                        <Image source={require('../../../assets/img/hint.png')} style={gameStyle.hintIcon} />
                        <Text style={gameStyle.hintTextActive}>{hints}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity 
                        style={[gameStyle.pill, gameStyle.pillDisabled]}
                        activeOpacity={0.7}
                        onPress={() => {
                            if (hints === 0) setShowBuyModal(true)
                        }}
                    >
                        <Image source={require('../../../assets/img/hint-disabled.png')} style={gameStyle.hintIcon} />
                        <Text style={gameStyle.hintTextDisabled}>{hints}</Text>

                        {hints === 0 && (
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
                type="hints"
                itemName="3 Подсказки"
                price="99,00 ₽"
            />
        </View>
    )
}
