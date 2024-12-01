import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, ToastAndroid, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/ComponentsHomePage/Header';
import { UserContext } from '../../Context/UserContext';
import { getFirestore, doc, getDoc, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

const ChatScreen = () => {
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);
    const [chats, setChats] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userCommunities, setUserCommunities] = useState([]);
    const [isLoading, setIsLoading] = useState({
        userCommunities: false,
        chats: false,
    });
    const [refreshing, setRefreshing] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const db = getFirestore();

    // Fetch user communities
    const fetchUserCommunities = async () => {
        const userCommunityRef = doc(db, 'MyCommunities', userId);
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
            console.error('Error fetching user communities: ', error);
            ToastAndroid.show('Failed to load user communities', ToastAndroid.SHORT);
        } finally {
            setIsLoading((prev) => ({ ...prev, userCommunities: false }));
        }
    };

    // Fetch chats from Communitys using community IDs
    const fetchChats = async () => {
        try {
            if (userCommunities.length === 0) {
                setChats([]);
                return;
            }

            setIsLoading((prev) => ({ ...prev, chats: true }));
            const chatsData = await Promise.all(
                userCommunities.map(async (communityId) => {
                    const communityDoc = await getDoc(doc(db, 'Communitys', communityId));
                    if (communityDoc.exists()) {
                        const communityData = communityDoc.data();
                        return {
                            id: communityId,
                            name: communityData.name,
                            description: communityData.description,
                            participants: communityData.participants,
                        };
                    }
                    return null;
                })
            );

            setChats(chatsData.filter((chat) => chat !== null));
        } catch (error) {
            console.error('Error fetching chats: ', error);
            ToastAndroid.show('Failed to load chats', ToastAndroid.SHORT);
        } finally {
            setIsLoading((prev) => ({ ...prev, chats: false }));
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchUserCommunities();
        await fetchChats();
        setRefreshing(false);
    }, [userCommunities]);

    useEffect(() => {
        fetchUserCommunities();
    }, [userId]);

    useEffect(() => {
        fetchChats();
    }, [userCommunities]);

    // Restore filteredChats function
    const filteredChats = chats.filter((chat) =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendMessage = async (chatId) => {
        if (!newMessage.trim()) {
            ToastAndroid.show('Message cannot be empty', ToastAndroid.SHORT);
            return;
        }

        try {
            const chatRef = doc(db, 'CommunityChats', chatId);
            const messagesRef = collection(chatRef, 'messages');
            await addDoc(messagesRef, {
                text: newMessage,
                userId: userId,
                timestamp: serverTimestamp(),
            });

            setNewMessage('');
            ToastAndroid.show('Message sent successfully', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Error sending message: ', error);
            ToastAndroid.show('Failed to send message', ToastAndroid.SHORT);
        }
    };

    const GroupChatItem = ({ item }) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('GroupChatDetail', {
                    chatId: item.id,
                    chatName: item.name,
                })
            }
            className="bg-white rounded-2xl p-4 mb-3 flex-row items-center shadow-md elevate-2"
        >
            <View className="bg-secondary/10 p-3 rounded-full mr-3 w-12 h-12 items-center justify-center">
                <MaterialIcons name="group" size={24} color="#694E4E" />
            </View>
            <View className="flex-1">
                <Text className="text-brownie font-bold text-base tracking-tight">{item.name}</Text>
                <Text className="text-gray-600 text-sm mt-1">{item.participants} participants</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#694E4E" opacity={0.6} />
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-main">
            <Header navigation={navigation} />

            {/* Search Bar */}
            <View className="px-4 py-3">
                <View className="bg-white rounded-xl flex-row items-center px-4 py-3 shadow-md">
                    <MaterialIcons name="search" size={24} color="#694E4E" />
                    <TextInput
                        placeholder="Search group chats"
                        placeholderTextColor="#886F6F"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        className="flex-1 ml-3 text-brownie text-base"
                    />
                </View>
            </View>

            {/* Chat List */}
            <FlatList
                data={filteredChats}
                renderItem={GroupChatItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 20,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#694E4E']}
                        tintColor="#694E4E"
                    />
                }
                ListEmptyComponent={() => (
                    <View className="items-center justify-center mt-10">
                        <MaterialIcons
                            name="chat"
                            size={64}
                            color="#694E4E"
                            style={{ opacity: 0.5 }}
                        />
                        <Text className="text-brownie text-lg mt-4 text-center">
                            {isLoading.chats ? 'Loading chats...' : 'No chats found'}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

export default ChatScreen;