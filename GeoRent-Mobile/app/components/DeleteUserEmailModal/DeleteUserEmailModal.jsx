import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './DeleteUserEmailModal.styles';
import { ButtonGeoR } from '../ButtonGeoR/ButtonGeoR';

export function DeleteUserEmailModal({
  modalVisible, setModalVisible, action, actionText,
  buttonText, requestIsLoading, requestStatus, userEmail, setRequestStatus,
}) {
  const modalContent = `Para dar de baja tu cuenta ${userEmail}, con toda la información de perfil de usuario, nombre, mail, teléfono, e información asociada para mensajería; debes presionar el botón “ENVIAR” del presente formulario. \n\nAl solicitar la baja, se enviará correo a Soporte GeoRent, a fin de eliminar tu cuenta dentro de las 72 hrs laborales siguientes a la solicitud. Se informará a tu cuenta la eliminación efectiva del perfil.`;
  const modalTitle = 'Dar de baja tu cuenta en la Aplicación GeoRent';
  const warningFooter = 'Si has desistido de eliminar tu cuenta Presiona “VOLVER” \n\nEl equipo de GeoRent espera pronto tu regreso.';

  const closeModal = () => {
    Keyboard.dismiss();
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const buttonOnPress = () => {
    action();
  };

  const comeBack = () => {
    setRequestStatus('none');
    closeModal();
  };
  return (
    <View style={styles.reportContainer}>
      <TouchableOpacity onPress={toggleModal} style={styles.reportButton}>
        <Text style={styles.deleteInfoHiperlink}>{actionText}</Text>
      </TouchableOpacity>
      <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {requestIsLoading ? (
                  <>
                    <Text style={styles.modalTitle}>Enviando solicitud</Text>
                    <Text style={styles.warningTitle}>Por favor espere</Text>
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="large" color="#2573DA" />
                    </View>
                  </>
                ) : null}
                {requestStatus === 'none' && !requestIsLoading
                  ? (
                    <>
                      <Text style={styles.modalTitle}>{modalTitle}</Text>
                      <Text style={styles.warningTitle}>{modalContent}</Text>
                      <Text style={styles.warningTitle}>{warningFooter}</Text>
                      <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                          <ButtonGeoR message="Volver" Action={comeBack} ButtonDisabled={false} />
                        </View>
                        <View style={styles.buttonContainer}>
                          <ButtonGeoR
                            message={buttonText}
                            Action={buttonOnPress}
                            ButtonDisabled={false}
                          />
                        </View>
                      </View>
                    </>
                  )
                  : null}
                {requestStatus === 'success' && !requestIsLoading
                  ? (
                    <>
                      <Text style={styles.modalTitle}>Solicitud enviada con éxito</Text>
                      <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                          <ButtonGeoR message="Volver" Action={comeBack} ButtonDisabled={false} />
                        </View>
                      </View>
                    </>
                  )
                  : null}
                {requestStatus === 'error' && !requestIsLoading
                  ? (
                    <>
                      <Text style={styles.modalTitle}>Error al procesar solicitud</Text>
                      <Text style={styles.warningTitle}>
                        Estamos presentando dificultades técnicas, por favor intenta más tarde
                      </Text>
                      <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                          <ButtonGeoR message="Volver" Action={comeBack} ButtonDisabled={false} />
                        </View>
                      </View>
                    </>
                  )
                  : null}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

DeleteUserEmailModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  requestIsLoading: PropTypes.bool.isRequired,
  requestStatus: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  setRequestStatus: PropTypes.func.isRequired,
};
