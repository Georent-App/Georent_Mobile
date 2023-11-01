import React, { useState, useEffect, useRef } from 'react';
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
import PropTypes from 'prop-types';
import Collapsible from 'react-native-collapsible';
import { Button, CheckBox, SearchBar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeFilterToast from '../homeFilterToast/HomeFilterToast';
import campingIcon from '../../../assets/Camping-icon.png';
import foodIcon from '../../../assets/Food-icon.png';
import businessIcon from '../../../assets/Business-icon.png';
import entertainmentIcon from '../../../assets/Entertainment-icon.png';
import tradesAndServicesIcon from '../../../assets/TradesAndServices-icon.png';
import { styles } from './HomeFilters.styles';
import PriceSlider from '../Slider/PirceSlider';

const deviceWidth = Dimensions.get('window').width;

export default function HomeFilters(
  {
    isActive, setIsActive, onSubmit, filtersLoading,
    filters, setFilters, postMaxPrice, showPricesOnMap,
    setShowPricesOnMap,
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
  const [maxPrice, setMaxPrice] = useState(-1);
  const menuScrollViewRef = useRef();
  const minValue = 0;
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderMaxValue, setSliderMaxValue] = useState(0);
  const [contentSearchView, setContentSearchView] = useState('');
  const [contentSearchFilter, setContentSearchFilter] = useState('');
  const [showContentSearchFilter, setShowContentSearchFilter] = useState(false);

  const sendFilters = (newFilters) => {
    onSubmit(newFilters);
  };

  const contentFilterHandler = (text) => {
    setContentSearchView(text);
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
    if (element === 'singleBeds') {
      newFilters[element] = '-';
      setSingleBedsActive(false);
      setSingleBeds('-');
    }
    if (element === 'doubleBeds') {
      newFilters[element] = '-';
      setDoubleBedsActive(false);
      setDoubleBeds('-');
    }
    if (filter === 'contentSearch') {
      setShowContentSearchFilter(false);
      contentFilterHandler('');
      newFilters[filter] = '';
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
    setContentSearchFilter(contentSearchView);
    const newFilters = {
      type,
      singleBeds,
      doubleBeds,
      availability,
      fourStarsOnly,
      categories,
      maxPrice,
      contentSearch: contentSearchFilter,
    };
    if (contentSearchView) {
      setShowContentSearchFilter(true);
    } else {
      setShowContentSearchFilter(false);
    }
    setFilters(newFilters);
    sendFilters(newFilters);
  };

  const handleFilterContainerClose = () => {
    setIsActive(false);
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
    if (formattedValue >= sliderMaxValue) {
      setMaxPrice(-1);
    } else {
      setMaxPrice(formattedValue);
    }
  };

  const removeContentSearchFilter = () => {
    removeFilter('contentSearch');
  };

  const headerNavbarView = (
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
            showContentSearchFilter && (
              <View style={styles.appliedFilter} key="filter-singlebeds">
                <HomeFilterToast
                  name={`${contentSearchFilter}`}
                  icon="search"
                  type="primary"
                  onClose={() => removeContentSearchFilter()}
                />
              </View>
            )
          }
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
                          onClose={() => removeFilter(filter, 'singleBeds')}
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
                          onClose={() => removeFilter(filter, 'doubleBeds')}
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
  );

  const scrollViewContent = (
    <View style={styles.column}>
      <ScrollView
        vertical
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <SearchBar
          placeholder="Buscar contenido"
          value={contentSearchView}
          onChangeText={contentFilterHandler}
          containerStyle={{
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          inputStyle={{
            backgroundColor: 'transparent',
            fontSize: 13,
            color: 'black',
          }}
          inputContainerStyle={{
            backgroundColor: 'rgba(128, 128, 128, 0.1)',
          }}
          round
        />
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
              <View style={styles.capacityContainer}>
                <CheckBox
                  title="Visualizar precios en mapa"
                  checked={showPricesOnMap}
                  onPress={() => {
                    setShowPricesOnMap(!showPricesOnMap);
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
  );

  const topSideBarView = (
    <View style={styles.row}>
      <Text style={styles.titleText}>
        Filtrar publicaciones
      </Text>
      <TouchableOpacity
        onPress={handleFilterContainerClose}
      >
        <Ionicons name="close" size={24} color="#696969" />
      </TouchableOpacity>
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <>
        {headerNavbarView}
        <Animated.View style={{ ...styles.filtersContainer, left: animation }}>
          {topSideBarView}
          <SafeAreaView style={{ flex: 1 }}>
            {scrollViewContent}
          </SafeAreaView>
        </Animated.View>
      </>
    );
  }
  return (
    <>
      {headerNavbarView}
      <Animated.View style={{ ...styles.filtersContainer, left: animation }}>
        {topSideBarView}
        {scrollViewContent}
      </Animated.View>
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
  postMaxPrice: PropTypes.number.isRequired,
  showPricesOnMap: PropTypes.bool.isRequired,
  setShowPricesOnMap: PropTypes.func.isRequired,
};
