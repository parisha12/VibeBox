import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import api from '../services/api';
import SongCard from '../components/music/SongCard';

function Songs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSongs = async () => {
    try {
      const { data } = await api.get('/songs');

      setSongs(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load songs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-pink-500 text-xl">
        Loading songs 🎵
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-10">All Songs 🎧</h1>

      {songs.length === 0 ? (
        <p className="text-gray-500">No songs available</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {songs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Songs;
