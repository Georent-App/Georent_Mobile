import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  reportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // Estilos del botón para abrir el modal
  },
  reportText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 5,
    color: 'red',
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
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: '#2573DA',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 15,
    alignItems: 'center',
    width: '100%',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    height: 120,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
});
