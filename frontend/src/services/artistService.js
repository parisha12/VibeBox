import api from './api';

export const getArtists = async () => {
  const response = await api.get('/artists');
  return response.data;
};

export const getArtistById = async (id) => {
  const response = await api.get(`/artists/${id}`);
  return response.data;
};

export const getArtistSongs = async (id) => {
  const response = await api.get(`/artists/${id}/songs`);
  return response.data;
};

export const getArtistAlbums = async (id) => {
  const response = await api.get(`/artists/${id}/albums`);
  return response.data;
};
