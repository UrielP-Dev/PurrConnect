import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { db } from '../../Utils/Firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../../Context/UserContext';
import Post from '../../components/ComponentsCommunityInfo/Post';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Header from "../../components/ComponentsHomePage/Header";

const MyCommunities = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const { userId } = useContext(UserContext);
    const navigation = useNavigation();

    const fetchUserCommunities = async () => {
        const userRef = doc(db, "MyCommunities", userId);
        try {
            const userDoc = await getDoc(userRef);
            return userDoc.exists() ? userDoc.data().communityIds || [] : [];
        } catch (error) {
            console.error("Error fetching user communities: ", error);
            return [];
        }
    };

    const fetchPosts = async () => {
        setIsLoading(true);
        const communityIds = await fetchUserCommunities();

        if (communityIds.length > 0) {
            const postsQuery = query(
                collection(db, "Posts"),
                where("CommunityID", "in", communityIds)
            );
            try {
                const querySnapshot = await getDocs(postsQuery);
                const fetchedPosts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(fetchedPosts);
                setIsEmpty(fetchedPosts.length === 0);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        } else {
            setIsEmpty(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, [userId]);

    const EmptyState = () => (
        <View className="flex-1 justify-center items-center p-6">
            <MaterialIcons name="group" size={64} color="#694E4E" />
            <Text className="text-brownie text-xl font-bold mt-4 text-center">
                No Posts in Your Communities
            </Text>
            <Text className="text-tertiary text-center mt-2">
                Join more communities or create some posts!
            </Text>
        </View>
    );

    return (
        <View className="flex-1 bg-main">
            <Header navigation={navigation} />

            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#694E4E" />
                    <Text className="text-brownie mt-2">Loading posts...</Text>
                </View>
            ) : isEmpty ? (
                <EmptyState />
            ) : (
                <ScrollView
                    contentContainerStyle={{
                        padding: 16,
                        paddingBottom: 100
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {posts.map(post => (
                        <Post
                            key={post.id}
                            post={post}
                            onLike={() => console.log('Liked:', post.id)}
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default MyCommunities;