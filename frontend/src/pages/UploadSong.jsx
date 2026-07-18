import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import api from '../services/api';
import { uploadSong } from '../services/songService';

function UploadSong() {
  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    mood: '',
  });

  const [audio, setAudio] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistRes = await api.get('/artists');
        const albumRes = await api.get('/albums');

        setArtists(artistRes.data);
        setAlbums(albumRes.data);
      } catch (error) {
        console.log(error);
        toast.error('Failed to load data');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('UPLOAD BUTTON CLICKED');

    toast.success('Button clicked');

    if (!audio) {
      toast.error('Select audio file');
      return;
    }

    if (!coverImage) {
      toast.error('Select cover image');
      return;
    }

    if (!formData.title) {
      toast.error('Enter title');
      return;
    }

    if (!formData.artist) {
      toast.error('Select artist');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append('title', formData.title);
      data.append('artist', formData.artist);
      data.append('album', formData.album);
      data.append('mood', formData.mood);

      data.append('audio', audio);
      data.append('coverImage', coverImage);

      console.log('Sending upload request');

      const res = await uploadSong(data);

      console.log(res);

      toast.success('Song uploaded successfully 🎵');

      navigate('/');
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Upload New Song 🎧</h1>

      <form
        onSubmit={handleSubmit}
        className="
        max-w-xl
        bg-zinc-900
        p-6
        rounded-xl
        space-y-5
        "
      >
        <input
          type="text"
          name="title"
          placeholder="Song title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <select
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        >
          <option value="">Select Artist</option>

          {artists.map((artist) => (
            <option key={artist._id} value={artist._id}>
              {artist.name}
            </option>
          ))}
        </select>

        <select
          name="album"
          value={formData.album}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        >
          <option value="">Select Album</option>

          {albums.map((album) => (
            <option key={album._id} value={album._id}>
              {album.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="mood"
          placeholder="Mood"
          value={formData.mood}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <div>
          <label>Audio File</label>

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
            className="block mt-2"
          />

          {audio && <p className="text-green-400">{audio.name}</p>}
        </div>

        <div>
          <label>Cover Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="block mt-2"
          />

          {coverImage && <p className="text-green-400">{coverImage.name}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          bg-green-500
          text-black
          font-bold
          py-3
          rounded-lg
          "
        >
          {loading ? 'Uploading...' : 'Upload Song'}
        </button>
      </form>
    </div>
  );
}

export default UploadSong;
