import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  colorPrimary: {
    backgroundColor: 'rgba(37, 115, 218, 0.3)',
    borderColor: 'rgba(37, 115, 218, 0.5)',
  },
  colorSecondary: {
    backgroundColor: 'rgba(114, 71, 200, 0.3)',
    borderColor: 'rgba(114, 71, 200, 0.5)',
  },
  textPrimary: {
    color: '#2573DA',
  },
  textSecondary: {
    color: '#7247C8',
  },
});
