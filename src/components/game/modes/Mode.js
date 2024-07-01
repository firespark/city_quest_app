import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { gStyle } from '../../../styles/style'



export const Mode = ({ mode, selectedId, setSelectedId }) => {

    const innerBlock = (mode.id == selectedId) ? <View style={gStyle.radioBoxInner}></View> : null;

    return (
        <View>
        	<TouchableOpacity
                style={[gStyle.panelRowLeft, gStyle.mb15]}
                activeOpacity={0.7}
                onPress={() => {
                    setSelectedId(mode.id)
                }}
            >
                <View style={gStyle.radioBoxOuter}>
                    {innerBlock}
                </View>
                <View style={gStyle.ml10}>
                    <Text selectable style={gStyle.text}>{mode.title}</Text>
                    <Text selectable style={gStyle.smallText}>{mode.description}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )


}


                