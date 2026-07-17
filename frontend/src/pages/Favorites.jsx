import { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import SongCard from '../components/music/SongCard';

function Favorites() {
  const { favorites } = useContext(MusicContext);

  const favoriteSongs = favorites?.map((item) => item.song).filter(Boolean);

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">
        My Favorite Songs ❤️
      </h1>

      {favoriteSongs.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-xl">No favorite songs yet 🎧</p>

          <p className="mt-2">Add songs you love to see them here ❤️</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteSongs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
