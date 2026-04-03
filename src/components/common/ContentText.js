import { View, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

export const ContentText = ({ ps = [] }) => {

    const content = []

    if (ps) {

        {
            ps.map((p, index) => (

                content.push(
                    <View
                        key={index}
                    >

                        <Text selectable style={mainStyle.p}>{p}</Text>
                    </View>

                )

            ))
        }
    }

    return (
        <View>
            {content}
        </View>
    )
}

