import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, Platform, View } from 'react-native';
import PropertiesStack from '../../router/PropertyStack';
import AccountStack from '../../router/SessionStack';
import ProfileStack from '../../router/ProfileStack';
import { Home } from '../../views';
import { styles } from './Navbar.styles';
import { useAuth } from '../../context/AuthContext';

const Tab = createBottomTabNavigator();

function getTabBarIcon(route, focused, color) {
  let iconName;

  if (route.name === 'Inicio') {
    iconName = focused ? 'ios-navigate' : 'ios-navigate-outline';
  } else if (route.name === 'Cerca mío') {
    iconName = focused ? 'ios-location' : 'ios-location-outline';
  } else if (route.name === 'Perfil' || route.name === 'Iniciar Sesion') {
    iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
  }

  return <Ionicons name={iconName} size={28} color={color} style={{ marginTop: 5 }} />;
}

export function NavBar() {
  const { authState } = useAuth();

  const content = (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => getTabBarIcon(route, focused, color),
        tabBarStyle: [{ display: 'flex', height: 65 }],
        tabBarLabelStyle: [{ display: 'flex', fontSize: 13, marginBottom: 8 }],
      })}
    >
      <Tab.Screen style={styles.iconStyle} name="Inicio" component={Home} />
      <Tab.Screen
        style={styles.iconStyle}
        name="Cerca mío"
        component={PropertiesStack}
      />
      <Tab.Screen
        style={styles.iconStyle}
        name={authState.authenticated ? 'Perfil' : 'Iniciar Sesion'}
        component={authState.authenticated ? ProfileStack : AccountStack}
      />
    </Tab.Navigator>
  );

  return Platform.OS === 'ios' ? (
    <SafeAreaView style={{ flex: 1 }}>
      {content}
    </SafeAreaView>
  ) : (
    <View style={{ flex: 1 }}>
      {content}
    </View>
  );
}
