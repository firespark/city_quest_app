import { View } from 'react-native'

import { gameStyle } from '../../../styles/gameStyle'

import { Mode } from './Mode'

export const Modes = ({ modes, selectedId, setSelectedId }) => {
    return (
        <View style={gameStyle.modeListContainer}>
            {modes && modes.map((item, index) => (
                <Mode
                    key={item.id || index}
                    mode={item}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                />
            ))}
        </View>
    )
}
