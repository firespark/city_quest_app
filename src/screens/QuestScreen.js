import React, { useContext, useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { ContentSimple } from '../components/common/ContentSimple'
import { QuestTitle } from '../components/quests/QuestTitle'
import { QuestImage } from '../components/quests/QuestImage'
import { StartFinish } from '../components/quests/StartFinish'
import { StartButton } from '../components/quests/StartButton'

import { Footer } from '../components/common/Footer'

import {Loader} from '../components/common/Loader'
import {Error} from '../components/common/Error'

import { gStyle, gStyleHeader, gStyleQuests } from '../styles/style'

import { MainContext } from '../context/mainContext'

import { Http } from '../scripts/http'


export const QuestScreen = () => {

    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState(null)

	const { questId, changeScreen } = useContext(MainContext)

    const [data, setData] = useState([])

    const fetchData = async () => {

        setLoadError(null)
        setLoader(true)

        try {
            const output = await Http.get(`https://test2.gagara-web.ru/api/quests/get/${questId}`)

            if (output.success == 1) {
                setData(output.data)
            }
            else {
                if(output.error) {
                    setLoadError(output.error)
                }
                else {
                    setLoadError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
            
        }
        catch(e) {
            console.log(e)
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
        return <Error text={error} />
    }



	return (
        <View style={gStyle.flex}>
    		<View style={[gStyle.panelRow, gStyleHeader.panelHeader]}>
                <Back />
                <HeaderTitle title="Квест-экскурсия"/>
                <Menu />
            </View>
            <ScrollView
                style={gStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                            
                <QuestTitle
                    title={data.title}
                    city={data.city}
                />
                <QuestImage
                    image={data.image}
                />
            
                <View style={gStyleQuests.questsContent}>
                    <StartFinish
                        start={data.start_point}
                        finish={data.end_point}
                    />
                    <ContentSimple ps={data.content} />
                </View>
            
                <StartButton
                    changeScreen={changeScreen}
                />
                            
            </ScrollView>
            <Footer />
	    </View>
    )
}