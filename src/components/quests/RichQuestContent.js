import { View, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

export const RichQuestContent = ({ text }) => {
    if (!text) return null;

    const normalizedText = Array.isArray(text) ? text.join('\n') : String(text);

    const lines = normalizedText.split('\n').filter(line => line.trim().length > 0);

    return (
        <View style={mainStyle.container}>
            {lines.map((line, index) => {
                const trimmed = line.trim();

                if (/^[-—–]\s*/.test(trimmed)) {

                    const cleanText = trimmed.replace(/^[-—–]\s*/, '');
                    return (
                        <View key={index} style={mainStyle.bulletRow}>
                            <View style={mainStyle.bulletIconWrapper}>
                                <View style={mainStyle.bulletDot} />
                            </View>
                            <Text style={mainStyle.bulletText}>{cleanText}</Text>
                        </View>
                    );
                }

                if (trimmed.endsWith(':')) {
                    return (
                        <Text key={index} style={mainStyle.subtitle}>
                            {trimmed}
                        </Text>
                    );
                }

                return (
                    <Text key={index} style={mainStyle.paragraph}>
                        {trimmed}
                    </Text>
                );
            })}
        </View>
    );
}
