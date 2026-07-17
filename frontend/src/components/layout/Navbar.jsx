import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHeart, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-pink-500 flex items-center gap-2"
      >
        🎀 VibeBox
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        {/* Favorite */}
        <Link to="/favorites">
          <FaHeart className="text-pink-500 text-xl hover:scale-110 transition" />
        </Link>

        {user ? (
          <>
            {/* User */}
            <Link
              to="/profile"
              className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-pink-500"
            >
              <FaUserCircle className="text-2xl" />

              <span className="font-medium">{user.name}</span>
            </Link>

            {/* Logout */}
            <button
              onClick={logout}
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
              Logout
            </button>
          </>
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
