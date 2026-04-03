import { useContext } from 'react'
import { TouchableOpacity, Image } from 'react-native'

import { headerStyle } from '../../styles/headerStyle'

import { MainContext } from '../../context/mainContext'


export const Close = () => {

    const { previousScreen } = useContext(MainContext)

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                previousScreen()
            }}
        >
            <Image source={require('../../../assets/img/close.png')} style={headerStyle.close} />
        </TouchableOpacity>
    )
}

