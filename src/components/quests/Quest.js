import { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { StatusBadge, AccessBadge } from './QuestBadges'

import { mainStyle } from '../../styles/mainStyle'
import { questsStyle } from '../../styles/questsStyle'

import { QUEST_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

export const Quest = ({ quest }) => {
    const { changeScreen, setQuestId, questScreenCleanup } = useContext(MainContext)

    return (
        <TouchableOpacity
            style={questsStyle.questCardWrapper}
            activeOpacity={0.8}
            onPress={() => {
                changeScreen(QUEST_SCREEN)
                setQuestId(quest.id)
                questScreenCleanup();
            }}
        >
            <View style={questsStyle.questImagePadding}>
                <View style={questsStyle.questImageContainer}>
                    <Image
                        source={{ uri: quest.image }}
                        style={questsStyle.questCardImage}
                        resizeMode="cover"
                    />
                    <View style={questsStyle.questBadgeOverlay}>

                        <View>
                            <AccessBadge paid={quest.paid} available={quest.available} />
                        </View>
                        
                        <View>
                            <StatusBadge status={quest.status} />
                        </View>
                    </View>
                </View>
            </View>

            <View style={questsStyle.questInfoContainer}>
                <View style={questsStyle.questMainTextContent}>
                    <Text style={questsStyle.questTitle} numberOfLines={2}>
                        {quest.title}
                    </Text>

                    <View style={questsStyle.questStatRow}>
                        <View style={[questsStyle.questIconCircle]}>
                            <Ionicons name="library" size={20} color="#17A2B8" />
                        </View>
                        <View style={questsStyle.questTextContainer}>
                            <Text style={questsStyle.questLabel}>Локаций: {quest.sights_count}</Text>
                        </View>
                    </View>
                </View>

                <View style={mainStyle.arrowContainer}>
                    <Text style={mainStyle.pureArrow}>→</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}