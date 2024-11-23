import {TouchableOpacity, View, Text} from "react-native";
import {useState} from "react";


const CommunityCard = () => {

const [isJoined, setJoin] = useState(false);
    return (
        <>
            <View className='border-4 border-secondary rounded-xl py-4 px-4 shadow-sm'>
            <Text className='text-xl font-bold text-gray-900'>
                Furro community
            </Text>
                <Text className='text-sm'>
                    15 participants
                </Text>
                <View>

                    <TouchableOpacity className={`rounded-full text-white py-2 px-2
                                           text-end ${
                        isJoined ? 'bg-gray-500' : 'bg-brownie'}`} >
                        <Text>Join</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>

    )
}

export default CommunityCard;