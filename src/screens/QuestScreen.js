import React, { useContext, useState, useEffect } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'
import { ContentSimple } from '../components/common/ContentSimple'
import { QuestTitle } from '../components/quests/QuestTitle'
import { QuestImage } from '../components/quests/QuestImage'
import { StartFinish } from '../components/quests/StartFinish'
import { StartButton } from '../components/quests/StartButton'
import { ResetButton } from '../components/quests/ResetButton'
import { RegisterButton } from '../components/quests/RegisterButton'
import { BuyButton } from '../components/quests/BuyButton'
import { Footer } from '../components/common/Footer'
import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'
import { gStyle, gStyleHeader, gStyleQuests, gStylePaid } from '../styles/style'
import { MainContext } from '../context/mainContext'
import { Http } from '../scripts/http'

export const QuestScreen = () => {
    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState(null)
    const { questId, token, changeScreen, setAnswersState } = useContext(MainContext)
    const [data, setData] = useState([])

    const fetchData = async () => {
        setAnswersState([]);
        setLoadError(null)
        setLoader(true)
        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/quests/get/${questId}`, token)
            if (output.success == 1) {
                setData(output.data)
            } else {
                setLoadError(output.error || 'Ошибка загрузки')
            }
        } catch (e) {
            setLoadError('Ошибка сети')
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [questId])

    if (loader) return <Loader />
    if (loadError) return <Error text={loadError} />

    const progress = data.status == "in_progress" ? "Продолжить" : "Старт";
    const overlayStyle = data.paid ? (data.available ? gStylePaid.purchasedOverlay : gStylePaid.lockedOverlay) : null;

    return (
        <View style={gStyle.flex}>
            <View style={[gStyle.panelRow, gStyleHeader.panelHeader]}>
                <Back />
                <HeaderTitle title="Квест-экскурсия" />
                <Menu />
            </View>
            <ScrollView style={gStyle.flex} keyboardShouldPersistTaps="handled">
                <View>
                    <QuestTitle title={data.title} city={data.city} />
                    <View style={{ position: 'relative' }}>
                        <QuestImage image={data.image} />
                        {overlayStyle && <View style={overlayStyle} />}
                        {data.paid && (
                            <View style={gStylePaid.paidIconsRow}>
                                {data.available && <Text style={gStylePaid.checkText}>✓</Text>}
                                <View style={gStylePaid.dollarCircle}>
                                    <Text style={gStylePaid.dollarText}>$</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>

                <View style={gStyleQuests.questsContent}>
                    <StartFinish start={data.start_point} finish={data.end_point} sights_count={data.sights_count} />
                    <ContentSimple ps={data.content} />
                </View>

                {!data.available ? (
                    data.is_auth ? (
                        <BuyButton
                            questId={data.id}
                            onSuccess={fetchData}
                        />
                    ) : (
                        <RegisterButton />
                    )
                ) : (

                    <>
                        <StartButton changeScreen={changeScreen} progress={progress} />
                        {data.status ? <ResetButton changeScreen={changeScreen} progress={progress} /> : null}
                    </>
                )}
            </ScrollView>
            <Footer />
        </View>
    )
}