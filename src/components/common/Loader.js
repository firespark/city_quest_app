import { View, ActivityIndicator } from 'react-native'
import { gStyle } from '../../styles/style';

export const Loader = () => {


    return (
        <View style={gStyle.flexCenter}>
            <ActivityIndicator size="large" color="#17A2B8" />
        </View>
    )
}
