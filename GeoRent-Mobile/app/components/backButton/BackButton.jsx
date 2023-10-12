import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './BackButton.styles';

export function BackButton({ backRoute }) {
  const navigation = useNavigation();

  const handleTouch = () => {
    if (backRoute) {
      navigation.navigate(backRoute);
      return;
    }
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

BackButton.propTypes = {
  backRoute: PropTypes.string,
};

BackButton.defaultProps = {
  backRoute: null,
};
