import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { corporateMedia } from '../data/corporateMedia';
import { fadeUp, staggerContainer } from '../utils/animations';
import { createPortal } from 'react-dom';

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  
  // Combine all media from the corporate folders
  const allMedia = [
    ...corporateMedia['corporate-1'],
    ...corporateMedia['corporate-2'],
    ...corporateMedia['corporate-3']
  ];

  return (
    <section className="services-showcase relative overflow-hidden px-5 pb-20 pt-40 text-white lg:px-10 lg:pt-44 min-h-screen">
      <div className="services-dots services-dots-left" />
      <div className="services-dots services-dots-right" />
      <div className="services-wave services-wave-left" />
      <div className="services-wave services-wave-right" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <div className="mx-auto mb-3 flex items-center justify-center gap-3 text-magenta">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-magenta" />
            <span className="h-1.5 w-1.5 rotate-45 bg-magenta shadow-[0_0_12px_rgba(233,30,99,0.9)]" />
            <span className="h-px w-10 bg-gradient-to-r from-magenta to-orange" />
          </div>
          <h1 className="site-heading text-4xl font-bold leading-none tracking-[0.14em] md:text-5xl">
            Our <span className="text-gradient">Gallery</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-xs leading-5 text-gray-300 md:text-sm">
            Explore our extensive gallery of corporate events, conferences, product launches, and professional gatherings.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {allMedia.map((file, i) => {
            const isVideo = file.endsWith('.mp4');
            return (
              <motion.div 
                variants={fadeUp}
                key={i} 
                className="relative aspect-square overflow-hidden rounded-xl bg-gray-900 border border-white/10 group cursor-pointer shadow-lg" 
                onClick={() => setSelectedMedia(file)}
              >
                {isVideo ? (
                  <video src={file} className="w-full h-full object-cover pointer-events-none" />
                ) : (
                  <img src={file} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none" loading="lazy" />
                )}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      ▶
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {selectedMedia && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setSelectedMedia(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[60]" onClick={() => setSelectedMedia(null)}>
            <X size={32} />
          </button>
          <div className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
            {selectedMedia.endsWith('.mp4') ? (
              <video src={selectedMedia} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" controls autoPlay playsInline />
            ) : (
              <img src={selectedMedia} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" alt="Enlarged" />
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Gallery;
