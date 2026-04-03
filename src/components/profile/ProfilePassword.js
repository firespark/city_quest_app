import { View, Text, TouchableOpacity } from 'react-native'
import { profileStyle } from '../../styles/profileStyle'

export const ProfilePassword = ({ setTemplate, setSuccess }) => {
    return (
        <View style={profileStyle.row}>
            <Text style={profileStyle.label}>Пароль</Text>
            <View style={profileStyle.valueBlock}>
                <Text style={profileStyle.value}>••••••••</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        setSuccess(null)
                        setTemplate('password')
                    }}
                >
                    <Text style={profileStyle.actionText}>Изменить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
