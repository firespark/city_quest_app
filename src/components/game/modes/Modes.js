import React from 'react'
import { View } from 'react-native'
import { Mode } from './Mode'

import { gStyle } from '../../../styles/style'


export const Modes = ({ modes, selectedId, setSelectedId }) => {

    const list = []

    if(modes){
        modes.map((item, index) => (  
            list.push(
                <View key={index}>
                    <Mode 
                        mode={item}
                        selectedId={selectedId} 
                        setSelectedId={setSelectedId}
                    />
                </View>
            ) 
        ))
    }


    return (
        <View style={[gStyle.mt20, gStyle.block320, gStyle.container]}>
            {list}
        </View>
    )


}