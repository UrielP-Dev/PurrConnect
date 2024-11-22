import React from 'react';
import { Text } from 'react-native';

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <Text className="text-red-500 text-sm mt-2">
            {message}
        </Text>
    );
};

export default ErrorMessage;
