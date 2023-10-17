import React from 'react';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { styles } from './PriceSlider.styles';

export default function SliderTest({ minValue, maxValue, onSlidingComplete }) {
  return (
    <Slider
      value={maxValue}
      minimumValue={minValue}
      maximumValue={maxValue}
      step={5000}
      style={styles.slider}
      onSlidingComplete={onSlidingComplete}
    />
  );
}

SliderTest.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onSlidingComplete: PropTypes.func.isRequired,
};
