import { motion } from 'framer-motion';

const CategoryTabs = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`relative px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide uppercase transition-all z-10 whitespace-nowrap shrink-0 flex items-center justify-center border ${
              isActive 
                ? 'text-white border-transparent' 
                : 'text-[#A67C65] bg-white border-[#E8DFD5] hover:border-[#D5C5B9] hover:text-[#8B5E45] shadow-sm'
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
