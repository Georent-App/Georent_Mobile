import axios from 'axios';
import { API_URL } from '../constants';

export function useMapNearPosts() {
  const mapNearPosts = async (coordinates, rad, filters) => {
    if (!coordinates) {
      return [];
    }
    const params = {
      lat: coordinates.latitude,
      long: coordinates.longitude,
      rad,
      type: filters.type.join(','),
      min_rating: filters.fourStarsOnly ? 4 : 0,
      categories: filters.categories.join(','),
      availability: filters.availability,
      single_beds: filters.singleBeds === '-' ? -1 : filters.singleBeds,
      double_beds: filters.doubleBeds === '-' ? -1 : filters.doubleBeds,
      max_price: filters.maxPrice || filters.maxPrice === 0 ? filters.maxPrice : -1,
    };
    const response = await axios.get(`${API_URL}/post/map-nearest`, {
      params,
    });
    if (response.status >= 500) {
      throw new Error('Error interno del servidor');
    }
    if (response.status === 404) {
      throw new Error('No se encontraron resultados');
    }
    if (response.status === 400) {
      throw new Error('Error en la petición');
    }
    return response.data;
  };
  return mapNearPosts;
}
