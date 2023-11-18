import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
    color: '#0C2649',
    marginTop: 4,
  },
  inputContainer: {
    position: 'absolute',
    width: '90%',
    height: '10%',
    top: '5%',
    left: '5%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '2%',
    gap: '2%',
    borderWidth: 1,
    borderColor: '#2573DA',
    borderRadius: 10,
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2.38%',
    paddingHorizontal: '8.89%',
    width: '55%',
    backgroundColor: '#2573DA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    marginTop: 50,
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 30,
    gap: 25,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  profileContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    gap: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  section: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    gap: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#0C2649',
  },
  value: {
    justifyContent: 'center',
  },
});
