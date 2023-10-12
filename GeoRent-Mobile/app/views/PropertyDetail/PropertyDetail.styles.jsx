import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  imageContainer: {
    height: 450,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  currentImage: {
    borderColor: 'white',
  },
  placeholderImage: {
    height: '100%',
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    marginTop: -8,
  },
  cardContent: {
    flexGrow: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Alineación horizontal
    // Estilos del contenedor de valoración
  },
  allRatingContainer: {
    alignItems: 'center',
    justifyContent: 'center', // Alineación horizontal
    // Estilos del contenedor de valoración
  },
  ratingIconContainer: {
    padding: 6, // Espacio entre el icono y el texto
    // Estilos del contenedor del icono de estrella
  },
  ratingValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
    marginRight: 5,
    // Estilos del valor de la valoración
  },
  ratingText: {
    fontSize: 14,
    color: '#888',
    // Estilos del texto de la valoración
  },
  ratingDescription: {
    fontSize: 14,
    color: '#888',
    flexDirection: 'row',
  },
  propertyInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 20,
  },
  propertyInfoSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'right',
    marginBottom: 5,
  },
  propertyInfoTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  propertyInfoValue: {
    color: '#888',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  footerText: {
    marginLeft: 10,
    color: '#888',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: 'white',
  },
  cardTitle: {
    marginLeft: 10,
    color: '#0C2149',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
