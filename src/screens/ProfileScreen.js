import { useState, useContext, useEffect } from 'react'
import { View, ScrollView, Text } from 'react-native'

import { mainStyle } from '../styles/mainStyle'
import { headerStyle } from '../styles/headerStyle'
import { profileStyle } from '../styles/profileStyle'

import { Back } from '../components/common/Back'
import { Menu } from '../components/common/Menu'
import { Settings } from '../components/profile/Settings'
import { Status } from '../components/profile/Status'
import { ProfileRegister } from '../components/profile/ProfileRegister'
import { OpenQuests } from '../components/quests/OpenQuests'
import { DoneQuests } from '../components/quests/DoneQuests'
import { PurchasedQuests } from '../components/quests/PurchasedQuests'
import { Footer } from '../components/common/Footer'
import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'

import { MainContext } from '../context/mainContext'
import { Http } from '../scripts/http'

export const ProfileScreen = () => {
    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState(null)
    const { token } = useContext(MainContext)

    const [user, setUser] = useState({
        'name': 'Путешественник',
        'email': null,
        'notes': 0,
    })

    const fetchData = async () => {
        if (!token) {
            setLoader(false)
            return
        }

        setLoadError(null)
        setLoader(true)
        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/users/get`, token)

            if (output.success == 1) {
                setUser(prev => ({
                    ...output.data,
                    name: (output.data.name && output.data.name.trim() !== "")
                        ? output.data.name
                        : prev.name
                }))
            }
        } catch (e) {
            console.error('Error:', e)
            console.log('Profile load error')
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [token])

    if (loader) return <Loader />
    if (loadError) return <Error text={loadError} />

    return (
        <View style={mainStyle.pageBackground}>
            <View style={headerStyle.panelHeader}>
                <Back />
                <Menu />
            </View>

            <ScrollView
                style={mainStyle.flex}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={mainStyle.container}>

                    <View style={[mainStyle.card, profileStyle.profileHeaderCard]}>
                        <View style={profileStyle.profileNameRow}>
                            <Text style={profileStyle.profileUserName} numberOfLines={1}>
                                {user.name}
                            </Text>
                            {user.email && <Settings />}
                        </View>
                        <Status token={token} />
                    </View>

                    {!user.email && <ProfileRegister />}

                    <View style={mainStyle.card}>
                        <OpenQuests />
                    </View>

                    <View style={mainStyle.card}>
                        <DoneQuests />
                    </View>

                    {user.email && (
                        <View style={mainStyle.card}>
                            <PurchasedQuests />
                        </View>
                    )}
                </View>
            </ScrollView>
            <Footer active="profile" />
        </View>
    )
}
