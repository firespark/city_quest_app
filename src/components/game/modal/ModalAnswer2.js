import { View, Text, TouchableOpacity } from 'react-native'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

export const ModalAnswer2 = ({ answer2, setModal, nextGame }) => {
	return (
		<View style={mainStyle.mt5}>

			<View style={mainStyle.card}>
				<Text style={[gameStyle.gameSuccessTitle, mainStyle.mt10]}>ВЕРНО!</Text>
				<Text selectable style={[gameStyle.answerTitle, mainStyle.mb10]}>{answer2}</Text>
			</View>

			<View style={mainStyle.mt15}>
				<TouchableOpacity
					style={mainStyle.primaryButton}
					activeOpacity={0.7}
					onPress={() => {
						nextGame()
						setModal(null)
					}}
				>
					<Text style={mainStyle.primaryButtonText}>Продолжить</Text>
				</TouchableOpacity>
			</View>

			<View style={[mainStyle.textCenter, mainStyle.mt20]}>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => {
						setModal(null)
					}}
				>
					<Text style={[gameStyle.gameLinkText, mainStyle.textCenter]}>Вернуться на предыдущий экран</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
