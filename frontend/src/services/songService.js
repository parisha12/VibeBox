import api from './api';


// Get all songs
export const getSongs = async () => {
  const res = await api.get('/songs');
  return res.data;
};


// Get trending songs
export const getTrendingSongs = async () => {
  const res = await api.get('/songs/trending');
  return res.data;
};


// Get new releases
export const getNewReleases = async () => {
  const res = await api.get('/songs/new-releases');
  return res.data;
};


// Get popular songs
export const getPopularSongs = async () => {
  const res = await api.get('/songs/popular');
  return res.data;
};