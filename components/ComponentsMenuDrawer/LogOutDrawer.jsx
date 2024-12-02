import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import auth from "../../Utils/Firebase"
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function LogOutDrawer() {
  const navigation = useNavigation();
  function logOut(){
    const auth = getAuth(auth);
    signOut(auth).then(() => {
      console.log('Cerró sesión')
      navigation.navigate('Initial')
    }).catch((error) => {
      // An error happened.
    }); 
  }
  
  return (
    <View className="flex-1 bg-main">
      <View className=" items-start my-6 h-4.5">
        <TouchableOpacity 
          className="ml-4 mt-7"
          onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#694E4E" />
        </TouchableOpacity>
        <Text className="text-brownie font-bold text-2xl ml-4">
          Profile
        </Text>
      </View>

      <View className="flex-1 bg-main mt-20 mr-10 mb-20 ml-10 rounded-2xl">
        <Image className="h-2/4 w-full" source={require('../../assets/PurrIcon.png')} />
        <Text className="text-[#886F6F] font-bold text-xl mb-2 text-center">
          Are you sure you want to log out?
        </Text>
        <TouchableOpacity
          className='w-full py-4 rounded-xl mb-4 flex items-center justify-center bg-[#694E4E]'
          onPress={logOut}
        >
          <Text className="text-white text-center font-semibold">Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='w-full py-4 rounded-xl mb-4 flex items-center justify-center bg-[#694E4E]'
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white text-center font-semibold">Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}