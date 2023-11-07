/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, SafeAreaView,
} from 'react-native';
import MapView from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import SuperCluster from 'supercluster';
import { useMapNearPosts } from '../../hooks/MapNearPosts';
import { styles } from './Home.styles';
import { mapStyle } from './mapStyle';
import { Header } from '../../components/header/Header';
import { LoadingScreen } from '../../components/loadingScreen/LoadingScreen';
import MapPostPreview from '../../components/mapPostPreview/MapPostPreview';
import MapMultiplePostsReview from '../../components/MultiplePostsPreview.jsx/MultiplePostsPreview';
import { MapMarker } from '../../components/mapMarker/MapMarker';
import ClusterMarker from '../../components/clusterMarker/ClusterMarker';
import HomeFilters from '../../components/homeFilters/HomeFilters';
import SameAddressMapMarker from '../../components/sameAddressMapMarker/sameAddressMapMarker';
import { Toast } from '../../components/Toast/Toast';
import { calculateRadius } from '../../helpers/MapUtils';
import { useLocation } from '../../context/LocationContext';
import MapSearch from '../../components/mapSearch/MapSearch';
import searchPostByContent from '../../helpers/searchPostByContent';

const defaultLocation = {
  latitude: -33.4489, // Coordenadas de Santiago, Chile
  longitude: -70.6693,
};

const getRadius = (region) => {
  if (!region.latitudeDelta || !region.longitudeDelta) {
    return 1000;
  }
  return calculateRadius(region);
};

const getZoom = (region) => {
  const angle = region.longitudeDelta;
  const zoom = Math.round(Math.log(360 / angle) / Math.LN2);
  return zoom;
};

const getClusterRadius = (zoom) => {
  const radius = 50 / (zoom * zoom);
  return radius * 50;
};

