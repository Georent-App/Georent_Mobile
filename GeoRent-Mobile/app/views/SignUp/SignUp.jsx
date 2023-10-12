import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AccountTextInput from '../../components/AccountTextInput';
import { Header } from '../../components/header/Header';
import { useAuth } from '../../context/AuthContext';
import { styles } from './SignUp.styles';
import { Toast } from '../../components/Toast/Toast';

export function SignUp() {
  const { onRegister } = useAuth();
  const navigation = useNavigation();
  const [isSignUpButtonDisabled, setSignUpButtonDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Ingrese un correo electrónico válido')
      .required('Ingrese un correo electrónico'),
    password: yup
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Ingrese una contraseña'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
      .required('Confirme la contraseña'),
    firstName: yup
      .string()
      .matches(
        /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
        'El nombre no puede contener números ni caracteres especiales'
      )
      .required('Ingrese su nombre'),
    lastName: yup
      .string()
      .matches(
        /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
        'El apellido no puede contener números ni caracteres especiales'
      )
      .required('Ingrese su apellido'),
    phoneNumber: yup
      .string()
      .matches(/^\+?\d+$/, 'Ingrese un número de teléfono válido')
      .required('Ingrese un número de teléfono'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '+569',
    },
    validationSchema,
    onSubmit: async (values) => {
      const name = `${values.firstName} ${values.lastName}`;
      setSignUpButtonDisabled(true);
      const response = await onRegister(values.email, values.password, name, values.phoneNumber);
      setSignUpButtonDisabled(false);
      if (response) {
        if (
          response.msge.message
          === 'Password did not conform with policy: Password must have uppercase characters'
        ) {
          setIsError(true);
          setErrorMessage('La contraseña debe tener al menos una mayúscula');
          return;
        }
        setIsError(true);
        setErrorMessage(response.msge.message);
        return;
      }
      navigation.navigate('PostSignUp', { email: values.email });
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent={false} style="dark" backgroundColor="white" />
      <Header />
      <Toast message={errorMessage} isActive={isError} setIsActive={setIsError} isError />
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
          <Text style={[styles.fieldContainer, styles.title]}>Crear Usuario</Text>
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
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              placeholder="Email"
              keyboardType="email-address"
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={styles.error}>{formik.errors.email}</Text>
            )}

            <AccountTextInput
              value={formik.values.firstName}
              onChangeText={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
              placeholder="Nombres"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <Text style={styles.error}>{formik.errors.firstName}</Text>
            )}

            <AccountTextInput
              value={formik.values.lastName}
              onChangeText={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
              placeholder="Apellidos"
              style={{ marginBottom: 10 }}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <Text style={styles.error}>{formik.errors.lastName}</Text>
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

            <AccountTextInput
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              placeholder="Contraseña"
              secureTextEntry
              style={{ marginBottom: 10 }}
            />
            {formik.touched.password && formik.errors.password && (
              <Text style={styles.error}>{formik.errors.password}</Text>
            )}

            <AccountTextInput
              value={formik.values.confirmPassword}
              onChangeText={formik.handleChange('confirmPassword')}
              onBlur={formik.handleBlur('confirmPassword')}
              placeholder="Confirmar Contraseña"
              secureTextEntry
              style={{ marginBottom: 30 }}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
            )}

            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Text>¿Ya tienes un usuario? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: 'blue' }}>Inicia Sesión</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={formik.handleSubmit}
              disabled={isSignUpButtonDisabled}>
              {isSignUpButtonDisabled ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={{ color: 'white', fontSize: 18 }}>Crear Usuario</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
