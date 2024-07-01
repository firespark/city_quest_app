import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { ContactsContent } from '../components/contacts/ContactsContent'
import { ContactsForm } from '../components/contacts/ContactsForm'

import { Footer } from '../components/common/Footer'

import { gStyle, gStyleHeader } from '../styles/style'

export const ContactsScreen = () => {


    /*const [loader, setLoader] = useState(false)

    if (loader) {
        return <Loader />
    }*/

    return (
        <View style={gStyle.flex}>
    		<View style={[gStyle.panelRow, gStyleHeader.panelHeader]}>
	            <Back />
        		<HeaderTitle title="Контакты"/>
	            <Menu />
	        </View>
    		<ScrollView
                style={gStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
    			<View style={gStyle.container}>
    				<ContactsContent />
    				<ContactsForm />    				
    			</View>
			</ScrollView>
	    	<Footer />
	    </View>
    )
}