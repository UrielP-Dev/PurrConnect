import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/ComponentsHomePage/Header';
import { UserContext } from '../../Context/UserContext';

// Dummy data for group chats
const DUMMY_GROUP_CHATS = [
    {
        id: '1',
        name: 'React Native Devs',
        lastMessage: 'Hey, anyone up for a coding challenge?',
        unreadCount: 2,
        members: 24,
        timestamp: '2h ago'
    },
    {
        id: '2',
        name: 'Design Community',
        lastMessage: 'Check out this new UI concept!',
        unreadCount: 1,
        members: 15,
        timestamp: '1d ago'
    },
    {
        id: '3',
        name: 'Startup Founders',
        lastMessage: 'Funding round updates...',
        unreadCount: 0,
        members: 42,
        timestamp: '3d ago'
    }
];

const ChatScreen = () => {
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChats = DUMMY_GROUP_CHATS.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const GroupChatItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('GroupChatDetail', { chatId: item.id })}
            className="bg-white rounded-xl p-4 mb-3 flex-row items-center shadow-sm"
        >
            <View className="bg-secondary/20 p-3 rounded-full mr-3">
                <MaterialIcons name="group" size={24} color="#694E4E" />
            </View>
            <View className="flex-1">
                <View className="flex-row justify-between items-center">
                    <Text className="text-brownie font-bold text-base">{item.name}</Text>
                    <Text className="text-tertiary text-xs">{item.timestamp}</Text>
                </View>
                <View className="flex-row justify-between items-center mt-1">
                    <Text
                        className="text-tertiary text-sm flex-1 pr-2"
                        numberOfLines={1}
                    >
                        {item.lastMessage}
                    </Text>
                    {item.unreadCount > 0 && (
                        <View className="bg-secondary rounded-full w-5 h-5 justify-center items-center">
                            <Text className="text-white text-xs">{item.unreadCount}</Text>
                        </View>
                    )}
                </View>
                <View className="flex-row items-center mt-1">
                    <MaterialIcons name="people" size={16} color="#886F6F" />
                    <Text className="text-tertiary text-xs ml-1">{item.members} members</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-main">
            <Header navigation={navigation} />

            <View className="px-4 py-3">
                <View className="bg-white rounded-full flex-row items-center px-4 py-2 shadow-sm">
                    <MaterialIcons name="search" size={24} color="#694E4E" />
                    <TextInput
                        placeholder="Search group chats"
                        placeholderTextColor="#886F6F"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        className="flex-1 ml-2 text-brownie"
                    />
                </View>
            </View>

            <FlatList
                data={filteredChats}
                renderItem={GroupChatItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 20
                }}
                ListEmptyComponent={() => (
                    <View className="items-center justify-center mt-10">
                        <MaterialIcons name="chat" size={64} color="#694E4E" />
                        <Text className="text-brownie text-lg mt-4">
                            No chats found
                        </Text>
                        <Text className="text-tertiary text-center mt-2">
                            Join more communities to start chatting!
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

// Group Chat Detail Screen
const GroupChatDetailScreen = ({ route }) => {
    const { chatId } = route.params;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: '1',
            user: 'John Doe',
            text: 'Hey everyone, welcome to the chat!',
            timestamp: '2h ago'
        },
        {
            id: '2',
            user: 'Jane Smith',
            text: 'Great to be here!',
            timestamp: '1h ago'
        }
    ]);

    const sendMessage = () => {
        if (message.trim()) {
            setMessages([
                ...messages,
                {
                    id: (messages.length + 1).toString(),
                    user: 'You',
                    text: message,
                    timestamp: 'Just now'
                }
            ]);
            setMessage('');
        }
    };

    const MessageBubble = ({ item, isMe }) => (
        <View className={`mb-3 ${isMe ? 'self-end' : 'self-start'}`}>
            <View className={`
                p-3 rounded-xl max-w-[80%]
                ${isMe ? 'bg-secondary' : 'bg-white'}
            `}>
                {!isMe && (
                    <Text className="text-brownie font-bold text-xs mb-1">
                        {item.user}
                    </Text>
                )}
                <Text className={`
                    text-sm 
                    ${isMe ? 'text-white' : 'text-brownie'}
                `}>
                    {item.text}
                </Text>
                <Text className={`
                    text-xs mt-1 
                    ${isMe ? 'text-white/70' : 'text-tertiary'}
                `}>
                    {item.timestamp}
                </Text>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-main">
            <View className="bg-white px-4 py-3 flex-row items-center">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="mr-3"
                >
                    <MaterialIcons name="arrow-back" size={24} color="#694E4E" />
                </TouchableOpacity>
                <View className="bg-secondary/20 p-2 rounded-full mr-3">
                    <MaterialIcons name="group" size={20} color="#694E4E" />
                </View>
                <View className="flex-1">
                    <Text className="text-brownie font-bold">
                        {DUMMY_GROUP_CHATS.find(chat => chat.id === chatId)?.name}
                    </Text>
                    <Text className="text-tertiary text-xs">
                        24 members
                    </Text>
                </View>
                <TouchableOpacity>
                    <MaterialIcons name="more-vert" size={24} color="#694E4E" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <MessageBubble
                        item={item}
                        isMe={item.user === 'You'}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 20
                }}
                inverted
            />

            <View className="bg-white p-3 flex-row items-center">
                <TouchableOpacity className="mr-2">
                    <MaterialIcons name="attachment" size={24} color="#694E4E" />
                </TouchableOpacity>
                <TextInput
                    placeholder="Type a message"
                    placeholderTextColor="#886F6F"
                    value={message}
                    onChangeText={setMessage}
                    className="flex-1 bg-secondary/10 rounded-full px-4 py-2 mr-2 text-brownie"
                />
                <TouchableOpacity
                    onPress={sendMessage}
                    className="bg-secondary p-2 rounded-full"
                >
                    <MaterialIcons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export { ChatScreen, GroupChatDetailScreen };