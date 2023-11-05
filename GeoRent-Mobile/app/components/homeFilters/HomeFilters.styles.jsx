import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('screen').height;
const headerHeight = 70;
const footerHeight = 65;
const headerNavbarHeight = 65;
const containerHeight = windowHeight - headerHeight - footerHeight - headerNavbarHeight;

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 50,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomColor: 'rgba(105, 105, 105, 0.2)',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingLeft: 20,
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingTop: 10,
    gap: 10,
  },
  appliedFilters: {
    display: 'flex',
    flexDirection: 'row',
    width: '110%',
    paddingHorizontal: 10,
  },
  appliedFilter: {
    marginRight: 10,
  },
  filtersContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: headerHeight,
    height: containerHeight,
    width: '70%',
    zIndex: 9999,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0C2649',
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
  capacityContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingTop: 15,
    gap: 10,
  },
  maxPriceContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 10,
  },
  checkboxContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#E5E5E5',
    paddingVertical: 5,
    gap: 10,
    marginBottom: 10,
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
  scrollView: {
    display: 'flex',
    gap: 10,
  },
  categoryView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    paddingVertical: 5,
    backgroundColor: '#E5E5E5',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryImage: {
    width: 25,
    height: 25,
    margin: 0,
    padding: 0,
  },
});
