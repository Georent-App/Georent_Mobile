import { Linking, Platform } from 'react-native';

export const hacerLlamada = (numeroTelefono) => {
  const url = `tel:${numeroTelefono}`;
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      return Linking.openURL(url);
    }
    return null;
  });
};
const limpiarNumero = (numeroTelefono) => {
  const numeroLimpio = numeroTelefono.replace(/[^0-9]/g, '');
  return numeroLimpio;
};

export const abrirWhatsApp = (numeroTelefono) => {
  const numeroLimpio = limpiarNumero(numeroTelefono);
  const url = `https://wa.me/${numeroLimpio}`;
  Linking.openURL(url).then((supported) => {
    if (supported) {
      return Linking.openURL(url);
    }
    return null;
  });
};

export const enviarWhatsapp = (numeroTelefono, mensaje) => {
  const numeroLimpio = limpiarNumero(numeroTelefono);
  const url = `https://wa.me/${numeroLimpio}?text=${mensaje}`;
  Linking.openURL(url).then((supported) => {
    if (supported) {
      return Linking.openURL(url);
    }
    return null;
  });
};

export const abrirEmail = (email) => {
  const url = `mailto:${email}`;
  Linking.openURL(url);
};

export const abrirMapa = (latitude, longitude, currentLocation) => {
  if (!currentLocation || !currentLocation.latitude || !currentLocation.longitude) {
    const url = Platform.select({
      ios: `maps:${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}`,
    });
    Linking.openURL(url);
    return;
  }

  const destinationLatLng = `${latitude},${longitude}`;
  const currentLatLng = `${currentLocation.latitude},${currentLocation.longitude}`;
  const label = 'Destino';

  const url = Platform.select({
    ios: `http://maps.apple.com/?saddr=${currentLatLng}&daddr=${destinationLatLng}`,
    android: `http://maps.google.com/maps?saddr=${currentLatLng}&daddr=${destinationLatLng}(${label})`,
  });

  Linking.openURL(url);
};

export const abrirPaginaWeb = (url) => {
  Linking.openURL(url);
};
