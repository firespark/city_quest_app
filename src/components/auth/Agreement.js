import { Text, TouchableOpacity, Image } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { authStyle } from '../../styles/authStyle'

export const Agreement = ({ agree, setAgree }) => {

    return (
        <TouchableOpacity
            style={authStyle.authContainer}
            activeOpacity={0.7}
            onPress={() => setAgree(!agree)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <Image
                source={
                    agree
                        ? require('../../../assets/img/check-true.png')
                        : require('../../../assets/img/check-false.png')
                }
                style={mainStyle.checkbox}
            />

            <Text style={mainStyle.checkboxText}>
                Соглашаюсь на обработку моих персональных данных
            </Text>
        </TouchableOpacity>
    )
}
