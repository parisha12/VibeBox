import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMusic, FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';

import {
  getTrendingSongs,
  getNewReleases,
  getPopularSongs,
} from '../services/songService';
import { getRecentlyPlayed } from '../services/recentlyPlayedService';
import { getFavorites } from '../services/favoriteService';

import SongCard from '../components/music/SongCard';
import CategoryCard from '../components/music/CategoryCard';
import PlaylistCard from '../components/music/PlaylistCard';

const categories = [
  { id: 1, name: 'Pop', icon: '🎤' },
  { id: 2, name: 'Lo-Fi', icon: '🌙' },
  { id: 3, name: 'Rock', icon: '🎸' },
  { id: 4, name: 'Jazz', icon: '🎷' },
  { id: 5, name: 'Hip-Hop', icon: '🎧' },
  { id: 6, name: 'Classical', icon: '🎻' },
];

const playlists = [
  {
    id: 1,
    name: 'Late Night Vibes',
    description: 'Soft songs for peaceful nights',
    image: 'https://picsum.photos/400/400?random=10',
  },
  {
    id: 2,
    name: 'Study Session',
    description: 'Lo-Fi music for focus',
    image: 'https://picsum.photos/400/400?random=11',
  },
  {
    id: 3,
    name: 'Happy Moments',
    description: 'Songs that brighten your day',
    image: 'https://picsum.photos/400/400?random=12',
  },
];

function Home() {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [popularSongs, setPopularSongs] = useState([]);
  const [recentSongs, setRecentSongs] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const [loadingSongs, setLoadingSongs] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const trendingResponse = await getTrendingSongs();

        const newReleaseResponse = await getNewReleases();

        const popularResponse = await getPopularSongs();

        setTrendingSongs(trendingResponse.slice(0, 4));

        setNewReleases(newReleaseResponse.slice(0, 4));

        setPopularSongs(popularResponse.slice(0, 4));

        const recentResponse = await getRecentlyPlayed();

        setRecentSongs(recentResponse.slice(0, 4));

        const favoritesResponse = await getFavorites();

        setFavoriteSongs(favoritesResponse.slice(0, 4));
      } catch (error) {
        toast.error('Failed to load music');
      } finally {
        setLoadingSongs(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="space-y-24">
      {/* Hero Section */}

      <section
        className="
        relative 
        overflow-hidden 
        rounded-3xl
        bg-gradient-to-r 
        from-pink-500 
        via-pink-400 
        to-fuchsia-500
        text-white 
        px-8 
        py-20 
        shadow-xl
        "
      >
        <div
          className="
          absolute 
          -top-24 
          -right-20 
          h-72 
          w-72
          rounded-full 
          bg-white/20 
          blur-3xl
          "
        />

        <div
          className="
          absolute 
          -bottom-20 
          -left-20 
          h-64 
          w-64
          rounded-full 
          bg-pink-300/20 
          blur-3xl
          "
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl"
        >
          <div
            className="
            inline-flex 
            items-center 
            gap-2
            rounded-full 
            bg-white/20 
            px-4 
            py-2 
            mb-6
            "
          >
            <FaMusic />

            <span className="text-sm font-medium">
              Your Music • Your Memories
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Welcome to
            <span className="block">VibeBox 🎀</span>
          </h1>

          <p className="mt-6 text-lg text-pink-100 max-w-xl">
            Discover beautiful music, organize playlists, save your favorite
            songs, and enjoy every vibe.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/songs"
              className="
              rounded-full
              bg-white
              text-pink-600
              px-8
              py-3
              font-semibold
              hover:scale-105
              transition
              "
            >
              Explore Music
            </Link>

            <Link
              to="/playlists"
              className="
              rounded-full
              border
              border-white
              px-8
              py-3
              font-semibold
              hover:bg-white
              hover:text-pink-600
              transition
              flex
              items-center
              gap-2
              "
            >
              <FaHeart />
              My Playlists
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Songs */}

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Featured Songs</h2>

          <Link
            to="/songs"
            className="text-pink-500 font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {loadingSongs ? (
            <p className="text-pink-500">Loading songs 🎵</p>
          ) : (
            trendingSongs.map((song) => <SongCard key={song._id} song={song} />)
          )}
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">🆕 New Releases</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {newReleases.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">⭐ Popular Songs</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {popularSongs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      </section>

      {/* Recently Played */}

      {recentSongs.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Recently Played 🎧
            </h2>

            <Link
              to="/recently-played"
              className="text-pink-500 font-semibold hover:underline"
            >
              View History
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {recentSongs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        </section>
      )}

      {/* Favorites */}

      {favoriteSongs.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Your Favorites ❤️
            </h2>

            <Link
              to="/favorites"
              className="text-pink-500 font-semibold hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {favoriteSongs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}

      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Explore Categories
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Playlists */}

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">🔥 Trending Now</h2>

          <Link
            to="/playlists"
            className="text-pink-500 font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
