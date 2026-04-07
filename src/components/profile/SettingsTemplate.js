import { View, ScrollView } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { headerStyle } from '../../styles/headerStyle'
import { profileStyle } from '../../styles/profileStyle'

import { Back } from '../common/Back'
import { HeaderTitle } from '../common/HeaderTitle'
import { Menu } from '../common/Menu'

import { ProfileEmail } from '../profile/ProfileEmail'
import { ProfileName } from '../profile/ProfileName'
import { ProfilePassword } from '../profile/ProfilePassword'
import { ProfileSuccess } from '../profile/ProfileSuccess'
import { Logout } from '../profile/Logout'

export const SettingsTemplate = ({ user, setUser, setTemplate, success, setSuccess }) => {
    return (
        <View style={mainStyle.flex}>
            <View style={[mainStyle.panelRow, headerStyle.panelHeader]}>
                <Back />
                <HeaderTitle title="Настройки" />
                <Menu />
            </View>
            <ScrollView style={mainStyle.flex} keyboardShouldPersistTaps="handled">
                <View style={mainStyle.container}>
                    {success && <ProfileSuccess text={success} />}

                    {user.email != null && (
                        <View style={profileStyle.card}>
                            <ProfileEmail email={user.email} />
                            <ProfileName name={user.name} setTemplate={setTemplate} setSuccess={setSuccess} />
                            <ProfilePassword setTemplate={setTemplate} setSuccess={setSuccess} />
                        </View>
                    )}

                    {user.email != null && <Logout />}
                </View>
            </ScrollView>
        </View>
    )
}
