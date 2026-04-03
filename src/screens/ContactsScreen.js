import { View, ScrollView } from 'react-native'

import { mainStyle } from '../styles/mainStyle'
import { headerStyle } from '../styles/headerStyle'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { ContactsContent } from '../components/contacts/ContactsContent'
import { ContactsForm } from '../components/contacts/ContactsForm'

import { Footer } from '../components/common/Footer'

export const ContactsScreen = () => {

	return (
		<View style={mainStyle.pageBackground}>
			<View style={headerStyle.panelHeader}>
				<Back />
				<HeaderTitle title="Контакты" />
				<Menu />
			</View>
			<ScrollView
				style={mainStyle.flex}
				keyboardShouldPersistTaps="handled"
				keyboardDismissMode="interactive"
				showsVerticalScrollIndicator={false}
			>
				<View style={mainStyle.scrollContent}>
					<ContactsContent />
					<ContactsForm />
				</View>
			</ScrollView>
			<Footer />
		</View>
	)
}
