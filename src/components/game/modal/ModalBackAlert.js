import { useContext } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

import { MainContext } from '../../../context/mainContext'

export const ModalBackAlert = ({ setModal }) => {

    const { previousScreen } = useContext(MainContext)

    return (
        <View style={mainStyle.container}>
            <Text style={mainStyle.titleMain}>Ты хочешь выйти из игры?</Text>

            <View style={gameStyle.gameActions}>
                <TouchableOpacity
                    style={mainStyle.dangerButton}
                    activeOpacity={0.7}
                    onPress={() => {
                        previousScreen()
                    }}
                >
                    <Text style={mainStyle.dangerButtonText}>Выйти</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={gameStyle.gameCancelLink}
                    activeOpacity={0.7}
                    onPress={() => setModal(null)}
                >
                    <Text style={gameStyle.gameLinkText}>Остаться</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
