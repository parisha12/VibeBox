import api from './api';

export const getPlaylists = async () => {
  const { data } = await api.get('/playlists');
  return data;
};

export const createPlaylist = async (playlistData) => {
  const { data } = await api.post('/playlists', playlistData);
  return data;
};

export const deletePlaylist = async (id) => {
  const { data } = await api.delete(`/playlists/${id}`);
  return data;
};

export const getPlaylistById = async (id) => {
  const { data } = await api.get(`/playlists/${id}`);
  return data;
};

export const addSongToPlaylist = async (playlistId, songId) => {
  const { data } = await api.put(`/playlists/${playlistId}/add/${songId}`);

  return data;
};

export const removeSongFromPlaylist = async (playlistId, songId) => {
  const { data } = await api.put(`/playlists/${playlistId}/remove/${songId}`);

  return data;
};
