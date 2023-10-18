/* eslint-disable consistent-return */
/* eslint-disable global-require */
import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PostCard } from '../../components/postCard/PostCard';
import { Header } from '../../components/header/Header';
import { styles } from './PropertiesIndex.styles';
import { getDistanceFromLatLonInKm } from '../../helpers/MapUtils';

import { useLocation } from '../../context/LocationContext';
import { useNearPosts } from '../../hooks/NearPosts';
import IndexFilters from '../../components/indexFilters/IndexFilters';
import { Toast } from '../../components/Toast/Toast';

export function PropertiesIndex() {
  const [loading, setLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [currentRadius, setCurrentRadius] = useState(10000);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [posts, setPosts] = useState([]);

  const { location, updateLocation } = useLocation();
  const nearPosts = useNearPosts();

  const [filtersLoading, setFiltersLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: ['PROPERTY', 'CAMPING'],
    categories: [],
    radius: '10000',
    fourStarsOnly: false,
    order: 'nearest',
    availability: 'all',
    singleBeds: '-',
    doubleBeds: '-',
    maxPrice: '-1',
  });
  const [isService, setIsService] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [postMaxPrice, setPostMaxPrice] = useState(0);

  const scrollViewRef = useRef();

  const setPostMaxPriceFromPosts = () => {
    if (posts.length === 0) {
      return;
    }
    const maxPrice = Math.max(...posts.map((post) => post.price));
    setPostMaxPrice(maxPrice);
  };

  async function fetchPosts(loc, rad, page, filts) {
    try {
      const filtersForRequest = {
        type: filts.type.join(','),
        categories: filts.categories.join(','),
        order: filts.order,
        min_rating: filts.fourStarsOnly ? 4 : 0,
        availability: filts.availability,
        single_beds: filts.singleBeds === '-' ? -1 : filts.singleBeds,
        double_beds: filts.doubleBeds === '-' ? -1 : filts.doubleBeds,
        max_price: filts.maxPrice ? filts.maxPrice : 0,
      };
      if (filts.type.includes('SERVICE')) {
        filtersForRequest.order = 'nearest';
      }
      const response = await nearPosts(loc, rad, page, filtersForRequest);
      const postsWithDistance = response.posts.map((post) => ({
        ...post,
        distance: getDistanceFromLatLonInKm(
          location.latitude,
          location.longitude,
          post.latitude,
          post.longitude,
        ),
      }));
      setLoading(false);
      return postsWithDistance;
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
      setLoading(false);
      return [];
    }
  }

  useEffect(() => {
    if (posts.length > 0) {
      setPostMaxPriceFromPosts();
    }
  }, [posts]);

  const loadMorePosts = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    const morePosts = await fetchPosts(location, currentRadius, nextPage, filters);
    if (morePosts.length > 0) {
      setPosts((prevPosts) => [...prevPosts, ...morePosts]);
      setCurrentPage(nextPage);
    }
    setIsLoadingMore(false);
  };

  const refreshLocation = async () => {
    try {
      setRefreshLoading(true);
      setCurrentPage(1);
      const newLocation = await updateLocation();
      const newPosts = await fetchPosts(newLocation, currentRadius, 1, filters);
      setPosts(newPosts);
      setRefreshLoading(false);
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    } catch (error) {
      setRefreshLoading(false);
      setIsError(true);
      setErrorMessage('Error al actualizar la ubicación');
    }
  };

  const handleFiltersSubmit = async (newFilters) => {
    try {
      setFiltersLoading(true);
      setFilters(newFilters);
      setCurrentRadius(newFilters.radius);
      setCurrentPage(1);
      const newPosts = await fetchPosts(location, newFilters.radius, 1, newFilters);
      setPosts(newPosts);
      setFiltersLoading(false);
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    } catch (error) {
      setFiltersLoading(false);
      setIsError(true);
      setErrorMessage('Error interno del servidor');
    }
  };

  useEffect(() => {
    if (!location) {
      return;
    }

    const initPosts = async () => {
      setLoading(true);
      const newPosts = await fetchPosts(location, currentRadius, 1, filters);
      setPosts(newPosts);
      setLoading(false);
    };

    initPosts();
  }, []);

  const handleSectionChange = async (service) => {
    setIsService(service);
    setLoading(true);
    setPosts([]);
    setCurrentPage(1);
    let newFilters = filters;
    if (service) {
      setFilters({
        ...filters,
        type: ['SERVICE'],
        categories: ['TRADES_AND_SERVICES', 'FOOD', 'ENTERTAINMENT', 'BUSINESS'],
      });
      newFilters = {
        ...filters,
        type: ['SERVICE'],
        categories: ['TRADES_AND_SERVICES', 'FOOD', 'ENTERTAINMENT', 'BUSINESS'],
      };
    }
    if (!service) {
      setFilters({ ...filters, type: ['PROPERTY', 'CAMPING'] });
      newFilters = { ...filters, type: ['PROPERTY', 'CAMPING'] };
    }
    const newPosts = await fetchPosts(location, currentRadius, 1, newFilters);
    setPosts(newPosts);
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Toast message={errorMessage} isActive={isError} setIsActive={setIsError} isError />
      <StatusBar translucent={false} style="dark" backgroundColor="white" />
      <View style={{ flex: 1 }}>
        <Header />
        <IndexFilters
          isActive={filtersOpen}
          setIsActive={setFiltersOpen}
          filtersLoading={filtersLoading}
          onSubmit={handleFiltersSubmit}
          isService={isService}
          postMaxPrice={postMaxPrice}
        />
        <ScrollView
          ref={scrollViewRef}
          onMomentumScrollEnd={async ({ nativeEvent }) => {
            if (isLoadingMore || loading) {
              return;
            }
            if (
              nativeEvent.contentOffset.y
                + nativeEvent.layoutMeasurement.height
                >= nativeEvent.contentSize.height - 100
            ) {
              setIsLoadingMore(true);
              await loadMorePosts();
            }
          }}
          scrollEventThrottle={16}
          onTouchEnd={() => setFiltersOpen(false)}
        >

          <View style={styles.header}>
            <Text style={styles.title}> Cerca de ti </Text>
            <View style={styles.row}>
              <View style={styles.buttons}>
                <Pressable
                  style={[styles.button, !isService && styles.activeButton]}
                  onPress={() => {
                    if (loading) return;
                    if (isService) {
                      handleSectionChange(false);
                    }
                  }}
                >
                  <Text style={[styles.buttonText, !isService && styles.activeButtonText]}>
                    Arriendos
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, isService && styles.activeButton]}
                  onPress={() => {
                    if (loading) return;
                    if (!isService) {
                      handleSectionChange(true);
                    }
                  }}
                >
                  <Text style={[styles.buttonText, isService && styles.activeButtonText]}>
                    Servicios
                  </Text>
                </Pressable>
              </View>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={() => setFiltersOpen(true)}
                disabled={filtersOpen || loading || refreshLoading}
              >
                <Ionicons name="options-outline" size={25} color="#696969" />
              </TouchableOpacity>
            </View>
            <View style={[styles.row, styles.flexEnd]}>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={() => refreshLocation()}
                disabled={refreshLoading || filtersLoading || loading}
              >
                {refreshLoading ? (
                  <ActivityIndicator size="small" color="#696969" />
                ) : (
                  <Ionicons name="refresh-outline" size={25} color="#696969" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {loading && (
            <View style={styles.loadingProperties}>
              <ActivityIndicator size="large" color="#2573DA" />
            </View>
          )}
          <View style={styles.propertiesContainer}>
            {!loading && posts.length === 0 ? (
              <View style={styles.noPostsContainer}>
                <Text style={styles.noPostsText}>No hay publicaciones cercanas a ti.</Text>
                <Text style={styles.noPostsSubtitle}>
                  Intenta modificando los filtros de búsqueda.
                </Text>
              </View>
            ) : (
              posts.map((post) => <PostCard key={post.id} id={post.id} post={post} />)
            )}
            {isLoadingMore && <ActivityIndicator size="small" color="#0000ff" />}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
