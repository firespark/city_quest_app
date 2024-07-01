import React, { useState, useContext, useEffect } from 'react'
import { View } from 'react-native'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { EmailReset } from '../components/auth/EmailReset'
import { Code } from '../components/auth/Code'
import { NewPassword } from '../components/auth/NewPassword'

import { Footer } from '../components/common/Footer'
import { Error } from '../components/common/Error'

import { gStyle, gStyleHeader } from '../styles/style'

import { PROFILE_SCREEN } from '../context/types'
import { MainContext } from '../context/mainContext'


export const PasswordResetScreen = () => {

    const { changeScreen } = useContext(MainContext)
    const { token } = useContext(MainContext)

    const [template, setTemplate] = useState(null)
    const [email, setEmail] = useState(null)
    const [code, setCode] = useState(null)
    const [error, setError] = useState(null)

    let content = null

    switch (template) {
        
        case 'code': 
            content = 
            <Code
                email={email}
                setTemplate={setTemplate}
                setError={setError}
                setCode={setCode}
            />
            break

        case 'newPassword': 
            content = 
            <NewPassword
                email={email}
                code={code}
                setError={setError}
            />
            break

        default: 
            content = 
            <EmailReset
                setEmail={setEmail}
                setTemplate={setTemplate}
                setError={setError}
            />

            break

    }

    return (
        <View style={gStyle.flex}>
    		<View style={[gStyle.panelRow, gStyleHeader.panelHeader]}>
	            <Back />
        		<HeaderTitle title="Восстановление пароля"/>
	            <Menu />
	        </View>
    		<View style={[gStyle.flex, gStyle.centerBlock]}>
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