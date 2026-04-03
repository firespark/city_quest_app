import { useState, useContext } from 'react'
import { View, ScrollView } from 'react-native'

import { mainStyle } from '../styles/mainStyle'
import { headerStyle } from '../styles/headerStyle'
import { authStyle } from '../styles/authStyle'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { Email } from '../components/auth/Email'
import { Code } from '../components/auth/Code'
import { Password } from '../components/auth/Password'
import { CreateProfile } from '../components/auth/CreateProfile'
import { NewPassword } from '../components/auth/NewPassword'
import { AuthGoogle } from '../components/auth/AuthGoogle'

import { Footer } from '../components/common/Footer'
import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'

import { PROFILE_SCREEN } from '../context/types'
import { MainContext } from '../context/mainContext'

export const AuthScreen = () => {
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)
    const { changeScreen, token } = useContext(MainContext)

    const [template, setTemplate] = useState(null)
    const [email, setEmail] = useState(null)
    const [code, setCode] = useState(null)

    let content = null

    switch (template) {
        case 'password':
            content = <Password email={email} setError={setError} changeScreen={changeScreen} token={token} screen={PROFILE_SCREEN} setLoader={setLoader} />
            break
        case 'createProfile':
            content = <CreateProfile email={email} setTemplate={setTemplate} setError={setError} setLoader={setLoader} />
            break
        case 'code':
            content = <Code email={email} setTemplate={setTemplate} setError={setError} setCode={setCode} setLoader={setLoader} token={token} />
            break
        case 'newPassword':
            content = <NewPassword email={email} code={code} setError={setError} changeScreen={changeScreen} setLoader={setLoader} token={token} />
            break
        default:
            content = (
                <View>
                    <Email setEmail={setEmail} setTemplate={setTemplate} setError={setError} setLoader={setLoader} />
                    <AuthGoogle token={token} screen={PROFILE_SCREEN} changeScreen={changeScreen} setError={setError} setLoader={setLoader} />
                </View>
            )
            break
    }

    if (loader) return <Loader />

    return (
        <View style={mainStyle.pageBackground}>
            <View style={headerStyle.panelHeader}>
                <Back />
                <HeaderTitle title="Авторизация" />
                <Menu />
            </View>

            <ScrollView
                style={mainStyle.flex}
                contentContainerStyle={authStyle.authScrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {error && <View style={mainStyle.mb20}><Error text={error} /></View>}
                <View style={mainStyle.card}>
                    {content}
                </View>
            </ScrollView>

            <Footer />
        </View>
    )
}
