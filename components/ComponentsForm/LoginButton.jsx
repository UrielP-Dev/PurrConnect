import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const LoginButton = () => {
    return (
        <TouchableOpacity className="w-full bg-brownie py-4 rounded-xl mb-4">
            <Text className="text-white text-center font-semibold">Login</Text>
        </TouchableOpacity>
    );
};

export default LoginButton;
