import { View, Text } from 'react-native'
import { mainStyle } from '../../styles/mainStyle'

export const FormattedContent = ({ text }) => {
    if (!text) return null;

    const normalizedText = (Array.isArray(text) ? text.join('\n') : String(text))
        .replace(/<br\s*\/?>/gi, '\n');

    const lines = normalizedText.split('\n').filter(line => line.trim().length > 0);


    const parseInlineTags = (lineText, lineIndex) => {

        const regex = /(<(?:b|strong)>.*?<\/(?:b|strong)>)/gi;
        const parts = lineText.split(regex);

        return parts.map((part, index) => {

            if (/^<(?:b|strong)>/i.test(part)) {
                const clean = part.replace(/<\/?(?:b|strong)>/gi, '');
                return (
                    <Text key={`${lineIndex}-${index}`} style={mainStyle.textBold}>
                        {clean}
                    </Text>
                );
            }

            return part;
        });
    };

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
                            <Text selectable={true} style={mainStyle.bulletText}>
                                {parseInlineTags(cleanText, index)}
                            </Text>
                        </View>
                    );
                }

                if (trimmed.startsWith('<h2>') || trimmed.endsWith('</h2>')) {
                    const cleanText = trimmed.replace(/<\/?h2>/g, '');
                    return (
                        <Text key={index} selectable={true} style={mainStyle.subtitle}>
                            {parseInlineTags(cleanText, index)}
                        </Text>
                    );
                }

                if (trimmed.startsWith('<h3>') || trimmed.endsWith('</h3>')) {
                    const cleanText = trimmed.replace(/<\/?h3>/g, '');
                    return (
                        <Text key={index} selectable={true} style={mainStyle.thirdTitle}>
                            {parseInlineTags(cleanText, index)}
                        </Text>
                    );
                }

                return (
                    <Text key={index} selectable={true} style={mainStyle.paragraph}>
                        {parseInlineTags(trimmed, index)}
                    </Text>
                );
            })}
        </View>
    );
}