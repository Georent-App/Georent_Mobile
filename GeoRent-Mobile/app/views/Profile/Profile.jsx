import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from '../../components/header/Header';
import { useAuth } from '../../context/AuthContext';
import { styles } from './Profile.styles';

export function Profile() {
  const { authState, onLogout } = useAuth();
  const { user } = authState;
  const navigation = useNavigation();
  const handleLogout = async () => {
    await onLogout();
    navigation.navigate('Iniciar Sesion');
  };
  const handleEdit = async () => {
    navigation.navigate('Edit');
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={false} style="dark" backgroundColor="white" />
      <Header />
      <View style={styles.container}>
        <Text style={[styles.fieldContainer, styles.title]}>Perfil de Usuario</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Correo Electrónico:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Numero de Contacto:</Text>
          <Text style={styles.value}>{user.phone_number}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Editar Datos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.label}>Arriendos Anteriores</Text>
          <Text style={styles.value}>Todavía no tienes arriendos</Text>
          <Ionicons name="sad-outline" size={24} />
        </View>
      </View>
    </View>
  );
}
