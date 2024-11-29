import {Text, TextInput, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import { View, T, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const CreatePost = () => {


    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostDescription, setNewPostDescription] = useState('');

    return (
        <>
            <Text className="text-brownie font-bold">
            Create post
        </Text>
            <View className="bg-main/20 rounded-lg p-4 mb-4">
                <TextInput
                    placeholder="Post Title"
                    value={newPostTitle}
                    onChangeText={setNewPostTitle}
                    className="bg-white rounded-md p-2 mb-2 text-brownie border border-secondary/30"
                />
                <TextInput
                    placeholder="What's on your mind?"
                    value={newPostDescription}
                    onChangeText={setNewPostDescription}
                    multiline
                    className="bg-white rounded-md p-2 mb-2 min-h-[80px] text-brownie border border-secondary/30"
                />
                <TouchableOpacity
                    onPress={handleAddPost}
                    className="bg-tertiary p-2 rounded-md items-center"
                >
                    <Text className="text-white font-bold">Publish</Text>
                </TouchableOpacity>
            </View>

        </>
    )


}

export default CreatePost;