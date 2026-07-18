import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaPlay, FaTrash } from 'react-icons/fa';

import {
  getPlaylistById,
  removeSongFromPlaylist,
} from '../services/playlistService';
import { MusicContext } from '../context/MusicContext';
import SongCard from '../components/music/SongCard';

function PlaylistDetails() {
  const { id } = useParams();

  const [playlist, setPlaylist] = useState(null);

  const { playSong } = useContext(MusicContext);

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  const fetchPlaylist = async () => {
    try {
      const data = await getPlaylistById(id);
      setPlaylist(data);
    } catch (error) {
      toast.error('Failed to load playlist');
    }
  };

  const handleRemove = async (songId) => {
    try {
      await removeSongFromPlaylist(id, songId);

      setPlaylist((prev) => ({
        ...prev,
        songs: prev.songs.filter((song) => song._id !== songId),
      }));

      toast.success('Song removed');
    } catch (error) {
      toast.error('Failed to remove song');
    }
  };

  const playAll = () => {
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0]);
    }
  };

  if (!playlist) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Playlist Header */}
      <div className="rounded-2xl p-8 mb-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <h1 className="text-4xl font-bold">{playlist.name}</h1>

        <p className="mt-3 opacity-90">{playlist.songs?.length || 0} songs</p>

        <button
          onClick={playAll}
          className="mt-6 bg-white text-pink-600 px-6 py-3 rounded-full flex items-center gap-2 font-semibold"
        >
          <FaPlay />
          Play All
        </button>
      </div>

      {playlist.songs?.length === 0 ? (
        <p>No songs in this playlist.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {playlist.songs.map((song) => (
            <div key={song._id} className="relative">
              <SongCard song={song} />

              <button
                onClick={() => handleRemove(song._id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-500 shadow hover:bg-red-50"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlaylistDetails;
