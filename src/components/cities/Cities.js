import { View } from 'react-native'
import { City } from './City'

import { mainStyle } from '../../styles/mainStyle'

export const Cities = ({ cities }) => {

    const list = []

    if (cities) {
        cities.map((item, index) => (
            list.push(
                <View key={index}>
                    <City city={item} />
                </View>
            )
        ))
    }


    return (
        <View style={mainStyle.container}>
            {list}
        </View>
    )


}