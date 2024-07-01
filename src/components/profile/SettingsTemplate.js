import React from 'react'
import { View, ScrollView } from 'react-native'

import { Back } from '../common/Back'
import { HeaderTitle } from '../common/HeaderTitle'
import { Menu } from '../common/Menu'

import { ProfileEmail } from '../profile/ProfileEmail'
import { ProfileName } from '../profile/ProfileName'
import { ProfileNotes } from '../profile/ProfileNotes'
import { ProfilePassword } from '../profile/ProfilePassword'
import { ProfileSuccess } from '../profile/ProfileSuccess'
import { Logout } from '../profile/Logout'
import { ProfileNameEdit } from '../profile/ProfileNameEdit'
import { ProfilePasswordEdit } from '../profile/ProfilePasswordEdit'

import { gStyle, gStyleHeader } from '../../styles/style'



export const SettingsTemplate = ({ user, setUser, template, setTemplate, success, setSuccess }) => {

	return (
    	
	    <View style={gStyle.flex}>
            <View style={[gStyle.panelRow, gStyleHeader.panelHeader]}>
                <Back />
                <HeaderTitle title="Настройки"/>
                <Menu />
            </View>
            <ScrollView
                style={gStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                <View style={gStyle.container}>
                    {
                        ( user.email != null ) ?
                        <View>
                            {
                                ( success != null ) ?
                                <ProfileSuccess
                                    text={success}
                                />
                                :
                                null
                            }
                            <ProfileEmail
                                email={user.email}
                            />
                            <ProfileName
                                name={user.name}
                                setTemplate={setTemplate}
                                setSuccess={setSuccess}
                            />
                            <ProfilePassword
                                passwordLength={user.password_length}
                                setTemplate={setTemplate}
                                setSuccess={setSuccess}
                            />
                            <ProfileNotes
                                user={user}
                                setUser={setUser}
                            />
                            <Logout />
                                
                        </View>
                        :
                        <ProfileNotes
                            user={user}
                            setUser={setUser}
                        />
                    }

                </View>
            </ScrollView>

        </View>



    )
}

