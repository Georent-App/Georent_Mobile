import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '../../constants';
import { styles } from './ReportModal.styles';
import { ButtonGeoR } from '../ButtonGeoR/ButtonGeoR';
import { Toast } from '../Toast/Toast';
import { useAuth } from '../../context/AuthContext';

export function ReportModal({ postId }) {
  const { authState } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reportText, setReportText] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleReport = async () => {
    if (!authState.authenticated) {
      setToastMessage('Debes iniciar sesión para poder reprotar una propiedad.');
      setIsError(false);
      return setShowToast(true);
    }
    try {
      setIsButtonDisabled(true);
      await axios.post(`${API_URL}/reports/create`, {
        post: postId,
        comment: reportText,
      });
      setIsButtonDisabled(false);
      setToastMessage('¡Reporte enviado exitosamente!');
      return setShowToast(true);
    } catch (error) {
      setIsError(true);
      setIsButtonDisabled(false);
      setToastMessage('Error al enviar el reporte. Por favor, intenta nuevamente.');
      setShowToast(true);
      return { error: true, msge: error.response.data.msg };
    }
  };

  const closeModal = () => {
    Keyboard.dismiss();
    setModalVisible(false);
  };

  return (
    <View style={styles.reportContainer}>
      <TouchableOpacity onPress={toggleModal} style={styles.reportButton}>
        <Icon name="exclamation-circle" size={20} color="red" />
        <Text style={styles.reportText}>Reportar publicación</Text>
      </TouchableOpacity>

      <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={closeModal}>
        <Toast
          message={toastMessage}
          isActive={showToast}
          setIsActive={setShowToast}
          isError={isError}
        />
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {/* Título */}
                <Text style={styles.modalTitle}>Reportar publicación</Text>

                {/* Cuadro de texto */}
                <TextInput
                  style={styles.textInput}
                  placeholder="Ingrese su denuncia"
                  value={reportText}
                  onChangeText={setReportText}
                  multiline
                />

                {/* Botón Enviar */}
                <ButtonGeoR
                  message="Enviar"
                  ButtonDisabled={isButtonDisabled}
                  Action={handleReport}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

ReportModal.propTypes = {
  postId: PropTypes.number.isRequired,
};
