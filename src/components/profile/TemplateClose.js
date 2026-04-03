import { TouchableOpacity, Image } from 'react-native'

import { headerStyle } from '../../styles/headerStyle'


export const TemplateClose = ({ setTemplate }) => {


    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                setTemplate(null)
            }}
        >
            <Image source={require('../../../assets/img/close.png')} style={headerStyle.close} />
        </TouchableOpacity>
    )
}
