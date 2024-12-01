import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import SaveButton from '../components/ComponentsForm/SaveButton'

const topics = [
  'Anime', 'Furries', 'NTR', 'Art', 'Music', 'Dance', 'Movies', 'Games'
];

const CreateCommunityScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleTopicSelection = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSaveCommunity = async () => {
    if (!title.trim() || !description.trim() || selectedTopics.length === 0) {
      Alert.alert('Validation Error', 'Please fill in all fields and select at least one topic.');
      return;
    }

    const newCommunity = {
      title,
      description,
      topics: selectedTopics,
    };

    setLoading(true);
    try {
      // Aquí podrías guardar la comunidad en una base de datos/API
      setCommunities([...communities, newCommunity]);
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

  return (
    <ScrollView className="flex-1 bg-main px-6 py-12">
      <View className="items-center">
        <Text className="text-4xl font-bold text-brownie mb-8">Create Community</Text>
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
          className="w-full bg-white px-4 py-3 rounded-xl text-brownie"
          placeholder="Describe your community"
          placeholderTextColor="#C1A3A3"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
      <View>
        <Text className="text-tertiary font-bold text-xl mb-4">Topics of Discussion</Text>
        <View className="flex-row flex-wrap">
          {topics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              className={`px-4 py-2 rounded-full border ${
                selectedTopics.includes(topic) ? 'bg-brownie border-brownie text-white' : 'bg-white border-brownie'
              } m-2 shadow-sm`}
              onPress={() => toggleTopicSelection(topic)}
              activeOpacity={0.7}
              style={{
                transform: [{ scale: selectedTopics.includes(topic) ? 1.05 : 1 }],
                transition: 'transform 0.2s',
              }}
            >
              <Text
                className={`font-bold ${
                  selectedTopics.includes(topic) ? 'text-white' : 'text-brownie'
                }`}
              >
                {topic}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <SaveButton onPress={handleSaveCommunity} loading={loading} label="Save Community" />
    </ScrollView>
  );
};

export default CreateCommunityScreen;
