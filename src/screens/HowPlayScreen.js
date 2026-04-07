import { useState, useEffect } from 'react'
import { View, ScrollView, Text } from 'react-native'

import { mainStyle } from '../styles/mainStyle'
import { howPlayStyle } from '../styles/howPlayStyle'
import { headerStyle } from '../styles/headerStyle'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'
//import { ContentTitle } from '../components/common/ContentTitle'
//import { ContentText } from '../components/common/ContentText'
import { HowPlayBlockBlue } from '../components/howPlay/HowPlayBlockBlue'
import { HowPlayBlock } from '../components/howPlay/HowPlayBlock'
import { Footer } from '../components/common/Footer'
import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'

import { Http } from '../scripts/http'


export const HowPlayScreen = () => {

    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState(null)

    const [data, setData] = useState({
        'title': null,
        'content': null,
        'playTitle1': null,
        'playTitle2': null,
        'playTitle3': null,
        'playContent1': null,
        'playContent2': null,
        'playContent3': null,
    })

    const fetchData = async () => {

        setLoadError(null)
        setLoader(true)

        try {

            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/pages/howPlay`)

            if (output.success == 1) {
                setData(output.data)
            }
            else {
                if (output.error) {
                    setLoadError(output.error)
                }
                else {
                    setLoadError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }

        }
        catch (e) {
            console.error('Error:', e)
            setLoadError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')

        }
        finally {
            setLoader(false)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loader) {
        return <Loader />
    }

    if (loadError) {
        return <Error text={loadError} />
    }

    const getCleanRules = (contentArray) => {
        if (!Array.isArray(contentArray)) {
            return [];
        }

        return contentArray
            .map(item => {
                if (typeof item !== 'string') return '';

                let cleanText = item
                    .replace(/[\n\r]/g, '')
                    .replace(/<[^>]*>?/gm, '')
                    .replace(/^[-—–]\s*/, '');

                return cleanText.trim();
            })
            .filter(item => item.length > 0);
    };

    const rulesList = getCleanRules(data.content);

    return (
        <View style={mainStyle.flex}>
            <View style={[mainStyle.panelRow, headerStyle.panelHeader]}>
                <Back />
                <HeaderTitle title="Как играть" />
                <Menu />
            </View>
            <ScrollView
                style={mainStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                <View style={mainStyle.container}>
                    
                    <HowPlayBlockBlue
                        number="1"
                        title={data.playTitle1}
                        description={data.playContent1}
                    />
                    <HowPlayBlock
                        number="2"
                        title={data.playTitle2}
                        description={data.playContent2}
                    />
                    <HowPlayBlockBlue
                        number="3"
                        title={data.playTitle3}
                        description={data.playContent3}
                    />
                    <HowPlayBlock
                        number="4"
                        title={data.playTitle4}
                        description={data.playContent4}
                    />
                    <HowPlayBlockBlue
                        number="5"
                        title={data.playTitle5}
                        description={data.playContent5}
                    />
                </View>
                {rulesList.length > 0 && (
                    <View style={mainStyle.container}>
                        <View style={howPlayStyle.rulesContainer}>
                            <Text style={howPlayStyle.rulesMainTitle}>Важно знать</Text>

                            {rulesList.map((rule, index) => (
                                <View key={index} style={howPlayStyle.ruleRow}>
                                    <View style={howPlayStyle.ruleBullet}>
                                        <View style={howPlayStyle.ruleBulletInner} />
                                    </View>
                                    <Text style={howPlayStyle.ruleText}>{rule}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>
            <Footer active="question" />
        </View>
    )
}
