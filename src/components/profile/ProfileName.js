import { View, Text, TouchableOpacity } from 'react-native'
import { profileStyle } from '../../styles/profileStyle'

export const ProfileName = ({ name, setTemplate, setSuccess }) => {
    return (
        <View style={profileStyle.row}>
            <Text style={profileStyle.label}>Имя</Text>
            <View style={profileStyle.valueBlock}>
                <Text selectable style={profileStyle.value}>{name}</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        setSuccess(null)
                        setTemplate('name')
                    }}
                >
                    <Text style={profileStyle.actionText}>Изменить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
