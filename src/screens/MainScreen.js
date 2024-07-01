import React from 'react'
import { View, ScrollView } from 'react-native'

import { Logo } from '../components/common/Logo'
import { Menu } from '../components/common/Menu'

import { Search } from '../components/common/Search'
import { PopularCities } from '../components/cities/PopularCities'
import { PopularQuests } from '../components/quests/PopularQuests'

import { Footer } from '../components/common/Footer'

import { gStyle, gStyleHeader } from '../styles/style'

export const MainScreen = () => {

    return (
        <View style={gStyle.flex}>
    		<View style={[gStyle.panelRow, gStyleHeader.panelHeader]}>
	            <Logo />
	            <Menu />
	        </View>
    		<ScrollView
    			style={gStyle.flex}
    			keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
    		>
    			<Search />
			    <PopularCities />
			    <PopularQuests />
			</ScrollView>
	    	<Footer active="home" />
	    </View>
    )
}

