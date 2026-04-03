import { View, Text, Image, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'
import { gameStyle } from '../../styles/gameStyle'

export const TaskSign = ({ number, setModal, disabled }) => {
	return (
		<View style={gameStyle.taskSignWrapper}>
			{
				(disabled)
					?
					<View style={[gameStyle.pill, gameStyle.pillDisabled]}>
						<Image source={require('../../../assets/img/question2-disabled.png')} style={gameStyle.taskImage} />
						<Text style={[mainStyle.textBlue, mainStyle.textDisabled]}>Задание {number}</Text>
					</View>
					:
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							setModal(`task${number}`)
						}}
					>
						<View style={[gameStyle.pill, gameStyle.pillActive]}>
							<Image source={require('../../../assets/img/question2.png')} style={gameStyle.taskImage} />
							<Text style={mainStyle.textBlue}>Задание {number}</Text>
						</View>
					</TouchableOpacity>
			}
		</View>
	)
}
