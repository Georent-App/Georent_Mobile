import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { styles } from './WarningModal.styles';
import { ButtonGeoR } from '../ButtonGeoR/ButtonGeoR';

export function ActionWithWarningModal({
  message, modalVisible, setModalVisible, action, icon, actionText, iconColor, buttonText,
}) {
  const warningContent = 'Georent no verifica las publicaciones de contenidos que los oferentes proporcionan como información de propiedades y servicios. El Sitio y la aplicación móvil, no se responsabiliza por la calidad del bien o servicios ofrecidos en ellos, ni asume responsabilidades de ningún tipo en caso de existir perjuicios económicos o morales por eventuales contratos y/o acuerdos comerciales originados por la información contenida en éste.';
  const warningTitle = '¡Advertencia!';
  const warningFooter = 'Para más detalles visite el siguiente link';

  const closeModal = () => {
    Keyboard.dismiss();
    setModalVisible(false);
  };

  const buttonOnPress = () => {
    closeModal();
    action();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const url = 'https://georent.cl/georent_html/Terminos.html';

  const handlePress = () => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.reportContainer}>
      <TouchableOpacity onPress={toggleModal} style={styles.reportButton}>
        <Icon name={icon} size={25} color={iconColor} />
        <Text style={styles.hiprelinkText}>{actionText}</Text>
      </TouchableOpacity>
      <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{warningTitle}</Text>
                <Text style={styles.warningTitle}>{warningContent}</Text>
                <Text style={styles.warningTitle}>{warningFooter}</Text>
                <TouchableOpacity onPress={handlePress}>
                  <Text style={styles.tycsText}>Términos y Condiciones</Text>
                </TouchableOpacity>
                <View>
                  <Icon name={icon} style={styles.iconContainer} size={30} color={iconColor} />
                </View>
                <Text style={styles.modalTitle}>{message}</Text>
                <ButtonGeoR message={buttonText} Action={buttonOnPress} ButtonDisabled={false} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

ActionWithWarningModal.propTypes = {
  message: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};
