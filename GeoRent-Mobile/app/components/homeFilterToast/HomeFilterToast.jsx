import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './HomeFilterToast.styles';

export default function HomeFilterToast({
  name, onClose, icon, type,
}) {
  return (
    <View
      style={[
        styles.container,
        type === 'primary' ? styles.colorPrimary : styles.colorSecondary,
      ]}
    >
      <Ionicons
        name={icon}
        size={18}
        color={type === 'primary' ? '#2573DA' : '#7247c8'}
      />
      <Text style={type === 'primary' ? styles.textPrimary : styles.textSecondary}>
        {name}
      </Text>
      {onClose && (
      <TouchableOpacity onPress={onClose}>
        <Ionicons
          name="close-outline"
          size={18}
          color={type === 'primary' ? '#2573DA' : '#7247c8'}
        />
      </TouchableOpacity>
      )}
    </View>
  );
}

HomeFilterToast.propTypes = {
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  icon: PropTypes.string.isRequired,
  type: PropTypes.string,
};

HomeFilterToast.defaultProps = {
  onClose: null,
  type: 'primary',
};
