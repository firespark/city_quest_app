import { View, Text, TouchableOpacity, Image } from 'react-native'

import { gameStyle } from '../../styles/gameStyle'

export const Skips = ({ skips, showSkip, setModal }) => {
    return (
        <View>
            {
                (showSkip)
                    ?
                    <TouchableOpacity
                        style={[gameStyle.pill, gameStyle.pillActive]}
                        activeOpacity={0.7}
                        onPress={() => {
                            setModal('skip')
                        }}
                    >
                        <Image
                            source={require('../../../assets/img/skip.png')}
                            style={gameStyle.hintIcon}
                        />
                        <Text style={gameStyle.skipTextActive}>{skips}</Text>
                    </TouchableOpacity>
                    :
                    <View style={[gameStyle.pill, gameStyle.pillDisabled]}>
                        <Image
                            source={require('../../../assets/img/skip-disabled.png')}
                            style={gameStyle.hintIcon}
                        />
                        <Text style={gameStyle.textDisabled}>{skips}</Text>
                    </View>
            }
        </View>
    )
}
