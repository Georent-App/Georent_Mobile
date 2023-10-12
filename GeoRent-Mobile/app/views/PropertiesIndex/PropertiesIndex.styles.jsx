import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
    color: '#0C2649',
    marginTop: 4,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginHorizontal: 20,
    marginTop: 10,
  },
  flexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 9,
    textAlign: 'center',
    borderColor: '#696969',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  buttonText: {
    color: '#696969',
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: '#2573DA',
    borderColor: '#2573DA',
  },
  activeButtonText: {
    color: 'white',
  },
  refreshButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 42,
    height: 42,
  },
  propertiesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 30,
    gap: 25,
  },
  loadingProperties: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: '100%',
  },
  noPostsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 30,
    gap: 5,
    marginHorizontal: 20,
  },
  noPostsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0C2649',
  },
  noPostsSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#696969',
  },
});
