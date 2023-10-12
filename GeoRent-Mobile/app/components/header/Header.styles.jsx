import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'rgba(150, 150, 150, 0.1)',
    borderBottomWidth: 1,
    zIndex: 50,
  },
  image: {
    width: 100,
    resizeMode: 'contain',
  },
});
