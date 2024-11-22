import './global.css'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitialScreen from './screens/InitialScreen';
import LoginScreen from "./screens/LoginScreen";
import HomePage from "./screens/HomePage";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Initial">
                <Stack.Screen
                    name="Initial"
                    component={InitialScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ title: 'LoginScreen', headerShown: false }}
                />
                <Stack.Screen
                    name={"HomePage"}
                    component={HomePage}
                    options={{ title: 'HomePage', headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
