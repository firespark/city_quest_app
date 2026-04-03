import { View, Image, TextInput, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { searchStyle } from '../../styles/searchStyle'

export const SearchInput = ({ searchData }) => {

    return (
        <View style={[mainStyle.panelRowCenter, mainStyle.mt8]}>
            <TextInput
                placeholder="Город..."
                style={[searchStyle.searchBlock, searchStyle.searchText]}
                placeholderTextColor={'#F1F5F9'}
                onChangeText={(value) => {
                    searchData(value)
                }}
            />

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    searchData(null, true)
                }}
            >
                <Image source={require('../../../assets/img/loupe.png')} style={searchStyle.searchImage} />
            </TouchableOpacity>
        </View>
    )
}
