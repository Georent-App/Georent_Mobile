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
export const abrirEmail = (email) => {
  const url = `mailto:${email}`;
  Linking.openURL(url);
};

export const abrirMapa = (coords) => {
  const url = Platform.select({
    ios: `maps:${coords.latitude},${coords.longitude}`,
    android: `geo:${coords.latitude},${coords.longitude}`,
  });
  Linking.openURL(url);
};
