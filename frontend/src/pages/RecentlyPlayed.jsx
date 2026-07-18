import { useContext, useEffect, useState } from 'react';
import { MusicContext } from '../context/MusicContext';
import {
  getRecentlyPlayed,
  clearRecentlyPlayed,
} from '../services/recentlyPlayedService';

import { FaPlay, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

function RecentlyPlayed() {
  const { playSong } = useContext(MusicContext);

  const [songs, setSongs] = useState([]);

  const fetchRecentlyPlayed = async () => {
    try {
      const data = await getRecentlyPlayed();

      setSongs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecentlyPlayed();
  }, []);

  const clearHistory = async () => {
    try {
      await clearRecentlyPlayed();

      setSongs([]);

      toast.success('History cleared');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Recently Played 🎧</h1>

        {songs.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <FaTrash />
            Clear
          </button>
        )}
      </div>

      {songs.length === 0 ? (
        <p className="text-gray-400">No recently played songs</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {songs.map((item) => {
            const song = item.song;

            return (
              <div key={item._id} className="bg-gray-900 rounded-xl p-4">
                <img
                  src={song.coverImage}
                  alt={song.title}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <h2 className="mt-3 font-semibold">{song.title}</h2>

                <p className="text-gray-400">{song.artist}</p>

                <button
                  onClick={() => playSong(song)}
                  className="mt-3 bg-purple-600 px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <FaPlay />
                  Play
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecentlyPlayed;
