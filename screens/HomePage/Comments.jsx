import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../../Utils/Firebase';
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { UserContext } from '../../Context/UserContext';

const CommentsScreen = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [postDetails, setPostDetails] = useState(null);
    const [userName, setUserName] = useState(null);
    const { userId } = useContext(UserContext);

    const route = useRoute();
    const navigation = useNavigation();
    const { postId } = route.params;

    // Fetch post details and comments
    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const postDocRef = doc(db, "Posts", postId);
                const postDoc = await getDoc(postDocRef);

                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    setPostDetails(postData);
                    setComments(postData.Comments || []);
                }
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };

        // Fetch current user's name
        const fetchUserName = async () => {
            try {
                // Assuming you have the current user's ID stored somewhere
                const currentUserId = userId; // Replace with actual method to get current user
                const userDocRef = doc(db, "users", currentUserId);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserName(userData.userName);
                }
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };

        fetchPostDetails();
        fetchUserName();
    }, [postId]);

    // Handle sending a new comment
    const handleSendComment = async () => {
        if (newComment.trim() && userName) {
            try {
                const postRef = doc(db, "Posts", postId);

                await updateDoc(postRef, {
                    Comments: arrayUnion({
                        userName: userName,
                        text: newComment.trim(),
                        createdAt: new Date()
                    })
                });

                // Update local state
                setComments(prevComments => [
                    ...prevComments,
                    {
                        userName: userName,
                        text: newComment.trim(),
                        createdAt: new Date()
                    }
                ]);

                // Clear input
                setNewComment("");
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    // Format date and time
    const formatDateTime = (date) => {
        const formattedDate = new Date(date).toLocaleDateString();
        const formattedTime = new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return `${formattedDate} at ${formattedTime}`;
    };

    return (
        <View className="flex-1 bg-main">
            {/* Header */}
            <View className="flex-row items-center p-4 border-b border-secondary/20 mt-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                    <MaterialIcons name="arrow-back" size={24} color="#694E4E" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-brownie">
                    {postDetails?.Title || "Comments"}
                </Text>
            </View>

            {/* Comments List */}
            <ScrollView className="flex-1 p-4">
                {comments.length === 0 ? (
                    <View className="items-center justify-center mt-10">
                        <Text className="text-secondary">No comments yet</Text>
                    </View>
                ) : (
                    comments.map((comment, index) => (
                        <View
                            key={index}
                            className="bg-gray-100 rounded-lg p-3 mb-3"
                        >
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="font-bold text-brownie">{comment.userName}</Text>
                                <Text className="text-xs text-secondary">
                                    {formatDateTime(comment.createdAt)}
                                </Text>
                            </View>
                            <Text className="text-tertiary">{comment.text}</Text>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* Comment Input */}
            <View className="bg-white px-4 py-3 flex-row items-center shadow-sm border-t border-secondary/20">
                <TextInput
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="Write a comment..."
                    multiline
                    maxLength={500}
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2 max-h-24"
                />
                <TouchableOpacity
                    onPress={handleSendComment}
                    disabled={!newComment.trim()}
                    className={`
                        p-2 rounded-full 
                        ${newComment.trim() ? 'bg-brownie' : 'bg-gray-300'}
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

export default CommentsScreen;