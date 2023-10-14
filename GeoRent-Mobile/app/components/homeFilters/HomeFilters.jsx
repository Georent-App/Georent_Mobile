import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import Collapsible from 'react-native-collapsible';
import { Button, CheckBox } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeFilterToast from '../homeFilterToast/HomeFilterToast';
import campingIcon from '../../../assets/Camping-icon.png';
import foodIcon from '../../../assets/Food-icon.png';
import businessIcon from '../../../assets/Business-icon.png';
import entertainmentIcon from '../../../assets/Entertainment-icon.png';
import tradesAndServicesIcon from '../../../assets/TradesAndServices-icon.png';
import { styles } from './HomeFilters.styles';
import SliderTest from '../Slider/PirceSlider';

const deviceWidth = Dimensions.get('window').width;

export default function HomeFilters(
  {
    isActive, setIsActive, onSubmit, filtersLoading, filters, setFilters,
  },
) {
  const [animation] = useState(
    new Animated.Value(isActive ? 0 : -deviceWidth),
  );
  const [fourStarsOnly, setFourStarsOnly] = useState(false);
  const [type, setType] = useState(['PROPERTY']);
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
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const menuScrollViewRef = useRef();
  const minValue = 0;
  const maxValue = 120000;
  const [sliderValue, setSliderValue] = useState(maxValue);

  const sendFilters = (newFilters) => {
    onSubmit(newFilters);
  };

  const removeFilter = (filter, element = null) => {
    menuScrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    const newFilters = { ...filters };
    if (filter === 'fourStarsOnly') {
      newFilters[filter] = false;
    }
    if (filter === 'type') {
      newFilters[filter] = newFilters[filter].filter((el) => el !== element);
    }
    if (filter === 'categories') {
      newFilters[filter] = newFilters[filter].filter((el) => el !== element);
    }
    if (filter === 'availability') {
      newFilters[filter] = 'all';
    }
    setFilters(newFilters);
    if (filter === 'type') {
      setType(newFilters[filter]);
    }
    if (filter === 'fourStarsOnly') {
      setFourStarsOnly(newFilters[filter]);
    }
    if (filter === 'categories') {
      setCategories(newFilters[filter]);
    }
    if (filter === 'availability') {
      setAvailability(newFilters[filter]);
    }
    sendFilters(newFilters);
  };

  const preSubmit = () => {
    const newFilters = {
      type,
      singleBeds,
      doubleBeds,
      availability,
      fourStarsOnly,
      categories,
      minPrice,
      maxPrice,
    };
    setFilters(newFilters);
    sendFilters(newFilters);
  };

  const handleFilterContainerClose = () => {
    setIsActive(false);
  };

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

  const addPointsToNumber = (number) => {
    if (number || number === 0) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return null;
  };

  const handleSliderComplete = (value) => {
    setSliderValue(value);
    setMaxPrice(value);
  };

  const getSliderReferenceValues = (number) => {
    const numberWithPoints = addPointsToNumber(number);
    if (numberWithPoints.endsWith('.000')) {
      return `${numberWithPoints.slice(0, -4)}K`;
    } if (number < 1000) {
      return `${number}`;
    }
    return `${numberWithPoints}`;
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setIsActive(!isActive)}
          disabled={filtersLoading}
        >
          <Ionicons name="options-outline" size={28} color="#696969" />
        </TouchableOpacity>
        <ScrollView
          ref={menuScrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.appliedFilters}
        >
          {
            Object.keys(filters).map((filter) => {
              if (filter === 'singleBeds') return null;
              if (filter === 'doubleBeds') return null;
              if (filter === 'fourStarsOnly' && filters[filter]) {
                return (
                  <View style={styles.appliedFilter} key="fourstars">
                    <HomeFilterToast
                      name="4 estrellas o más"
                      icon="star-outline"
                      onClose={() => removeFilter(filter)}
                    />
                  </View>
                );
              }
              if (filter === 'type') {
                const elements = [];
                if (filters[filter].includes('PROPERTY')) {
                  elements.push(
                    <View style={styles.appliedFilter} key="filter-prop">
                      <HomeFilterToast
                        name="Arriendos"
                        icon="home-outline"
                        type="primary"
                        onClose={() => removeFilter(filter, 'PROPERTY')}
                      />
                    </View>,
                  );
                  if (filters.singleBeds !== '-') {
                    elements.push(
                      <View style={styles.appliedFilter} key="filter-singlebeds">
                        <HomeFilterToast
                          name={`Camas Simples: ${filters.singleBeds}`}
                          icon="bed-outline"
                          type="primary"
                        />
                      </View>,
                    );
                  }
                  if (filters.doubleBeds !== '-') {
                    elements.push(
                      <View style={styles.appliedFilter} key="filter-doublebeds">
                        <HomeFilterToast
                          name={`Camas Dobles: ${filters.doubleBeds}`}
                          icon="bed-outline"
                          type="primary"
                        />
                      </View>,
                    );
                  }
                }
                if (filters[filter].includes('CAMPING')) {
                  elements.push(
                    <View style={styles.appliedFilter} key="filter-camping">
                      <HomeFilterToast
                        name="Campings"
                        icon="trail-sign-outline"
                        type="primary"
                        onClose={() => removeFilter(filter, 'CAMPING')}
                      />
                    </View>,
                  );
                }
                return elements;
              }
              if (filter === 'categories' && filters.type.includes('SERVICE')) {
                const elements = [];
                if (filters[filter].includes('FOOD')) {
                  elements.push(
                    <View style={styles.appliedFilter} key="filter-food">
                      <HomeFilterToast
                        name="Comidas"
                        icon="fast-food-outline"
                        type="secondary"
                        onClose={() => removeFilter(filter, 'FOOD')}
                      />
                    </View>,
                  );
                }
                if (filters[filter].includes('ENTERTAINMENT')) {
                  elements.push(
                    <View style={styles.appliedFilter} key="filter-entertainment">
                      <HomeFilterToast
                        name="Entretención"
                        icon="videocam-outline"
                        type="secondary"
                        onClose={() => removeFilter(filter, 'ENTERTAINMENT')}
                      />
                    </View>,
                  );
                }
                if (filters[filter].includes('BUSINESS')) {
                  elements.push(
                    <View style={styles.appliedFilter} key="filter-business">
                      <HomeFilterToast
                        name="Negocios"
                        icon="card-outline"
                        type="secondary"
                        onClose={() => removeFilter(filter, 'BUSINESS')}
                      />
                    </View>,
                  );
                }
                if (filters[filter].includes('TRADES_AND_SERVICES')) {
                  elements.push(
                    <View style={styles.appliedFilter} key="filter-trades">
                      <HomeFilterToast
                        name="Oficios y servicios"
                        icon="construct-outline"
                        type="secondary"
                        onClose={() => removeFilter(filter, 'TRADES_AND_SERVICES')}
                      />
                    </View>,
                  );
                }
                return elements;
              }
              if (filter === 'availability' && filters[filter] === 'available') {
                return (
                  <View style={styles.appliedFilter} key="filter-availability">
                    <HomeFilterToast
                      name="Disponible"
                      icon="calendar-outline"
                      type="primary"
                      onClose={() => removeFilter(filter)}
                    />
                  </View>
                );
              }
              return null;
            }).flat()
          }
          <View style={styles.appliedFilter} />
        </ScrollView>
      </View>
      {
        Platform.OS === 'ios' ? (
          <Animated.View style={{ ...styles.filtersContainer, left: animation }}>
            <View style={styles.row}>
              <Text style={styles.titleText}>
                Filtros
              </Text>
              <TouchableOpacity
                onPress={handleFilterContainerClose}
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
                          <View style={[
                            {
                              display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '98%', marginBottom: -10,
                            }]}
                          >
                            <Text style={[{ fontSize: 12 }]}>
                              {`$${addPointsToNumber(minValue)}`}
                            </Text>
                            <Text style={[{ fontSize: 12 }]}>
                              {`$${addPointsToNumber(maxValue * 1 / 4)}`}
                            </Text>
                            <Text style={[{ fontSize: 12 }]}>
                              {`$${addPointsToNumber(maxValue * 3 / 4)}`}
                            </Text>
                            <Text style={[{ fontSize: 12 }]}>
                              {`$${addPointsToNumber(maxValue)}`}
                            </Text>
                          </View>
                          <SliderTest
                            minValue={minValue}
                            maxValue={maxValue}
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
                  <View>
                    <Text>
                      Servicios:
                    </Text>
                    <CheckBox
                      title="Ver Servicios"
                      checked={type.includes('SERVICE')}
                      onPress={() => {
                        if (type.includes('SERVICE')) {
                          setType(type.filter((t) => t !== 'SERVICE'));
                        } else {
                          setType([...type, 'SERVICE']);
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
                    <Collapsible collapsed={
                    !type.includes('SERVICE')
                  }
                    >
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
                            titleProps={{ style: { paddingLeft: 10, width: 90 } }}
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
                            titleProps={{ style: { paddingLeft: 10, width: 90 } }}
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
                            titleProps={{ style: { paddingLeft: 10, width: 90 } }}
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
                            titleProps={{ style: { paddingLeft: 10, width: 90 } }}
                            textStyle={{ fontWeight: 'normal' }}
                          />
                          <Image
                            source={businessIcon}
                            style={styles.categoryImage}
                          />
                        </View>
                      </View>
                    </Collapsible>
                  </View>
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
          <Animated.View style={{ ...styles.filtersContainer, left: animation }}>
            <View style={styles.row}>
              <Text style={styles.titleText}>
                Filtros
              </Text>
              <TouchableOpacity
                onPress={handleFilterContainerClose}
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
                        <View style={styles.capacityContainer}>
                          <Text>
                            {`Precio máximo: $${addPointsToNumber(sliderValue)}`}
                          </Text>
                          <View style={[
                            {
                              display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '98%', marginBottom: -10,
                            }]}
                          >
                            <Text>
                              {`$${addPointsToNumber(minValue)}`}
                            </Text>
                            <Text>
                              {`$${addPointsToNumber(maxValue)}`}
                            </Text>
                          </View>
                          <SliderTest
                            minValue={minValue}
                            maxValue={maxValue}
                            onSlidingComplete={handleSliderComplete}
                          />
                        </View>
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
                <View>
                  <Text>
                    Servicios:
                  </Text>
                  <CheckBox
                    title="Ver Servicios"
                    checked={type.includes('SERVICE')}
                    onPress={() => {
                      if (type.includes('SERVICE')) {
                        setType(type.filter((t) => t !== 'SERVICE'));
                      } else {
                        setType([...type, 'SERVICE']);
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
                  <Collapsible collapsed={
                !type.includes('SERVICE')
              }
                  >
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
                          titleProps={{ style: { paddingLeft: 10, width: 90 } }}
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
                          titleProps={{ style: { paddingLeft: 10, width: 90 } }}
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
                          titleProps={{ style: { paddingLeft: 10, width: 90 } }}
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
                          titleProps={{ style: { paddingLeft: 10, width: 90 } }}
                          textStyle={{ fontWeight: 'normal' }}
                        />
                        <Image
                          source={businessIcon}
                          style={styles.categoryImage}
                        />
                      </View>
                    </View>
                  </Collapsible>
                </View>
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

HomeFilters.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  filtersLoading: PropTypes.bool.isRequired,
  filters: PropTypes.shape({
    type: PropTypes.arrayOf(PropTypes.string),
    fourStarsOnly: PropTypes.bool,
    singleBeds: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    doubleBeds: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    availability: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};
