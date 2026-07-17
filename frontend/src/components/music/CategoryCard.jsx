import { motion } from 'framer-motion';

function CategoryCard({ category }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl p-6 bg-gradient-to-br from-pink-400 to-fuchsia-500 
      text-white shadow-lg cursor-pointer"
    >
      <div className="text-4xl mb-4">{category.icon}</div>

      <h3 className="text-xl font-bold">{category.name}</h3>

      <p className="text-pink-100 mt-2">Explore {category.name} vibes</p>
    </motion.div>
  );
}

export default CategoryCard;
