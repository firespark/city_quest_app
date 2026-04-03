import { useContext, useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'

import { mainStyle } from '../styles/mainStyle'
import { headerStyle } from '../styles/headerStyle'
import { questsStyle } from '../styles/questsStyle'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'
import { RichQuestContent } from '../components/quests/RichQuestContent'
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
import { ResetModal } from '../components/quests/ResetModal'

import { MainContext } from '../context/mainContext'
import { Http } from '../scripts/http'

export const QuestScreen = () => {
    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState(null)
    const { questId, token, changeScreen, setAnswersState } = useContext(MainContext)
    const [data, setData] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

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
            console.error('Error:', e)
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

    let progress = "Начать приключение";
    if (data.status === "in_progress") {
        progress = "Продолжить";
    } else if (data.status === "finished") {
        progress = "Посмотреть игру";
    }

    return (
        <View style={mainStyle.flex}>
            <View style={[mainStyle.panelRow, headerStyle.panelHeader]}>
                <Back />
                <HeaderTitle title="Квест-экскурсия" />
                <Menu />
            </View>

            <ScrollView
                style={mainStyle.flex}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <QuestImage data={data} />

                <View style={questsStyle.questSheet}>

                    <View style={mainStyle.card}>
                        <QuestTitle
                            title={data.title}
                            city={data.city}
                        />
                        <StartFinish
                            start={data.start_point}
                            finish={data.end_point}
                            sights_count={data.sights_count}
                        />
                    </View>

                    <View style={[mainStyle.card, mainStyle.mt15]}>
                        <RichQuestContent text={data.content} />
                    </View>

                    <View style={mainStyle.mt20}>
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
                                <StartButton
                                    changeScreen={changeScreen}
                                    progress={progress}
                                />
                                {data.status ? <ResetButton setModalVisible={setModalVisible} /> : null}
                            </>
                        )}
                    </View>

                </View>
            </ScrollView>

            <Footer />

            <ResetModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onSuccess={fetchData}
            />
        </View>
    )
}
