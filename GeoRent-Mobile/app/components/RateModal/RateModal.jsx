import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import { useAuth0 } from 'react-native-auth0';
import { styles } from './RateModal.styles';
import { API_URL } from '../../constants';
import { Toast } from '../Toast/Toast';
import { ButtonGeoR } from '../ButtonGeoR/ButtonGeoR';

export function RateModal({ postId }) {
  const { user } = useAuth0();
  const [modalVisible, setModalVisible] = useState(false);
  const [evaluationValue, setEvaluationValue] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isError, setIsError] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const submitEvaluation = async () => {
    if (!user) {
      setToastMessage('Debes iniciar sesión para poder evaluar una propiedad.');
      setIsError(false);
      return setShowToast(true);
    }
    try {
      setIsButtonDisabled(true);
      await axios.post(`${API_URL}/ratings/create`, {
        post: postId,
        value: evaluationValue.toFixed(1),
      });
      setIsButtonDisabled(false);
      setToastMessage('¡Evaluación enviada exitosamente!');
      return setShowToast(true);
    } catch (error) {
      setIsError(true);
      setIsButtonDisabled(false);
      setToastMessage('Error al enviar la evaluación. Por favor, intenta nuevamente.');
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
        <Icon name="star" size={20} color="#2573DA" />
        <Text style={styles.reportText}>Evaluar publicación</Text>
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
                <Text style={styles.modalTitle}>Evaluar propiedad</Text>
                <View style={styles.ratingContainer}>
                  <Icon name="star" style={styles.starIcon} size={30} color="gold" />
                  <Text style={styles.ratingNumber}>{evaluationValue.toFixed(1)}</Text>
                </View>
                <Slider
                  value={evaluationValue}
                  minimumValue={1}
                  maximumValue={5}
                  step={0.5}
                  onValueChange={setEvaluationValue}
                  style={styles.slider}
                />
                <ButtonGeoR
                  message="Enviar"
                  ButtonDisabled={isButtonDisabled}
                  Action={submitEvaluation}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

RateModal.propTypes = {
  postId: PropTypes.number.isRequired,
};
