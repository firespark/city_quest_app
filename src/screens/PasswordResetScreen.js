import { useState, useContext } from 'react'
import { View } from 'react-native'

import { mainStyle } from '../styles/mainStyle'
import { headerStyle } from '../styles/headerStyle'

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

    const { changeScreen } = useContext(MainContext)
    const { token } = useContext(MainContext)

    const [template, setTemplate] = useState(null)
    const [email, setEmail] = useState(null)
    const [code, setCode] = useState(null)
    const [error, setError] = useState(null)
    const [loader, setLoader] = useState(false)

    let content = null

    switch (template) {

        case 'code':
            content =
                <Code
                    email={email}
                    setTemplate={setTemplate}
                    setError={setError}
                    setCode={setCode}
                    setLoader={setLoader}

                />
            break

        case 'newPassword':
            content =
                <NewPassword
                    email={email}
                    code={code}
                    setError={setError}
                    setLoader={setLoader}
                    changeScreen={changeScreen}
                    token={token}
                />
            break

        default:
            content =
                <EmailReset
                    setEmail={setEmail}
                    setTemplate={setTemplate}
                    setError={setError}
                    setLoader={setLoader}
                />

            break

    }

    if (loader) {
        return <Loader />
    }

    return (
        <View style={mainStyle.flex}>
            <View style={[mainStyle.panelRow, headerStyle.panelHeader]}>
                <Back />
                <HeaderTitle title="Восстановление пароля" />
                <Menu />
            </View>
            <View style={[mainStyle.flex, mainStyle.centerBlock]}>
                {
                    (error)
                        ?
                        <Error
                            text={error}
                        />
                        : null
                }
                {content}

            </View>
            <Footer />
        </View>
    )
}
