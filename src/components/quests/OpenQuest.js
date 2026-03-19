import { useContext } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

import { gStyle, gStyleQuests, gStylePaid } from '../../styles/style';

import { QUEST_SCREEN } from '../../context/types';
import { MainContext } from '../../context/mainContext';

export const OpenQuest = ({ quest }) => {
    const { changeScreen, setQuestId, questScreenCleanup } = useContext(MainContext);

    const overlayStyle = quest.paid 
        ? (quest.available ? gStylePaid.purchasedOverlay : gStylePaid.lockedOverlay) 
        : null;

    return (
        <View style={gStyle.mb20}>
            <TouchableOpacity
                style={gStyle.panelRowLeft}
                activeOpacity={0.7}
                onPress={() => {
                    changeScreen(QUEST_SCREEN);
                    setQuestId(quest.id);
                    questScreenCleanup();
                }}
            >
                <View style={gStyleQuests.questOpenImage}>
                    <ImageBackground
                        source={{ uri: quest.quest_image }}
                        style={gStyle.flex}
                        imageStyle={{ borderRadius: 8 }}
                        resizeMode="cover"
                    >
                        {overlayStyle && (
                            <View style={overlayStyle}>
                                <View style={gStylePaid.paidIconsRowSmall}>
                                    {quest.available && (
                                        <Text style={gStylePaid.checkTextSmall}>✓</Text>
                                    )}
                                    <View style={gStylePaid.dollarCircleSmall}>
                                        <Text style={gStylePaid.dollarTextSmall}>$</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </ImageBackground>
                </View>

                <View style={[gStyle.ml15, gStyleQuests.questOpenBlock]}>
                    <Text selectable style={gStyleQuests.questOpenTitle}>
                        {quest.quest_title}
                    </Text>
                    <Text selectable style={gStyleQuests.questOpenCity}>
                        {quest.city}
                    </Text>
                    <Text style={gStyle.text}>
                        Уровень {quest.step} из {quest.levels}
                    </Text>
                    <View style={gStyle.panelRowLeft}>
                        <Text style={gStyle.textThin}>Статус: </Text>
                        <Text style={gStyle.text}>{quest.mode_text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};