import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import {Pressable, Text, View} from 'react-native';
import './global.css'
export default function App() {
    return (
        <LinearGradient
            colors={['#F3C5C5', '#FFFFFF']}
            start={{ x: 0, y: 0.7 }}
            end={{ x: 0, y: 1 }}
            className="justify-center items-center flex-1"
        >
            <Text className="text-white text-4xl font-bold mb-20">
                PurrConnect
            </Text>
            <Pressable  className='justify-center items-center bg-secondary rounded-full w-2/6 h-10 '>
                <Text className='text-black font-bold'>Login</Text>
            </Pressable>
            <StatusBar style="auto" />
        </LinearGradient>
    );
}
