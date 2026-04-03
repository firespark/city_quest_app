import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { SocialButtons } from './SocialButtons'

import { mainStyle } from '../../styles/mainStyle'
import { contactsStyle } from '../../styles/contactsStyle'

export const ContactsContent = () => {
    return (
        <View style={[mainStyle.card, mainStyle.mt20]}>
            <View style={[mainStyle.center, mainStyle.mb25]}>

                <SocialButtons />

                <View style={contactsStyle.emailBlock}>
                    <Text style={[mainStyle.subtitle, mainStyle.textCenter, mainStyle.mt20]}>Или на Email:</Text>
                    <TouchableOpacity
                        style={contactsStyle.emailButton}
                        activeOpacity={0.7}
                        onPress={() => Linking.openURL('mailto:info@gagara-web.ru')}
                    >
                        <Text selectable style={contactsStyle.emailText}>info@gagara-web.ru</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}