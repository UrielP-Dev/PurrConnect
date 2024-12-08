import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitialScreen from '../screens/InitialScreen';
import LoginScreen from '../screens/LoginScreen';
import AppDrawer from './AppDrawer';
import CommunityInfo from '../screens/HomePage/CommunityInfo';
import CreatePost from '../screens/HomePage/CreatePost';
import GroupChatDetailScreen from '../screens/HomePage/GroupChatDetailScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CreateCommunityScreen from '../screens/CreateCommunityScreen';
import CommentsScreen from '../screens/HomePage/Comments';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    const stackScreens = [
        { name: 'Initial', component: InitialScreen },
        { name: 'LoginScreen', component: LoginScreen },
        { name: 'HomePage', component: AppDrawer },
        { name: 'CommunityInfo', component: CommunityInfo },
        { name: 'CreatePost', component: CreatePost },
        { name: 'GroupChatDetail', component: GroupChatDetailScreen },
        { name: 'SignUpScreen', component: SignUpScreen },
        { name: 'CreateCommunityScreen', component: CreateCommunityScreen },
        { name: 'Comments', component: CommentsScreen },
    ];

    return (
        <Stack.Navigator initialRouteName="Initial">
            {stackScreens.map(({ name, component }) => (
                <Stack.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{ headerShown: false }}
                />
            ))}
        </Stack.Navigator>
    );
}
