import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';

import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

import { gStyle, gStyleAuth } from '../../styles/style';

import {
	GoogleSignin,
	statusCodes,
  } from '@react-native-google-signin/google-signin';

export const AuthGoogle = ({ text }) => {
	
	const [loader, setLoader] = useState(true);
	const [error, setError] = useState(null);

	GoogleSignin.configure({
		webClientId: process.env.EXPO_PUBLIC_WEBCLIENT_ID, // Replace with your actual Web Client ID
		offlineAccess: true, // This enables the `serverAuthCode` if needed
	  });

	const signIn = async () => {
		//console.log('google trying')
		try {
			
		  await GoogleSignin.hasPlayServices();
			const response = await GoogleSignin.signIn();
			console.log(response);
		  if (response.type === "success") {
			  console.log(response.data);
			  //setState({ userInfo: response.data });
		  } else {
			// sign in was cancelled by user
		  }
		} catch (e) {
			console.log(e)
			if (isErrorWithCode(e)) {
			  
			switch (e.code) {
			  case statusCodes.IN_PROGRESS:
				// operation (eg. sign in) already in progress
				break;
			  case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
				// Android only, play services not available or outdated
				break;
			  default:
			  // some other error happened
			}
		  } else {
			// an error that's not related to google sign in occurred
		  }
		}
	};



	return (
		<View>
			{text ? (
				<View>
					<Text selectable style={[gStyle.title, gStyle.mb8]}>
						{text}
					</Text>
				</View>
			) : null}

			<View style={gStyle.panelRowCenter}>
                {
                    error ?
                    <Error text={error} />
                    :
                    null
                }
				<TouchableOpacity activeOpacity={0.7} onPress={() => signIn()}>
					<Image source={require('../../../assets/img/google.png')} style={gStyleAuth.authIcon} />
				</TouchableOpacity>
			</View>
		</View>
	);
};
