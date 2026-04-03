import { useContext } from 'react'
import { TouchableOpacity, Image } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

import { MainContext } from '../../context/mainContext'

export const Back = () => {
    const { previousScreen } = useContext(MainContext)

    return (
        <TouchableOpacity
            style={mainStyle.backButton}
            activeOpacity={0.7}
            onPress={() => {
                previousScreen()
            }}
        >
            <Image source={require('../../../assets/img/back.png')} style={mainStyle.backIcon} />
        </TouchableOpacity>
    )
}
