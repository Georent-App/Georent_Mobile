import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('screen').height;
const headerHeight = 70;
const footerHeight = 65;
const headerNavbarHeight = 65;
const containerHeight = windowHeight - headerHeight - footerHeight - headerNavbarHeight;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    top: headerHeight,
    padding: 20,
    backgroundColor: '#F5F5F5',
    height: containerHeight,
    width: '70%',
    zIndex: 9999,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollView: {
    display: 'flex',
    gap: 10,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingTop: 10,
    gap: 5,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0C2649',
  },
  slider: {
    width: '100%',
    color: '#2573DA',
    margin: 0,
    padding: 5,
    paddingTop: 10,
  },
  applyButtonView: {
    display: 'flex',
    marginTop: 'auto',
    marginBottom: 15,
  },
  lineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(105, 105, 105, 0.2)',
    marginVertical: 15,
    borderStyle: 'solid',
  },
  submitButton: {
    backgroundColor: '#2573DA',
    borderRadius: 100,
    height: 40,
  },
  collapsibleBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  categoryView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    paddingVertical: 5,
  },
  category: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  categoryImage: {
    width: 25,
    height: 25,
    margin: 0,
    padding: 0,
  },
  capacityContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingVertical: 10,
    gap: 10,
    marginBottom: 5,
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 15,
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5,
  },
  counter: {
    width: 20,
    textAlign: 'center',
  },
});
