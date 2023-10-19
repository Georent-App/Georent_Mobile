import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { styles } from './PriceSlider.styles';

export default function PriceSlider({ minValue, maxValue, onSlidingComplete }) {
  const [defaultValue, setDefaultValue] = useState(0);
  const [sliderMaxValue, setSliderMaxValue] = useState(0);
  const stepValue = 5000;

  useEffect(
    () => {
      if (maxValue && maxValue > sliderMaxValue) setSliderMaxValue(maxValue);
    },
    [maxValue],
  );

  useEffect(
    () => {
      setDefaultValue(sliderMaxValue);
    },
    [sliderMaxValue],
  );

  return (
    <Slider
      value={defaultValue}
      minimumValue={minValue}
      maximumValue={sliderMaxValue}
      step={stepValue}
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
