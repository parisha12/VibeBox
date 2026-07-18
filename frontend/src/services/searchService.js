import api from './api';

export const searchSongs = async (query) => {
  const res = await api.get(`/songs/search?q=${query}`);
  return res.data;
};