import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Login,
  SignUp,
  PostSignUp,
  ForgotPassword,
} from '../views/index';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
      <Stack.Screen name="PostSignUp" options={{ headerShown: false }} component={PostSignUp} />
      <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPassword} />
    </Stack.Navigator>
  );
}
