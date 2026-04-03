import { View, Text, Image, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

export const Sight = ({ setModal, title, image }) => {
    return (
        <View style={mainStyle.wrapper}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={gameStyle.sightTouchable}
                onPress={() => {
                    setModal('answer1')
                }}
            >
                <View style={gameStyle.sightImageWrapper}>
                    <Image
                        source={{ uri: image }}
                        style={gameStyle.sightImage}
                    />
                </View>
                {
                    (title) ? (
                        <View style={[gameStyle.sightTitleWrapper, mainStyle.mt25]}>
                            <Text style={[mainStyle.titleMain, mainStyle.mb10]}>{title}</Text>
                        </View>
                    ) : null
                }
            </TouchableOpacity>
        </View>
    )
}
