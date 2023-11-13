import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth0 } from 'react-native-auth0';
import { Header } from '../../components/header/Header';
import { styles } from './Profile.styles';

export function Profile() {
  const { user, authorize, clearSession } = useAuth0();
  const [sessionAvailable, setSessionAvailable] = useState(false);
  const [userName, setUserName] = useState('-');
  const [userEmail, setUserEmail] = useState('-');
  const [userPhoneNumber, setUserPhoneNumber] = useState('-');
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

  const ShowUserProfile = (
    <View style={styles.container}>
      <Text style={[styles.fieldContainer, styles.title]}>Perfil de Usuario</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{userName}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <Text style={styles.value}>{userEmail}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Numero de Contacto:</Text>
        <Text style={styles.value}>{userPhoneNumber}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <Text style={styles.label}>Arriendos Anteriores</Text>
        <Text style={styles.value}>Todavía no tienes arriendos</Text>
        <Ionicons name="sad-outline" size={24} />
      </View>
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

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserEmail(user.email);
      setSessionAvailable(true);
    }
  }, [user]);

  return (
    sessionAvailable ? (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} style="dark" backgroundColor="white" />
        <Header />
        {ShowUserProfile}
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
