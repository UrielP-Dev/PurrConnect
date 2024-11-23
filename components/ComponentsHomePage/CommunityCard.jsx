import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { getDocs, collection } from "firebase/firestore";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { db } from "../../Utils/Firebase";

const CommunityCard = ({ community, isJoined, onJoinPress }) => {
    return (
        <View className="bg-white border-2 border-secondary rounded-xl px-4 py-4 m-2 flex-1 shadow-2xl">
            {/* Header Section */}
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                    <Text className="text-xl font-bold text-brownie mb-1" numberOfLines={1}>
                        {community.name || "Furro community"}
                    </Text>
                    <View className="flex-row items-center">
                        <MaterialIcons name="group" size={16} color="#886F6F"/>
                        <Text className="text-tertiary text-sm ml-1">
                            {community.participants || 0} participants
                        </Text>
                    </View>
                </View>
            </View>

            {/* Description Section */}
            <Text className="text-tertiary text-sm mb-3" numberOfLines={2}>
                {community.description || "A community for furry enthusiasts to share and connect."}
            </Text>

            {/* Join Button */}
            <View className="flex-row justify-between pt-3 border-t border-secondary/20">
                <View className="flex-row place-items-end ml-auto">
                    <TouchableOpacity
                        onPress={onJoinPress}
                        className={`rounded-full py-2 px-4 flex-row items-center ${isJoined ? 'bg-secondary' : 'bg-brownie'}`}
                    >
                        <MaterialIcons
                            name={isJoined ? 'check' : 'add'}
                            size={16}
                            color="#FFFFFF"
                        />
                        <Text className="text-white text-sm font-medium ml-1">
                            {isJoined ? 'Joined' : 'Join'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const CommunityGrid = () => {
    const [communities, setCommunities] = useState([]);
    const [joinedCommunities, setJoinedCommunities] = useState(new Set());

    const fetchCommunityData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Communitys"));
            const communitiesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCommunities(communitiesData);
        } catch (error) {
            console.error("Error al obtener los datos: ", error);
        }
    };

    useEffect(() => {
        fetchCommunityData();
    }, []);

    const handleJoinPress = (communityId) => {
        setJoinedCommunities(prev => {
            const newSet = new Set(prev);
            if (newSet.has(communityId)) {
                newSet.delete(communityId);
            } else {
                newSet.add(communityId);
            }
            return newSet;
        });
    };

    const renderItem = ({ item }) => (
        <CommunityCard
            community={item}
            isJoined={joinedCommunities.has(item.id)}
            onJoinPress={() => handleJoinPress(item.id)}
        />
    );

    return (
        <View className="flex-1 bg-main">
            <FlatList
                data={communities}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ padding: 6, paddingTop: 12 }}
            />
        </View>
    );
};

export default CommunityGrid;