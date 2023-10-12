import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_URL } from '../../constants';
import { styles } from './Toast.styles';

export function Toast({
  message, isActive, setIsActive, isError, email,
}) {
  const [isVisible, setIsVisible] = useState(isActive);
  const [resendLoading, setResendLoading] = useState(false);
  const [isResendBlocked, setResendBlocked] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    setIsVisible(isActive);
  }, [isActive]);

  const onClose = () => {
    setIsVisible(false);
    setIsActive(false);
  };

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

  const onResend = async () => {
    try {
      setResendLoading(true);
      setResendBlocked(true);
      await axios.post(`${API_URL}/auth/resend-confirmation-email`, {
        email,
      });
      setResendLoading(false);
      return setTimeOut();
    } catch (error) {
      onClose();
      return { error: true, msge: error.response.data.msg };
    }
  };

  let backgroundColor = isError ? '#c5280c' : '#333';
  if (
    message === 'Debes iniciar sesión para poder reprotar una propiedad.' || message === 'Debes iniciar sesión para poder evaluar una propiedad.' || message === 'Tienes que llenar todos los campos'
  ) {
    backgroundColor = '#CBC72F';
  }
  const shouldShowResendButton = message === 'Necesitamos que confirmes tu correo electrónico';

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0}
      style={styles.modal}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriverForBackdrop
    >
      <View style={[styles.toast, { backgroundColor }]}>
        {isError && <Ionicons name="alert-circle-outline" size={24} color="white" />}
        <View style={styles.toastContent}>
          <Text style={styles.messageText}>{message}</Text>
          {!resendLoading ? (
            isError && shouldShowResendButton && (
              <TouchableOpacity
                style={styles.resendButtonContainer}
                onPress={onResend}
                disabled={isResendBlocked}
              >
                <Text style={styles.resendButton}>
                  {isResendBlocked ? `Espera ${countdown}s` : 'Reenviar correo de confirmación'}
                </Text>
              </TouchableOpacity>
            )
          ) : (
            <View>
              <ActivityIndicator color="white" />
            </View>
          )}
        </View>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  email: PropTypes.string,
};

Toast.defaultProps = {
  message: '',
  email: '',
};
