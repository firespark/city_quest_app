import { View, ScrollView } from 'react-native'

import { TemplateClose } from './TemplateClose'

import { ProfileNameEdit } from './ProfileNameEdit'
import { ProfilePasswordEdit } from './ProfilePasswordEdit'

import { mainStyle } from '../../styles/mainStyle'
import { headerStyle } from '../../styles/headerStyle'



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
                    setTemplate={setTemplate}
                    setSuccess={setSuccess}
                />
            break

    }


    return (

        <View style={mainStyle.flex}>
            <View style={[mainStyle.panelRowRight, headerStyle.panelHeader]}>
                <TemplateClose
                    setTemplate={setTemplate}
                />
            </View>
            <ScrollView
                style={mainStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                <View style={mainStyle.container}>
                    {content}

                </View>
            </ScrollView>

        </View>



    )
}
