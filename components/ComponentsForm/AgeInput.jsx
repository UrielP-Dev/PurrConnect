import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import ErrorMessage from './ErrorMessage';
import { Calendar } from 'lucide-react-native';

export default function AgeInput({ setAge, error, setError }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // Calcular edad
    const birthDate = moment(date);
    const currentDate = moment();
    const age = currentDate.diff(birthDate, 'years');

    if (age < 18) {
      // Si tiene menos de 18 años, muestra un error
      setAge('');
      setError("You must be 18 or older to register");
    } else {
      // Si tiene 18 años o más
      const formattedDate = birthDate.format('DD/MM/YY');
      setSelectedDate(date);
      setAge(formattedDate);
      setError(''); // Limpia el error si no hay problemas
    }
    hideDatePicker();
  };

  return (
      <View className="mb-4">
        <TouchableOpacity
            className={`flex-row justify-center items-center bg-brownie rounded-full w-full h-14 mb-2 shadow-sm ${error ? 'border-2 border-red-500' : ''}`}
            onPress={showDatePicker}
        >
          <Calendar color="white" size={24} className="mr-3" />
          <Text className="text-white font-bold text-lg">
            {selectedDate
                ? `Born on ${moment(selectedDate).format('DD MMM YYYY')}`
                : 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>

        {error && <ErrorMessage message={error} />}

        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
            customStyles={{
              datePicker: {
                backgroundColor: '#FFFFFF', // Cambia el fondo del calendario
              },
              datePickerHeaderText: {
                color: '#ff6347', // Cambia el color del texto del encabezado
              },
              dateText: {
                color: '#694E4E',
              },
            }}
        />
      </View>
  );
}
