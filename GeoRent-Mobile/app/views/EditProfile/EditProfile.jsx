import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Auth } from 'aws-amplify';
import AccountTextInput from '../../components/AccountTextInput';
import { Header } from '../../components/header/Header';
import { styles } from './EditProfile.styles';
import { Toast } from '../../components/Toast/Toast';
import { useAuth } from '../../context/AuthContext';

export function EditProfile() {
  const { authState, RefreshUser } = useAuth();
  const { user } = authState;
  const [isSignUpButtonDisabled, setSignUpButtonDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const validationSchema = yup.object().shape({
    Name: yup
      .string()
      .matches(
        /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
        'El nombre no puede contener números ni caracteres especiales'
      )
      .required('Ingrese su nombre'),
    phoneNumber: yup
      .string()
      .matches(/^\+?\d+$/, 'Ingrese un número de teléfono válido')
      .required('Ingrese un número de teléfono'),
  });

  const formik = useFormik({
    initialValues: {
      Name: user.name,
      phoneNumber: user.phone_number,
    },
    validationSchema,
    onSubmit: async (values) => {
      setSignUpButtonDisabled(true);
      const user2 = await Auth.currentAuthenticatedUser();
      const response = await Auth.updateUserAttributes(user2, {
        name: values.Name,
        phone_number: values.phoneNumber,
      });
      setSignUpButtonDisabled(false);
      if (response) {
        if (response === 'SUCCESS') {
          RefreshUser(values.Name);
          setIsError(true);
          setErrorMessage('Se ha cambiado la informacion de usuario');
          return;
        }
        setIsError(true);
        setErrorMessage(response);
      }
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent={false} style="dark" backgroundColor="white" />
      <Header />
      <Toast message={errorMessage} isActive={isError} setIsActive={setIsError} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
          }}>
          <Text style={[styles.fieldContainer, styles.title]}>Editar Usuario</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
              alignItems: 'center',
              gap: 20,
            }}>
            <AccountTextInput
              value={formik.values.Name}
              onChangeText={formik.handleChange('Name')}
              onBlur={formik.handleBlur('Name')}
              placeholder="Nombres"
            />
            {formik.touched.firstName && formik.errors.Name && (
              <Text style={styles.error}>{formik.errors.Name}</Text>
            )}

            <AccountTextInput
              value={formik.values.phoneNumber}
              onChangeText={formik.handleChange('phoneNumber')}
              onBlur={formik.handleBlur('phoneNumber')}
              placeholder="Numero de telefono"
              keyboardType="phone-pad"
              style={{ marginBottom: 10 }}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <Text style={styles.error}>{formik.errors.phoneNumber}</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={formik.handleSubmit}
              disabled={isSignUpButtonDisabled}>
              {isSignUpButtonDisabled ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={{ color: 'white', fontSize: 18 }}>Editar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
