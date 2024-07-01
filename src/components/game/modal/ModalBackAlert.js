import React, { useContext } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import { gStyle } from '../../../styles/style'

import { MainContext } from '../../../context/mainContext'


export const ModalBackAlert = ({ setModal }) => {

    const { previousScreen } = useContext(MainContext)

  
    return (
        <View style={[gStyle.flex, gStyle.centerBlock]}>
            <Text style={gStyle.title}>Ты хочешь выйти из игры?</Text>
            <View style={[gStyle.center, gStyle.mt20]}>
                <TouchableOpacity
                    style={gStyle.button}
                    activeOpacity={0.7}
                    onPress={() => {
                        previousScreen()
                    }}
                >
                    <Text style={gStyle.buttonText}>Выйти</Text>
                </TouchableOpacity>

            </View>
            <View style={[gStyle.center, gStyle.mt20]}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setModal(null)}
                >
                    <Text style={gStyle.link}>Остаться</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

