import React, { useState, useRef, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { styles } from './PriceSlider.styles';

export default function SliderTest({ onValueChange, minValue, maxValue, onSlidingComplete }) {
  const [evaluationValue, setEvaluationValue] = useState(maxValue);
  const evaluationValueRef = useRef(evaluationValue);

  useEffect(() => {
    evaluationValueRef.current = evaluationValue;
    if (onValueChange) {
      onValueChange(evaluationValue);
    }
  }, [evaluationValue]);

  return (
    <Slider
      value={evaluationValue}
      minimumValue={minValue}
      maximumValue={maxValue}
      step={10000}
      style={styles.slider}
      onSlidingComplete={onSlidingComplete}
    />
  );
}

SliderTest.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};
