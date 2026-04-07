import { useContext } from 'react'
import { View, ScrollView, Text } from 'react-native'

import { mainStyle } from '../styles/mainStyle'
import { headerStyle } from '../styles/headerStyle'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'
import { Quests } from '../components/quests/Quests'
import { Footer } from '../components/common/Footer'

import { MainContext } from '../context/mainContext'

export const QuestsScreen = () => {
	const { cityData } = useContext(MainContext)

	return (
		<View style={mainStyle.flex}>
			<View style={[mainStyle.panelRow, headerStyle.panelHeader]}>
				<Back />
				<HeaderTitle title="Квесты" />
				<Menu />
			</View>
			<ScrollView
				style={mainStyle.flex}
				keyboardShouldPersistTaps="handled"
				keyboardDismissMode="interactive"
			>
				<View style={mainStyle.container}>
					<Text style={mainStyle.welcomeTitle}>
						{cityData.title}
					</Text>
					{/*<Text style={mainStyle.welcomeSubtitle}>
						Доступные квест-экскурсии
					</Text>*/}
				</View>

				<Quests 
					cityId={cityData.id} 
					showFilters={true} 
				/>
			</ScrollView>
			<Footer />
		</View>
	)
}
