import React from 'react'
import { View, Text } from "react-native";
import FullWidthImage from '../../common/FullWidthImage';
import { gStyle } from '../../../styles/style'

export const ModalHint = ({ setModal, game, task }) => {

    let hint = game.sight_hint1;

    if (task == 2) {
        hint = game.sight_hint2;
    }

    return (
        <View style={gStyle.mt20}>
            <Text style={[gStyle.titleBold, gStyle.textCenter]}>Подсказка:</Text>
            {
                (hint.image)
                ?
                    <FullWidthImage style={gStyle.mt30} source={{ uri: hint.image }} />
                :
                null
            }
                
            <Text selectable style={[gStyle.text2, gStyle.mt30]}>{hint.text}</Text>
        </View>


    )
}

