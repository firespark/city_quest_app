import { View, Text, Image } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { headerStyle } from '../../styles/headerStyle'

export const Logo = () => {
    return (
        <View style={mainStyle.panelRowLeft}>
            <Image source={require('../../../assets/img/logo-fun-black.png')} style={headerStyle.logoImage} />
            <Text style={headerStyle.logoTitle}>Квест-Туры</Text>
        </View>
    )
}
