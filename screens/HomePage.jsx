import React, { useState, useEffect } from 'react';
import { Text, FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommunityCard from "../components/ComponentsHomePage/CommunityCard";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Utils/Firebase";
import Header from '../components/ComponentsHomePage/Header';

const HomePage = () => {
    const [communityCount, setCommunityCount] = useState(0);
    const [communities, setCommunities] = useState([]);
    const navigation = useNavigation();

    const fetchCommunities = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Communitys"));
            const communityList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCommunityCount(communityList.length);
            setCommunities(communityList);
        } catch (error) {
            console.error("Error fetching communities: ", error);
        }
    };

    useEffect(() => {
        fetchCommunities();
    }, []);

    const handleJoinPress = (communityId) => {
        setCommunities(prevCommunities =>
            prevCommunities.map(community =>
                community.id === communityId
                    ? { ...community, isJoined: !community.isJoined }
                    : community
            )
        );
    };

    const handleCommunityPress = (community) => {
        navigation.navigate('CommunityInfo', { communityId: community.id, name: community.name });
        console.log(community);
    };

    const renderCommunityCard = ({ item }) => (
        <CommunityCard
            community={item}
            isJoined={item.isJoined || false}
            onJoinPress={() => handleJoinPress(item.id)}
            onPress={() => handleCommunityPress(item)}
        />
    );

    return (
        <View className="flex-1 bg-main">
            {/* Header */}
            <Header navigation={navigation} />

            {/* Content */}
            <FlatList
                data={communities}
                keyExtractor={(item) => item.id}
                renderItem={renderCommunityCard}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    marginBottom: 16,
                }}
                ListHeaderComponent={
                    <View className="px-4 py-3 flex-row items-center mt-6">
                        <MaterialIcons name="group" size={24} color="#694E4E" />
                        <Text className="text-brownie font-medium ml-2">
                            {communityCount} Communities Available
                        </Text>
                    </View>
                }
                contentContainerStyle={{
                    paddingHorizontal: 12,
                    paddingBottom: 16,
                }}
            />
        </View>
    );
};

export default HomePage;
