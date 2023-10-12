import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 20,
    bottom: 70,
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#333',
    marginBottom: 10,
  },
  toastContent: {
    flex: 1,
    marginLeft: 10,
  },
  messageText: {
    color: '#fff',
  },
  resendButtonContainer: {
    marginTop: 5,
  },
  resendButton: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});
