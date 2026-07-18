import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import {
  getPlaylists,
  addSongToPlaylist,
} from '../../services/playlistService';

function AddToPlaylistModal({ song, close }) {
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    try {
      const data = await getPlaylists();
      setPlaylists(data);
    } catch (error) {
      toast.error('Failed to load playlists');
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleAdd = async (playlistId) => {
    try {
      await addSongToPlaylist(playlistId, song._id);

      toast.success('Added to playlist 🎵');
      close();
    } catch (error) {
      toast.error('Failed to add song');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add to Playlist 🎵</h2>

        {playlists.length === 0 ? (
          <p className="text-gray-500">No playlists available</p>
        ) : (
          <div className="space-y-3">
            {playlists.map((playlist) => (
              <button
                key={playlist._id}
                onClick={() => handleAdd(playlist._id)}
                className="w-full text-left p-3 rounded-lg bg-pink-100 hover:bg-pink-200"
              >
                {playlist.name}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={close}
          className="mt-5 w-full bg-gray-200 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddToPlaylistModal;
