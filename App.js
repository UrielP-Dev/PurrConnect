import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InitialScreen from './screens/InitialScreen';
import LoginScreen from './screens/LoginScreen';
import HomePage from './screens/HomePage';
import CommunityInfo from "./screens/HomePage/CommunityInfo";
import CreatePost from "./screens/HomePage/CreatePost";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
function TabNavigator() {
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
                    tabBarLabel: 'Inicio'
                }}
            />
            <Tab.Screen
                name="My Communities"
                component={HomePage} // Reemplazar con FavoritesPage cuando exista
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="favorite" color={color} size={size} />
                    ),
                    tabBarLabel: 'My Communities'
                }}
            />
            <Tab.Screen
                name="Messages"
                component={HomePage} // Reemplazar con MessagesPage cuando exista
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="message" color={color} size={size} />
                    ),
                    tabBarLabel: 'Chat'
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={HomePage} // Reemplazar con NotificationsPage cuando exista
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="notifications" color={color} size={size} />
                    ),
                    tabBarLabel: 'Alertas'
                }}
            />
        </Tab.Navigator>
    );
}

// Drawer Navigator
function AppDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="TabHome"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#FFFFFF',
                    width: 280,
                },
                drawerActiveTintColor: '#694E4E',
                drawerInactiveTintColor: '#886F6F',
            }}
        >
            <Drawer.Screen
                name="TabHome"
                component={TabNavigator}
                options={{
                    headerShown: false,
                    drawerLabel: 'Inicio',
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            {/* Aquí puedes agregar más pantallas al drawer */}
        </Drawer.Navigator>
    );
}

// Root Navigator
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
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="HomePage"
                    component={AppDrawer}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CommunityInfo"
                    component={CommunityInfo}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CreatePost"
                    component={CreatePost}
                    options={{ headerShown: true }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}