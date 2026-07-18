import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useContext } from 'react';
import { MusicContext } from '../../context/MusicContext';

import { searchSongs } from '../../services/searchService';

import {
  FaHeart,
  FaUserCircle,
  FaChevronDown,
  FaHistory,
  FaMusic,
  FaSearch,
} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { playSong } = useContext(MusicContext);

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.trim()) {
        try {
          const data = await searchSongs(search);
          setResults(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <nav
      className="
      bg-white 
      shadow-md 
      px-6 
      py-4 
      flex 
      justify-between 
      items-center 
      sticky 
      top-0 
      z-50
      "
    >
      {/* Logo */}
      <Link
        to="/"
        className="
        text-2xl 
        font-bold 
        text-pink-500 
        flex 
        items-center 
        gap-2
        "
      >
        🎀 VibeBox
      </Link>

      {/* Search */}
      <div className="relative w-80">
        <div
          className="
          flex
          items-center
          gap-3
          bg-gray-100
          rounded-full
          px-4
          py-2
          "
        >
          <FaSearch className="text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search music..."
            className="
            bg-transparent
            outline-none
            w-full
            "
          />
        </div>

        {results.length > 0 && (
          <div
            className="
            absolute
            top-12
            left-0
            w-full
            bg-white
            shadow-xl
            rounded-xl
            p-3
            border
            z-[999]
            "
          >
            {results.map((song) => (
              <div
                key={song._id}
                onClick={() => {
                  playSong(song);
                  setSearch('');
                  setResults([]);
                }}
                className="
    p-3
    rounded-lg
    hover:bg-pink-50
    cursor-pointer
    "
              >
                <p className="font-semibold text-gray-800">{song.title}</p>

                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-5">
        {/* Favorites */}

        {user && (
          <Link to="/favorites">
            <FaHeart
              className="
              text-pink-500 
              text-xl 
              hover:scale-110 
              transition
              "
            />
          </Link>
        )}

        {user ? (
          <div className="relative">
            {/* User Button */}

            <button
              onClick={() => setOpen(!open)}
              className="
              flex 
              items-center 
              gap-2 
              text-gray-600
              hover:text-pink-500
              "
            >
              <FaUserCircle className="text-2xl" />

              <span className="font-medium hidden sm:block">
                {user.username}
              </span>

              <FaChevronDown className="text-sm" />
            </button>

            {/* Dropdown */}

            {open && (
              <div
                className="
                absolute
                right-0
                top-10
                w-52
                bg-white
                shadow-xl
                rounded-xl
                p-3
                border
                z-[999]
                "
              >
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="
                  block
                  px-3
                  py-2
                  rounded-lg
                  hover:bg-pink-50
                  "
                >
                  👤 Profile
                </Link>

                <Link
                  to="/playlists"
                  onClick={() => setOpen(false)}
                  className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-lg
                  hover:bg-pink-50
                  "
                >
                  <FaMusic />
                  Playlists
                </Link>

                <Link
                  to="/recently-played"
                  onClick={() => setOpen(false)}
                  className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-lg
                  hover:bg-pink-50
                  "
                >
                  <FaHistory />
                  Recently Played
                </Link>

                <button
                  onClick={logout}
                  className="
                  w-full
                  text-left
                  px-3
                  py-2
                  rounded-lg
                  text-red-500
                  hover:bg-red-50
                  "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="
            bg-pink-500
            text-white
            px-5
            py-2
            rounded-full
            hover:bg-pink-600
            transition
            "
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
