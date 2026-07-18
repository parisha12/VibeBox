import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getArtists } from '../services/artistService';

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    getArtists()
      .then((data) => setArtists(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Artists 🎤</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <Link
            key={artist._id}
            to={`/artists/${artist._id}`}
            className="bg-white rounded-2xl shadow p-4 hover:scale-105 transition"
          >
            <img
              src={artist.image || 'https://via.placeholder.com/200'}
              className="w-full h-40 object-cover rounded-xl"
            />

            <h2 className="font-bold mt-3">{artist.name}</h2>

            <p className="text-gray-500">{artist.genre}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Artists;
