import { motion } from 'framer-motion';

const CategoryTabs = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors z-10 whitespace-nowrap shrink-0 flex items-center justify-center ${
            activeCategory === category ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-magenta rounded-full -z-10"
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
