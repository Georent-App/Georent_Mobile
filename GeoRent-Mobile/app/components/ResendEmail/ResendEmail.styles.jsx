import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '70%',
    fontSize: 20,
    color: '#0C2149',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '40%',
  },
  secondText: {
    width: '70%',
    fontSize: 17,
    color: '#0C2149',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#2573DA',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: '70%',
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  resendButton: {
    backgroundColor: 'transparent',
    padding: 10,
    marginTop: 10,
  },
  secondResendButton: {
    backgroundColor: 'transparent',
    padding: 10,
    marginBottom: '135%',
  },
  resendButtonBlocked: {
    opacity: 0.6,
  },
  resendButtonText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#2573DA',
  },
});
