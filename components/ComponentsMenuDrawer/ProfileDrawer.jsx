import React, { useState, useEffect, useContext } from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Alert, ToastAndroid} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { db } from '../../Utils/Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../../Context/UserContext';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileDrawer() {
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { userId } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserData(data);
                    setName(data.name);
                    setUserName(data.userName);
                } else {
                    console.warn('User not found.');
                }
            } catch (error) {
                console.error('Error obtaining user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const saveChanges = async () => {
        try {
            const userRef = doc(db, 'users', userId);

            // Actualizar en Firebase
            await updateDoc(userRef, {
                name,
                userName,
            });

            // Actualizar el estado local
            setUserData((prev) => ({
                ...prev,
                name,
                userName,
            }));

            setIsEditing(false);
            ToastAndroid.show("Data Update!", ToastAndroid.SHORT);
        } catch (error) {
            console.error('Error al guardar cambios:', error);
            ToastAndroid.show("A problem occurred while saving changes.", ToastAndroid.SHORT);
        }
    };


    const changeProfilePicture = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para cambiar la foto de perfil.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const selectedImageUri = result.assets[0].uri;

                const userRef = doc(db, 'users', userId);
                await updateDoc(userRef, {
                    profilePicture: selectedImageUri,
                });

                // Actualizar el estado local
                setUserData((prev) => ({
                    ...prev,
                    profilePicture: selectedImageUri,
                }));

                ToastAndroid.show("Profile Picture Update!", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error al cambiar la foto de perfil:', error);
            Alert.alert('Error', 'Ocurrió un problema al cambiar la foto de perfil.');
        }
    };

    if (!userData) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-brownie">Loading Profile...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 p-4 bg-main">
            <View className="flex-row items-center my-6 ">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#694E4E" />
                </TouchableOpacity>
                <Text className="text-brownie font-bold text-2xl ml-4">
                    Profile
                </Text>
            </View>

            {/* Foto de perfil */}
            <View className="items-center mb-6">
                {userData.profilePicture ? (
                    <Image
                        source={{ uri: userData.profilePicture }}
                        className="w-48 h-48 rounded-full border-2 border-brownie"
                    />
                ) : (
                    <MaterialIcons name="account-circle" size={96} color="#694E4E" />
                )}
                <TouchableOpacity onPress={changeProfilePicture} className="mt-4">
                    <Text className="text-blue-500">Change profile picture</Text>
                </TouchableOpacity>
            </View>

            {/* Información del perfil */}
            <View className="space-y-4">
                {/* Nombre */}
                <View>
                    <Text className="text-2xl font-semibold text-brownie">Name</Text>
                    {isEditing ? (
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            className="border border-secondary rounded-lg px-4 py-2 mt-1 text-tertiary text-xl bg-white"
                        />
                    ) : (
                        <Text className="text-tertiary text-xl mt-1">{userData.name}</Text>
                    )}
                </View>

                {/* Username */}
                <View>
                    <Text className="text-2xl font-semibold text-brownie">Username</Text>
                    {isEditing ? (
                        <TextInput
                            value={userName}
                            onChangeText={setUserName}
                            className="border border-secondary rounded-lg px-4 py-2 mt-1 text-tertiary text-xl bg-white"
                        />
                    ) : (
                        <Text className="text-tertiary text-xl mt-1">{userData.userName}</Text>
                    )}
                </View>

                {/* Email (no editable) */}
                <View>
                    <Text className="text-2xl font-semibold text-brownie">Email</Text>
                    <Text className=" text-tertiary text-xl mt-1">{userData.email}</Text>
                </View>

                {/* Fecha de nacimiento (no editable) */}
                <View>
                    <Text className="text-2xl font-semibold text-brownie">Date of birth</Text>
                    <Text className="text-tertiary text-xl mt-1">{userData.age}</Text>
                </View>
            </View>

            {/* Botón para editar */}
            <View className="mt-6 flex-row justify-center">
                {isEditing ? (
                    <TouchableOpacity
                        onPress={saveChanges}
                        className="bg-brownie px-6 py-2 rounded-lg"
                    >
                        <Text className="text-white font-semibold">Save changes</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => setIsEditing(true)}
                        className="bg-brownie px-6 py-2 rounded-lg"
                    >
                        <Text className="text-white font-semibold">Edit profile</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
