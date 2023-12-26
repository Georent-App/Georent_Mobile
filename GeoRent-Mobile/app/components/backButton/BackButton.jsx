import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './BackButton.styles';

export function BackButton() {
  const navigation = useNavigation();

  const handleTouch = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleTouch}
    >
      <Ionicons
        name="arrow-back"
        size={22}
        color="white"
      />
    </TouchableOpacity>
  );
}
