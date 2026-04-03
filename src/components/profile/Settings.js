import { useContext } from 'react'
import { TouchableOpacity, Image } from 'react-native'

import { profileStyle } from '../../styles/profileStyle'

import { PROFILESETTINGS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const Settings = () => {

    const { changeScreen } = useContext(MainContext)

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                changeScreen(PROFILESETTINGS_SCREEN)
            }}
        >
            <Image source={require('../../../assets/img/settings.png')} style={profileStyle.settingsIcon} />
        </TouchableOpacity>
    )
}
