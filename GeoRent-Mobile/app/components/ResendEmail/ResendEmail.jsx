import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styles } from './ResendEmail.styles';
import { API_URL } from '../../constants';

export function ResendEmail({ email, isLogin }) {
  const [isResendBlocked, setResendBlocked] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigation = useNavigation();
  const [isLoginButtonDisabled, setLoginButtonDisabled] = useState(false);

  const setTimeOut = () => {
    setCountdown(30);

    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      setResendBlocked(false);
      clearInterval(intervalId);
    }, 30000);
  };

  const handleResendClick = async () => {
    try {
      setResendLoading(true);
      setResendBlocked(true);
      await axios.post(`${API_URL}/auth/resend-confirmation-email`, {
        email,
      });
      setResendLoading(false);
      return setTimeOut();
    } catch (error) {
      return { error: true, msge: error.response.data.msg };
    }
  };

  const handleLoginClick = () => {
    setLoginButtonDisabled(true);
    navigation.navigate('Login');
  };
  if (isLogin) {
    return (
      <View style={styles.container}>
        <Text style={styles.secondText}>
          Necesitamos que confirmes tu correo electrónico para poder iniciar sesión
        </Text>
        <TouchableOpacity
          style={[styles.secondResendButton, isResendBlocked && styles.resendButtonBlocked]}
          onPress={handleResendClick}
          disabled={isResendBlocked}
        >
          <Text style={styles.resendButtonText}>
            {isResendBlocked ? `Espera ${countdown}s` : 'Reenviar correo de confirmación'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Te enviamos un correo electrónico para confirmar tu cuenta!</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLoginClick}
        disabled={isLoginButtonDisabled}
      >
        {isLoginButtonDisabled ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        )}
      </TouchableOpacity>
      {!resendLoading ? (
        <TouchableOpacity
          style={[styles.resendButton, isResendBlocked && styles.resendButtonBlocked]}
          onPress={handleResendClick}
          disabled={isResendBlocked}
        >
          <Text style={styles.resendButtonText}>
            {isResendBlocked ? `Espera ${countdown}s` : 'Reenviar correo de confirmación'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.resendButton}>
          <ActivityIndicator color="#2573DA" />
        </View>
      )}
    </View>
  );
}

ResendEmail.propTypes = {
  email: PropTypes.string.isRequired,
  isLogin: PropTypes.bool,
};

ResendEmail.defaultProps = {
  isLogin: false,
};
