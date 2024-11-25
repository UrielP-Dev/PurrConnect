import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, Image, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import CommunityCard from "../components/ComponentsHomePage/CommunityCard";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Utils/Firebase";

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
            const uniqueCommunities = Array.from(
                new Map(communityList.map(item => [item.id, item])).values()
            );
            setCommunityCount(uniqueCommunities.length);
            setCommunities(uniqueCommunities);
        } catch (error) {
            console.error("Error fetching communities: ", error);
        }
    };

    useEffect(() => {
        fetchCommunities();
    }, []);

    const renderCommunityCard = ({ item }) => (
        <CommunityCard
            community={item}
            isJoined={false} // Default false; puedes manejar esto según la lógica del usuario.
            onJoinPress={() => console.log(`Join ${item.id}`)} // Placeholder para la funcionalidad de unión.
        />
    );

    return (
        <View className="flex-1 bg-main">
            {/* Header */}
            <View className="bg-white px-4 py-8 flex-row items-center justify-between shadow-2xl">
                <View className="flex-row items-center mt-4">
                    <Pressable onPress={() => navigation.openDrawer()} className="mr-3">
                        <MaterialIcons name="menu" size={36} color="#694E4E" />
                    </Pressable>
                    <Image
                        source={require('../assets/PurrConnect.png')}
                        className="w-32 h-8"
                        resizeMode="contain"
                    />
                </View>
                <View className="flex-row items-center space-x-4 mt-4">
                    <Pressable>
                        <MaterialIcons name="search" size={24} color="#694E4E" />
                    </Pressable>
                    <Pressable className="flex-row items-center bg-brownie px-3 py-1 rounded-full">
                        <MaterialIcons name="add" size={20} color="#FFFFFF" />
                        <Text className="text-white text-sm ml-1">Create</Text>
                    </Pressable>
                    <Pressable>
                        <MaterialIcons name="account-circle" size={24} color="#694E4E" />
                    </Pressable>
                </View>
            </View>

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
                    <View className="px-4 py-3 flex-row items-center">
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
