import { useContext } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { MusicContext } from '../../context/MusicContext';

function SongCard({ song }) {
  const { playSong, likeSong, unlikeSong, isFavorite } =
    useContext(MusicContext);

  const favorite = isFavorite(song._id);

  const handleFavorite = () => {
    if (favorite) {
      unlikeSong(song._id);
    } else {
      likeSong(song);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
      <img
        src={song.coverImage}
        alt={song.title}
        className="w-full h-48 object-cover rounded-xl"
      />

      <div className="flex justify-between items-center mt-4">
        <div>
          <h2 className="font-bold text-lg">{song.title}</h2>

          <p className="text-gray-500">{song.artist}</p>
        </div>

        <button
          onClick={handleFavorite}
          className="text-2xl text-pink-500 hover:scale-110 transition"
        >
          {favorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <button
        onClick={() => playSong(song)}
        className="mt-4 w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition"
      >
        Play 🎵
      </button>
    </div>
  );
}

export default SongCard;
