import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaPlus } from 'react-icons/fa';

import { MusicContext } from '../../context/MusicContext';
import AddToPlaylistModal from './AddToPlaylistModal';

function SongCard({ song }) {
  const { playSong, likeSong, unlikeSong, isFavorite } =
    useContext(MusicContext);

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const favorite = isFavorite(song._id);

  const handleFavorite = () => {
    if (favorite) {
      unlikeSong(song._id);
    } else {
      likeSong(song);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
        <img
          src={song.coverImage || 'https://via.placeholder.com/300'}
          alt={song.title}
          className="w-full h-48 object-cover rounded-xl"
        />

        <div className="flex justify-between items-center mt-4">
          <div>
            <h2 className="font-bold text-lg">{song.title}</h2>

            <Link
              to={`/artists/${song.artist?._id}`}
              className="
  text-gray-500
  hover:text-pink-500
  "
            >
              {song.artist?.name || 'Unknown Artist'}
            </Link>

            <Link
              to={`/albums/${song.album?._id}`}
              className="
  block
  text-sm
  text-gray-400
  hover:text-pink-500
  "
            >
              {song.album?.title || 'Single'}
            </Link>
          </div>

          <button
            onClick={handleFavorite}
            className="
            text-2xl
            text-pink-500
            hover:scale-110
            transition
            "
          >
            {favorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        <button
          onClick={() => playSong(song)}
          className="
          mt-4
          w-full
          bg-pink-500
          text-white
          py-2
          rounded-full
          hover:bg-pink-600
          transition
          "
        >
          Play 🎵
        </button>

        <button
          onClick={() => setShowPlaylistModal(true)}
          className="
          mt-3
          w-full
          border
          border-pink-500
          text-pink-500
          py-2
          rounded-full
          hover:bg-pink-50
          transition
          flex
          items-center
          justify-center
          gap-2
          "
        >
          <FaPlus />
          Add to Playlist
        </button>
      </div>

      {showPlaylistModal && (
        <AddToPlaylistModal
          song={song}
          close={() => setShowPlaylistModal(false)}
        />
      )}
    </>
  );
}

export default SongCard;
