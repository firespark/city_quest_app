import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { ContentTitle } from '../components/common/ContentTitle'
import { ContentText } from '../components/common/ContentText'

import { Footer } from '../components/common/Footer'

import {Loader} from '../components/common/Loader'
import {Error} from '../components/common/Error'

import { gStyle, gStyleHeader } from '../styles/style'

import { Http } from '../scripts/http'


export const AboutScreen = () => {

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const [data, setData] = useState({
        'title' : null,
        'content' : null,
    })

    const fetchData = async () => {

        setError(null)
        setLoader(true)

        try {
            
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/pages/about`)

            if (output.success == 1) {
                setData(output.data)
            }
            else {
                if(output.error) {
                    setError(output.error)
                }
                else {
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
            
        }
        catch(e) {
            
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            
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

    
    return (
        <View style={gStyle.flex}>
    		<View style={[gStyle.panelRow, gStyleHeader.panelHeader]}>
	            <Back />
        		<HeaderTitle title={data.title}/>
	            <Menu />
	        </View>
    		<ScrollView
                style={gStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                { 
                    (error)
                    ? 
                    <Error
                        text={error}
                    />
                    :
                    <View style={gStyle.container}>
                        <ContentTitle title={data.title} />
                        <ContentText ps={data.content} />
                    </View> 
                }
    			
			</ScrollView>
	    	<Footer />
	    </View>
    )
}