import {StyleSheet, Text, Image, View, TouchableOpacity, ToastAndroid} from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import EmailInput from '../components/ComponentsForm/EmailInput';
import NameInput from '../components/ComponentsForm/NameInput';
import PasswordInput from '../components/ComponentsForm/PasswordInput';
import RepeatPasswordInput from '../components/ComponentsForm/RepeatPasswordInput';
import Divider from '../components/ComponentsForm/Divider';
import GoogleLoginButton from '../components/ComponentsForm/GoogleLoginButton';
import AgeInput from '../components/ComponentsForm/AgeInput';
import app from '../Utils/Firebase';
import { db } from '../Utils/Firebase';
import { collection, doc, setDoc } from "firebase/firestore";
import UserNameInput from '../components/ComponentsForm/UserNameInput';
import RegisterButton from '../components/ComponentsForm/RegisterButton';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import moment from 'moment';

export default function SignUpScreen({ navigation }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('')
    const [age, setAge] = useState('')
    const [userName, setUserName] = useState('')
    const [errors, setErrors] = useState({ name:'',email: '', password: '',repeatPassword: '',age:'',userName:'' });

    const register = () => {
        let errors = {}
        const currentDate = new Date();
        if (!email || !password || !name || !repeatPassword || !age || !userName) {
            if (!email) errors.email = 'Email is required';
            if (!password) errors.password = 'Password is required';
            if (!name) errors.name = 'Name is required';
            if (!repeatPassword) errors.repeatPassword = 'Repeat password is required';
            if (!age) errors.age = 'Age is required';
            if (!userName) errors.userName = 'Username is required';
            setErrors(errors);
        } else if (password !== repeatPassword) {
            errors.password = 'Passwords do not match';
            errors.repeatPassword = 'Passwords do not match';
            setErrors(errors);
        } else if (password.length < 6 || repeatPassword.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            errors.repeatPassword = 'Password must be at least 6 characters';
            setErrors(errors);
        }else {
            const auth = getAuth(app);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const userRef = doc(collection(db, 'users'), user.uid);
                    setDoc(userRef, {
                        name,
                        email,
                        userName,
                        age,
                    })
                        .then(() => {//console.log("Document written with ID: ", user.uid)
                            navigation.navigate('LoginScreen');
                            ToastAndroid.show("Account created!", ToastAndroid.SHORT);

                        })

                .catch((error) => console.error("Error adding document: ", error));
                })
                .catch((error) => console.log(error.message));
        }
    };

    return (
        <GestureHandlerRootView className="flex-1 bg-main">
            <ScrollView
                className="flex-1 bg-main"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 justify-center px-6 py-12 mt-4">
                    <View className="items-center mb-8">
                        <Image
                            className="h-48 w-48"
                            source={require('../assets/PurrIcon.png')}
                            resizeMode="contain"
                        />
                    </View>

                    <View className="bg-main rounded-2xl p-6 shadow-md">
                        <Text className="text-2xl font-bold text-gray-800 text-center mb-6">
                            Create Your Account
                        </Text>

                        <GoogleLoginButton />
                        <Divider />

                        <NameInput
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                setErrors((prev) => ({ ...prev, name: '' }));
                            }}
                            error={errors.name}
                        />

                        <UserNameInput
                            value={userName}
                            onChangeText={(text) => {
                                setUserName(text);
                                setErrors((prev) => ({ ...prev, userName: '' }));
                            }}
                            error={errors.userName}
                        />

                        <EmailInput
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setErrors((prev) => ({ ...prev, email: '' }));
                            }}
                            error={errors.email}
                        />

                        <PasswordInput
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setErrors((prev) => ({ ...prev, password: '' }));
                            }}
                            error={errors.password}
                        />

                        <RepeatPasswordInput
                            value={repeatPassword}
                            onChangeText={(text) => {
                                setRepeatPassword(text);
                                setErrors((prev) => ({ ...prev, repeatPassword: '' }));
                            }}
                            error={errors.repeatPassword}
                        />

                        <AgeInput
                            setAge={setAge}
                            error={errors.age}
                            setError={(message) => setErrors((prev) => ({ ...prev, age: message }))}
                        />


                        <RegisterButton register={register} />

                        <TouchableOpacity
                            className="mt-4 items-center"
                            onPress={() => navigation.navigate('LoginScreen')}
                        >
                            <Text className="text-browni font-semibold">
                                Already have an account? Log In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
}

// We can remove the StyleSheet since we're using Tailwind