import React, { useState, useEffect, useContext } from 'react';
import { Text, FlatList, View, ToastAndroid, ActivityIndicator, RefreshControl, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommunityCard from "../components/ComponentsHomePage/CommunityCard";
import { getDocs, collection, doc, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";
import { db } from "../Utils/Firebase";
import Header from '../components/ComponentsHomePage/Header';
import { UserContext } from '../Context/UserContext';

const HomePage = () => {
    const [communityCount, setCommunityCount] = useState(0);
    const [communities, setCommunities] = useState([]);
    const [userCommunities, setUserCommunities] = useState([]);
    const [filteredCommunities, setFilteredCommunities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState({
        communities: true,
        userCommunities: true,
    });
    const [isRefreshing, setIsRefreshing] = useState(false);
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);

    // Función para obtener las comunidades
    const fetchCommunities = async () => {
        try {
            setIsLoading((prev) => ({ ...prev, communities: true }));
            const querySnapshot = await getDocs(collection(db, "Communitys"));
            const communityList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCommunityCount(communityList.length);
            setCommunities(communityList);
            setFilteredCommunities(communityList);
        } catch (error) {
            console.error("Error fetching communities: ", error);
            ToastAndroid.show("Failed to load communities", ToastAndroid.SHORT);
        } finally {
            setIsLoading((prev) => ({ ...prev, communities: false }));
        }
    };

    // Search functionality
    useEffect(() => {
        if (searchTerm) {
            const filtered = communities.filter(community =>
                community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (community.description &&
                    community.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredCommunities(filtered);
        } else {
            setFilteredCommunities(communities);
        }
    }, [searchTerm, communities]);

    // Rest of the previous methods remain the same...
    const fetchUserCommunities = async () => {
        const userCommunityRef = doc(db, "MyCommunities", userId);
        try {
            setIsLoading((prev) => ({ ...prev, userCommunities: true }));
            const userCommunityDoc = await getDoc(userCommunityRef);
            if (userCommunityDoc.exists()) {
                const userCommunitiesFromDB = userCommunityDoc.data().communityIds || [];
                setUserCommunities(userCommunitiesFromDB);
            } else {
                setUserCommunities([]);
            }
        } catch (error) {
            console.error("Error fetching user communities: ", error);
            ToastAndroid.show("Failed to load user communities", ToastAndroid.SHORT);
        } finally {
            setIsLoading((prev) => ({ ...prev, userCommunities: false }));
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await Promise.all([fetchCommunities(), fetchUserCommunities()]);
        setIsRefreshing(false);
    };

    useEffect(() => {
        fetchCommunities();
        fetchUserCommunities();
    }, [userId]);

    const handleJoinPress = async (communityId) => {
        const userCommunityRef = doc(db, "MyCommunities", userId);

        try {
            const userCommunityDoc = await getDoc(userCommunityRef);

            if (userCommunityDoc.exists()) {
                const userCommunitiesFromDB = userCommunityDoc.data().communityIds || [];
                const isAlreadyJoined = userCommunitiesFromDB.includes(communityId);

                if (isAlreadyJoined) {
                    await updateDoc(userCommunityRef, {
                        communityIds: arrayRemove(communityId),
                    });
                    ToastAndroid.show("You have left the community.", ToastAndroid.SHORT);
                } else {
                    await updateDoc(userCommunityRef, {
                        communityIds: arrayUnion(communityId),
                    });
                    ToastAndroid.show("You have joined the community!", ToastAndroid.SHORT);
                }

                setUserCommunities((prev) =>
                    isAlreadyJoined
                        ? prev.filter((id) => id !== communityId)
                        : [...prev, communityId]
                );
            } else {
                await setDoc(userCommunityRef, {
                    communityIds: [communityId],
                });
                ToastAndroid.show("You have joined the community!", ToastAndroid.SHORT);

                setUserCommunities((prev) => [...prev, communityId]);
            }
        } catch (error) {
            console.error("Error updating community membership: ", error);
            ToastAndroid.show("Failed to update community membership", ToastAndroid.SHORT);
        }
    };

    const handleCommunityPress = (community) => {
        navigation.navigate('CommunityInfo', { communityId: community.id, name: community.name });
    };

    const renderCommunityCard = ({ item }) => (
        <CommunityCard
            community={item}
            isJoined={userCommunities.includes(item.id)}
            userId={userId}
            onPress={() => handleCommunityPress(item)}
            onJoinPress={() => handleJoinPress(item.id)}
        />
    );

    const LoadingIndicator = () => (
        <View className="flex-1 justify-center items-center my-4">
            <ActivityIndicator size="large" color="#694E4E" />
            <Text className="text-brownie mt-2">Loading communities...</Text>
        </View>
    );

    return (
        <View className="flex-1 bg-main">
            <Header navigation={navigation} />

            {/* Search Input */}
            <View className="px-4 py-3">
                <View className="bg-white rounded-full flex-row items-center px-4 py-2 shadow-sm">
                    <MaterialIcons name="search" size={24} color="#694E4E" />
                    <TextInput
                        placeholder="Search communities"
                        placeholderTextColor="#886F6F"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        className="flex-1 ml-2 text-brownie"
                    />
                    {searchTerm ? (
                        <TouchableOpacity onPress={() => setSearchTerm('')}>
                            <MaterialIcons name="close" size={24} color="#694E4E" />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>

            {isLoading.communities ? (
                <LoadingIndicator />
            ) : (
                <FlatList
                    data={filteredCommunities}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCommunityCard}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        marginBottom: 16,
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                    ListHeaderComponent={
                        <View className="px-4 py-3 flex-row items-center">
                            <MaterialIcons name="group" size={24} color="#694E4E" />
                            <Text className="text-brownie font-medium ml-2">
                                {filteredCommunities.length} Communities Found
                            </Text>
                        </View>
                    }
                    ListEmptyComponent={() => (
                        <View className="items-center justify-center mt-10">
                            <MaterialIcons name="group" size={64} color="#694E4E" />
                            <Text className="text-brownie text-lg mt-4">
                                No communities found
                            </Text>
                            <Text className="text-tertiary text-center mt-2">
                                Try a different search term
                            </Text>
                        </View>
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: 12,
                        paddingBottom: 16,
                    }}
                />
            )}
        </View>
    );
};

export default HomePage;