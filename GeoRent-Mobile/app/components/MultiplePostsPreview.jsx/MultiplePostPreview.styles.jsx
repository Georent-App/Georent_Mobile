import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scroll: {
    width: '100%', height: 250, position: 'absolute', bottom: 10,
  },
  scrollContent: {
    flexGrow: 1, alignItems: 'center', gap: 10,
  },
  container: {
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  postPreview: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 10,
    overflow: 'hidden',
    gap: 10,
    paddingRight: 10,
    zIndex: 100,
  },
  data: {
    flexGrow: 1000,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    flexShrink: 1,
  },
  price: {
    fontSize: 12,
    flexShrink: 1,
  },
  address: {
    fontSize: 12,
    color: '#696969',
    flexShrink: 1,
  },
  button: {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