export function Home() {
  const [posts, setPosts] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedSameAddressPosts, setSelectedSameAddressPosts] = useState([]);
  const [postPreviewOpen, setPostPreviewOpen] = useState(false);
  const [scrollPostsPreviewOpen, setScrollPostsPreviewOpen] = useState(false);
  const [mapSearchFocus, setMapSearchFocus] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [filtersContainerActive, setFiltersContainerActive] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: ['PROPERTY'],
    categories: [],
    fourStarsOnly: false,
    availability: 'all',
    singleBeds: '-',
    doubleBeds: '-',
    maxPrice: '-1',
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [postMaxPrice, setPostMaxPrice] = useState(0);
  const [showPricesOnMap, setShowPricesOnMap] = useState(false);
  const [latitudeDeltaValue, setLatitudeDeltaValue] = useState(40);
  const [longitudeDeltaValue, setLongitudeDeltaValue] = useState(40);
  const [latitudeValue, setLatitudeValue] = useState(defaultLocation.latitude);
  const [longitudeValue, setLongitudeValue] = useState(defaultLocation.longitude);
  const {
    location, errorMsg, locationPermissionGranted, locationLoading,
  } = useLocation();

  const mapNearPosts = useMapNearPosts();
  const postPreviewRef = useRef();
  const mapRef = useRef(null);
  const mapSearchRef = useRef();
  const scrolleablePostPreviewRef = useRef();

  const setPostMaxPriceFromPosts = () => {
    if (posts.length === 0) {
      return;
    }
    const maxPrice = Math.max(...posts.map((post) => post.price));
    setPostMaxPrice(maxPrice);
  };

  const fetchNearPosts = async (region, newFilters) => {
    try {
      const radius = getRadius(region);
      const response = await mapNearPosts(
        region,
        radius,
        newFilters,
      );
      const postFilteredByContent = searchPostByContent(response, newFilters.contentSearch);
      setPosts(postFilteredByContent);
    } catch (error) {
      setIsError(true);
      setErrorMessage('Error interno del servidor');
    }
  };

  useEffect(() => {
    if (posts.length > 0) {
      setPostMaxPriceFromPosts();
    }
  }, [posts]);

  useEffect(() => {
    if (errorMsg) {
      setIsError(true);
      setErrorMessage('Error al obtener la ubicación');
    }
    if (location) {
      fetchNearPosts(location, filters);
    }
  }, [location, errorMsg]);

  const groupByAddress = (postList) => {
    const grouped = {};

    postList.forEach((post) => {
      if (grouped[post.address]) {
        grouped[post.address].push(post);
      } else {
        grouped[post.address] = [post];
      }
    });

    return Object.values(grouped);
  };

  useEffect(() => {
    if (!currentRegion) {
      return;
    }
    const zoom = getZoom(currentRegion);
    const radius = getClusterRadius(zoom);
    const shouldCluster = currentRegion.latitudeDelta > 0.008;

    if (shouldCluster) {
      const cluster = new SuperCluster({
        radius,
        maxZoom: 15,
      });

      const points = posts.map((post) => ({
        type: 'Feature',
        properties: {
          cluster: false,
          post,
        },
        geometry: {
          type: 'Point',
          coordinates: [post.longitude, post.latitude],
        },
      }));

      cluster.load(points);
      const { longitude, latitude } = currentRegion;
      const bounds = [
        longitude - 5,
        latitude - 5,
        longitude + 5,
        latitude + 5,
      ];

      const newClusters = cluster.getClusters(bounds, zoom);
      setClusters(newClusters);
    } else {
      const addressGroupedPosts = groupByAddress(posts);
      const newClusters = [];

      addressGroupedPosts.forEach((group) => {
        if (group.length > 1) { // Si hay más de un post con la misma dirección
          const representativePost = group[0];
          newClusters.push({
            type: 'Feature',
            properties: {
              cluster: false,
              sameAddress: true, // Propiedad adicional
              posts: group, // Todos los posts con la misma dirección
            },
            geometry: {
              type: 'Point',
              coordinates: [representativePost.longitude, representativePost.latitude],
            },
          });
        } else {
          const post = group[0];
          newClusters.push({
            properties: {
              cluster: false,
              point_count: 1,
              post,
            },
            geometry: {
              type: 'Point',
              coordinates: [post.longitude, post.latitude],
            },
          });
        }
      });

      setClusters(newClusters);
    }
  }, [posts, location]);

  const onRegionChange = (region) => {
    setCurrentRegion(region);
    fetchNearPosts(region, filters);
  };

  const onSameAddressMarkerPress = (postsList) => {
    setSelectedSameAddressPosts(postsList);
    setScrollPostsPreviewOpen(true);
    setPostPreviewOpen(false);
    const samplePost = postsList[0];
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: samplePost.latitude,
        longitude: samplePost.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
    if (mapSearchRef.current) {
      mapSearchRef.current.blur();
      setMapSearchFocus(false);
    }
    setFiltersContainerActive(false);
  };

  const onMarkerPress = (post) => {
    setSelectedPost(post);
    setPostPreviewOpen(true);
    setScrollPostsPreviewOpen(false);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: post.latitude,
        longitude: post.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
    if (mapSearchRef.current) {
      mapSearchRef.current.blur();
      setMapSearchFocus(false);
    }
    setFiltersContainerActive(false);
  };

  const onMapSearchFocus = () => {
    setMapSearchFocus(true);
    if (postPreviewOpen) {
      postPreviewRef.current.handleClose();
    }
    if (scrollPostsPreviewOpen) {
      scrolleablePostPreviewRef.current.handleClose();
    }
    setFiltersContainerActive(false);
  };

  const onMapSearchBlur = () => {
    setMapSearchFocus(false);
  };

  const goToSearchedLocation = (region) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: region.lat,
        longitude: region.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const onClusterPress = (cluster) => {
    const [longitude, latitude] = cluster.geometry.coordinates;

    if (mapRef.current && currentRegion) {
      const zoomInFactor = currentRegion.latitudeDelta * 0.85;
      const minDelta = 0.005;

      const latitudeDelta = Math.max(currentRegion.latitudeDelta - zoomInFactor, minDelta);
      const longitudeDelta = Math.max(currentRegion.longitudeDelta - zoomInFactor, minDelta);

      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      });
    }
    setFiltersContainerActive(false);
  };

  const onMapPress = () => {
    if (postPreviewOpen) {
      setPostPreviewOpen(false);
      postPreviewRef.current.handleClose();
    }
    if (scrollPostsPreviewOpen) {
      setScrollPostsPreviewOpen(false);
      scrolleablePostPreviewRef.current.handleClose();
    }
    if (mapSearchRef.current) {
      mapSearchRef.current.blur();
      setMapSearchFocus(false);
    }
    setFiltersContainerActive(false);
  };

  const onFiltersSubmit = async (newFilters) => {
    setFiltersLoading(true);
    await fetchNearPosts(currentRegion, newFilters);
    setFilters(newFilters);
    setFiltersLoading(false);
  };

  useEffect(() => {
    if (location) {
      setLatitudeDeltaValue(0.01);
      setLongitudeDeltaValue(0.01);
      setLatitudeValue(location.latitude);
      setLongitudeValue(location.longitude);
    }
  }, [location]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.animateToRegion({
      latitude: latitudeValue,
      longitude: longitudeValue,
      latitudeDelta: latitudeDeltaValue,
      longitudeDelta: longitudeDeltaValue,
    }, 1000);
  }, [latitudeValue || longitudeValue || latitudeDeltaValue || longitudeDeltaValue]);

  if (locationLoading) {
    return (
      <>
        <StatusBar translucent={false} style="dark" backgroundColor="white" />
        <Header />
        <LoadingScreen />
      </>
    );
  }

  if (!locationPermissionGranted) {
    return (
      <SafeAreaView>
        <StatusBar translucent={false} style="dark" backgroundColor="white" />
        <Header />
        <Text>
          No se puede acceder a la ubicación del dispositivo.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={false} style="dark" backgroundColor="white" />
      <Toast message={errorMessage} isActive={isError} setIsActive={setIsError} isError />
      <Header />
      <HomeFilters
        isActive={filtersContainerActive}
        setIsActive={setFiltersContainerActive}
        filtersLoading={filtersLoading}
        filters={filters}
        setFilters={setFilters}
        onSubmit={onFiltersSubmit}
        postMaxPrice={postMaxPrice}
        showPricesOnMap={showPricesOnMap}
        setShowPricesOnMap={setShowPricesOnMap}
      />
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider="google"
          style={styles.map}
          customMapStyle={mapStyle}
          region={{
            latitude: latitudeValue,
            longitude: longitudeValue,
            latitudeDelta: latitudeDeltaValue,
            longitudeDelta: longitudeDeltaValue,
          }}
          onPress={onMapPress}
          onRegionChangeComplete={(newRegion) => {
            onRegionChange(newRegion);
          }}
          showsUserLocation
        >
          {clusters.map((item, index) => {
            if (item.properties.cluster) {
              const [longitude, latitude] = item.geometry.coordinates;
              const count = item.properties.point_count;
              return (
                <ClusterMarker
                  key={`cluster-${index}`}
                  coordinate={{ longitude, latitude }}
                  count={count}
                  onMarkerPress={() => onClusterPress(item)}
                />
              );
            } if (item.properties.sameAddress) {
              const sameAddressPosts = item.properties.posts;
              return (
                <SameAddressMapMarker
                  posts={sameAddressPosts}
                  onSameAddressMarkerPress={onSameAddressMarkerPress}
                  key={index}
                  showPricesOnMap={showPricesOnMap}
                />
              );
            }
            const { post } = item.properties;
            return (
              <MapMarker
                post={post}
                onMarkerPress={onMarkerPress}
                key={index}
                showPricesOnMap={showPricesOnMap}
              />
            );
          })}
        </MapView>
        <MapPostPreview
          ref={postPreviewRef}
          isOpen={postPreviewOpen}
          setIsOpen={setPostPreviewOpen}
          post={selectedPost}
        />
        <MapMultiplePostsReview
          ref={scrolleablePostPreviewRef}
          isOpen={scrollPostsPreviewOpen}
          setIsOpen={setScrollPostsPreviewOpen}
          posts={selectedSameAddressPosts}
        />
        <MapSearch
          ref={mapSearchRef}
          goToSearchedLocation={goToSearchedLocation}
          focus={mapSearchFocus}
          onFocus={onMapSearchFocus}
          onBlur={onMapSearchBlur}
        />
      </View>
    </SafeAreaView>
  );
}
