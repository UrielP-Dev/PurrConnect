import React, {useContext, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform, ToastAndroid,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../Context/UserContext';
import { TOPICS } from '../constants/topics'; // Suggested: Move topics to a separate file
import SaveButton from '../components/ComponentsForm/SaveButton';
import { db } from "../Utils/Firebase";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
const CreateCommunityScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const { userId } = useContext(UserContext);

  const toggleTopicSelection = (topic) => {
    setSelectedTopics(prevTopics =>
        prevTopics.includes(topic.name)
            ? prevTopics.filter(t => t !== topic.name)
            : [...prevTopics, topic.name]
    );
  };

  const handleSaveCommunity = async () => {
    if (!title.trim() || !description.trim() || selectedTopics.length === 0) {
      ToastAndroid.show("Please fill in all fields and select at least one topic.", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    try {
      // Crear documento de comunidad
      const communityRef = doc(db, 'Communitys', title);
      await setDoc(communityRef, {
        name: title,
        description,
        topics: selectedTopics,
        participants: 1,
        userId,
      });

      // Verificar y crear documento en MyCommunities si no existe
      const userCommunityRef = doc(db, 'MyCommunities', userId);
      const userCommunitySnap = await getDoc(userCommunityRef);

      if (!userCommunitySnap.exists()) {
        await setDoc(userCommunityRef, { communityIds: [title] });
      } else {
        await updateDoc(userCommunityRef, {
          communityIds: arrayUnion(title),
        });
      }

      ToastAndroid.show("Community has been created and you have joined it!", ToastAndroid.SHORT);
      resetForm();
      navigation.goBack();
    } catch (error) {
      console.error('Error creating community: ', error);
      ToastAndroid.show("Failed to create community.", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedTopics([]);
  };

  const displayedTopics = showAllTopics
      ? TOPICS
      : TOPICS.slice(0, Math.ceil(TOPICS.length / 2));

  return (
      <KeyboardAvoidingView className="mb-18"
          style={{ flex: 1 }}
      >
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
            keyboardShouldPersistTaps="handled"
            className="bg-main px-6 py-12"
        >
          {/* Header */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="#694E4E" />
            </TouchableOpacity>
            <Text className="text-brownie font-bold text-xl ml-4">Create Community</Text>
          </View>

          {/* Title Input */}
          <View className="mb-6">
            <Text className="text-tertiary font-bold text-xl mb-2">Title</Text>
            <TextInput
                className="w-full bg-white px-4 py-3 rounded-xl text-brownie"
                placeholder="Enter community title"
                placeholderTextColor="#C1A3A3"
                value={title}
                onChangeText={setTitle}
            />
          </View>

          {/* Description Input */}
          <View className="mb-6">
            <Text className="text-tertiary font-bold text-xl mb-2">Description</Text>
            <TextInput
                className="w-full bg-white px-4 py-3 rounded-xl text-brownie h-32"
                placeholder="Describe your community"
                placeholderTextColor="#C1A3A3"
                value={description}
                onChangeText={setDescription}
                multiline
                textAlignVertical="top"
            />
          </View>

          {/* Topics Selection */}
          <View className="mb-6">
            <Text className="text-tertiary font-bold text-xl mb-4">Topics of Discussion</Text>
            <View className="flex-row flex-wrap">
              {displayedTopics.map((topic, index) => (
                  <TouchableOpacity
                      key={index}
                      className={`px-4 py-2 rounded-full border flex-row items-center ${
                          selectedTopics.includes(topic.name)
                              ? 'bg-brownie border-brownie'
                              : 'bg-white border-brownie'
                      } m-2 shadow-sm`}
                      onPress={() => toggleTopicSelection(topic)}
                      activeOpacity={0.7}
                  >
                    <Text className="mr-2 text-lg">{topic.emoji}</Text>
                    <Text
                        className={`font-bold ${
                            selectedTopics.includes(topic.name) ? 'text-white' : 'text-brownie'
                        }`}
                    >
                      {topic.name}
                    </Text>
                  </TouchableOpacity>
              ))}
            </View>

            {/* Show More Topics */}
            {!showAllTopics && (
                <TouchableOpacity
                    className="items-center mt-4"
                    onPress={() => setShowAllTopics(true)}
                >
                  <Text className="text-brownie font-bold">Show More Topics</Text>
                </TouchableOpacity>
            )}
          </View>

          {/* Save Button */}
          <View className="pb-14">
            <SaveButton
                onPress={handleSaveCommunity}
                loading={loading}
                label="Save Community"
                className="mb-16"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );

};

export default CreateCommunityScreen;