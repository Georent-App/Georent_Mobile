/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, CheckBox } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import campingIcon from '../../../assets/Camping-icon.png';
import foodIcon from '../../../assets/Food-icon.png';
import businessIcon from '../../../assets/Business-icon.png';
import entertainmentIcon from '../../../assets/Entertainment-icon.png';
import tradesAndServicesIcon from '../../../assets/TradesAndServices-icon.png';
import PriceSlider from '../Slider/PirceSlider';
import { styles } from './IndexFilters.styles';

const deviceWidth = Dimensions.get('window').width;

export default function IndexFilters({
  isActive, setIsActive, onSubmit, filtersLoading, isService, postMaxPrice,
}) {
  const [animation] = useState(
    new Animated.Value(isActive ? 0 : -deviceWidth),
  );
  const [range, setRange] = useState(10);
  const [fourStarsOnly, setFourStarsOnly] = useState(false);
  const [order, setOrder] = useState('nearest');
  const [type, setType] = useState(['PROPERTY', 'CAMPING']);
  const [categories, setCategories] = useState([
    'TRADES_AND_SERVICES',
    'FOOD',
    'ENTERTAINMENT',
    'BUSINESS',
  ]);
  const [availability, setAvailability] = useState('all');
  const [singleBeds, setSingleBeds] = useState('-');
  const [doubleBeds, setDoubleBeds] = useState('-');
  const [singleBedsActive, setSingleBedsActive] = useState(false);
  const [doubleBedsActive, setDoubleBedsActive] = useState(false);
  const [maxPrice, setMaxPrice] = useState(-1);
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderMaxValue, setSliderMaxValue] = useState(0);
  const minValue = 0;

  const handleOrderChange = useCallback(
    (value) => {
      setOrder(value);
    },
  );

  const handleClose = () => {
    setIsActive(false);
  };

  const preSubmit = () => {
    const filters = {
      radius: range * 1000,
      fourStarsOnly,
      order,
      type,
      categories,
      availability,
      singleBeds,
      doubleBeds,
      maxPrice,
    };
    onSubmit(filters);
  };

  useEffect(() => {
    if (postMaxPrice) {
      setSliderValue(postMaxPrice);
      if (postMaxPrice > sliderMaxValue) setSliderMaxValue(postMaxPrice);
    }
  }, [postMaxPrice]);

  useEffect(() => {
    Animated.timing(
      animation,
      {
        toValue: isActive ? 0 : -deviceWidth,
        duration: 500,
        useNativeDriver: false,
      },
    ).start();
  }, [isActive]);

  useEffect(() => {
    if (!isService) {
      const newType = ['PROPERTY', 'CAMPING'];
      setType(newType);
    } else {
      const newType = ['SERVICE'];
      const newCategories = [
        'TRADES_AND_SERVICES',
        'FOOD',
        'ENTERTAINMENT',
        'BUSINESS',
      ];
      setType(newType);
      setCategories(newCategories);
    }
  }, [isService]);

  const addPointsToNumber = (number) => {
    if (number || number === 0) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return null;
  };

  const formatValue = (value) => {
    if (value % 10 === 1 && value !== sliderMaxValue) {
      return value - 1;
    }
    return value;
  };

  const handleSliderComplete = (value) => {
    const formattedValue = formatValue(value);
    setSliderValue(formattedValue);
    setMaxPrice(formattedValue);
  };

  return (
    <>
      {
      Platform.OS === 'ios' ? (
        <Animated.View style={{ ...styles.container, left: animation }}>
          <View style={styles.row}>
            <Text style={styles.titleText}>
              Filtros
            </Text>
            <TouchableOpacity
              onPress={handleClose}
            >
              <Ionicons name="close" size={24} color="#696969" />
            </TouchableOpacity>
          </View>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.column}>
              <ScrollView
                vertical
                contentContainerStyle={styles.scrollView}
              >
                <View>
                  <Text>
                    Radio de búsqueda:
                    {' '}
                    {range}
                    {' '}
                    km
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={5}
                    maximumValue={30}
                    step={1}
                    value={range}
                    onValueChange={(value) => setRange(value)}
                    minimumTrackTintColor="#2573DA"
                    maximumTrackTintColor="#2573DA"
                    thumbTintColor="#2573DA"
                  />
                </View>
                {!isService && (
                <View>
                  <Text>
                    Tipo de alojamiento:
                  </Text>
                  <CheckBox
                    title="Propiedades"
                    checked={type.includes('PROPERTY')}
                    onPress={() => {
                      if (type.includes('PROPERTY')) {
                        setType(type.filter((t) => t !== 'PROPERTY'));
                      } else {
                        setType([...type, 'PROPERTY']);
                      }
                    }}
                    checkedColor="#2573DA"
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      margin: 0,
                      padding: 5,
                    }}
                    textStyle={{ fontWeight: 'normal' }}
                  />
                  <Collapsible collapsed={!type.includes('PROPERTY')}>
                    <View style={styles.capacityContainer}>
                      <View>
                        <Text style={[
                          { textAlign: 'center' },
                          !singleBedsActive && { opacity: 0.5 },
                        ]}
                        >
                          Camas Simples
                        </Text>
                        <View style={[
                          styles.counterContainer,
                        ]}
                        >
                          <TouchableOpacity onPress={
                            () => {
                              if (singleBeds !== '-') {
                                if (singleBeds > 0) {
                                  setSingleBeds(singleBeds - 1);
                                  setSingleBedsActive(true);
                                }
                                if (singleBeds === 0) {
                                  setSingleBeds('-');
                                  setSingleBedsActive(false);
                                }
                              }
                            }
                          }
                          >
                            <Ionicons
                              name="remove-circle"
                              size={24}
                              color={
                              singleBedsActive ? '#696969' : '#D3D3D3'
                            }
                            />
                          </TouchableOpacity>
                          <Text style={[
                            styles.counter,
                            !singleBedsActive && { opacity: 0.5 },
                          ]}
                          >
                            {singleBeds}
                          </Text>
                          <TouchableOpacity onPress={() => {
                            if (singleBeds === '-') {
                              setSingleBeds(0);
                              setSingleBedsActive(true);
                            } else {
                              setSingleBeds(singleBeds + 1);
                            }
                          }}
                          >
                            <Ionicons name="add-circle" size={24} color="#696969" />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        <Text style={[
                          { textAlign: 'center' },
                          !doubleBedsActive && { opacity: 0.5 },
                        ]}
                        >
                          Camas Dobles
                        </Text>
                        <View style={[
                          styles.counterContainer,
                        ]}
                        >
                          <TouchableOpacity onPress={
                            () => {
                              if (doubleBeds !== '-') {
                                if (doubleBeds > 0) {
                                  setDoubleBeds(doubleBeds - 1);
                                  setDoubleBedsActive(true);
                                }
                                if (doubleBeds === 0) {
                                  setDoubleBeds('-');
                                  setDoubleBedsActive(false);
                                }
                              }
                            }
                          }
                          >
                            <Ionicons
                              name="remove-circle"
                              size={24}
                              color={
                              doubleBedsActive ? '#696969' : '#D3D3D3'
                            }
                            />
                          </TouchableOpacity>
                          <Text style={[
                            styles.counter,
                            !doubleBedsActive && { opacity: 0.5 },
                          ]}
                          >
                            {doubleBeds}
                          </Text>
                          <TouchableOpacity onPress={() => {
                            if (doubleBeds === '-') {
                              setDoubleBeds(0);
                              setDoubleBedsActive(true);
                            } else {
                              setDoubleBeds(doubleBeds + 1);
                            }
                          }}
                          >
                            <Ionicons name="add-circle" size={24} color="#696969" />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.capacityContainer}>
                        <Text>
                          {`Precio máximo: $${addPointsToNumber(sliderValue)}`}
                        </Text>
                        <View style={{
                          flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: -10,
                        }}
                        >
                          <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 11 }}>
                              {`$${addPointsToNumber(minValue)}`}
                            </Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 11 }}>
                              {`$${addPointsToNumber(sliderMaxValue / 2)}`}
                            </Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 11 }}>
                              {`$${addPointsToNumber(sliderMaxValue)}`}
                            </Text>
                          </View>
                        </View>
                        <PriceSlider
                          minValue={minValue}
                          maxValue={sliderMaxValue}
                          onSlidingComplete={handleSliderComplete}
                        />
                      </View>
                    </View>
                  </Collapsible>
                  <View style={styles.category}>
                    <CheckBox
                      title="Campings"
                      checked={type.includes('CAMPING')}
                      onPress={() => {
                        if (type.includes('CAMPING')) {
                          setType(type.filter((t) => t !== 'CAMPING'));
                        } else {
                          setType([...type, 'CAMPING']);
                        }
                      }}
                      checkedColor="#2573DA"
                      containerStyle={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        margin: 0,
                        padding: 5,
                      }}
                      titleProps={{ style: { paddingLeft: 10, width: 100 } }}
                      textStyle={{ fontWeight: 'normal' }}
                    />
                    <Image
                      source={campingIcon}
                      style={styles.categoryImage}
                    />
                  </View>
                </View>
                )}
                {isService && (
                <View>
                  <Text>
                    Servicios:
                  </Text>
                  <View style={styles.categoryView}>
                    <View style={styles.category}>
                      <CheckBox
                        title="Oficios y Servicios"
                        checked={type.includes('SERVICE') && categories.includes('TRADES_AND_SERVICES')}
                        onPress={() => {
                          if (categories.includes('TRADES_AND_SERVICES')) {
                            setCategories(categories.filter((t) => t !== 'TRADES_AND_SERVICES'));
                          } else {
                            setCategories([...categories, 'TRADES_AND_SERVICES']);
                          }
                        }}
                        checkedColor="#2573DA"
                        containerStyle={{
                          backgroundColor: 'transparent',
                          borderColor: 'transparent',
                          margin: 0,
                          padding: 5,
                        }}
                        titleProps={{ style: { paddingLeft: 10, width: 100 } }}
                        textStyle={{ fontWeight: 'normal' }}
                      />
                      <Image
                        source={tradesAndServicesIcon}
                        style={styles.categoryImage}
                      />
                    </View>
                    <View style={styles.category}>
                      <CheckBox
                        title="Comidas"
                        checked={type.includes('SERVICE') && categories.includes('FOOD')}
                        onPress={() => {
                          if (categories.includes('FOOD')) {
                            setCategories(categories.filter((t) => t !== 'FOOD'));
                          } else {
                            setCategories([...categories, 'FOOD']);
                          }
                        }}
                        checkedColor="#2573DA"
                        containerStyle={{
                          backgroundColor: 'transparent',
                          borderColor: 'transparent',
                          margin: 0,
                          padding: 5,
                        }}
                        titleProps={{ style: { paddingLeft: 10, width: 100 } }}
                        textStyle={{ fontWeight: 'normal' }}
                      />
                      <Image
                        source={foodIcon}
                        style={styles.categoryImage}
                      />
                    </View>
                    <View style={styles.category}>
                      <CheckBox
                        title="Entretención"
                        checked={type.includes('SERVICE') && categories.includes('ENTERTAINMENT')}
                        onPress={() => {
                          if (categories.includes('ENTERTAINMENT')) {
                            setCategories(categories.filter((t) => t !== 'ENTERTAINMENT'));
                          } else {
                            setCategories([...categories, 'ENTERTAINMENT']);
                          }
                        }}
                        checkedColor="#2573DA"
                        containerStyle={{
                          backgroundColor: 'transparent',
                          borderColor: 'transparent',
                          margin: 0,
                          padding: 5,
                        }}
                        titleProps={{ style: { paddingLeft: 10, width: 100 } }}
                        textStyle={{ fontWeight: 'normal' }}
                      />
                      <Image
                        source={entertainmentIcon}
                        style={styles.categoryImage}
                      />
                    </View>
                    <View style={styles.category}>
                      <CheckBox
                        title="Negocios"
                        checked={type.includes('SERVICE') && categories.includes('BUSINESS')}
                        onPress={() => {
                          if (categories.includes('BUSINESS')) {
                            setCategories(categories.filter((t) => t !== 'BUSINESS'));
                          } else {
                            setCategories([...categories, 'BUSINESS']);
                          }
                        }}
                        checkedColor="#2573DA"
                        containerStyle={{
                          backgroundColor: 'transparent',
                          borderColor: 'transparent',
                          margin: 0,
                          padding: 5,
                        }}
                        titleProps={{ style: { paddingLeft: 10, width: 100 } }}
                        textStyle={{ fontWeight: 'normal' }}
                      />
                      <Image
                        source={businessIcon}
                        style={styles.categoryImage}
                      />
                    </View>
                  </View>
                </View>
                )}
                {!isService && (
                <View>
                  <Text>
                    Disponibilidad:
                  </Text>
                  <CheckBox
                    title="Disponible ahora"
                    checked={availability === 'available'}
                    onPress={() => {
                      if (availability === 'available') {
                        setAvailability('all');
                      } else {
                        setAvailability('available');
                      }
                    }}
                    checkedColor="#2573DA"
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      margin: 0,
                      padding: 5,
                    }}
                    textStyle={{ fontWeight: 'normal' }}
                  />
                </View>
                )}
                {!isService && (
                <View>
                  <Text>
                    Ordenación:
                  </Text>
                  <CheckBox
                    title="Más cercanos primero"
                    checked={order === 'nearest'}
                    onPress={() => handleOrderChange('nearest')}
                    checkedColor="#2573DA"
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      margin: 0,
                      padding: 5,
                    }}
                    textStyle={{ fontWeight: 'normal' }}
                  />
                  <CheckBox
                    title="Más baratos primero"
                    checked={order === 'price_asc'}
                    onPress={() => handleOrderChange('price_asc')}
                    checkedColor="#2573DA"
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      margin: 0,
                      padding: 5,
                    }}
                    textStyle={{ fontWeight: 'normal' }}
                  />
                  <CheckBox
                    title="Más caros primero"
                    checked={order === 'price_desc'}
                    onPress={() => handleOrderChange('price_desc')}
                    checkedColor="#2573DA"
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      margin: 0,
                      padding: 5,
                    }}
                    textStyle={{ fontWeight: 'normal' }}
                  />
                </View>
                )}
                <View>
                  <Text>
                    Calificación mínima:
                  </Text>
                  <CheckBox
                    title="Mayor a 4 estrellas"
                    checked={fourStarsOnly}
                    onPress={() => setFourStarsOnly(!fourStarsOnly)}
                    checkedColor="#2573DA"
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      margin: 0,
                      padding: 5,
                    }}
                    textStyle={{ fontWeight: 'normal' }}
                  />
                </View>
              </ScrollView>
              <View style={styles.applyButtonView}>
                <View style={styles.lineStyle} />
                <Button
                  title="Filtrar"
                  buttonStyle={styles.submitButton}
                  onPress={preSubmit}
                  loading={filtersLoading}
                />
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      ) : (
        <Animated.View style={{ ...styles.container, left: animation }}>
          <View style={styles.row}>
            <Text style={styles.titleText}>
              Filtros
            </Text>
            <TouchableOpacity
              onPress={handleClose}
            >
              <Ionicons name="close" size={24} color="#696969" />
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <ScrollView
              vertical
              contentContainerStyle={styles.scrollView}
            >
              <View>
                <Text>
                  Radio de búsqueda:
                  {' '}
                  {range}
                  {' '}
                  km
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={5}
                  maximumValue={30}
                  step={1}
                  value={range}
                  onValueChange={(value) => setRange(value)}
                  minimumTrackTintColor="#2573DA"
                  maximumTrackTintColor="#2573DA"
                  thumbTintColor="#2573DA"
                />
              </View>
              {!isService && (
              <View>
                <Text>
                  Tipo de alojamiento:
                </Text>
                <CheckBox
                  title="Propiedades"
                  checked={type.includes('PROPERTY')}
                  onPress={() => {
                    if (type.includes('PROPERTY')) {
                      setType(type.filter((t) => t !== 'PROPERTY'));
                    } else {
                      setType([...type, 'PROPERTY']);
                    }
                  }}
                  checkedColor="#2573DA"
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    margin: 0,
                    padding: 5,
                  }}
                  textStyle={{ fontWeight: 'normal' }}
                />
                <Collapsible collapsed={!type.includes('PROPERTY')}>
                  <View style={styles.capacityContainer}>
                    <View>
                      <Text style={[
                        { textAlign: 'center' },
                        !singleBedsActive && { opacity: 0.5 },
                      ]}
                      >
                        Camas Simples
                      </Text>
                      <View style={[
                        styles.counterContainer,
                      ]}
                      >
                        <TouchableOpacity onPress={
                          () => {
                            if (singleBeds !== '-') {
                              if (singleBeds > 0) {
                                setSingleBeds(singleBeds - 1);
                                setSingleBedsActive(true);
                              }
                              if (singleBeds === 0) {
                                setSingleBeds('-');
                                setSingleBedsActive(false);
                              }
                            }
                          }
                        }
                        >
                          <Ionicons
                            name="remove-circle"
                            size={24}
                            color={
                            singleBedsActive ? '#696969' : '#D3D3D3'
                          }
                          />
                        </TouchableOpacity>
                        <Text style={[
                          styles.counter,
                          !singleBedsActive && { opacity: 0.5 },
                        ]}
                        >
                          {singleBeds}
                        </Text>
                        <TouchableOpacity onPress={() => {
                          if (singleBeds === '-') {
                            setSingleBeds(0);
                            setSingleBedsActive(true);
                          } else {
                            setSingleBeds(singleBeds + 1);
                          }
                        }}
                        >
                          <Ionicons name="add-circle" size={24} color="#696969" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View>
                      <Text style={[
                        { textAlign: 'center' },
                        !doubleBedsActive && { opacity: 0.5 },
                      ]}
                      >
                        Camas Dobles
                      </Text>
                      <View style={[
                        styles.counterContainer,
                      ]}
                      >
                        <TouchableOpacity onPress={
                          () => {
                            if (doubleBeds !== '-') {
                              if (doubleBeds > 0) {
                                setDoubleBeds(doubleBeds - 1);
                                setDoubleBedsActive(true);
                              }
                              if (doubleBeds === 0) {
                                setDoubleBeds('-');
                                setDoubleBedsActive(false);
                              }
                            }
                          }
                        }
                        >
                          <Ionicons
                            name="remove-circle"
                            size={24}
                            color={
                            doubleBedsActive ? '#696969' : '#D3D3D3'
                          }
                          />
                        </TouchableOpacity>
                        <Text style={[
                          styles.counter,
                          !doubleBedsActive && { opacity: 0.5 },
                        ]}
                        >
                          {doubleBeds}
                        </Text>
                        <TouchableOpacity onPress={() => {
                          if (doubleBeds === '-') {
                            setDoubleBeds(0);
                            setDoubleBedsActive(true);
                          } else {
                            setDoubleBeds(doubleBeds + 1);
                          }
                        }}
                        >
                          <Ionicons name="add-circle" size={24} color="#696969" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.capacityContainer}>
                      <Text>
                        {`Precio máximo: $${addPointsToNumber(sliderValue)}`}
                      </Text>
                      <View style={{
                        flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: -10,
                      }}
                      >
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                          <Text style={{ fontSize: 11 }}>
                            {`$${addPointsToNumber(minValue)}`}
                          </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                          <Text style={{ fontSize: 11 }}>
                            {`$${addPointsToNumber(sliderMaxValue / 2)}`}
                          </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                          <Text style={{ fontSize: 11 }}>
                            {`$${addPointsToNumber(sliderMaxValue)}`}
                          </Text>
                        </View>
                      </View>
                      <PriceSlider
                        minValue={minValue}
                        maxValue={sliderMaxValue}
                        onSlidingComplete={handleSliderComplete}
                      />
                    </View>
                  </View>
                </Collapsible>
                <View style={styles.category}>
                  <CheckBox
                    title="Campings"
                    checked={type.includes('CAMPING')}
                    onPress={() => {
                      if (type.includes('CAMPING')) {
                        setType(type.filter((t) => t !== 'CAMPING'));
                      } else {
                        setType([...type, 'CAMPING']);
                      }
                    }}
                    checkedColor="#2573DA"
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      margin: 0,
                      padding: 5,
                    }}
                    titleProps={{ style: { paddingLeft: 10, width: 100 } }}
                    textStyle={{ fontWeight: 'normal' }}
                  />
                  <Image
                    source={campingIcon}
                    style={styles.categoryImage}
                  />
                </View>
              </View>
              )}
              {isService && (
              <View>
                <Text>
                  Servicios:
                </Text>
                <View style={styles.categoryView}>
                  <View style={styles.category}>
                    <CheckBox
                      title="Oficios y Servicios"
                      checked={type.includes('SERVICE') && categories.includes('TRADES_AND_SERVICES')}
                      onPress={() => {
                        if (categories.includes('TRADES_AND_SERVICES')) {
                          setCategories(categories.filter((t) => t !== 'TRADES_AND_SERVICES'));
                        } else {
                          setCategories([...categories, 'TRADES_AND_SERVICES']);
                        }
                      }}
                      checkedColor="#2573DA"
                      containerStyle={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        margin: 0,
                        padding: 5,
                      }}
                      titleProps={{ style: { paddingLeft: 10, width: 100 } }}
                      textStyle={{ fontWeight: 'normal' }}
                    />
                    <Image
                      source={tradesAndServicesIcon}
                      style={styles.categoryImage}
                    />
                  </View>
                  <View style={styles.category}>
                    <CheckBox
                      title="Comidas"
                      checked={type.includes('SERVICE') && categories.includes('FOOD')}
                      onPress={() => {
                        if (categories.includes('FOOD')) {
                          setCategories(categories.filter((t) => t !== 'FOOD'));
                        } else {
                          setCategories([...categories, 'FOOD']);
                        }
                      }}
                      checkedColor="#2573DA"
                      containerStyle={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        margin: 0,
                        padding: 5,
                      }}
                      titleProps={{ style: { paddingLeft: 10, width: 100 } }}
                      textStyle={{ fontWeight: 'normal' }}
                    />
                    <Image
                      source={foodIcon}
                      style={styles.categoryImage}
                    />
                  </View>
                  <View style={styles.category}>
                    <CheckBox
                      title="Entretención"
                      checked={type.includes('SERVICE') && categories.includes('ENTERTAINMENT')}
                      onPress={() => {
                        if (categories.includes('ENTERTAINMENT')) {
                          setCategories(categories.filter((t) => t !== 'ENTERTAINMENT'));
                        } else {
                          setCategories([...categories, 'ENTERTAINMENT']);
                        }
                      }}
                      checkedColor="#2573DA"
                      containerStyle={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        margin: 0,
                        padding: 5,
                      }}
                      titleProps={{ style: { paddingLeft: 10, width: 100 } }}
                      textStyle={{ fontWeight: 'normal' }}
                    />
                    <Image
                      source={entertainmentIcon}
                      style={styles.categoryImage}
                    />
                  </View>
                  <View style={styles.category}>
                    <CheckBox
                      title="Negocios"
                      checked={type.includes('SERVICE') && categories.includes('BUSINESS')}
                      onPress={() => {
                        if (categories.includes('BUSINESS')) {
                          setCategories(categories.filter((t) => t !== 'BUSINESS'));
                        } else {
                          setCategories([...categories, 'BUSINESS']);
                        }
                      }}
                      checkedColor="#2573DA"
                      containerStyle={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        margin: 0,
                        padding: 5,
                      }}
                      titleProps={{ style: { paddingLeft: 10, width: 100 } }}
                      textStyle={{ fontWeight: 'normal' }}
                    />
                    <Image
                      source={businessIcon}
                      style={styles.categoryImage}
                    />
                  </View>
                </View>
              </View>
              )}
              {!isService && (
              <View>
                <Text>
                  Disponibilidad:
                </Text>
                <CheckBox
                  title="Disponible ahora"
                  checked={availability === 'available'}
                  onPress={() => {
                    if (availability === 'available') {
                      setAvailability('all');
                    } else {
                      setAvailability('available');
                    }
                  }}
                  checkedColor="#2573DA"
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    margin: 0,
                    padding: 5,
                  }}
                  textStyle={{ fontWeight: 'normal' }}
                />
              </View>
              )}
              {!isService && (
              <View>
                <Text>
                  Ordenación:
                </Text>
                <CheckBox
                  title="Más cercanos primero"
                  checked={order === 'nearest'}
                  onPress={() => handleOrderChange('nearest')}
                  checkedColor="#2573DA"
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    margin: 0,
                    padding: 5,
                  }}
                  textStyle={{ fontWeight: 'normal' }}
                />
                <CheckBox
                  title="Más baratos primero"
                  checked={order === 'price_asc'}
                  onPress={() => handleOrderChange('price_asc')}
                  checkedColor="#2573DA"
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    margin: 0,
                    padding: 5,
                  }}
                  textStyle={{ fontWeight: 'normal' }}
                />
                <CheckBox
                  title="Más caros primero"
                  checked={order === 'price_desc'}
                  onPress={() => handleOrderChange('price_desc')}
                  checkedColor="#2573DA"
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    margin: 0,
                    padding: 5,
                  }}
                  textStyle={{ fontWeight: 'normal' }}
                />
              </View>
              )}
              <View>
                <Text>
                  Calificación mínima:
                </Text>
                <CheckBox
                  title="Mayor a 4 estrellas"
                  checked={fourStarsOnly}
                  onPress={() => setFourStarsOnly(!fourStarsOnly)}
                  checkedColor="#2573DA"
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    margin: 0,
                    padding: 5,
                  }}
                  textStyle={{ fontWeight: 'normal' }}
                />
              </View>
            </ScrollView>
            <View style={styles.applyButtonView}>
              <View style={styles.lineStyle} />
              <Button
                title="Filtrar"
                buttonStyle={styles.submitButton}
                onPress={preSubmit}
                loading={filtersLoading}
              />
            </View>
          </View>
        </Animated.View>
      )
    }
    </>
  );
}

IndexFilters.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  filtersLoading: PropTypes.bool.isRequired,
  isService: PropTypes.bool.isRequired,
  postMaxPrice: PropTypes.number.isRequired,
};
