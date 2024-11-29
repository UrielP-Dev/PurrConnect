import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Post = ({ post, onLike, onComment }) => {
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const formattedDate = new Date(post.createdAt).toLocaleDateString();
    const formattedTime = new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const openImageModal = (image) => {
        setSelectedImage(image);
        setImageModalVisible(true);
    };

    return (
        <View className="bg-white rounded-xl p-4 mb-4 shadow-md">
            {/* Post Header */}
            <View className="flex-row justify-between items-start mb-3">
                <Text className="text-lg font-bold text-brownie flex-1">{post.Title}</Text>
            </View>

            {/* Post Content */}
            <Text className="text-tertiary mb-3">{post.Description}</Text>

            {/* User and Date Info */}
            <View className="flex-row items-center space-x-2 mb-3">
                <View className="flex-row items-center">
                    <MaterialIcons name="account-circle" size={18} color="#694E4E" />
                    <Text className="text-brownie font-medium ml-1">{post.userId}</Text>
                </View>
                <Text className="text-secondary">•</Text>
                <Text className="text-secondary text-xs">
                    {formattedDate} at {formattedTime}
                </Text>
            </View>

            {/* Image Gallery */}
            {post.ImgDir && post.ImgDir.length > 0 && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mb-3"
                >
                    {post.ImgDir.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => openImageModal(image)}
                        >
                            <Image
                                source={{ uri: image }}
                                className="w-28 h-28 rounded-lg mr-2"
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {/* Interaction Buttons */}
            <View className="flex-row items-center justify-between border-t border-secondary/20 pt-3">
                <TouchableOpacity
                    onPress={() => onLike(post.id)}
                    className="flex-row items-center"
                >
                    <MaterialIcons
                        name="favorite"
                        size={22}
                        color={post.likes > 0 ? "#694E4E" : "#886F6F"}
                    />
                    <Text className="ml-1 text-brownie">{post.likes || 0}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onComment(post.id)}
                    className="flex-row items-center"
                >
                    <MaterialIcons
                        name="comment"
                        size={22}
                        color="#694E4E"
                    />
                    <Text className="ml-1 text-brownie">
                        {post.comments?.length || 0}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Image Modal */}
            <Modal
                visible={imageModalVisible}
                transparent={true}
                onRequestClose={() => setImageModalVisible(false)}
            >
                <View className="flex-1 bg-black/80 items-center justify-center">
                    <TouchableOpacity
                        onPress={() => setImageModalVisible(false)}
                        className="absolute top-10 right-4 z-10"
                    >
                        <MaterialIcons name="close" size={30} color="white" />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: selectedImage }}
                        className="w-11/12 h-3/4"
                        resizeMode="contain"
                    />
                </View>
            </Modal>
        </View>
    );
};

export default Post;