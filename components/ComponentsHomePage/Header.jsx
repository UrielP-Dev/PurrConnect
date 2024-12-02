import React from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = ({ navigation }) => {
    return (
        <View className="bg-white px-4 py-8 flex-row items-center justify-between shadow-2xl">
            <View className="flex-row items-center mt-4">
                <Pressable onPress={() => navigation.openDrawer()} className="mr-3">
                    <MaterialIcons name="menu" size={36} color="#694E4E" />
                </Pressable>
                <Image
                    source={require('../../assets/PurrConnect.png')}
                    className="w-32 h-8"
                    resizeMode="contain" 
                />
            </View>
            <View className="flex-row items-center space-x-4 mt-4">
                <Pressable>
                    <MaterialIcons name="search" size={24} color="#694E4E" />
                </Pressable>
                <Pressable className="flex-row items-center bg-brownie px-3 py-1 rounded-full"
                           onPress={() => navigation.navigate('CreateCommunityScreen')}
                >
                    <MaterialIcons name="add" size={30} color="#FFFFFF" />
                    <Text className="text-white text-sm ml-1">Create</Text>
                </Pressable>
                <Pressable>
                    <MaterialIcons name="account-circle" size={24} color="#694E4E" />
                </Pressable>
            </View>
        </View>
    );
};

export default Header;
