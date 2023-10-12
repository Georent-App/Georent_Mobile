import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

function AccountTextInput({
  value, onChangeText, placeholder, keyboardType, secureTextEntry,
}) {
  return (
    <TextInput
      style={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2%',
        gap: 2,
        borderWidth: 1,
        borderColor: '#2573DA',
        borderRadius: 10,
      }}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
}

AccountTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

AccountTextInput.defaultProps = {
  placeholder: '',
  keyboardType: 'default',
  secureTextEntry: false,
};

export default AccountTextInput;
