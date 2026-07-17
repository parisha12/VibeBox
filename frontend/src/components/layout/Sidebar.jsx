import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaMusic,
  FaList,
  FaHeart,
  FaBook,
  FaUser,
} from 'react-icons/fa';

const Sidebar = () => {
  const links = [
    {
      name: 'Home',
      path: '/',
      icon: <FaHome />,
    },
    {
      name: 'Songs',
      path: '/songs',
      icon: <FaMusic />,
    },
    {
      name: 'Playlists',
      path: '/playlists',
      icon: <FaList />,
    },
    {
      name: 'Favorites',
      path: '/favorites',
      icon: <FaHeart />,
    },
    {
      name: 'Memories',
      path: '/memories',
      icon: <FaBook />,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <FaUser />,
    },
  ];

  return (
    <aside className="hidden md:block w-64 bg-white min-h-screen shadow-lg p-5">
      <h2 className="text-2xl font-bold text-pink-500 mb-8">My Space 💕</h2>

      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-pink-100 hover:text-pink-500'
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>

            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
