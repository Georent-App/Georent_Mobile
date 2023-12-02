import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth0 } from 'react-native-auth0';
import { Header } from '../../components/header/Header';
import { styles } from './Profile.styles';
import { enviarWhatsapp } from '../../helpers/RedirectContact';

export function Profile() {
  const { user, authorize, clearSession } = useAuth0();

  const [sessionAvailable, setSessionAvailable] = useState(false);
  const [userName, setUserName] = useState('-');
  const [userEmail, setUserEmail] = useState('-');
  const navigation = useNavigation();

  const handleLogout = async () => {
    await clearSession();
    navigation.navigate('Iniciar Sesion');
  };

  const loginOnPress = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessageToWhatsApp = () => {
    if (!user) return;
    const phone = '+56992679247';
    const message = 'Hola, quisiera eliminar mi información de Georent!';
    const payload = `${message}\n\n- Nombre: ${userName}\n- Correo: ${userEmail}`;
    enviarWhatsapp(phone, payload);
  };

  const ShowUserProfile = (
    <View style={styles.profileContainer}>
      <Text style={[styles.fieldContainer, styles.title]}>Perfil de Usuario</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{userName}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <Text style={styles.value}>{userEmail}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );

  const ShowLoginButton = (
    <View style={styles.container}>
      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={loginOnPress}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getUserName = () => {
    if (!user) return '-';
    try {
      if (user.given_name) return user.given_name;
      if (user.name) return user.name;
      if (user.nickname) return user.nickname;
      return '-';
    } catch (error) {
      return '-';
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(getUserName());
      setUserEmail(user.email);
      setSessionAvailable(true);
    }
  }, [user]);

  return (
    sessionAvailable ? (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <StatusBar translucent={false} style="dark" backgroundColor="white" />
        <Header />
        {ShowUserProfile}
        <View style={styles.hiperLinkContainer}>
          <TouchableOpacity onPress={sendMessageToWhatsApp}>
            <Text style={styles.deleteInfoHiperlink}>Solicitar eliminar información</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} style="dark" backgroundColor="white" />
        <Header />
        {ShowLoginButton}
      </View>
    )
  );
}
