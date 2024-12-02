import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    getFirestore,
    doc,
    collection,
    getDoc,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot
} from 'firebase/firestore';
import { UserContext } from '../../Context/UserContext';

const GroupChatDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { chatId, chatName } = route.params;
    const { userId, userName } = useContext(UserContext);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userCache, setUserCache] = useState({}); // Cache de usuarios para evitar múltiples consultas a Firebase
    const db = getFirestore();

    // Listener para obtener mensajes en tiempo real
    useEffect(() => {
        const chatRef = doc(db, 'CommunityChats', chatId);
        const messagesRef = collection(chatRef, 'messages');
        const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const allMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            resolveUserNames(allMessages); // Resolver nombres de usuario
        });

        return () => unsubscribe(); // Limpiar el listener al desmontar
    }, [chatId]);

    // Resolver nombres de usuario para los mensajes
    const resolveUserNames = async (messagesArray) => {
        const updatedMessages = await Promise.all(
            messagesArray.map(async (message) => {
                if (!userCache[message.userId]) {
                    // Consultar Firebase si no está en caché
                    const userDoc = await getDoc(doc(db, 'users', message.userId));
                    if (userDoc.exists()) {
                        const userName = userDoc.data().userName;
                        setUserCache((prevCache) => ({
                            ...prevCache,
                            [message.userId]: userName,
                        }));
                        return { ...message, userName };
                    }
                }
                // Si ya está en caché, usar el nombre directamente
                return { ...message, userName: userCache[message.userId] || 'Anonymous' };
            })
        );

        setMessages(updatedMessages);
    };

    // Manejar el envío de un nuevo mensaje
    const handleSendMessage = async () => {
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
                userName: userName || 'Anonymous',
                timestamp: serverTimestamp(),
            });

            setNewMessage(''); // Limpiar el input después de enviar
        } catch (error) {
            console.error('Error sending message: ', error);
            ToastAndroid.show('Failed to send message', ToastAndroid.SHORT);
        }
    };

    // Componente para mostrar cada mensaje
    const MessageItem = ({ item }) => {
        const isCurrentUser = item.userId === userId;

        return (
            <View className={`mb-3 px-4 ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                <View
                    className={`
                        max-w-[80%] p-3 rounded-2xl 
                        ${isCurrentUser
                        ? 'bg-brownie rounded-tr-none'
                        : 'bg-gray-200 rounded-tl-none'}
                    `}
                >
                    {!isCurrentUser && (
                        <Text className="font-bold text-sm text-gray-800 mb-1">
                            {item.userName || 'Anonymous'}
                        </Text>
                    )}
                    <Text className={`text-base ${isCurrentUser ? 'text-white' : 'text-black'}`}>
                        {item.text}
                    </Text>
                    <Text
                        className={`text-xs mt-1 ${
                            isCurrentUser ? 'text-white/70' : 'text-gray-600'
                        }`}
                    >
                        {item.timestamp
                            ? new Date(item.timestamp.toDate()).toLocaleTimeString([],
                                { hour: '2-digit', minute: '2-digit' })
                            : 'Just now'}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-main">
            {/* Header */}
            <View className="bg-white shadow-sm py-6 px-4 flex-row items-center">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="mr-3 mt-4"
                >
                    <MaterialIcons name="arrow-back" size={24} color="#694E4E" />
                </TouchableOpacity >
                <Text className="text-brownie font-bold text-xl flex-1">
                    {chatName}
                </Text>
            </View>

            {/* Lista de mensajes */}
            <FlatList
                data={messages}
                renderItem={MessageItem}
                keyExtractor={(item) => item.id}
                inverted
                contentContainerStyle={{
                    flexGrow: 1,  // Para asegurarse de que el contenido ocupe todo el espacio disponible
                    paddingBottom: 20,
                    justifyContent: messages.length === 0 ? 'center' : 'flex-start',
                }}
                ListEmptyComponent={() => (
                    <View className="items-center justify-center mt-10">
                        <MaterialIcons name="chat" size={64} color="#694E4E" />
                        <Text className="text-brownie text-lg mt-4">
                            No messages yet
                        </Text>
                    </View>
                )}
            />

            {/* Input para mensajes */}
            <View className="bg-white px-4 py-3 flex-row items-center shadow-sm">
                <TextInput
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message"
                    multiline
                    maxLength={500}
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2 max-h-24"
                />
                <TouchableOpacity
                    onPress={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`
                        p-2 rounded-full 
                        ${newMessage.trim()
                        ? 'bg-brownie'
                        : 'bg-gray-300'}
                    `}
                >
                    <MaterialIcons
                        name="send"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GroupChatDetailScreen;
