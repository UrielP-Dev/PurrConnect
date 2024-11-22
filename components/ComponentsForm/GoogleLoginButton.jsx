import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../../Utils/Firebase';

const GoogleLoginButton = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        androidClientId: '', // Client ID de Android
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;

            // Usamos el token para autenticar con Firebase
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then(() => {
                    console.log('Usuario autenticado exitosamente con Google');
                })
                .catch((error) => {
                    console.error('Error al autenticar con Google: ', error);
                });
        }
    }, [response]);

    const handleGoogleLogin = () => {
        promptAsync();
    };

    return (
        <TouchableOpacity
            onPress={handleGoogleLogin}
            disabled={!request} // Deshabilitar si la solicitud no está lista
            className="w-full flex-row items-center justify-center bg-white py-4 rounded-xl shadow-sm"
        >
            <View className="w-5 h-5 mr-3 items-center justify-center">
                <Icon name="google" size={20} color="black" />
            </View>
            <Text className="text-brownie font-semibold">Continue with Google</Text>
        </TouchableOpacity>
    );
};

export default GoogleLoginButton;
