import React, { useState, useContext, useEffect } from 'react'
import { View, ScrollView } from 'react-native'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Settings } from '../components/profile/Settings'

import { Status } from '../components/profile/Status'
import { ProfileRegister } from '../components/profile/ProfileRegister'
import { OpenQuests } from '../components/quests/OpenQuests'
import { DoneQuests } from '../components/quests/DoneQuests'

import { Footer } from '../components/common/Footer'

import {Loader} from '../components/common/Loader'
import {Error} from '../components/common/Error'

import { gStyle, gStyleHeader } from '../styles/style'

import { MainContext } from '../context/mainContext'

import { Http } from '../scripts/http'


export const ProfileScreen = () => {

    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState(null)

    const { token } = useContext(MainContext)


    const [user, setUser] = useState({
        'name' : null,
        'email' : null,
        'notes' : 0,    
        
    })

    const fetchData = async () => {

        setLoadError(null)
        setLoader(true)

        try {
            //const token = await AsyncStorage.getItem('APP_TOKEN')
            
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/users/get`, token)

            if (output.success == 1) {
                setUser(output.data)
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
        		<HeaderTitle title={user.name}/>
	            <Settings />
	        </View>
    		<ScrollView
                style={gStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                <View style={gStyle.container}>
                    <Status
                        token={token}
                    />
                    {
                        (!user.email) ?
                        <ProfileRegister />
                        :
                        null
                    }
                    
        			<OpenQuests />
        			<DoneQuests />
                </View>
			</ScrollView>
	    	<Footer active="profile" />
	    </View>
    )
}

