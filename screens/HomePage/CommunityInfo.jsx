import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Utils/Firebase';

const CommunityInfo = ({ route }) => {
    const { communityId, name } = route.params;

    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostDescription, setNewPostDescription] = useState('');

    // Función para obtener los posts desde Firebase
    const fetchPosts = async () => {
        try {
            const postsQuery = query(
                collection(db, "Posts"),
                where("CommunityID", "==", communityId) // Filtrar por el ID de la comunidad
            );

            const querySnapshot = await getDocs(postsQuery);

            const fetchedPosts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setPosts(fetchedPosts);
            setPostCount(fetchedPosts.length);
        } catch (error) {
            console.error("Error fetching posts: ", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [communityId]);

    const handleLike = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? { ...post, likes: (post.likes || 0) + 1 }
                    : post
            )
        );
    };

    const handleAddPost = () => {
        if (!newPostTitle.trim() || !newPostDescription.trim()) return;

        const newPost = {
            id: `${posts.length + 1}`,
            Title: newPostTitle,
            Description: newPostDescription,
            likes: 0,
            comments: []
        };

        setPosts(prevPosts => [newPost, ...prevPosts]);
        setPostCount(prevCount => prevCount + 1);
        setNewPostTitle('');
        setNewPostDescription('');
    };

    return (
        <ScrollView
            className="flex-1 bg-main"
            contentContainerStyle={{ padding: 16 }}
        >
            {/* Community Header */}
            <View className="mb-4">
                <Text className="text-2xl font-bold text-brownie">{name}</Text>
                <Text className="text-lg text-secondary">
                    {postCount} {postCount === 1 ? "Post" : "Posts"}
                </Text>
            </View>

            {/* Post Creation Area */}
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

            {/* Posts List */}
            {posts.map(post => (
                <View
                    key={post.id}
                    className="bg-white rounded-lg p-4 mb-4 shadow-md"
                >
                    <Text className="text-lg font-bold text-brownie mb-2">
                        {post.Title}
                    </Text>
                    <Text className="text-secondary mb-4">
                        {post.Description}
                    </Text>

                    {/* Interaction Area */}
                    <View className="flex-row items-center space-x-4 gap-8 ">
                        <TouchableOpacity
                            onPress={() => handleLike(post.id)}
                            className="flex-row items-center"
                        >
                            <MaterialIcons
                                name="favorite"
                                size={24}
                                color="#694E4E"
                                style={{
                                    color: "#694E4E",
                                    opacity: post.likes > 0 ? 1 : 0.5
                                }}
                            />
                            <Text className="ml-1 text-brownie">
                                {post.likes || 0}
                            </Text>
                        </TouchableOpacity>

                        <View className="flex-row items-center">
                            <MaterialIcons
                                name="comment"
                                size={24}
                                color="#694E4E"
                            />
                            <Text className="ml-1 text-brownie">
                                {post.comments?.length || 0}
                            </Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export default CommunityInfo;
