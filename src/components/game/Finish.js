import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Quests } from '../quests/Quests'
import { gStyle } from '../../styles/style'
import { MainContext } from '../../context/mainContext'
import { QUESTS_SCREEN } from '../../context/types'

export const Finish = ({ text, game, setModal }) => {

    const { changeScreen, setCityData } = useContext(MainContext)

    return (
        <View>
        	<View style={gStyle.container}>
                <Text style={gStyle.p}>
                    {text}
                </Text>
            </View>
            <View style={[gStyle.center, gStyle.mt10]}>
                <TouchableOpacity
                    style={gStyle.buttonCity}
                    activeOpacity={0.7}
                    onPress={() => {
                        changeScreen(QUESTS_SCREEN)
                        setCityData({id: game.quest_city_id, title: game.quest_city})
                    }}
                >
                    <Text style={gStyle.buttonTextSmall}>Еще квесты в городе</Text>
                    <Text style={gStyle.buttonTextSmall}>{game.quest_city}</Text>
                </TouchableOpacity>
            </View>
            <View style={[gStyle.center, gStyle.mt20]}>
                <TouchableOpacity
                    style={gStyle.buttonCity}
                    activeOpacity={0.7}
                    onPress={() => {
                        setModal('resetProgress')
                    }}
                >
                    <Text style={gStyle.buttonTextSmall}>Сбросить прогресс</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

