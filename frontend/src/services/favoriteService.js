import api from './api';

// Get all favorite songs
export const getFavorites = async () => {
  const response = await api.get('/favorites');
  return response.data;
};

// Add song to favorites
export const addFavorite = async (songId) => {
  const response = await api.post(`/favorites/${songId}`);
  return response.data;
};

// Remove song from favorites
export const removeFavorite = async (songId) => {
  const response = await api.delete(`/favorites/${songId}`);
  return response.data;
};
