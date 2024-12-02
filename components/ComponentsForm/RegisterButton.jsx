import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function RegisterButton({register}) {
  return (
    <TouchableOpacity
            className='w-full py-4 rounded-xl mb-4 flex items-center justify-center bg-brownie'
            onPress={register}
            
        >
        <Text className="text-white text-center font-semibold">Register</Text>
    </TouchableOpacity>
  )
}
