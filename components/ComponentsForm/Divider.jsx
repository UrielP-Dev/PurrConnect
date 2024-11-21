import React from 'react';
import { View, Text } from 'react-native';

const Divider = () => {
    return (
        <View className="w-full flex-row items-center my-4">
            <View className="flex-1 h-[1px] bg-tertiary opacity-30" />
            <Text className="mx-4 text-tertiary font-bold">O</Text>
            <View className="flex-1 h-[1px] bg-tertiary opacity-30" />
        </View>
    );
};

export default Divider;
