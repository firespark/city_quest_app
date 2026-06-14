import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { gameStyle } from '../../styles/gameStyle'

export const ChangeGameFormat = ({ formatId, setModal }) => {
    
    const targetIcon = formatId === 1 ? "footsteps-outline" : "extension-puzzle-outline";

    return (
        <View>
            <TouchableOpacity
                style={[gameStyle.pill, gameStyle.formatPill, gameStyle.pillActiveGreen]}
                activeOpacity={0.7}
                onPress={() => setModal('changeFormat')}
            >
                <Ionicons name={targetIcon} size={22} color="#027900" style={gameStyle.formatIcon} />
            </TouchableOpacity>
        </View>
    )
}
