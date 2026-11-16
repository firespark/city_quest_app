import { useState, useContext, useEffect } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { mainStyle } from '../styles/mainStyle'
import { headerStyle } from '../styles/headerStyle'
import { profileStyle } from '../styles/profileStyle'
import { Back } from '../components/common/Back'
import { Menu } from '../components/common/Menu'
import { Settings } from '../components/profile/Settings'
import { ProfileRegister } from '../components/profile/ProfileRegister'
import { OpenQuests } from '../components/quests/OpenQuests'
import { DoneQuests } from '../components/quests/DoneQuests'
import { PurchasedQuests } from '../components/quests/PurchasedQuests'
import { Footer } from '../components/common/Footer'
import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'
import { ConnectionError } from '../components/common/ConnectionError'
import { MainContext } from '../context/mainContext'
import { Http } from '../scripts/http'

const guestUser = { name: 'Путешественник', email: null, vk_id: null, yandex_id: null, notes: 0 }

export const ProfileScreen = () => {
    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState(null)
    const { token } = useContext(MainContext)
    const [user, setUser] = useState(guestUser)
    const isRegistered = !!(user.email || user.vk_id || user.yandex_id)
    const fetchData = async () => {
        setLoadError(null)
        if (!token) {
            setUser(guestUser)
            setLoader(false)
            return
        }
        setLoader(true)
        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/users/get`, token)
            if (output.success == 1 && output.data && typeof output.data === 'object' && !Array.isArray(output.data)) {
                setUser({
                    ...guestUser,
                    ...output.data,
                    name: (typeof output.data.name === 'string' && output.data.name.trim() !== '')
                        ? output.data.name
                        : guestUser.name
                })
            } else if (Number(output.status) === 401) {
                // The API also returns 401 for the normal anonymous profile.
                setUser(guestUser)
            } else {
                setLoadError(output.error || 'Не удалось загрузить данные')
            }
        } catch {
            setLoadError('Не удалось загрузить данные')
        } finally {
            setLoader(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [token])
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
                    {loader ? <Loader /> : (
                        <>
                            {loadError ? (
                                loadError === 'connection_error'
                                    ? <ConnectionError onRetry={fetchData} />
                                    : <Error text={loadError} onRetry={fetchData} />
                            ) : (
                                <View style={[mainStyle.card, profileStyle.profileHeaderCard]}>
                                    <View style={profileStyle.profileNameRow}>
                                        <Text style={profileStyle.profileUserName} numberOfLines={1}>
                                            {user.name}
                                        </Text>
                                        {isRegistered && <Settings />}
                                    </View>
                                </View>
                            )}
                            {!isRegistered && <ProfileRegister />}
                            {!loadError && (
                                <>
                                    <View style={mainStyle.card}>
                                        <OpenQuests />
                                    </View>
                                    <View style={mainStyle.card}>
                                        <DoneQuests />
                                    </View>
                                    {isRegistered && (
                                        <View style={mainStyle.card}>
                                            <PurchasedQuests />
                                        </View>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </View>
            </ScrollView>
            <Footer active="profile" />
        </View>
    )
}
