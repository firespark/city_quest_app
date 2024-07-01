import React, { useContext } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'

import { gStyle, gStyleFooter } from '../../styles/style'

import { MAIN_SCREEN, SEARCH_SCREEN, HOWPLAY_SCREEN, PROFILE_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'


export const Footer = ( {active} ) => {

	const { changeScreen } = useContext(MainContext)

	const imageHome = (active == 'home') ? require('../../../assets/img/home-blue.png') : require('../../../assets/img/home.png')
	const imageSearch = (active == 'search') ? require('../../../assets/img/loupe-blue.png') : require('../../../assets/img/loupe.png')
	const imageQuestion = (active == 'question') ? require('../../../assets/img/question-blue.png') : require('../../../assets/img/question.png')
	const imageProfile = (active == 'profile') ? require('../../../assets/img/user-blue.png') : require('../../../assets/img/user.png')

	const colorHome = (active == 'home') ? '#17A2B8' : '#C4C4C4'
	const colorSearch = (active == 'search') ? '#17A2B8' : '#C4C4C4'
	const colorQuestion = (active == 'question') ? '#17A2B8' : '#C4C4C4'
	const colorProfile = (active == 'profile') ? '#17A2B8' : '#C4C4C4'

    return (
        <View style={gStyleFooter.footerPanel}>
        	<TouchableOpacity
        		style={gStyleFooter.footerBlock}
		      	activeOpacity={0.7}
		      	onPress={() => {
		        	changeScreen(MAIN_SCREEN)
		      	}}
		    >
            	<Image source={imageHome} style={gStyleFooter.footerImageHome} />
            	<Text style={[gStyleFooter.footerMenuText, {color: colorHome}]}>Главная</Text>
            </TouchableOpacity>
            <TouchableOpacity
            	style={gStyleFooter.footerBlock}
		      	activeOpacity={0.7}
		      	onPress={() => {
		        	changeScreen(SEARCH_SCREEN)
		      	}}
		    >
            	<Image source={imageSearch} style={gStyleFooter.footerImageLoupe} />
            	<Text style={[gStyleFooter.footerMenuText, {color: colorSearch}]}>Поиск</Text>
            </TouchableOpacity>
            <TouchableOpacity
            	style={gStyleFooter.footerBlock}
		      	activeOpacity={0.7}
		      	onPress={() => {
		        	changeScreen(HOWPLAY_SCREEN)
		      	}}
		    >
            	<Image source={imageQuestion} style={gStyleFooter.footerImageQuestion} />
            	<Text style={[gStyleFooter.footerMenuText, {color: colorQuestion}]}>Как играть</Text>
            </TouchableOpacity>
            <TouchableOpacity
            	style={gStyleFooter.footerBlock}
		      	activeOpacity={0.7}
		      	onPress={() => {
		        	changeScreen(PROFILE_SCREEN)
		     	}}
		    >
            	<Image source={imageProfile} style={gStyleFooter.footerImageUser} />
            	<Text style={[gStyleFooter.footerMenuText, {color: colorProfile}]}>Профиль</Text>
            </TouchableOpacity>
        </View>
    )


}