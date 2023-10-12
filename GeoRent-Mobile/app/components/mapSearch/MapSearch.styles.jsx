import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    position: 'absolute',
    top: 10,
    paddingHorizontal: 10,
    width: '85%',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 0,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 30,
  },
  iconLeft: {
    paddingTop: 15,
  },
  iconRight: {
    paddingTop: 17,
  },
});
