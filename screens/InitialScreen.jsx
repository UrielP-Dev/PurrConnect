import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import {Pressable, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const InitialScreen = ({ navigation }) => {    return (
        <LinearGradient
            colors={['#F3C5C5', '#FFFFFF']}
            start={{ x: 0, y: 0.8 }}
            end={{ x: 0, y: 1 }}
            className="justify-center items-center flex-1"
        >
            <Image
                className="w-128 h-72 container mb-16"
                source={require('../assets/PurrLogo.png')}
            />

            <TouchableOpacity className="justify-center items-center bg-brownie rounded-full w-2/6 h-16 mb-8  shadow-sm"
                       onPress={() => navigation.navigate('LoginScreen')}>
                <Text className="text-white font-bold text-4xl">Login</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
            <TouchableOpacity>
                <Text 
                className="text-black font-semibold text-xl underline"
                onPress={() => navigation.navigate('SignUpScreen')}
                >
                    Don't have an account?
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default InitialScreen;
