import { View, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'


export const ProfileSuccess = ({ text }) => {

	return (
		<View style={mainStyle.p}>
			<Text selectable style={mainStyle.blue}>{text}</Text>
		</View>
	)
}
