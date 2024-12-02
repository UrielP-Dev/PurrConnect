import React, { useState, useEffect, useContext } from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Utils/Firebase';
import { UserContext } from '../../Context/UserContext';

const Header = ({ navigation }) => {
    const [profilePicture, setProfilePicture] = useState(null);
    const { userId } = useContext(UserContext);

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const userRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setProfilePicture(data.profilePicture || null);
                } else {
                    console.warn('Usuario no encontrado.');
                }
            } catch (error) {
                console.error('Error al obtener la foto de perfil:', error);
            }
        };

        fetchProfilePicture();
    }, [userId]);

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
                <Pressable
                    className="flex-row items-center bg-brownie px-3 py-1 rounded-full mr-3"
                    onPress={() => navigation.navigate('CreateCommunityScreen')}
                >
                    <MaterialIcons name="add" size={25} color="#FFFFFF" />
                    <Text className="text-white text-sm ml-1">Create</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Profile')}>
                    {profilePicture ? (
                        <Image
                            source={{ uri: profilePicture }}
                            className="w-16 h-16 rounded-full border border-brownie"
                        />
                    ) : (
                        <MaterialIcons name="account-circle" size={30} color="#694E4E" />
                    )}
                </Pressable>
            </View>
        </View>
    );
};

export default Header;
