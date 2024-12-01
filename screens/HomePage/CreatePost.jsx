import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../Utils/Firebase';
import { doc, setDoc } from 'firebase/firestore';

const CreatePost = ({ route, navigation }) => {
    const { communityId } = route.params;
    const { userId } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            const newImages = result.assets.map(asset => asset.uri);
            setImages([...images, ...newImages]);
        }
    };

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const uploadImages = async (postId, communityId) => {
        try {
            const uploadPromises = images.map(async (imageUri) => {
                const response = await fetch(imageUri);
                const blob = await response.blob();

                const filename = `${Date.now()}-${imageUri.split('/').pop()}`;
                const storagePath = `posts/${communityId}/${postId}/${filename}`;
                const storageRef = ref(storage, storagePath);

                await uploadBytes(storageRef, blob);
                return await getDownloadURL(storageRef);
            });

            return await Promise.all(uploadPromises);
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };



    const validateFields = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required.';
        if (!content.trim()) newErrors.content = 'Content is required.';
        if (!communityId) newErrors.community = 'Please select a community.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createPost = async () => {
        if (!validateFields()) return;

        try {
            const postRef = doc(collection(db, 'Posts'));
            const postId = postRef.id;

            // Subir imágenes al Storage
            const imageUrls = images.length > 0 ? await uploadImages(postId, communityId) : [];

            // Guardar post en Firestore
            await setDoc(postRef, {
                Title: title,
                Description: content,
                CommunityID: communityId,
                ImgDir: imageUrls,
                Likes: 0,
                UserID: userId,
                createdAt: new Date().toISOString(),
                Comments: 0
            });

            navigation.goBack();
        } catch (error) {
            console.error('Error creating post:', error);
            setErrors({ general: 'Failed to create post. Please try again later.' });
        }
    };

    return (
        <ScrollView className="flex-1 bg-main">
            <View className="px-4 py-6">
                <View className="flex-row items-center my-6 ">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color="#694E4E" />
                    </TouchableOpacity>
                    <Text className="text-brownie font-bold text-xl ml-4">
                        Create Post
                    </Text>
                </View>

                <View className="bg-white rounded-xl p-4 shadow-md mb-4">
                    <TextInput
                        placeholder="Title"
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text);
                            if (errors.title) setErrors({ ...errors, title: '' });
                        }}
                        className="border-b border-secondary/30 pb-2 text-brownie font-medium"
                        placeholderTextColor="#886F6F"
                    />
                    {errors.title && (
                        <Text className="text-red-500 text-sm mt-1">{errors.title}</Text>
                    )}

                    <TextInput
                        placeholder="What's on your mind?"
                        value={content}
                        onChangeText={(text) => {
                            setContent(text);
                            if (errors.content) setErrors({ ...errors, content: '' });
                        }}
                        multiline
                        className="mt-4 h-32 text-tertiary"
                        placeholderTextColor="#886F6F"
                    />
                    {errors.content && (
                        <Text className="text-red-500 text-sm mt-1">{errors.content}</Text>
                    )}
                </View>

                <View className="mb-4">
                    <TouchableOpacity
                        onPress={pickImage}
                        className="flex-row items-center bg-secondary p-3 rounded-xl"
                    >
                        <MaterialIcons name="image" size={24} color="#FFFFFF" />
                        <Text className="text-white ml-2">Add Images</Text>
                    </TouchableOpacity>
                </View>

                {images.length > 0 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mb-4"
                    >
                        {images.map((image, index) => (
                            <View key={index} className="mr-2 relative">
                                <Image
                                    source={{ uri: image }}
                                    className="w-24 h-24 rounded-xl"
                                />
                                <TouchableOpacity
                                    onPress={() => removeImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 rounded-full p-1"
                                >
                                    <MaterialIcons name="close" size={16} color="#FFFFFF" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                )}

                {errors.general && (
                    <Text className="text-red-500 text-sm mb-4">{errors.general}</Text>
                )}

                {errors.community && (
                    <Text className="text-red-500 text-sm mb-4">{errors.community}</Text>
                )}

                <TouchableOpacity
                    onPress={createPost}
                    className="bg-brownie p-4 rounded-xl items-center"
                >
                    <Text className="text-white font-bold">Publish Post</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CreatePost;
