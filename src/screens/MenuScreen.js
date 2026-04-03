import { View, ScrollView } from 'react-native'

import { mainStyle } from '../styles/mainStyle'
import { headerStyle } from '../styles/headerStyle'

import { Close } from '../components/common/Close'
import { MenuItems } from '../components/common/MenuItems'
import { Footer } from '../components/common/Footer'

export const MenuScreen = () => {


	return (
		<View style={mainStyle.flex}>
			<View style={[mainStyle.panelRowRight, headerStyle.panelHeader]}>
				<Close />
			</View>
			<ScrollView
				style={mainStyle.flex}
				keyboardShouldPersistTaps="handled"
				keyboardDismissMode="interactive"
			>
				<View style={mainStyle.container}>
					<MenuItems />
				</View>

			</ScrollView>
			<Footer />
		</View>
	)
}
