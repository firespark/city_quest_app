import { View, Text, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

export const GameFormat = ({ selectedId, setSelectedId }) => {
    const formats = [
        {
            id: 1,
            title: 'Квест',
            description: 'Прогулка по достопримечательностям сделана в виде квеста. Чтобы перейти к достопримечательности, нужно сначала разгадать ее название, а затем ответить на вопрос по посещенной локации.'
        },
        {
            id: 2,
            title: 'Экскурсия',
            description: 'Просто экскурсия по достопримечательностям, без загадок.'
        }
    ]

    return (
        <View style={gameStyle.modeListContainer}>
            {formats.map((format) => {
                const isSelected = selectedId === format.id;
                
                return (
                    <View style={mainStyle.mb5} key={format.id}>
                        <TouchableOpacity
                            style={[mainStyle.radioCard, isSelected && mainStyle.radioCardActive]}
                            activeOpacity={0.7}
                            onPress={() => setSelectedId(format.id)}
                        >
                            <View style={gameStyle.modeRadioContainer}>
                                <View style={[mainStyle.radioOuter, isSelected && mainStyle.radioOuterActive]}>
                                    {isSelected ? <View style={mainStyle.radioInner} /> : null}
                                </View>
                            </View>

                            <View style={gameStyle.modeTextContainer}>
                                <Text selectable style={[mainStyle.subtitle, mainStyle.mt5, mainStyle.mb5, isSelected && gameStyle.modeTitleActive]}>
                                    {format.title}
                                </Text>
                                <Text selectable style={[mainStyle.description, mainStyle.mb10]}>
                                    {format.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            })}
        </View>
    )
}
