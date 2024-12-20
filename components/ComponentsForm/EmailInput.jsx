import React from 'react';
import { View, Text, TextInput } from 'react-native';
import ErrorMessage from './ErrorMessage';

const EmailInput = ({ value, onChangeText, error }) => {
    return (
        <View className="w-full mb-4">
            <Text className="text-tertiary mb-4 font-bold text-xl">Email</Text>
            <TextInput
                className="w-full bg-white px-4 py-3 rounded-xl text-browni"
                placeholder="example@correo.com"
                placeholderTextColor="#C1A3A3"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChangeText}
            />
            <ErrorMessage message={error} />
        </View>
    );
};

export default EmailInput;
