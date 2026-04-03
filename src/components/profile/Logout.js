import { useContext } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { profileStyle } from '../../styles/profileStyle'

import { MainContext } from '../../context/mainContext'
import { MAIN_SCREEN } from '../../context/types'

export const Logout = () => {
	const { resetToken, changeScreen } = useContext(MainContext)

	return (
		<TouchableOpacity
			style={profileStyle.logoutButton}
			activeOpacity={0.7}
			onPress={() => {
				changeScreen(MAIN_SCREEN);
				resetToken();
			}}
		>
			<Text style={profileStyle.logoutText}>Выйти из аккаунта</Text>
		</TouchableOpacity>
	)
}
