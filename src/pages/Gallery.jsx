import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';
import SEO from '../components/layout/SEO';
import { useTina } from 'tinacms/dist/react';
import galleryDataFallback from '../content/gallery.json';

const Gallery = () => {
  const [filter, setFilter] = useState('All');

  const { data } = useTina({
    query: `query {
      gallery(relativePath: "gallery.json") {
        seo { title description keywords }
        header { title subtitle description }
        categories
        photos { src title description category }
      }
    }`,
    variables: { relativePath: "gallery.json" },
    data: { gallery: galleryDataFallback }
  });

  const pageData = data.gallery;

  const filters = ['All', ...(pageData.categories || [])];

  const displayedCards = filter === 'All' 
    ? (pageData.photos || [])
    : (pageData.photos || []).filter(item => item.category === filter);

  return (
    <section className="relative min-h-screen overflow-hidden px-5 pb-20 pt-32 lg:px-12 lg:pt-40 font-sans bg-[#FAF7F2]">
      <SEO 
        title={pageData.seo?.title || "Event Gallery & Portfolio"}
        description={pageData.seo?.description || "Browse India Solution's extensive gallery of corporate events, weddings, conferences, product launches, and professional gatherings in Bengaluru."}
        keywords={pageData.seo?.keywords || "event gallery, wedding portfolio, corporate event photos"}
      />
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="w-full h-full object-cover object-center opacity-[0.03]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1300px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <div className="mx-auto mb-4 flex justify-center">
            <span className="text-[#4A2F1D] text-sm">❖</span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold tracking-wide mb-6">
            <span className="text-[#4A2F1D]">{pageData.header?.title}</span> <span className="text-[#4A2F1D]">{pageData.header?.subtitle}</span>
          </h1>
          <p className="mx-auto max-w-lg text-[15px] font-semibold leading-relaxed text-[#2A1810]">
            {pageData.header?.description}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-full text-[14px] font-extrabold tracking-wider transition-all duration-300 ${
                filter === f
                  ? 'bg-[#4A2F1D] text-white border-transparent shadow-md'
                  : 'bg-transparent border-[1.5px] border-[#D5C5B9] text-[#4A2F1D] hover:border-[#A67C65] hover:text-[#2A1810] hover:bg-[#FAF7F2]'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          {displayedCards.length === 0 ? (
            <div className="text-center py-20 text-[#4A2F1D]">
              <p className="text-lg">No items found for this category.</p>
            </div>
          ) : (
            <motion.div 
              key={filter}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {displayedCards.map((item, i) => (
                <motion.div 
                  variants={fadeUp}
                  key={`${item.title}-${i}`} 
                  className="flex flex-col bg-white rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E8DFD5]/40 group hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
                >
                  <div className="relative aspect-[4/2.5] overflow-hidden bg-[#FAF7F2]">
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy" 
                    />
                  </div>
                  <div className="px-6 py-5 flex flex-col flex-grow">
                    <h3 className="font-serif text-[17px] font-black text-[#2A1810] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#4A2F1D] font-semibold leading-relaxed mb-5 flex-grow">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
