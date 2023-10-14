import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  reportContainer: {
    flex: 1,
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
    textAlign: 'center',
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
