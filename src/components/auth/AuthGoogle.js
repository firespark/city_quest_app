import { View, Text, TouchableOpacity, Image } from 'react-native';

import { authStyle } from '../../styles/authStyle'

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Http } from '../../scripts/http';

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
                const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/loginGoogle`, { idToken: response.data.idToken }, token);
                if (output.success == 1) {
                    changeScreen(screen);
                } else {
                    setError(output.error || 'Ошибка входа через Google');
                }
            }
        } catch (e) {
            console.error('Error:', e);
            setError('Не удалось войти через Google');
        } finally {
            setLoader(false);
        }
    };

    return (
        <View style={authStyle.googleContainer}>
            <View style={authStyle.googleDividerRow}>
                <View style={authStyle.googleLine} />
                <Text style={authStyle.googleDividerText}>или</Text>
                <View style={authStyle.googleLine} />
            </View>

            <TouchableOpacity style={authStyle.googleButton} activeOpacity={0.8} onPress={signIn}>
                <Image source={require('../../../assets/img/google.png')} style={authStyle.googleIcon} />
                <Text style={authStyle.googleButtonText}>Войти через Google</Text>
            </TouchableOpacity>
        </View>
    );
};
