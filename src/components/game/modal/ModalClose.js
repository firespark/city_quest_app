import { TouchableOpacity, Image } from 'react-native'

import { gameStyle } from '../../../styles/gameStyle'

export const ModalClose = ({ setModal }) => {
    return (
        <TouchableOpacity
            style={gameStyle.closeButton}
            activeOpacity={0.7}
            onPress={() => {
                setModal(null)
            }}
        >
            <Image source={require('../../../../assets/img/close.png')} style={gameStyle.closeIcon} />
        </TouchableOpacity>
    )
}
