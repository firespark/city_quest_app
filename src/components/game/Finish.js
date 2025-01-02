import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Quests } from '../quests/Quests'
import { gStyle } from '../../styles/style'
import { MainContext } from '../../context/mainContext'
import { QUESTS_SCREEN } from '../../context/types'
import { Sight } from './Sight'
import { TaskSign } from './TaskSign'

export const Finish = ({ text, game, setModal }) => {

    const { changeScreen, setCityData } = useContext(MainContext)

    return (
        <View>
        	<View style={gStyle.container}>
                <Text style={[gStyle.p, gStyle.textCenter]}>
                    {text}
                </Text>
            </View>
            <View style={[gStyle.center, gStyle.mt30, gStyle.mb30]}>
                <Text style={[gStyle.p, gStyle.textCenter, gStyle.titleBold]}>
                    Финишная достопримечательность
                </Text>
                <Sight
                    setModal={setModal}
                    title={game.sight_title}
                    image={game.sight_image}
                />
                <View style={gStyle.panelRowCenter}>
                    <TaskSign
                        number="1"
                        setModal={setModal}
                    />
                    <TaskSign
                        number="2"
                        setModal={setModal}
                    />
                </View>
            </View>
            <View style={[gStyle.center, gStyle.mt30, gStyle.mb30]}>
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
                    style={gStyle.buttonReset}
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

