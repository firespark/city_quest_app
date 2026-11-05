import { Text, TouchableOpacity, Image } from 'react-native';
import { authStyle } from '../../styles/authStyle'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Http } from '../../scripts/http';
import { SOCIAL_AUTH } from '../../config/socialAuth';

if (SOCIAL_AUTH.google) GoogleSignin.configure({
    webClientId: SOCIAL_AUTH.google,
    offlineAccess: true,
});

export const AuthGoogle = ({ token, changeScreen, screen, setError, setLoader }) => {
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
        <TouchableOpacity style={[authStyle.socialButton, authStyle.googleButton]} activeOpacity={0.8} onPress={signIn} disabled={!SOCIAL_AUTH.google} accessibilityState={{ disabled: !SOCIAL_AUTH.google }}>
            <Image source={require('../../../assets/img/google.png')} style={authStyle.googleIcon} resizeMode="contain" />
            <Text style={authStyle.googleButtonText}>Войти через Google</Text>
        </TouchableOpacity>
    );
};
