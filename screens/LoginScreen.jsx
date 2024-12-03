import React, { useState, useContext } from 'react';
import { ScrollView, View, Image } from 'react-native';
import EmailInput from '../components/ComponentsForm/EmailInput';
import PasswordInput from '../components/ComponentsForm/PasswordInput';
import LoginButton from '../components/ComponentsForm/LoginButton';
import Divider from '../components/ComponentsForm/Divider';
import GoogleLoginButton from '../components/ComponentsForm/GoogleLoginButton';
import { UserContext } from '../Context/UserContext';

const LoginScreen = ({ navigation }) => {
    const { setUserId } = useContext(UserContext); // Accede a setUserId
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleLoginSuccess = (id) => {
        setUserId(id);
        navigation.navigate('HomePage');
    };

    return (
        <ScrollView className="flex-1 bg-main">
            <View className="flex-1  px-6 py-12 mt-16">
                <Image className="h-80 w-80" source={require('../assets/PurrIcon.png')} />
                <EmailInput
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    error={errors.email}
                />
                <PasswordInput
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    error={errors.password}
                />
                <LoginButton
                    email={email}
                    password={password}
                    setErrors={setErrors}
                    onLoginSuccess={handleLoginSuccess}
                />
                <Divider />
                <GoogleLoginButton />
            </View>
        </ScrollView>
    );
};

export default LoginScreen;
