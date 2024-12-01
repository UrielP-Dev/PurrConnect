import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const PostCreation = ({ onNavigate }) => (
    <View className="bg-main/20 rounded-lg p-4 mb-4">
        <TouchableOpacity onPress={onNavigate} activeOpacity={1}>
            <TextInput
                placeholder="What's on your mind?"
                editable={false}
                className="bg-white rounded-full p-4 mb-2 min-h-[60px] text-brownie border border-secondary/30"
            />
        </TouchableOpacity>
    </View>
);

export default PostCreation;
