import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { ContentTitle } from '../components/common/ContentTitle'
import { ContentText } from '../components/common/ContentText'
import { HowPlayBlockBlue } from '../components/howPlay/HowPlayBlockBlue'
import { HowPlayBlock } from '../components/howPlay/HowPlayBlock'

import { Footer } from '../components/common/Footer'

import { gStyle, gStyleHeader } from '../styles/style'

import {Loader} from '../components/common/Loader'
import {Error} from '../components/common/Error'

import { Http } from '../scripts/http'


export const HowPlayScreen = () => {

    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState(null)

    const [data, setData] = useState({
        'title' : null,
        'content' : null,
        'playTitle1' : null,
        'playTitle2' : null,
        'playTitle3' : null,
        'playContent1' : null,
        'playContent2' : null,
        'playContent3' : null,
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
        		<HeaderTitle title="Как играть"/>
	            <Menu />
	        </View>
    		<ScrollView
                style={gStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
    			<View style={gStyle.container}>
    				<ContentTitle title="Как играть?" />

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
                <View style={[gStyle.container, gStyle.mt20]}>
                    <ContentText ps={data.content} />

    			</View>
			</ScrollView>
	    	<Footer active="question" />
	    </View>
    )
}