import { TouchableOpacity, Image } from 'react-native'

import { gameStyle } from '../../styles/gameStyle'

export const BackQuest = ({ setModal }) => {
    return (
        <TouchableOpacity
            style={gameStyle.gameBackButton}
            activeOpacity={0.7}
            onPress={() => {
                setModal('back')
            }}
        >
            <Image source={require('../../../assets/img/back.png')} style={gameStyle.gameBackIcon} />
        </TouchableOpacity>
    )
}
