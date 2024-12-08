import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../Utils/Firebase';
import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from "firebase/firestore";
import { auth } from '../../Utils/Firebase';

const Post = ({ post }) => {
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [postUserName, setPostUserName] = useState(null);
    const [currentUserName, setCurrentUserName] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [liked, setLiked] = useState(false);
    const navigation = useNavigation();

    // Fetch post user name
    useEffect(() => {
        const fetchPostUserName = async () => {
            try {
                const userDocRef = doc(db, "users", post.UserID);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setPostUserName(userData.userName);
                } else {
                    console.warn("Usuario creador del post no encontrado.");
                }
            } catch (error) {
                console.error("Error al obtener el nombre de usuario del post:", error);
            }
        };

        if (post.UserID) {
            fetchPostUserName();
        }
    }, [post.UserID]);

    // Fetch current user name
    useEffect(() => {
        const fetchCurrentUserName = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setCurrentUserName(userData.userName);
                    } else {
                        console.warn("Usuario autenticado no encontrado.");
                    }
                }
            } catch (error) {
                console.error("Error al obtener el nombre del usuario autenticado:", error);
            }
        };

        fetchCurrentUserName();
    }, []);

    // Improved like functionality
    const handleLike = async () => {
        try {
            const postRef = doc(db, "Posts", post.id);
            const user = auth.currentUser;

            if (user) {
                if (!liked) {
                    // Add like
                    await updateDoc(postRef, {
                        Likes: arrayUnion(user.uid),
                    });
                    setLiked(true);
                } else {
                    // Remove like
                    await updateDoc(postRef, {
                        Likes: arrayRemove(user.uid),
                    });
                    setLiked(false);
                }
            }
        } catch (error) {
            console.error("Error al manejar like:", error);
        }
    };

    // Check if current user has already liked the post
    useEffect(() => {
        const checkLikeStatus = () => {
            const user = auth.currentUser;
            if (user && post.Likes && Array.isArray(post.Likes)) {
                setLiked(post.Likes.includes(user.uid));
            }
        };

        checkLikeStatus();
    }, [post.Likes]);

    const handleSendComment = async () => {
        if (newComment.trim() && currentUserName) {
            try {
                const postRef = doc(db, "Posts", post.id);

                await updateDoc(postRef, {
                    Comments: arrayUnion({
                        userName: currentUserName,
                        text: newComment.trim(),
                        createdAt: new Date()
                    })
                });

                setNewComment(""); // Clear input
            } catch (error) {
                console.error("Error al agregar comentario:", error);
            }
        }
    };

    const handleImagePress = (image) => {
        setSelectedImage(image);
        setImageModalVisible(true);
    };

    const formattedDate = new Date(post.createdAt).toLocaleDateString();
    const formattedTime = new Date(post.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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
                    <Text className="text-brownie font-medium ml-1">{postUserName || "Cargando..."}</Text>
                </View>
                <Text className="text-secondary">•</Text>
                <Text className="text-secondary text-xs">
                    {formattedDate} at {formattedTime}
                </Text>
            </View>

            {/* Image Gallery */}
            {post.ImgDir && post.ImgDir.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
                    {post.ImgDir.map((image, index) => (
                        <TouchableOpacity key={index} onPress={() => handleImagePress(image)}>
                            <Image source={{ uri: image }} className="w-28 h-28 rounded-lg mr-2" />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            <View className="flex-row items-center justify-between border-t border-secondary/20 pt-3">
                {/* Likes Section - Reddit-style */}
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={handleLike}
                        className="flex-row items-center mr-2"
                    >
                        <MaterialIcons
                            name={liked ? "favorite" : "favorite-border"}
                            size={22}
                            color={liked ? "#694E4E" : "#886F6F"}
                        />
                        <Text className={`ml-1 ${liked ? 'text-brownie font-bold' : 'text-secondary'}`}>
                            {post.Likes ? (Array.isArray(post.Likes) ? post.Likes.length : post.Likes) : 0}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Comments Section */}
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Comments", { postId: post.id })}
                        className="flex-row items-center"
                    >
                        <MaterialIcons name="comment" size={22} color="#694E4E" />
                        <Text className="ml-1 text-brownie">{post.Comments ? post.Comments.length : 0}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Comment Input */}
            <View className="bg-white px-4 py-3 flex-row items-center shadow-sm">
                <TextInput
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="Escribe un comentario..."
                    multiline
                    maxLength={500}
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2 max-h-24"
                />
                <TouchableOpacity
                    onPress={handleSendComment}
                    disabled={!newComment.trim()}
                    className={`p-2 rounded-full ${newComment.trim() ? 'bg-brownie' : 'bg-gray-300'}`}
                >
                    <MaterialIcons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Image Modal */}
            {selectedImage && (
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
                        <Image source={{ uri: selectedImage }} className="w-11/12 h-3/4" resizeMode="contain" />
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default Post;