import { StyleSheet, Text, Image, View } from 'react-native'
import React, { useState } from 'react'
// Importar GestureHandlerRootView
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { ScrollView } from 'react-native-gesture-handler';
import EmailInput from '../components/ComponentsForm/EmailInput';
import NameInput from '../components/ComponentsForm/NameInput';
import PasswordInput from '../components/ComponentsForm/PasswordInput';
import RepeatPasswordInput from '../components/ComponentsForm/RepeatPasswordInput';
import Divider from '../components/ComponentsForm/Divider';
import GoogleLoginButton from '../components/ComponentsForm/GoogleLoginButton';
import AgeInput from '../components/ComponentsForm/AgeInput';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errors, setErrors] = useState({ name:'',email: '', password: '',repeatPassword: '' });

  return (
    // Envuelve todo el contenido de la pantalla dentro de GestureHandlerRootView
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView className="flex-1 bg-main">
        <View className="flex-1 justify-center items-start px-6 py-12 mt-16">
          <Image className="h-64 w-64 ml-14" source={require('../assets/PurrIcon.png')} />
          
          <GoogleLoginButton />

          <Divider/>

          <NameInput
            value={name}
            onChangeText={(text) => {
              setName(text)
              setErrors((prev) => ({...prev,name:''}));
            }}
            error={errors.name}
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
          <AgeInput/>

        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
