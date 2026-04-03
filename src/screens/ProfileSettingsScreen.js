import { useState, useContext, useEffect } from 'react'
import { View } from 'react-native'

import { mainStyle } from '../styles/mainStyle'

import { EditTemplate } from '../components/profile/EditTemplate'
import { SettingsTemplate } from '../components/profile/SettingsTemplate'
import { Footer } from '../components/common/Footer'

import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'

import { MainContext } from '../context/mainContext'

import { Http } from '../scripts/http'


export const ProfileSettingsScreen = () => {

    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState(null)

    const { token } = useContext(MainContext)

    const [template, setTemplate] = useState(null)
    const [success, setSuccess] = useState(null)

    const [user, setUser] = useState({
        'name': null,
        'email': null,
        'notes': 0,

    })

    const fetchData = async () => {

        setLoadError(null)
        setLoader(true)

        try {

            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/users/get`, token)

            if (output.success == 1) {
                setUser(output.data)
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


    return (
        <View style={mainStyle.flex}>
            {
                (template) ?
                    <EditTemplate
                        user={user}
                        setUser={setUser}
                        template={template}
                        setTemplate={setTemplate}
                        setSuccess={setSuccess}
                    />
                    :
                    <SettingsTemplate
                        user={user}
                        setUser={setUser}
                        setTemplate={setTemplate}
                        success={success}
                        setSuccess={setSuccess}
                    />
            }
            <Footer />
        </View>
    )
}
