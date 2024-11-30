import { Button,View,Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

export default function AgeInput() {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // Formatear la fecha a dd/mm/yy usando date-fns
    const formattedDate = moment(date).format('DD/MM/YY');
  console.log(formattedDate);
    hideDatePicker();
  };

  return (
    <View 
    
    >
      <TouchableOpacity 
        className="justify-center items-center bg-brownie rounded-full w-28 h-16 mb-8  shadow-sm"
        onPress={showDatePicker} >
      <Text className="text-white font-bold text-3xl">Age</Text>
      </TouchableOpacity>
      
      <DateTimePickerModal

        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  )
}
