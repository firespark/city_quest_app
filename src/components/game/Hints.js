import { View, Text, TouchableOpacity, Image } from 'react-native'

import { gameStyle } from '../../styles/gameStyle'

export const Hints = ({ hints, showHint, setModal }) => {
    return (
        <View>
            {
                (showHint)
                    ?
                    <TouchableOpacity
                        style={[gameStyle.pill, gameStyle.pillActive]}
                        activeOpacity={0.7}
                        onPress={() => {
                            setModal('hint')
                        }}
                    >
                        <Image
                            source={require('../../../assets/img/hint.png')}
                            style={gameStyle.hintIcon}
                        />
                        <Text style={gameStyle.hintTextActive}>{hints}</Text>
                    </TouchableOpacity>
                    :
                    <View style={[gameStyle.pill, gameStyle.pillDisabled]}>
                        <Image
                            source={require('../../../assets/img/hint-disabled.png')}
                            style={gameStyle.hintIcon}
                        />
                        <Text style={gameStyle.hintTextDisabled}>{hints}</Text>
                    </View>
            }
        </View>
    )
}
