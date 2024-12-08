import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomePage from '../screens/HomePage';
import MyCommunities from '../screens/HomePage/MyCommunites';
import ChatScreen from '../screens/HomePage/ChatScreen';
import ProfileDrawer from '../components/ComponentsMenuDrawer/ProfileDrawer';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    paddingTop: 5,
                    height: 60,
                },
                tabBarActiveTintColor: '#694E4E',
                tabBarInactiveTintColor: '#C1A3A3',
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomePage}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={size} />
                    ),
                    tabBarLabel: 'Inicio',
                }}
            />
            <Tab.Screen
                name="My Communities"
                component={MyCommunities}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="favorite" color={color} size={size} />
                    ),
                    tabBarLabel: 'My Communities',
                }}
            />
            <Tab.Screen
                name="Messages"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="forum" color={color} size={size} />
                    ),
                    tabBarLabel: 'Chat',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileDrawer}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" color={color} size={size} />
                    ),
                    tabBarLabel: 'Profile',
                }}
            />
        </Tab.Navigator>
    );
}
