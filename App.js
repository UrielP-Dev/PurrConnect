import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './Context/UserContext';
import StackNavigator from './navigators/StackNavigator';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    'Warning: ...',
    'Text strings must be rendered within a <Text> component.',
]);

export default function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <StackNavigator />
            </NavigationContainer>
        </UserProvider>
    );
}
