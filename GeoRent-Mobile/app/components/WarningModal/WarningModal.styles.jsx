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
    alignItems: 'start',
    justifyContent: 'center',
    marginVertical: 10,
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
});
