import React from 'react'
import { View, Text } from 'react-native'

import { gStyle } from '../../styles/style'

export const ContentText = ({ ps = [] }) => {

    const content = []

    if(ps){

        {ps.map((p, index) => (

            content.push(
                <View 
                    key={index}
                >
                        
                    <Text selectable style={gStyle.p}>{p}</Text>                                
                </View>
                
            )    

        ))}
    }

    return (
        <View>
        	{content}
        </View>
    )
}

