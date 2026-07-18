import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

import api from '../services/api';
import SongCard from '../components/music/SongCard';
import { MusicContext } from '../context/MusicContext';

function ArtistDetails() {
  const { id } = useParams();

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  const { playSong } = useContext(MusicContext);

  useEffect(() => {
    fetchArtist();
  }, [id]);

  const fetchArtist = async () => {
    try {
      const res = await api.get(`/artists/${id}`);

      console.log('Artist Data:', res.data);

      setArtist(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const playAll = () => {
    if (artist?.songs?.length) {
      playSong(artist.songs[0]);
    }
  };

  if (loading)
    return <div className="text-center text-white py-20">Loading...</div>;

  if (!artist)
    return (
      <div className="text-center text-white py-20">Artist not found.</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">
      <div className="flex items-center gap-8 mb-10">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-52 h-52 rounded-full object-cover shadow-lg"
        />

        <div>
          <p className="uppercase text-gray-400 tracking-widest">Artist</p>

          <h1 className="text-5xl font-bold mt-2">{artist.name}</h1>

          <p className="text-gray-400 mt-3">{artist.bio}</p>

          <button
            onClick={playAll}
            className="mt-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold"
          >
            <FaPlay />
            Play All
          </button>
        </div>
      </div>

      {artist.albums?.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-5">Albums</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
            {artist.albums.map((album) => (
              <Link key={album._id} to={`/albums/${album._id}`}>
                <div className="bg-[#181818] rounded-xl p-4 hover:bg-[#282828] transition">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="rounded-lg mb-3"
                  />

                  <h3 className="font-semibold">{album.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <h2 className="text-2xl font-bold mb-5">Songs</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {artist.songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
}

export default ArtistDetails;
