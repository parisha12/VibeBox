import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

import api from '../services/api';
import SongCard from '../components/music/SongCard';
import { MusicContext } from '../context/MusicContext';

function AlbumDetails() {
  const { id } = useParams();

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  const { playSong } = useContext(MusicContext);

  useEffect(() => {
    fetchAlbum();
  }, [id]);

  const fetchAlbum = async () => {
    try {
      const res = await api.get(`/albums/${id}`);
      setAlbum(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const playAll = () => {
    if (album?.songs?.length) {
      playSong(album.songs[0]);
    }
  };

  if (loading) {
    return <div className="text-center text-white py-20">Loading...</div>;
  }

  if (!album) {
    return <div className="text-center text-white py-20">Album not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-end mb-10">
        <img
          src={album.coverImage}
          alt={album.title}
          className="w-64 h-64 rounded-xl shadow-2xl object-cover"
        />

        <div>
          <p className="uppercase text-gray-400 tracking-widest">Album</p>

          <h1 className="text-5xl font-bold mt-2">{album.title}</h1>

          <div className="flex items-center gap-2 mt-4 text-gray-300">
            <Link
              to={`/artists/${album.artist._id}`}
              className="hover:text-green-400"
            >
              {album.artist.name}
            </Link>

            <span>•</span>

            <span>{album.releaseYear}</span>

            <span>•</span>

            <span>{album.songs.length} Songs</span>
          </div>

          <button
            onClick={playAll}
            className="mt-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold"
          >
            <FaPlay />
            Play All
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-5">Songs</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {album.songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
}

export default AlbumDetails;
