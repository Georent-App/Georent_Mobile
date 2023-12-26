import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tycsText: {
    fontSize: 12,
    textAlign: 'justify',
    opacity: 0.8,
    textDecorationLine: 'underline',
  },
  hiprelinkText: {
    marginLeft: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    marginVertical: 10,
    marginTop: 20,
  },
  reportContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 10,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // Estilos del botón para abrir el modal
  },
  reportText: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#2573DA',
    // Estilos del texto del botón para abrir el modal
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'justify',
  },
  warningTitle: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'justify',
    opacity: 0.8,
  },
  sendButton: {
    width: '100%',
    backgroundColor: '#2573DA',
    padding: 10,
    marginTop: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  ratingNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  starIcon: {
    fontSize: 40,
    color: 'gold',
  },
  slider: {
    width: '100%',
    alignSelf: 'flex-start', // Alineación a la izquierda
  },
});
