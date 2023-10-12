import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import axios from 'axios';
import { saveValue, getValue, deleteValue } from '../helpers/StorageManager';
import { API_URL } from '../constants';
import awsmobile from '../../aws-exports';

const TOKEN_KEY = 'my-jwt';
const AuthContext = createContext();
Amplify.configure(awsmobile);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ token: null, authenticated: null, user: null });

  useEffect(() => {
    const loadToken = async () => {
      const token = await getValue(TOKEN_KEY);
      if (token) {
        try {
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          const user = await axios.get(`${API_URL}/auth/user`);
          setAuthState({ token, authenticated: true, user: user.data });
        } catch (error) {
          setAuthState({ token: null, authenticated: false, user: null });
          axios.defaults.headers.common.Authorization = '';
          await deleteValue(TOKEN_KEY);
        }
      }
    };
    loadToken();
  }, []);

  const register = async (email, password, name, phoneNumber) => {
    try {
      return await Auth.signUp({
        username: email,
        email,
        password,
        attributes: {
          name,
          phone_number: phoneNumber,
        },
      });
    } catch (error) {
      return { error: true, msge: error };
    }
  };
  const FacebookLogin = async (token) => {
    const params = {
      AccessToken: token /* required */,
    };
    try {
      const user = await Auth.currentSession(params);
      const { name } = user.idToken.payload;
      const { email } = user.idToken.payload;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setAuthState({ token, authenticated: true, user: { name, email } });
      await saveValue(TOKEN_KEY, token);
      return user.attributes;
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code
        return { error: true, msge: error.message };
      }
      if (error.request) {
        // No response received from the server
        return { error: true, msge: 'No response from server' };
      }
      // Other errors
      return { error: true, msge: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const user = await Auth.signIn(email, password);
      const token = user.signInUserSession.accessToken.jwtToken;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      // const user = await axios.get(`${API_URL}/auth/user`);
      setAuthState({ token, authenticated: true, user: user.attributes });
      await saveValue(TOKEN_KEY, token);
      return user.attributes;
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code
        return { error: true, msge: error.message };
      }
      if (error.request) {
        // No response received from the server
        return { error: true, msge: 'No response from server' };
      }
      // Other errors
      return { error: true, msge: error.message };
    }
  };

  const logout = async () => {
    await deleteValue(TOKEN_KEY);
    axios.defaults.headers.common.Authorization = '';
    setAuthState({ token: null, authenticated: false, user: null });
    await Auth.signOut();
  };

  const RefreshUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setAuthState({
      token: user.signInUserSession.accessToken.jwtToken,
      authenticated: true,
      user: user.attributes,
    });
  };

  const value = useMemo(
    () => ({
      onRegister: register,
      onLogin: login,
      onLogout: logout,
      onFacebookLogin: FacebookLogin,
      authState,
      RefreshUser,
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
