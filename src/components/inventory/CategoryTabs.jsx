import { motion } from 'framer-motion';

const CategoryTabs = ({ categories, activeCategory, onSelectCategory, onHoverCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            onMouseEnter={() => onHoverCategory && onHoverCategory(category)}
            className={`relative px-6 py-3 rounded-full text-[14px] font-extrabold tracking-wider uppercase transition-all z-10 whitespace-nowrap shrink-0 flex items-center justify-center border ${
              isActive 
                ? 'text-white border-transparent' 
                : 'text-[#4A2F1D] bg-white border-[#E8DFD5] hover:border-[#A67C65] hover:text-[#2A1810] hover:bg-[#FAF7F2] shadow-sm'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-[#A67C65] rounded-full -z-10 shadow-md"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
