import { View } from 'react-native'
import { CitySearch } from './CitySearch'

import { mainStyle } from '../../styles/mainStyle'


export const CitiesSearch = ({ data }) => {

    const list = []

    if (data) {
        data.map((item, index) => (
            list.push(
                <View key={index}>
                    <CitySearch city={item} />
                </View>
            )
        ))
    }

    return (
        <View style={[mainStyle.mt20, mainStyle.container]}>
            {list}
        </View>
    )


}