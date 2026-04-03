import { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { questsStyle } from '../../styles/questsStyle';
import { QUEST_SCREEN } from '../../context/types';
import { MainContext } from '../../context/mainContext';

export const OpenQuest = ({ quest }) => {
    const { changeScreen, setQuestId, questScreenCleanup } = useContext(MainContext);

    const renderAccessBadge = () => {
        if (quest.paid && !quest.available) {
            return (
                <View style={[questsStyle.microBadge, questsStyle.badgeLocked]}>
                    <Text style={questsStyle.microBadgeText}>
                        <Ionicons name="lock-closed" size={12} color="#FFFFFF" />
                    </Text>
                </View>
            )
        }
        if (quest.paid && quest.available) {
            return (
                <View style={[questsStyle.microBadge, questsStyle.badgeSuccess]}>
                    <Text style={questsStyle.microBadgeText}>
                        <Ionicons name="checkmark-sharp" size={12} color="#FFFFFF" />
                    </Text>
                </View>
            )
        }
        return null;
    }

    return (
        <TouchableOpacity
            style={questsStyle.itemWrapper}
            activeOpacity={0.7}
            onPress={() => {
                changeScreen(QUEST_SCREEN);
                setQuestId(quest.id);
                questScreenCleanup();
            }}
        >
            <View style={questsStyle.imageContainer}>
                <Image
                    source={{ uri: quest.quest_image }}
                    style={questsStyle.questImage}
                    resizeMode="cover"
                />
                <View style={questsStyle.badgeAccessWrapper}>
                    {renderAccessBadge()}
                </View>
            </View>

            <View style={questsStyle.contentBlock}>
                <Text selectable style={questsStyle.title}>
                    {quest.quest_title}
                </Text>

                <View style={questsStyle.locationContainer}>
                    <Ionicons name="location-sharp" size={14} color="#17A2B8" />
                    <Text selectable style={[questsStyle.city, questsStyle.cityText]}>
                        {quest.city}
                    </Text>
                </View>

                <View style={questsStyle.divider} />

                <View style={questsStyle.progressRow}>
                    <Text style={questsStyle.progressText}>
                        Уровень {quest.step} из {quest.levels}
                    </Text>
                    <Text style={[
                        questsStyle.modeText,
                        quest.mode_text === 'Пройден' ? questsStyle.textSuccess : questsStyle.textWarning
                    ]}>
                        {quest.mode_text}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
