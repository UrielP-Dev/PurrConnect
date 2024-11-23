import React from 'react';
import { Pressable, Text, View, ScrollView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import CommunityCard from "../components/ComponentsHomePage/CommunityCard";

const HomePage = () => {
    const navigation = useNavigation();

    return (
        <View className="flex-1 bg-main">
            <View className="bg-white px-4 py-8 flex-row items-center justify-between shadow-xl">
                <View className="flex-row items-center mt-4">
                    <Pressable
                        onPress={() => navigation.openDrawer()}
                        className="mr-3"
                    >
                        <MaterialIcons name="menu" size={36} color="#694E4E" />
                    </Pressable>
                    <Image
                        source={require('../assets/PurrConnect.png')}
                        className="w-32 h-8"
                        resizeMode="contain"
                    />
                </View>

                <View className="flex-row items-center space-x-4 mt-4">
                    <Pressable>
                        <MaterialIcons name="search" size={24} color="#694E4E" />
                    </Pressable>

                    <Pressable className="flex-row items-center bg-brownie px-3 py-1 rounded-full">
                        <MaterialIcons name="add" size={20} color="#FFFFFF" />
                        <Text className="text-white text-sm ml-1">
                            Create
                        </Text>
                    </Pressable>

                    {/* Profile Button */}
                    <Pressable>
                        <MaterialIcons name="account-circle" size={24} color="#694E4E" />
                    </Pressable>
                </View>
            </View>
            <ScrollView className="flex-1">
                <View className="flex-1 px-6 py-12">
                    <View className="flex-row flex-wrap justify-between gap-y-4">
                        <CommunityCard className="w-[60%] mb-4" />
                        <CommunityCard className="w-[48%] mb-4" />
                        <CommunityCard className="w-[48%] mb-4" />
                        <CommunityCard className="w-[48%] mb-4" />
                        <CommunityCard className="w-[48%] mb-4" />
                        <CommunityCard className="w-[48%] mb-4" />
                    </View>
                </View>
            </ScrollView>

        </View>
    );
};

export default HomePage;