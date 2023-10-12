import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {
  Button,
} from 'react-native-elements';
import PropTypes from 'prop-types';
import { BackButton } from '../../components/backButton/BackButton';
import AccountTextInput from '../../components/AccountTextInput';
import { styles } from './ForgotPassword.styles';

export function ForgotPassword({ route }) {
  const [email, setEmail] = useState(route.params?.email || '');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <BackButton />
        <View style={styles.page}>
          <Text style={styles.title}>
            Recuperar contraseña
          </Text>
          <View style={styles.formContainer}>
            <AccountTextInput
              placeholder="Introduce tu email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
            />
            <Button
              title="Enviar email"
              buttonStyle={styles.submitButton}
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setSubmitted(true);
                }, 2000);
              }}
              loading={loading}
              disabled={submitted || loading}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

ForgotPassword.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
};
