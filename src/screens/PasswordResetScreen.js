import { useState, useContext } from 'react'
import { View, ScrollView } from 'react-native'

import { mainStyle } from '../styles/mainStyle'
import { headerStyle } from '../styles/headerStyle'
import { authStyle } from '../styles/authStyle'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { EmailReset } from '../components/auth/EmailReset'
import { Code } from '../components/auth/Code'
import { NewPassword } from '../components/auth/NewPassword'

import { Loader } from '../components/common/Loader'
import { Footer } from '../components/common/Footer'
import { Error } from '../components/common/Error'

import { MainContext } from '../context/mainContext'

export const PasswordResetScreen = () => {
    const { changeScreen, token } = useContext(MainContext)

    const [template, setTemplate] = useState(null)
    const [email, setEmail] = useState(null)
    const [code, setCode] = useState(null)
    const [error, setError] = useState(null)
    const [loader, setLoader] = useState(false)

    let content = null

    switch (template) {
        case 'code':
            content = <Code email={email} setTemplate={setTemplate} setError={setError} setCode={setCode} setLoader={setLoader} token={token} />
            break
        case 'newPassword':
            content = <NewPassword email={email} code={code} setError={setError} setLoader={setLoader} changeScreen={changeScreen} token={token} />
            break
        default:
            content = <EmailReset setEmail={setEmail} setTemplate={setTemplate} setError={setError} setLoader={setLoader} />
            break
    }

    if (loader) return <Loader />

    return (
        <View style={mainStyle.pageBackground}>
            <View style={[mainStyle.panelRow, headerStyle.panelHeader]}>
                <Back />
                <HeaderTitle title="Восстановление пароля" />
                <Menu />
            </View>

            <ScrollView
                style={mainStyle.flex}
                contentContainerStyle={authStyle.authScrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {error && <View style={mainStyle.mb20}><Error text={error} /></View>}
                
                <View style={[mainStyle.card, authStyle.authCardContent]}>
                    {content}
                </View>
            </ScrollView>

            <Footer />
        </View>
    )
}
