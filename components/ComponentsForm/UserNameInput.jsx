import React from 'react';
import { View, Text, TextInput } from 'react-native';
import ErrorMessage from './ErrorMessage';

const UserNameInput = ({ value, onChangeText, error }) => {
    return (
        <View className="w-full mb-4">
            <Text className="text-tertiary mb-4 font-bold text-xl">User Name</Text>
            <TextInput
                className="w-full bg-white px-4 py-3 rounded-xl text-brownie"
                placeholder='Juan01'
                placeholderTextColor="#C1A3A3"
                autoCapitalize="none"
                value={value}
                onChangeText={onChangeText}
            />
            <ErrorMessage message={error} />
        </View>
    );
};

export default UserNameInput;
