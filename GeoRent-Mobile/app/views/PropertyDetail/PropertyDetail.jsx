import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  useWindowDimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BackButton } from '../../components/backButton/BackButton';
import { styles } from './PropertyDetail.styles';
import {
  hacerLlamada, abrirWhatsApp, abrirEmail, abrirMapa, abrirPaginaWeb,
} from '../../helpers/RedirectContact';
import { API_URL } from '../../constants';
import PlaceholderImg from '../../../assets/placeholder-image.png';
import { CalendarComponent } from '../../components/Calendar/Calendar';
import { ReportModal } from '../../components/ReportModal/ReportModal';
import { RateModal } from '../../components/RateModal/RateModal';
import { LoadingScreen } from '../../components/loadingScreen/LoadingScreen';
import { addPointsToNumber } from '../../helpers/numberFormatter';
import { useLocation } from '../../context/LocationContext';

export function PropertyDetail() {
  const route = useRoute();
  const { post } = route.params;
  const scrollViewWidth = useWindowDimensions().width;
  const scrollViewHeight = useWindowDimensions().height - 60;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionLimit = 100;
  const [loading, setLoading] = useState(true);
  const [postInfo, setPostInfo] = useState({});

  const { location } = useLocation();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const infoPost = await axios.get(`${API_URL}/post/${post.id}`);
        const dataPost = await infoPost.data;
        setPostInfo(dataPost);
        const response = await axios.get(`${API_URL}/reservations/${post.id}`);
        const data = await response.data;
        setReservations(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchReservations();
  }, [post]);

  const containerStyle = [
    styles.container,
    {
      backgroundColor: '#000',
    },
  ];

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / scrollViewWidth);
    setCurrentIndex(index);
  };

  const checkIfAreImages = () => {
    if (post.images === null) {
      return false;
    } if (post.images.length === 0) {
      return false;
    }
    return true;
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} style="dark" backgroundColor="white" />
        <BackButton backRoute="PropertiesIndex" />
        <LoadingScreen />
      </SafeAreaView>
    );
  }

  const getPostAddressPlusDpto = (publicacion) => {
    if (publicacion.address && publicacion.dpto) {
      return `${publicacion.address}, ${publicacion.dpto}`;
    } if (publicacion.address) {
      return publicacion.address;
    }
    return '';
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={false} style="dark" backgroundColor="white" />
      <View style={(containerStyle, { height: scrollViewHeight })}>
        <BackButton backRoute="PropertiesIndex" />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            {checkIfAreImages() ? (
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                {postInfo.images.map((image, index) => (
                  <View key={image.id} style={{ width: scrollViewWidth, height: '100%' }}>
                    <Image
                      style={[styles.image, index === currentIndex && styles.currentImage]}
                      source={{ uri: `${API_URL}${image.url}` }}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View style={[styles.image, { backgroundColor: '#f2f2f2' }]}>
                <Image
                  style={{ height: '100%', width: '100%' }}
                  source={PlaceholderImg}
                  resizeMode="cover"
                />
              </View>
            )}
            {postInfo.images.length > 1 && (
              <View style={styles.indicatorContainer}>
                {postInfo.images.map((image, i) => (
                  <View
                    key={image.id}
                    style={[styles.indicator, i === currentIndex && styles.activeIndicator]}
                  />
                ))}
              </View>
            )}
          </View>
          <View style={styles.card}>
            <Card style={styles.card}>
              {postInfo.rating_average ? (
                <View style={styles.allRatingContainer}>
                  <View style={styles.ratingContainer}>
                    <View style={styles.ratingIconContainer}>
                      <Icon name="star" size={20} color="gold" />
                    </View>
                    <Text style={styles.ratingValue}>{postInfo.rating_average.toFixed(1)}</Text>
                    <Text style={styles.ratingText}>estrellas de 5</Text>
                  </View>
                  <Text style={styles.ratingDescription}>
                    Esta publicacion tiene
                    {' '}
                    <Text>{postInfo.rating_count}</Text>
                    {' '}
                    evaluaciones
                  </Text>
                </View>
              ) : (
                <View style={styles.allRatingContainer}>
                  <Text style={styles.ratingDescription}>
                    Esta publicacion no tiene evaluaciones
                  </Text>
                </View>
              )}
              <Card.Divider />
              <View style={styles.propertyInfoContainer}>
                <Text style={styles.cardTitle}>{postInfo.name}</Text>
                <Text style={styles.propertyInfoValue}>
                  {showFullDescription
                    ? postInfo.description
                    : `${postInfo.description.substring(0, descriptionLimit)}...`}
                </Text>
                {postInfo.description.length > descriptionLimit && (
                  <TouchableWithoutFeedback
                    onPress={() => setShowFullDescription(!showFullDescription)}
                  >
                    <Text style={styles.showMoreText}>
                      {showFullDescription ? 'Ver menos' : 'Ver más'}
                    </Text>
                  </TouchableWithoutFeedback>
                )}
              </View>
              <Card.Divider />
              {postInfo.type === 'SERVICE' ? null : (
                <View>
                  <Text style={styles.cardTitle}>Información de la propiedad</Text>
                  <View style={styles.propertyInfoContainer}>
                    <View style={styles.propertyInfoSection}>
                      <Text style={styles.propertyInfoTitle}>Precio:</Text>
                      <Text style={styles.propertyInfoValue}>
                        {addPointsToNumber(postInfo.price)}
                        {' '}
                        CLP / Noche
                      </Text>
                    </View>
                    {postInfo.type === 'CAMPING' ? null
                      : (
                        <View>
                          <View style={styles.propertyInfoSection}>
                            <Text style={styles.propertyInfoTitle}>Dormitorios:</Text>
                            <Text style={styles.propertyInfoValue}>{postInfo.rooms}</Text>
                          </View>
                          <View style={styles.propertyInfoSection}>
                            <Text style={styles.propertyInfoTitle}>Camas Simples:</Text>
                            <Text style={styles.propertyInfoValue}>{postInfo.simple_beds}</Text>
                          </View>
                          <View style={styles.propertyInfoSection}>
                            <Text style={styles.propertyInfoTitle}>Camas Dobles:</Text>
                            <Text style={styles.propertyInfoValue}>{postInfo.double_beds}</Text>
                          </View>
                        </View>
                      )}
                  </View>
                </View>
              )}
              <Card.Divider />
              {postInfo.type === 'SERVICE' ? null
                : (
                  <View>
                    <CalendarComponent reservations={reservations} />
                    <Card.Divider />
                  </View>
                )}
              <Text style={styles.cardTitle}>Información de Contacto</Text>
              <View style={styles.propertyInfoContainer}>
                <View style={styles.footerItem}>
                  <Icon name="user" size={20} color="#696969" />
                  <Text style={styles.footerText}>{postInfo.contact_name}</Text>
                </View>
                <View style={styles.footerItem}>
                  <Icon name="map-marker" size={20} color="#696969" />
                  <TouchableWithoutFeedback onPress={
                    () => abrirMapa(postInfo.latitude, postInfo.longitude, location)
                  }
                  >
                    <Text style={styles.footerText}>
                      {getPostAddressPlusDpto(postInfo)}
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.footerItem}>
                  <Icon name="phone" size={20} color="#696969" />
                  <TouchableWithoutFeedback onPress={() => hacerLlamada(postInfo.phone_number)}>
                    <Text style={styles.footerText}>{postInfo.phone_number}</Text>
                  </TouchableWithoutFeedback>
                </View>
                <View
                  style={styles.footerItem}
                  onTouchEnd={() => abrirWhatsApp(postInfo.phone_number)}
                >
                  <Icon name="whatsapp" size={20} color="#696969" />
                  <TouchableWithoutFeedback>
                    <Text style={styles.footerText}>{postInfo.phone_number}</Text>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.footerItem} onTouchEnd={() => abrirEmail(postInfo.email)}>
                  <Icon name="envelope" size={20} color="#696969" />
                  <TouchableWithoutFeedback>
                    <Text style={styles.footerText}>{postInfo.email}</Text>
                  </TouchableWithoutFeedback>
                </View>
                { postInfo.web_site
                  && (
                  <View
                    style={styles.footerItem}
                    onTouchEnd={
                    () => abrirPaginaWeb(postInfo.web_site)
                  }
                  >
                    <Icon name="link" size={20} color="#696969" />
                    <TouchableWithoutFeedback>
                      <Text style={styles.footerText}>{postInfo.web_site}</Text>
                    </TouchableWithoutFeedback>
                  </View>
                  )}
                { postInfo.social_network_1
                  && (
                  <View
                    style={styles.footerItem}
                    onTouchEnd={
                    () => abrirPaginaWeb(postInfo.social_network_1)
                  }
                  >
                    <Icon name="facebook" size={20} color="#696969" />
                    <TouchableWithoutFeedback>
                      <Text style={styles.footerText}>{postInfo.social_network_1}</Text>
                    </TouchableWithoutFeedback>
                  </View>
                  )}
                { postInfo.social_network_2
                  && (
                  <View
                    style={styles.footerItem}
                    onTouchEnd={
                    () => abrirPaginaWeb(postInfo.social_network_2)
                  }
                  >
                    <Icon name="instagram" size={20} color="#696969" />
                    <TouchableWithoutFeedback>
                      <Text style={styles.footerText}>{postInfo.social_network_2}</Text>
                    </TouchableWithoutFeedback>
                  </View>
                  )}
              </View>
              <Card.Divider />
              <RateModal postId={postInfo.id} />
              <Card.Divider />
              <ReportModal postId={postInfo.id} />
              <Card.Divider />
            </Card>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
