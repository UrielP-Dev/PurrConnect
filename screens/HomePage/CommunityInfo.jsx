import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, TouchableOpacity, Text, RefreshControl } from 'react-native';
import CommunityHeader from '../../components/ComponentsCommunityInfo/CommunityHeader';
import PostCreation from '../../components/ComponentsCommunityInfo/PostCreation';
import PostsList from '../../components/ComponentsCommunityInfo/PostsList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Utils/Firebase';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { UserContext } from '../../Context/UserContext';
import { doc, getDoc } from "firebase/firestore";

const CommunityInfo = ({ route }) => {
    const { communityId, name } = route.params;
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [isJoined, setIsJoined] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();
    const { userId } = useContext(UserContext);

    // Fetch user communities and check if joined
    const fetchUserCommunities = async () => {
        try {
            const userCommunityRef = doc(db, "MyCommunities", userId);
            const userCommunityDoc = await getDoc(userCommunityRef);

            if (userCommunityDoc.exists()) {
                const userCommunities = userCommunityDoc.data().communityIds || [];
                setIsJoined(userCommunities.includes(communityId));
            } else {
                setIsJoined(false);
            }
        } catch (error) {
            console.error("Error checking community membership: ", error);
        }
    };

    // Fetch posts for the community
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

    // Refresh logic
    const onRefresh = async () => {
        setRefreshing(true);
        await Promise.all([fetchPosts(), fetchUserCommunities()]);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchPosts();
        fetchUserCommunities();
    }, [communityId]);

    const handleNavigateToCreatePost = () => {
        navigation.navigate('CreatePost', { communityId, name });
    };

    return (
        <View className="flex-1 bg-main">
            {/* Header */}
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

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#694E4E']}
                    />
                }
            >
                {/* Conditional Post Creation Section */}
                {isJoined ? (
                    <View className="bg-white mx-4 my-4 rounded-2xl shadow-lg">
                        <PostCreation onNavigate={handleNavigateToCreatePost} />
                    </View>
                ) : (
                    <View className="bg-white mx-4 my-4 rounded-2xl shadow-lg p-4">
                        <Text className="text-brownie text-center">
                            Join this community to create a post!
                        </Text>
                    </View>
                )}

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
