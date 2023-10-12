import axios from 'axios';
import { API_URL } from '../constants';

export function useNearPosts() {
  const nearPosts = async (coordinates, rad, page, filters) => {
    if (!coordinates) {
      return { posts: [], page: 0 };
    }
    const response = await axios.get(`${API_URL}/post/nearest`, {
      params: {
        lat: coordinates.latitude,
        long: coordinates.longitude,
        rad,
        page,
        ...filters,
      },
    });
    if (response.status >= 500) {
      throw new Error('Error interno del servidor');
    }
    if (response.status === 404) {
      return { posts: [], page: 0 };
    }
    if (response.status === 400) {
      throw new Error('Error en la petición');
    }
    return response.data;
  };
  return nearPosts;
}
