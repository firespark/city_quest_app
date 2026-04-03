import { View, Text, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

export const Mode = ({ mode, selectedId, setSelectedId }) => {

    const isSelected = mode.id == selectedId;

    return (
        <View style={mainStyle.mb5}>
            <TouchableOpacity
                style={[mainStyle.radioCard, isSelected && mainStyle.radioCardActive]}
                activeOpacity={0.7}
                onPress={() => setSelectedId(mode.id)}
            >
                <View style={gameStyle.modeRadioContainer}>
                    <View style={[mainStyle.radioOuter, isSelected && mainStyle.radioOuterActive]}>
                        {isSelected ? <View style={mainStyle.radioInner} /> : null}
                    </View>
                </View>

                <View style={gameStyle.modeTextContainer}>
                    <Text selectable style={[mainStyle.subtitle, mainStyle.mt5, mainStyle.mb5, isSelected && gameStyle.modeTitleActive]}>
                        {mode.title}
                    </Text>
                    <Text selectable style={[mainStyle.description, mainStyle.mb10]}>
                        {mode.description}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
