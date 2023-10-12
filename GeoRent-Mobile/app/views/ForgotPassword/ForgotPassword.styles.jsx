import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const headerHeight = 70;
const footerHeight = 65;
const containerHeight = windowHeight - headerHeight - footerHeight;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: containerHeight,
    width: '100%',
    gap: 30,
  },
  formContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
    color: '#0C2649',
    marginTop: 4,
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 30,
    gap: 25,
  },
  submitButton: {
    backgroundColor: '#2573DA',
    borderRadius: 100,
    height: 40,
    maxWidth: 250,
    width: '100%',
    paddingHorizontal: 30,
  },
});
