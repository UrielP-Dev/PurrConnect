import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Image} from 'react-native';
import { Eye, EyeOff } from "lucide-react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
const LoginScreen = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <ScrollView className="flex-1 bg-main">
            <View className="flex-1 justify-center items-center px-6 py-12">
                <Image source={require('../assets/PurrIcon.png')}></Image>


                <View className="w-full mb-4">
                    <Text className="text-tertiary mb-4 font-bold text-xl">
                        Email
                    </Text>
                    <TextInput
                        className="w-full bg-white px-4 py-3 rounded-xl text-brownie"
                        placeholder="ejemplo@correo.com"
                        placeholderTextColor="#C1A3A3"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View className="w-full mb-8">
                    <Text className="text-tertiary mb-4 font-bold text-xl">
                        Password
                    </Text>
                    <View className="relative w-full">
                        <TextInput
                            className="w-full bg-white px-4 py-3 rounded-xl text-brownie pr-12"
                            placeholder="••••••••"
                            placeholderTextColor="#C1A3A3"
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            className="absolute right-4 top-3"
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff size={24} color="#694E4E" />
                            ) : (
                                <Eye size={24} color="#694E4E" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity className="w-full bg-brownie py-4 rounded-xl mb-4">
                    <Text className="text-white text-center font-semibold">
                        Login
                    </Text>
                </TouchableOpacity>

                <View className="w-full flex-row items-center my-4">
                    <View className="flex-1 h-[1px] bg-tertiary opacity-30" />
                    <Text className="mx-4 text-tertiary font-bold">O</Text>
                    <View className="flex-1 h-[1px] bg-tertiary opacity-30" />
                </View>

                <TouchableOpacity className="w-full flex-row items-center justify-center bg-white py-4 rounded-xl shadow-sm">
                    <View className="w-5 h-5 mr-3 items-center justify-center">
                        <Icon name="google" size={20} color="black" />
                    </View>
                    <Text className="text-brownie font-semibold">
                        Continue with Google
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;