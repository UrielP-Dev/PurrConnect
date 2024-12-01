import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Utils/Firebase';

const LoginButton = ({ email, password, setErrors, onLoginSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        const newErrors = { email: '', password: '' };


        if (!email) newErrors.email = 'Email is required.';
        if (!password) newErrors.password = 'Password is required.';

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;
            onLoginSuccess(userId);
            console.log(userId);
        } catch (error) {
            let errorMessage = { email: '', password: '' };
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage.email = 'Invalid email address format.';
                    break;
                case 'auth/user-not-found':
                    errorMessage.email = 'User not found.';
                    break;
                case 'auth/wrong-password':
                    errorMessage.password = 'Incorrect password.';
                    break;
                case 'auth/invalid-credential':
                    errorMessage.email = 'Invalid credentials provided. Please check your email and password.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage.email = 'Network error. Please check your connection.';
                    break;
                default:
                    console.error(error);
            }
            setErrors(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity
            className={`w-full py-4 rounded-xl mb-4 flex items-center justify-center ${
                loading ? 'bg-gray-500' : 'bg-brownie'
            }`}
            onPress={handleLogin}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
                <Text className="text-white text-center font-semibold">Login</Text>
            )}
        </TouchableOpacity>
    );
};

export default LoginButton;
