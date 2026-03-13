import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { gStyle, gStyleQuests, gStylePaid } from '../../styles/style';
import { QUEST_SCREEN } from '../../context/types';
import { MainContext } from '../../context/mainContext';

export const PurchasedQuest = ({ quest }) => {
    const { changeScreen, setQuestId, questScreenCleanup } = useContext(MainContext);

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
                        source={{ uri: quest.image }}
                        style={gStyle.flex}
                        imageStyle={{ borderRadius: 8 }}
                        resizeMode="cover"
                    >
                        <View style={gStylePaid.purchasedOverlay}>

                            <View style={gStylePaid.paidIconsRowSmall}>
                                <Text style={gStylePaid.checkTextSmall}>✓</Text>
                                <View style={gStylePaid.dollarCircleSmall}>
                                    <Text style={gStylePaid.dollarTextSmall}>$</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View style={[gStyle.ml15, gStyleQuests.questOpenBlock]}>
                    <Text selectable style={gStyleQuests.questOpenTitle}>
                        {quest.title}
                    </Text>
                    <Text selectable style={gStyleQuests.questOpenCity}>
                        {quest.city}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};