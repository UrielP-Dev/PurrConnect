import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabNavigator from './TabNavigator';
import SettingsDrawer from '../components/ComponentsMenuDrawer/SettingsDrawer';
import ProfileDrawer from '../components/ComponentsMenuDrawer/ProfileDrawer';
import CreateCommunityScreen from '../screens/CreateCommunityScreen';
import LogOutDrawer from '../components/ComponentsMenuDrawer/LogOutDrawer';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
    const drawerScreens = [
        { name: 'TabHome', component: TabNavigator, label: 'Inicio', icon: 'home' },
        { name: 'Settings', component: SettingsDrawer, label: 'Settings', icon: 'settings' },
        { name: 'Profile', component: ProfileDrawer, label: 'Profile', icon: 'manage-accounts' },
        { name: 'Create', component: CreateCommunityScreen, label: 'Create Community', icon: 'add' },
        { name: 'LogOut', component: LogOutDrawer, label: 'Log Out', icon: 'logout' },
    ];

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
            {drawerScreens.map(({ name, component, label, icon }) => (
                <Drawer.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{
                        headerShown: false,
                        drawerLabel: label,
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name={icon} color={color} size={size} />
                        ),
                    }}
                />
            ))}
        </Drawer.Navigator>
    );
}
