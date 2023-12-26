import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Profile,
} from '../views/index';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Perfil" options={{ headerShown: false }} component={Profile} />
    </Stack.Navigator>
  );
}
