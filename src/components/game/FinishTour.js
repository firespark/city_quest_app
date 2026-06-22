import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

import { ResetButton } from '../quests/ResetButton'
import { FormattedContent } from '../common/FormattedContent'

export const FinishTour = ({ text, game, setResetModalVisible }) => {
    const location = game.sight_latitude + ',' + game.sight_longitude

    return (
        <View style={gameStyle.playTemplateContainer}>
            
            <View style={[mainStyle.card, mainStyle.container, mainStyle.mb15]}>
                <Text style={[mainStyle.subtitle, mainStyle.textCenter]}>{text}</Text>
            </View>

            <View style={mainStyle.card}>
                {game.sight_image ? (
                    <View style={gameStyle.modalAnswerImageBg}>
                        <Image
                            source={{ uri: game.sight_image }}
                            style={gameStyle.sightImage}
                        />
                    </View>
                ) : null}

                <View style={mainStyle.p20}>
                    {game.sight_address ? (
                        <View style={gameStyle.gameDetailRow}>
                            <View style={gameStyle.gameIconWrapper}>
                                <Ionicons name="location-sharp" size={18} color="#17A2B8" />
                            </View>
                            <Text selectable style={gameStyle.gameDetailValue}>{game.sight_address}</Text>
                        </View>
                    ) : null}

                    {location ? (
                        <View style={gameStyle.gameDetailRow}>
                            <View style={gameStyle.gameIconWrapper}>
                                <Ionicons name="compass-outline" size={18} color="#17A2B8" />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => Linking.openURL(`geo:0,0?q=${location}`)}
                            >
                                <Text selectable style={gameStyle.gameLink}>{location}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </View>
            </View>

            {game.sight_content ? (
                <View style={[mainStyle.card, mainStyle.mt15]}>
                    <FormattedContent text={game.sight_content} />
                </View>
            ) : null}

            <View style={mainStyle.mt20}>
                <ResetButton setModalVisible={setResetModalVisible} />
            </View>
        </View>
    )
}