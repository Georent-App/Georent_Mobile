import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './ButtonGeoR.styles';

export function ButtonGeoR({ message, ButtonDisabled, Action }) {
  return (
    <TouchableOpacity style={styles.sendButton} onPress={Action} disabled={ButtonDisabled}>
      {ButtonDisabled ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <Text style={styles.sendButtonText}>{message}</Text>
      )}
    </TouchableOpacity>
  );
}

ButtonGeoR.propTypes = {
  message: PropTypes.string.isRequired,
  ButtonDisabled: PropTypes.bool.isRequired,
  Action: PropTypes.func.isRequired,
};
