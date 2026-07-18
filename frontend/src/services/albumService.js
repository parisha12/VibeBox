import api from './api';

export const getAlbums = async () => {
  const response = await api.get('/albums');
  return response.data;
};

export const getAlbumById = async (id) => {
  const response = await api.get(`/albums/${id}`);
  return response.data;
};

export const getAlbumSongs = async (id) => {
  const response = await api.get(`/albums/${id}/songs`);
  return response.data;
};
