import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CommunityCard = ({ community, isJoined, onJoinPress, onPress }) => {
    return (
        <View className="bg-white border-2 border-secondary rounded-xl px-4 py-4 m-2 flex-1 shadow-2xl">
            {/* Ahora solo envolvemos la parte clicable en un TouchableOpacity */}
            <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-brownie mb-1" numberOfLines={1}>
                            {community.name || "Community Name"}
                        </Text>
                        <View className="flex-row items-center">
                            <MaterialIcons name="group" size={16} color="#886F6F" />
                            <Text className="text-tertiary text-sm ml-1">
                                {community.participants || 0} participants
                            </Text>
                        </View>
                    </View>
                </View>
                <Text className="text-tertiary text-sm mb-3" numberOfLines={3}>
                    {community.description || "Community description."}
                </Text>
            </TouchableOpacity>

            <View className="flex-row justify-between pt-3 border-t border-secondary/20">
                <View className="flex-row place-items-end ml-auto">
                    <TouchableOpacity
                        onPress={onJoinPress}
                        className={`rounded-full py-2 px-4 flex-row items-center ${
                            isJoined ? "bg-secondary" : "bg-brownie"
                        }`}
                    >
                        <MaterialIcons
                            name={isJoined ? "check" : "add"}
                            size={16}
                            color="#FFFFFF"
                        />
                        <Text className="text-white text-sm font-medium ml-1">
                            {isJoined ? "Joined" : "Join"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CommunityCard;
