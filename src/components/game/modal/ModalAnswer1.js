import { useContext } from 'react'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

import { MainContext } from '../../../context/mainContext'
import { Ionicons } from '@expo/vector-icons'

import { RichQuestContent } from '../../quests/RichQuestContent'

export const ModalAnswer1 = ({ title, image, address, location, description, setModal }) => {

    const { setAnswersState } = useContext(MainContext)

    return (
        <View style={mainStyle.mt5}>
            
            <View style={mainStyle.card}>
                <Text style={[gameStyle.gameSuccessTitle, mainStyle.mt10]}>ВЕРНО!</Text>
                {title ? (
                    <Text selectable style={[gameStyle.answerTitle, mainStyle.mb10]}>
                        {title}
                    </Text>
                ) : null}
            </View>

            {(image || address || location) ? (
                <View style={[mainStyle.card, mainStyle.mt15]}>
                    
                    {image ? (
                        <View style={gameStyle.modalAnswerImageBg}>
                            <Image
                                source={{ uri: image }}
                                style={gameStyle.sightImage}
                            />
                        </View>
                    ) : null}

                    {(address || location) ? (
                        <View style={mainStyle.p20}>
                            {address ? (
                                <View style={gameStyle.gameDetailRow}>
                                    <View style={gameStyle.gameIconWrapper}>
                                        <Ionicons name="location-sharp" size={18} color="#17A2B8" />
                                    </View>
                                    <Text selectable style={gameStyle.gameDetailValue}>{address}</Text>
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
                    ) : null}
                </View>
            ) : null}

            {description ? (
                <View style={[mainStyle.card, mainStyle.mt15]}>
                    <RichQuestContent text={description} />
                </View>
            ) : null}

            <View style={mainStyle.mt15}>
                <TouchableOpacity
                    style={mainStyle.primaryButton}
                    activeOpacity={0.7}
                    onPress={() => {
                        setAnswersState([]);
                        setModal(null);
                    }}
                >
                    <Text style={mainStyle.primaryButtonText}>Продолжить</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}
