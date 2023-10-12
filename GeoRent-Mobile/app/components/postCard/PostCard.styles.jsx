import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  shadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 2,
    borderRadius: 20,
  },
  image: {
    maxWidth: '100%',
    width: 280,
    height: 210,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 6,
  },
  data: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  city: {
    fontSize: 14,
    color: 'black',
  },
  distance: {
    fontSize: 14,
    color: '#696969',
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  span: {
    fontSize: 14,
    fontWeight: '400',
    color: '#696969',
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    gap: 5,
  },
  ratingText: {
    fontSize: 14,
  },
  typeIcon: {
    width: 30,
    height: 30,
    right: 10,
    position: 'absolute',
    zIndex: 1,
    top: 10,
  },
});
