import React from 'react';
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../../Utils/Firebase'; // Importa el Auth desde tu configuración centralizada
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();

        // Inicia el flujo de redirección
        signInWithRedirect(auth, provider);
    };

    return (
        <TouchableOpacity
            onPress={handleGoogleLogin}
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
