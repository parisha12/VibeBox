import api from './api';

export const addRecentlyPlayed = async (songId) => {
  const response = await api.post('/recently-played', {
    songId,
  });

  return response.data;
};

export const getRecentlyPlayed = async () => {
  const response = await api.get('/recently-played');

  return response.data;
};

export const clearRecentlyPlayed = async () => {
  const response = await api.delete('/recently-played');

  return response.data;
};
