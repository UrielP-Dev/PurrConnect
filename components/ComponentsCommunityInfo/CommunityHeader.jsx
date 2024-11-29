import React from 'react';
import { View, Text } from 'react-native';

const CommunityHeader = ({ name, postCount }) => (
    <View className="mb-2">
        <Text className="text-2xl font-bold text-brownie mt-12 pl-4">{name}</Text>
        <Text className="text-lg text-brownie pl-4">
            {postCount} {postCount === 1 ? "Post" : "Posts"}
        </Text>
    </View>
);

export default CommunityHeader;
