import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

function PlaylistCard({ playlist }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-2xl shadow-md overflow-hidden 
      hover:shadow-xl transition"
    >
      <div className="relative">
        <img
          src={playlist.image}
          alt={playlist.name}
          className="w-full h-56 object-cover"
        />

        <button
          className="absolute bottom-4 right-4 
          bg-pink-500 text-white p-4 rounded-full
          opacity-0 group-hover:opacity-100 transition"
        >
          <FaPlay />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800">{playlist.name}</h3>

        <p className="text-gray-500 mt-2">{playlist.description}</p>
      </div>
    </motion.div>
  );
}

export default PlaylistCard;
