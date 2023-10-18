import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { styles } from './PriceSlider.styles';

export default function PriceSlider({ minValue, maxValue, onSlidingComplete }) {
  const [defaultValue, setDefaultValue] = useState(maxValue);

  useEffect(
    () => {
      if (maxValue) setDefaultValue(maxValue);
    },
    [maxValue],
  );

  return (
    <Slider
      value={defaultValue}
      minimumValue={minValue}
      maximumValue={maxValue}
      step={5000}
      style={styles.slider}
      onSlidingComplete={onSlidingComplete}
    />
  );
}

PriceSlider.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onSlidingComplete: PropTypes.func.isRequired,
};
