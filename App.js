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
import { UserProvider } from './Context/UserContext';
import MyCommunities from "./screens/HomePage/MyCommunites";
import SettingsDrawer from "./components/ComponentsMenuDrawer/SettingsDrawer"
import GroupChatDetailScreen from "./screens/HomePage/GroupChatDetailScreen";
import ChatScreen from "./screens/HomePage/ChatScreen";
import SignUpScreen from './screens/SignUpScreen';
import CreateCommunityScreen from "./screens/CreateCommunityScreen";
import ProfileDrawer from './components/ComponentsMenuDrawer/ProfileDrawer';
import LogOutDrawer from './components/ComponentsMenuDrawer/LogOutDrawer';
import { View } from 'lucide-react-native';
import CommentsScreen from "./screens/HomePage/Comments";
import { LogBox } from 'react-native';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreLogs([
    'Warning: ...',
    'Text strings must be rendered within a <Text> component.',
]);
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
                component={MyCommunities}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="favorite" color={color} size={size} />
                    ),
                    tabBarLabel: 'My Communities'
                }}
            />
            <Tab.Screen
                name="Messages"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="forum" color={color} size={size} />
                    ),
                    tabBarLabel: 'Chat'
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileDrawer}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" color={color} size={size} />
                    ),
                    tabBarLabel: 'Profile'
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
            <Drawer.Screen
                name="Settings"
                component={SettingsDrawer}
                options={{
                    headerShown: false,
                    drawerLabel: 'Settings',
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="settings" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileDrawer}
                options={{
                    headerShown: false,
                    drawerLabel: 'Profile',
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="manage-accounts" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Create"
                component={CreateCommunityScreen}
                options={{
                    headerShown: false,
                    drawerLabel: 'Create Community',
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="add" color={color} size={size} />
                    ),
                }}
            />

            <Drawer.Screen
                name="LogOut"

                component={LogOutDrawer}
                options={{
                    headerShown: false,
                    drawerLabel: 'Log Out',
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="logout" color={color} size={size} />
                    ),

                }}
            />



            {/* Aquí puedes agregar más pantallas al drawer */}
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <UserProvider>
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
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="GroupChatDetail"
                        component={GroupChatDetailScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={"SignUpScreen"}
                        component={SignUpScreen}
                        options={{ title: 'SignUpScreen', headerShown: false }}
                    />
                    <Stack.Screen
                        name={"CreateCommunityScreen"}
                        component={CreateCommunityScreen}
                        options={{ title: 'CreateCommunityScreen', headerShown: false }}
                    />

                    <Stack.Screen
                        name={"Comments"}
                        component={CommentsScreen}
                        options={{ title: 'SignUpScreen', headerShown: false }}
                    />


                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}