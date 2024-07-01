import React from 'react'
import { View, ScrollView } from 'react-native'

import { Back } from '../components/common/Back'
import { Close } from '../components/common/Close'

import { MenuItems } from '../components/common/MenuItems'

import { Footer } from '../components/common/Footer'

import { gStyle, gStyleHeader } from '../styles/style'


export const MenuScreen = () => {


    return (
        <View style={gStyle.flex}>
    		<View style={[gStyle.panelRowRight, gStyleHeader.panelHeader]}>
                <Close />
	        </View>
    		<ScrollView
    			style={gStyle.flex}
    			keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
    		>
				<View style={gStyle.container}>
					<MenuItems />
				</View>    			
                
			</ScrollView>
	    	<Footer />
	    </View>
    )
}