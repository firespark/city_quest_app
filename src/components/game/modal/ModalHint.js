import { View, Text } from "react-native";
import FullWidthImage from '../../common/FullWidthImage';

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

export const ModalHint = ({ game, task }) => {
    let hint = game.sight_hint1;

    if (task == 2) {
        hint = game.sight_hint2;
    }

    return (
        <View style={mainStyle.container}>
            <Text style={mainStyle.titleMain}>Подсказка</Text>
            {
                (hint.image)
                    ? <FullWidthImage style={gameStyle.gameImage} source={{ uri: hint.image + '?time=' + new Date().getTime() }} />
                    : null
            }

            <Text selectable style={gameStyle.gameText}>{hint.text}</Text>
        </View>
    )
}