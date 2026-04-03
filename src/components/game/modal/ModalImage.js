import { View } from 'react-native'
import FullWidthImage from '../../common/FullWidthImage'

import { gameStyle } from '../../../styles/gameStyle'

export const ModalImage = ({ image }) => {
    return (
        <View style={gameStyle.fullWidthImageBg}>
            <FullWidthImage source={{ uri: image }} />
        </View>
    )
}
