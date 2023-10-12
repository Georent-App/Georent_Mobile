import React from 'react';
import { View, Image } from 'react-native';
import { styles } from './Header.styles';
import Logo from '../../../assets/logo_header-160px.png';

export function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.image}
      />
    </View>
  );
}
