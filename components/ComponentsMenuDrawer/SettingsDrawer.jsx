import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsDrawer() {
  const navigation = useNavigation();
  const [brightness, setBrightness] = useState(50);
  const [volume, setVolume] = useState(50);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleVibration = () => {
    setVibrationEnabled(!vibrationEnabled);
  };

  const toggleWifi = () => {
    setWifiEnabled(!wifiEnabled);
  };

  return (
    <View className={`flex-1 p-5 ${darkMode ? 'bg-[#333]' : 'bg-[#F3C5C5]'}`}>
      <View className=" items-start my-6 h-4.5">
        <TouchableOpacity 
          className="ml-4 mt-7 ${darkMode ? 'text-white' : 'text-[#694E4E]'}`"
          onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={darkMode ? '#F3C5C5 ' : '#694E4E'}  />
        </TouchableOpacity>
      </View>
      <Text className={`text-2xl font-bold mb-5 text-center mt-10 ${darkMode ? 'text-white' : 'text-[#694E4E]'}`}>
        {language === 'en' ? 'Settings' : 'Configuraciones'}
      </Text>

      {/* Brillo */}
      <View className="mb-5">
        <Text className={`text-lg mb-2 ${darkMode ? 'text-white' : 'text-[#694E4E]'}`}>
          {language === 'en' ? `Brightness: ${brightness}%` : `Brillo: ${brightness}%`}
        </Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={brightness}
          onValueChange={(value) => setBrightness(value)}
          minimumTrackTintColor="#694E4E"
          maximumTrackTintColor="#C1A3A3"
        />
      </View>

      {/* Volumen */}
      <View className="mb-5">
        <Text className={`text-lg mb-2 ${darkMode ? 'text-white' : 'text-[#694E4E]'}`}>
          {language === 'en' ? `Volume: ${volume}%` : `Volumen: ${volume}%`}
        </Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={volume}
          onValueChange={(value) => setVolume(value)}
          minimumTrackTintColor="#694E4E"
          maximumTrackTintColor="#C1A3A3"
        />
      </View>

      {/* Notificaciones */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className={`text-lg ${darkMode ? 'text-white' : 'text-[#694E4E]'}`}>
          {language === 'en' ? 'Notifications' : 'Notificaciones'}
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#C1A3A3", true: "#694E4E" }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Modo Oscuro */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className={`text-lg ${darkMode ? 'text-white' : 'text-[#694E4E]'}`}>
          {language === 'en' ? 'Dark Mode' : 'Modo Oscuro'}
        </Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#C1A3A3", true: "#694E4E" }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Vibración */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className={`text-lg ${darkMode ? 'text-white' : 'text-[#694E4E]'}`}>
          {language === 'en' ? 'Vibration' : 'Vibración'}
        </Text>
        <Switch
          value={vibrationEnabled}
          onValueChange={toggleVibration}
          trackColor={{ false: "#C1A3A3", true: "#694E4E" }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Tamaño de Fuente */}
      <View className="mb-5">
        <Text className={`text-lg mb-2 ${darkMode ? 'text-white' : 'text-[#694E4E]'}`}>
          {language === 'en' ? `Font Size: ${fontSize}` : `Tamaño de Fuente: ${fontSize}`}
        </Text>
        <Slider
          minimumValue={12}
          maximumValue={24}
          step={1}
          value={fontSize}
          onValueChange={(value) => setFontSize(value)}
          minimumTrackTintColor="#694E4E"
          maximumTrackTintColor="#C1A3A3"
        />
      </View>

      {/* Wi-Fi */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className={`text-lg ${darkMode ? 'text-white' : 'text-[#694E4E]'}`}>
          Wi-Fi
        </Text>
        <Switch
          value={wifiEnabled}
          onValueChange={toggleWifi}
          trackColor={{ false: "#C1A3A3", true: "#694E4E" }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Idioma */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className={`text-lg ${darkMode ? 'text-white' : 'text-[#694E4E]'}`}>
          {language === 'en' ? 'Language' : 'Idioma'}
        </Text>
        <Switch
          value={language === 'es'}
          onValueChange={toggleLanguage}
          trackColor={{ false: "#C1A3A3", true: "#694E4E" }}
          thumbColor="#FFFFFF"
        />
      </View>
    </View>
  );
}