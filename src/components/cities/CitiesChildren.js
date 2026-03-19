import { View } from 'react-native'
import { CityChild } from './CityChild'

export const CitiesChildren = ({ cities }) => {

    const list = []

    if(cities){
        cities.map((item, index) => (  
            list.push(
                <View key={index}>
                    <CityChild city={item} />
                </View>
            ) 
        ))
    }

    return (
        <View>
            {list}
        </View>
    )
}