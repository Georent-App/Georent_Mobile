import React, { useState, useEffect } from 'react';
import
{
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Auth, Hub } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/header/Header';
import AccountTextInput from '../../components/AccountTextInput';
import { styles } from './Login.styles';
import { Toast } from '../../components/Toast/Toast';
import googleImage from '../../../assets/google.png';
import facebookImage from '../../../assets/facebook.png';

export function Login() {
  const { onLogin, onFacebookLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [showResend, setShowResend] = useState(false);
  const [showWrongPass, setshowWrongPass] = useState(false);
  const [showServerError, setShowServerError] = useState(false);
  const [isLoginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const message = 'Necesitamos que confirmes tu correo electrónico';
  const [showFillFields, setshowFillFields] = useState(false);

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', async ({ payload: { event, data } }) => {
      let result = null;
      switch (event) {
        case 'signIn':
          console.log(data);
          result = await onFacebookLogin(data.signInUserSession.accessToken.jwtToken);
          return result;
        case 'signOut':
          break;
        case 'customOAuthState':
          return data;
        default:
          return data;
      }
      return result;
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser) => currentUser)
      .catch(() => 'Not signed in');

    return unsubscribe;
  }, []);
  const handleLogin = async () => {
    setLoginButtonDisabled(true);
    setShowResend(false);
    setshowWrongPass(false);
    setShowServerError(false);
    const result = await onLogin(email, password);
    setLoginButtonDisabled(false);
    if (result && result.error) {
      if (result.msge.message === 'EMAIL_NOT_CONFIRMED') {
        setShowResend(true);
        return;
      }
      if (result.msge.message === 'INCORRECT_PASSWORD' || result.msge.message === 'USER_NOT_FOUND') {
        setshowWrongPass(true);
        return;
      }
      if (
        result.msge.message === 'No response from server'
        || result.msge.message === 'An error occurred'
      ) {
        setShowServerError(true);
        return;
      }
      if (result.msge.message === 'Username cannot be empty') {
        setshowFillFields(true);
        return;
      }
      setShowServerError(true);
    } else {
      setShowResend(false);
      setshowWrongPass(false);
      setShowServerError(false);
      navigation.navigate('Perfil');
    }
  };
  const handleLoginWithFacebook = async () => {
    try {
      const user = await Auth.federatedSignIn();
      // Redirige a la página deseada después de iniciar sesión exitosamente
      return { error: false, user };
    } catch (error) {
      return { error: true, msge: error };
    }
  };

  const handleLoginWithGmail = async () => {
    try {
      const user = await Auth.federatedSignIn({ provider: 'Google' });
      // Redirige a la página deseada después de iniciar sesión exitosamente
      navigation.navigate('Perfil');
      return { error: false, user };
    } catch (error) {
      return { error: true, msge: error.response.data.msg };
    }
  };
  const handleSignUp = () => {
    setshowWrongPass(false);
    setShowResend(false);
    setShowServerError(false);
    navigation.navigate('SignUp');
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent={false} style="dark" backgroundColor="white" />
      <Header />
      <Toast
        message={message}
        isActive={showResend}
        setIsActive={setShowResend}
        isError
        email={email}
      />
      <Toast
        message="Contraseña o Usuario incorrecto"
        isActive={showWrongPass}
        setIsActive={setshowWrongPass}
        isError
      />
      <Toast
        message="Tienes que llenar todos los campos"
        isActive={showFillFields}
        setIsActive={setshowFillFields}
        isError
      />
      <Toast
        message="Error de conexión con el servidor"
        isActive={showServerError}
        setIsActive={setShowServerError}
        isError
      />
      <View
        style={{
          position: 'relative',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: 10,
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLoginWithFacebook}
          disabled={isLoginButtonDisabled}>
          {isLoginButtonDisabled ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={[styles.buttonText, { color: 'white' }]}>Ir a Iniciar Sesión o Registrarte</Text>
          )}
        </TouchableOpacity>
 
      </View>
    </View>
  );
}
