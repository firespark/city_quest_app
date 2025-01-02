import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { Http } from '../../scripts/http';

import { gStyle, gStyleAuth } from '../../styles/style';

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const AuthGoogle = ({ token, changeScreen, screen, setError, setLoader }) => {

	GoogleSignin.configure({
		webClientId: process.env.EXPO_PUBLIC_WEBCLIENT_ID,
		offlineAccess: true,
	});

	const signIn = async () => {
		setLoader(true);
		setError(null);
		try {
			await GoogleSignin.hasPlayServices();
			const response = await GoogleSignin.signIn();
			
			if (response.type === 'success') {
				
				//setState({ userInfo: response.data });

				const postdata = { idToken: response.data.idToken };
				try {
					const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/loginGoogle`, postdata, token);
					
					if (output.success == 1) {
						changeScreen(screen);
					} else {
						if (output.error) {
							setError(output.error);
						} else {
							setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом');
						}
					}
				} catch (e) {
					
					setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом');
				} 
			} else {
				// sign in was cancelled by user
			}
		} catch (e) {
			
			setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом');
			
		}
		setLoader(false);
	};

	return (
		<View>
			<View>
				<Text selectable style={[gStyle.title, gStyle.mb8]}>
					Войти с помощью:
				</Text>
			</View>

			<View style={gStyle.panelRowCenter}>
				<TouchableOpacity activeOpacity={0.7} onPress={() => signIn()}>
					<Image source={require('../../../assets/img/google.png')} style={gStyleAuth.authIcon} />
				</TouchableOpacity>
			</View>
		</View>
	);
};
