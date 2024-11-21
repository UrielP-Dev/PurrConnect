import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="w-full mb-8">
            <Text className="text-tertiary mb-4 font-bold text-xl">Password</Text>
            <View className="relative w-full">
                <TextInput
                    className="w-full bg-white px-4 py-3 rounded-xl text-brownie pr-12"
                    placeholder="••••••••"
                    placeholderTextColor="#C1A3A3"
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    className="absolute right-4 top-3"
                    onPress={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff size={24} color="#694E4E" />
                    ) : (
                        <Eye size={24} color="#694E4E" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PasswordInput;
