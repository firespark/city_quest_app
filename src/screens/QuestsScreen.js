import React, { useContext } from 'react'
import { View, ScrollView, Text } from 'react-native'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { Quests } from '../components/quests/Quests'

import { Footer } from '../components/common/Footer'

import { gStyle, gStyleHeader, gStyleQuests } from '../styles/style'

import { MainContext } from '../context/mainContext'


export const QuestsScreen = () => {

	const { changeScreen, cityData } = useContext(MainContext)


	return (
        <View style={gStyle.flex}>
    		<View style={[gStyle.panelRow, gStyleHeader.panelHeader]}>
	            <Back />
        		<HeaderTitle title="Квесты"/>
	            <Menu />
	        </View>
    		<ScrollView
    			style={gStyle.flex}
    			keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
    		>
    			<View>
    				<Text style={[gStyleQuests.questsTitleBold, gStyleQuests.questsTitleBlock]}>Квесты в городе {cityData.title}</Text>
    			</View>
			    <Quests
			    	cityId={cityData.id}
			    />
			</ScrollView>
	    	<Footer />
	    </View>
    )
}