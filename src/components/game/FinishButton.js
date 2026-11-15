import { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MainContext } from '../../context/mainContext'
import { QUESTS_SCREEN } from '../../context/types'
import { mainStyle } from '../../styles/mainStyle'

export const FinishButton = ({ game }) => {
    const { changeScreen, setCityData, questScreenCleanup } = useContext(MainContext)
    const finish = () => {
        setCityData({ id: game.quest_city_id, title: game.quest_city })
        changeScreen(QUESTS_SCREEN)
        questScreenCleanup()
    }
    return (
        <View style={mainStyle.mt20}>
            <TouchableOpacity style={mainStyle.primaryButton} activeOpacity={0.7} onPress={finish}>
                <Text style={mainStyle.primaryButtonText}>Завершить квест</Text>
            </TouchableOpacity>
        </View>
    )
}
