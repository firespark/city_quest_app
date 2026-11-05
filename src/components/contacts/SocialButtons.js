import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons' 

import { mainStyle } from '../../styles/mainStyle'
import { contactsStyle } from '../../styles/contactsStyle'

export const SocialButtons = () => {

    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <View style={mainStyle.center}>
            <Text style={[mainStyle.subtitle, mainStyle.textCenter, mainStyle.mb15]}>Напиши нам в соцсетях:</Text>

            <View style={mainStyle.row}>

                <TouchableOpacity
                    style={[contactsStyle.socialIconBtn, { backgroundColor: '#2AABEE' }]}
                    activeOpacity={0.7}
                    onPress={() => openLink('https://t.me/fireleit')}
                >
                    <FontAwesome5 name="telegram-plane" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[contactsStyle.socialIconBtn, { backgroundColor: '#0077FF' }]}
                    activeOpacity={0.7}
                    onPress={() => openLink('https://vk.com/fireleit')}
                >
                    <FontAwesome5 name="vk" size={22} color="#FFFFFF" />
                </TouchableOpacity>

            </View>
        </View>
    )
}