import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import CommunityHeader from '../../components/ComponentsCommunityInfo/CommunityHeader';
import PostCreation from '../../components/ComponentsCommunityInfo/PostCreation';
import PostsList from '../../components/ComponentsCommunityInfo/PostsList';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../Utils/Firebase';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CommunityInfo = ({ route }) => {
    const { communityId, name } = route.params;
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);

    const navigation = useNavigation();

    const fetchPosts = async () => {
        try {
            const postsQuery = query(
                collection(db, "Posts"),
                where("CommunityID", "==", communityId),
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


    const handleNavigateToCreatePost = () => {
        navigation.navigate('CreatePost', { communityId, name });
    };

    useEffect(() => {
        fetchPosts();
    }, [communityId]);

    return (
        <View className="flex-1 bg-main">
            {/* Enhanced Header with Back Button */}
            <View className="bg-white px-4 py-4 flex-row items-center shadow-sm">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="mr-4"
                >
                    <MaterialIcons name="arrow-back" size={24} color="#694E4E" />
                </TouchableOpacity>

                <View className="flex-1">
                    <Text className="text-brownie text-xl font-bold">{name}</Text>
                    <Text className="text-secondary text-sm">
                        {postCount} Posts
                    </Text>
                </View>
            </View>

            <ScrollView>
                {/* Post Creation Section with Enhanced Visual Separation */}
                <View className="bg-white mx-4 my-4 rounded-2xl shadow-lg">
                    <PostCreation onNavigate={handleNavigateToCreatePost} />
                </View>

                {/* Stylized Divider */}
                <View className="flex-row justify-center items-center mb-3 px-4">
                    <View className="flex-1 h-[1px] bg-secondary/30"></View>
                    <Text className="mx-2 text-secondary text-xs">Recent Posts</Text>
                    <View className="flex-1 h-[1px] bg-secondary/30"></View>
                </View>

                {/* Posts List */}
                <View className="px-4">
                    <PostsList
                        posts={posts}
                        onLike={postId => console.log('Liked:', postId)}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default CommunityInfo;