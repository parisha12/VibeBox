import api from './api';

export const increasePlayCount = async (songId) => {
  const res = await api.put(`/songs/${songId}/play`);
  return res.data;
};