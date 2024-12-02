import React, { useState } from 'react';

import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SaveButton from '../components/ComponentsForm/SaveButton';

const topics = [
  { name: 'Anime', emoji: '🍥' },
  { name: 'Furries', emoji: '🐾' },
  { name: 'Art', emoji: '🎨' },
  { name: 'Music', emoji: '🎵' },
  { name: 'Dance', emoji: '💃' },
  { name: 'Movies', emoji: '🎬' },
  { name: 'Games', emoji: '🎮' },
  { name: 'Photography', emoji: '📷' },
  { name: 'Travel', emoji: '✈️' },
  { name: 'Food', emoji: '🍽️' },
  { name: 'Fitness', emoji: '💪' },
  { name: 'Technology', emoji: '💻' },
  { name: 'Fashion', emoji: '👗' },
  { name: 'Books', emoji: '📚' },
  { name: 'Cooking', emoji: '👨‍🍳' },
  { name: 'Sports', emoji: '⚽' },
  { name: 'Cars', emoji: '🚗' },
  { name: 'Nature', emoji: '🌿' },
  { name: 'Space', emoji: '🚀' },
  { name: 'Science', emoji: '🔬' },
  { name: 'Comics', emoji: '💥' },
  { name: 'Cosplay', emoji: '🦸' },
  { name: 'Writing', emoji: '✍️' },
  { name: 'Crafts', emoji: '🧶' },
  { name: 'Philosophy', emoji: '🤔' },
  { name: 'History', emoji: '🏛️' },
  { name: 'Psychology', emoji: '🧠' },
  { name: 'Astronomy', emoji: '🌟' },
  { name: 'Programming', emoji: '👨‍💻' },
  { name: 'Pets', emoji: '🐶' }
];

const CreateCommunityScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);

  const toggleTopicSelection = (topic) => {
    if (selectedTopics.includes(topic.name)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic.name));
    } else {
      setSelectedTopics([...selectedTopics, topic.name]);
    }
  };

  const handleSaveCommunity = async () => {
    if (!title.trim() || !description.trim() || selectedTopics.length === 0) {
      Alert.alert('Validation Error', 'Please fill in all fields and select at least one topic.');
      return;
    }

    setLoading(true);
    try {
      Alert.alert('Success', 'Community has been saved!');
      setTitle('');
      setDescription('');
      setSelectedTopics([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save community.');
    } finally {
      setLoading(false);
    }
  };

  const displayedTopics = showAllTopics ? topics : topics.slice(0, Math.ceil(topics.length / 2));

  return (
      <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView className="flex-1 bg-main px-6 py-12">
          <View className="flex-row items-center my-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="#694E4E" />
            </TouchableOpacity>
            <Text className="text-brownie font-bold text-xl ml-4">Create Community</Text>
          </View>

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
          <View>
            <Text className="text-tertiary font-bold text-xl mb-4">Topics of Discussion</Text>
            <View className="flex-row flex-wrap">
              {displayedTopics.map((topic, index) => (
                  <TouchableOpacity
                      key={index}
                      className={`px-4 py-2 rounded-full border flex-row items-center ${
                          selectedTopics.includes(topic.name) ? 'bg-brownie border-brownie' : 'bg-white border-brownie'
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
            {!showAllTopics && (
                <TouchableOpacity className="items-center mt-4" onPress={() => setShowAllTopics(true)}>
                  <Text className="text-brownie font-bold">Show More Topics</Text>
                </TouchableOpacity>
            )}
          </View>
          <SaveButton
              onPress={handleSaveCommunity}
              loading={loading}
              label="Save Community"
              className="mt-6"
          />
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

export default CreateCommunityScreen;