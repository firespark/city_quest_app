import { useState, useContext } from 'react'
import { View, Text, Switch } from 'react-native'
import { Loader } from '../common/Loader'
import { profileStyle } from '../../styles/profileStyle'
import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const ProfileNotes = ({ user, setUser }) => {
    const { token } = useContext(MainContext)
    const [loader, setLoader] = useState(false)

    const saveNotes = async (newValue) => {
        const postdata = { notes: newValue }
        setLoader(true)

        try {
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/users/saveNotes`, postdata, token)
            if (output.success == 1) {
                setUser({ ...user, 'notes': newValue })
            }
        } catch (e) {
            console.error('Error:', e)
        } finally {
            setLoader(false)
        }
    }

    if (loader) return <Loader />

    return (
        <View style={[profileStyle.row, profileStyle.rowLast]}>
            <Text style={profileStyle.label}>Уведомления</Text>

            <Switch
                trackColor={{ false: "#F1F5F9", true: "#17A2B8" }}
                thumbColor={"#FFFFFF"}
                ios_backgroundColor="#F1F5F9"
                onValueChange={saveNotes}
                value={Boolean(user.notes)}
            />
        </View>
    )
}
