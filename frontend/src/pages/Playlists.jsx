import { useEffect, useState } from 'react';
import { FaPlus, FaMusic, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
} from '../services/playlistService';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState('');

  const fetchPlaylists = async () => {
    try {
      const data = await getPlaylists();

      console.log('PLAYLIST DATA:', data);

      setPlaylists(data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load playlists');
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error('Enter playlist name');
      return;
    }

    try {
      await createPlaylist({
        name,
      });

      setName('');
      await fetchPlaylists();

      toast.success('Playlist created 🎵');
    } catch (error) {
      console.log(error);
      toast.error("Couldn't create playlist");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Delete this playlist?');

    if (!confirmDelete) return;

    try {
      await deletePlaylist(id);

      await fetchPlaylists();

      toast.success('Playlist deleted 🗑️');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Couldn't delete playlist");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Playlists 🎵</h1>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Playlist name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-lg border px-4 py-2"
        />

        <button
          onClick={handleCreate}
          className="bg-pink-500 hover:bg-pink-600 text-white px-5 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Create
        </button>
      </div>

      {playlists.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <FaMusic className="mx-auto text-6xl mb-4" />

          <p>No playlists yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div key={playlist._id} className="bg-white rounded-xl shadow p-5">
              <Link to={`/playlists/${playlist._id}`}>
                <h2 className="text-xl font-semibold">{playlist.name}</h2>

                <p className="text-gray-500 mt-2">
                  {playlist.songs?.length || 0} songs
                </p>
              </Link>

              <button
                onClick={() => handleDelete(playlist._id)}
                className="mt-5 text-red-500 hover:text-red-600"
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

export default Playlists;
