import React from 'react'
import { View, ScrollView } from 'react-native'

import { TemplateClose } from './TemplateClose'

import { ProfileNameEdit } from './ProfileNameEdit'
import { ProfilePasswordEdit } from './ProfilePasswordEdit'

import { gStyle, gStyleHeader } from '../../styles/style'



export const EditTemplate = ({ user, setUser, template, setTemplate, setSuccess }) => {

	let content = null

	switch (template) {
        case 'name': 
            content = 
            <ProfileNameEdit
                user={user}
                setUser={setUser}
                setTemplate={setTemplate}
                setSuccess={setSuccess}
            />
            break

        case 'password': 
            content = 
            <ProfilePasswordEdit
                user={user}
                setUser={setUser}
                setTemplate={setTemplate}
                setSuccess={setSuccess}
            />
            break

    }

	
    return (
    	
	    <View style={gStyle.flex}>
            <View style={[gStyle.panelRowRight, gStyleHeader.panelHeader]}>
                <TemplateClose
                    setTemplate={setTemplate}
                />
            </View>
            <ScrollView
                style={gStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                <View style={gStyle.container}>
                    {content}

                </View>
            </ScrollView>

        </View>



    )
}

