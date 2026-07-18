import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const res = await api.get("/albums");
      setAlbums(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white py-20">
        Loading albums...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">
      <h1 className="text-4xl font-bold mb-8">Albums</h1>

      {albums.length === 0 ? (
        <p className="text-gray-400">No albums found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {albums.map((album) => (
            <Link
              key={album._id}
              to={`/albums/${album._id}`}
              className="bg-[#181818] rounded-xl p-4 hover:bg-[#282828] transition"
            >
              <img
                src={album.coverImage}
                alt={album.title}
                className="w-full aspect-square object-cover rounded-lg mb-3"
              />

              <h2 className="font-semibold truncate">
                {album.title}
              </h2>

              <p className="text-sm text-gray-400 truncate">
                {album.artist?.name}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {album.releaseYear}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Albums;