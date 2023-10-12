import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import propTypes from 'prop-types';
import { styles } from './LoadingScreen.styles';

export function LoadingScreen({ text }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!text) {
      setDots('');
      return undefined;
    }

    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? `${prevDots}.` : ''));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2573DA" />
      <Text style={styles.loadingText}>
        {text}
        {dots}
      </Text>
    </View>
  );
}

LoadingScreen.propTypes = {
  text: propTypes.string,
};

LoadingScreen.defaultProps = {
  text: '',
};
