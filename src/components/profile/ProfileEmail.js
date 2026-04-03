import { View, Text } from 'react-native'
import { profileStyle } from '../../styles/profileStyle'

export const ProfileEmail = ({ email }) => {
	return (
		<View style={profileStyle.row}>
			<Text style={profileStyle.label}>Email</Text>
			<View style={profileStyle.valueBlock}>
				<Text selectable style={profileStyle.value}>{email}</Text>
			</View>
		</View>
	)
}
