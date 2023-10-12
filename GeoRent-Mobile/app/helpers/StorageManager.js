import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar un valor en AsyncStorage
export const saveValue = async (clave, valor) => {
  try {
    await AsyncStorage.setItem(clave, valor);
    return clave;
  } catch (error) {
    return error;
  }
};

// Eliminar un valor de AsyncStorage
export const deleteValue = async (clave) => {
  try {
    await AsyncStorage.removeItem(clave);
    return clave;
  } catch (error) {
    return error;
  }
};

// Obtener un valor de AsyncStorage
export const getValue = async (clave) => {
  try {
    const valor = await AsyncStorage.getItem(clave);
    return valor;
  } catch (error) {
    return null;
  }
};
