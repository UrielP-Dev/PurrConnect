import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const SaveButton = ({ onPress, loading, label = "Save" }) => {
  return (
    <TouchableOpacity
      className={`w-full py-4 rounded-xl mt-8 flex items-center justify-center ${
        loading ? 'bg-gray-500' : 'bg-brownie'
      }`}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text className="text-white text-center font-semibold">{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SaveButton;
