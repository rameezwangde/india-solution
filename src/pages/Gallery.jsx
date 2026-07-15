import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { corporateMedia } from '../data/corporateMedia';
import { fadeUp, staggerContainer } from '../utils/animations';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { slugifyServiceItem } from '../data/serviceCatalog';

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filter, setFilter] = useState('All');
  const [weddingSubFilter, setWeddingSubFilter] = useState('Pre-Wedding');
  const [corporateSubFilter, setCorporateSubFilter] = useState('Networking Events');

  const corporateCards = [
    {
      src: '/images/corporate_networking.png',
      title: 'Networking Events',
      description: 'Facilitating meaningful connections with professional and engaging networking environments.',
      slug: 'networking-events'
    },
    {
      src: '/images/corporate_conference.png',
      title: 'Conferences',
      description: 'Seamless execution of large-scale professional conferences and corporate summits.',
      slug: 'conferences'
    },
    {
      src: '/images/corporate_launch.png',
      title: 'Product Launches',
      description: 'Impactful brand reveals and product showcases designed to captivate your audience.',
      slug: 'product-launches'
    },
    {
      src: '/images/corporate_meeting.png',
      title: 'Corporate Meetings',
      description: 'Expertly managed meetings and boardrooms with flawless technical execution.',
      slug: 'corporate-meetings'
    }
  ];

  // Distribute the raw corporate media into the 4 categories
  const networkingImages = corporateMedia['corporate-1'].map(src => ({ src, type: 'raw' }));
  const conferenceImages = corporateMedia['corporate-2'].map(src => ({ src, type: 'raw' }));
  const launchImages = corporateMedia['corporate-3'].map(src => ({ src, type: 'raw' }));
  const meetingImages = [...corporateMedia['corporate-1'].slice(0, 10), ...corporateMedia['corporate-2'].slice(0, 10)].map(src => ({ src, type: 'raw' }));

  const getCorporateImagesForSubFilter = (subFilter) => {
    switch (subFilter) {
      case 'Networking Events': return networkingImages;
      case 'Conferences': return conferenceImages;
      case 'Product Launches': return launchImages;
      case 'Corporate Meetings': return meetingImages;
      default: return [];
    }
  };

  const preWeddingCards = [
    {
      src: '/images/wedding_decor.png',
      title: 'Event Decor and Floral Arrangements',
      description: 'Stunning floral designs and thematic decor to set the perfect mood.',
      slug: 'event-decor-and-floral-arrangements'
    },
    {
      src: '/images/wedding_photography.png',
      title: 'Photography and Videography',
      description: 'Capturing your precious moments with cinematic brilliance.',
      slug: 'photography-and-videography-services'
    },
    {
      src: '/images/wedding_catering.png',
      title: 'Catering Services',
      description: 'Exquisite culinary experiences tailored to your taste and theme.',
      slug: 'catering-services'
    },
    {
      src: '/images/wedding_theme.png',
      title: 'Theme Based Parties',
      description: 'Creative and immersive party themes for unforgettable celebrations.',
      slug: 'theme-based-parties'
    },
    {
      src: '/images/wedding_welcome.png',
      title: 'Welcome Experience',
      description: 'Creating memorable first impressions through seamless arrivals, hospitality, and guest assistance.',
      slug: 'welcome-experience'
    },
    {
      src: '/images/wedding_decor.png',
      title: 'Haldi Celebration',
      description: 'Vibrant rituals brought to life with thoughtful planning, decor, and guest experiences.',
      slug: 'haldi-celebration'
    },
    {
      src: '/images/wedding_makeup.png',
      title: 'Mehendi Celebration',
      description: 'A colorful celebration filled with artistry, entertainment, and joyful moments.',
      slug: 'mehendi-celebration'
    },
    {
      src: '/images/wedding_sangeet.png',
      title: 'Sangeet Night',
      description: 'Performance-driven evenings featuring music, dance, entertainment, and family celebrations.',
      slug: 'sangeet-night'
    },
    {
      src: '/images/wedding_catering.png',
      title: 'Cocktail Evening',
      description: 'Sophisticated social experiences with curated entertainment, music, and elevated hospitality.',
      slug: 'cocktail-evening'
    },
    {
      src: '/images/wedding_theme.png',
      title: 'Poolside Celebration',
      description: 'Relaxed daytime festivities with themed styling, music, refreshments, and guest engagement.',
      slug: 'poolside-celebration'
    }
  ];

  const mainWeddingCards = [
    {
      src: '/images/wedding_invitations.png',
      title: 'Invitations & Stationery',
      description: 'Elegant luxury invitations to set the tone for your big day.',
      slug: 'invitations-and-stationery'
    },
    {
      src: '/images/wedding_makeup.png',
      title: 'Beauty, Makeup, and Mehendi',
      description: 'Flawless bridal makeup and intricate mehendi designs.',
      slug: 'beauty-services-makeup-and-mehendi'
    },
    {
      src: '/images/wedding_attire.png',
      title: 'Bridal & Groom Wear',
      description: 'Exquisite couture and jewellery for the perfect wedding look.',
      slug: 'bridal-and-groom-wear-and-jewellery'
    },
    {
      src: '/images/wedding_entry.png',
      title: 'Special Entries',
      description: 'Grand couple entries to mesmerize your guests.',
      slug: 'special-entries'
    },
    {
      src: '/images/wedding_transport.png',
      title: 'Transportation',
      description: 'Luxury vehicles and vintage cars for a royal arrival.',
      slug: 'transportation'
    },
    {
      src: '/images/wedding_ceremony.png',
      title: 'Wedding Ceremony',
      description: 'Beautifully orchestrated ceremonies that honor traditions while creating unforgettable memories.',
      slug: 'wedding-ceremony'
    },
    {
      src: '/images/wedding_decor.png',
      title: 'Reception Celebration',
      description: 'Elegant celebrations featuring entertainment, hospitality, dining, and seamless event flow.',
      slug: 'reception-celebration'
    },
    {
      src: '/images/wedding_entry.png',
      title: 'Signature Couple Experiences',
      description: 'From grand entries to curated couple moments, we design unforgettable experiences that leave a lasting impression.',
      slug: 'signature-couple-experiences'
    }
  ];

  let displayedMedia = [];
  let activeCorporateCard = null;

  if (filter === 'All') {
    displayedMedia = [
      ...corporateCards.map(c => ({...c, type: 'card', category: 'corporate-events'})),
      ...preWeddingCards.map(c => ({...c, type: 'card', category: 'pre-wedding-ceremony'})),
      ...mainWeddingCards.map(c => ({...c, type: 'card', category: 'wedding'}))
    ];
  } else if (filter === 'Corporate') {
    activeCorporateCard = corporateCards.find(c => c.title === corporateSubFilter);
    displayedMedia = getCorporateImagesForSubFilter(corporateSubFilter);
  } else if (filter === 'Weddings') {
    const activeCards = weddingSubFilter === 'Pre-Wedding' ? preWeddingCards : mainWeddingCards;
    const categorySlug = weddingSubFilter === 'Pre-Wedding' ? 'pre-wedding-ceremony' : 'wedding';
    displayedMedia = activeCards.map(c => ({ ...c, type: 'card', category: categorySlug }));
  }

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
          <div className="mx-auto mb-6 flex items-center justify-center gap-4 text-magenta">
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-magenta to-magenta opacity-70" />
            <span className="h-2 w-2 rotate-45 bg-magenta shadow-[0_0_15px_rgba(233,30,99,0.9)]" />
            <span className="h-px w-12 bg-gradient-to-r from-magenta via-orange to-transparent opacity-70" />
          </div>
          <h1 className="font-serif text-4xl font-bold tracking-[0.2em] text-white md:text-5xl uppercase whitespace-nowrap">
            Our <span className="bg-gradient-to-r from-magenta to-orange bg-clip-text text-transparent drop-shadow-sm">Gallery</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-xs leading-5 text-gray-300 md:text-sm">
            Explore our extensive gallery of corporate events, conferences, product launches, and professional gatherings.
          </p>
        </motion.div>

        {/* Main Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {['All', 'Corporate', 'Weddings'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                filter === f
                  ? 'bg-gradient-to-r from-magenta to-orange text-white shadow-[0_0_20px_rgba(233,30,99,0.3)] border-transparent'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Corporate Sub-Filters */}
        <AnimatePresence>
          {filter === 'Corporate' && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="flex flex-wrap justify-center gap-3 mb-10 overflow-hidden"
            >
              {['Networking Events', 'Conferences', 'Product Launches', 'Corporate Meetings'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setCorporateSubFilter(sub)}
                  className={`px-6 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${
                    corporateSubFilter === sub
                      ? 'bg-magenta/20 border-magenta text-white shadow-[0_0_15px_rgba(233,30,99,0.2)]'
                      : 'border-white/10 bg-transparent text-gray-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weddings Sub-Filters */}
        <AnimatePresence>
          {filter === 'Weddings' && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="flex justify-center gap-3 mb-10 overflow-hidden"
            >
              {['Pre-Wedding', 'Wedding'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setWeddingSubFilter(sub)}
                  className={`px-6 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${
                    weddingSubFilter === sub
                      ? 'bg-magenta/20 border-magenta text-white shadow-[0_0_15px_rgba(233,30,99,0.2)]'
                      : 'border-white/10 bg-transparent text-gray-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corporate Wide Header Banner */}
        <AnimatePresence mode="wait">
          {filter === 'Corporate' && activeCorporateCard && (
            <motion.div
              key={corporateSubFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="mb-12 max-w-4xl mx-auto bg-[#fdfaf6] rounded-xl overflow-hidden shadow-2xl border border-black/5 flex flex-col md:flex-row md:h-72 group"
            >
              <div className="md:w-2/5 relative overflow-hidden aspect-video md:aspect-auto">
                <img 
                  src={activeCorporateCard.src} 
                  alt={activeCorporateCard.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1a202c] mb-3 leading-tight">
                  {activeCorporateCard.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {activeCorporateCard.description}
                </p>
                <Link 
                  to={`/services/corporate-events/${activeCorporateCard.slug}`} 
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-magenta transition-colors hover:text-orange self-start"
                >
                  Explore Detail <ChevronRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {displayedMedia.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">More images coming soon...</p>
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {displayedMedia.map((item, i) => {
              if (item.type === 'raw') {
                const isVideo = item.src.endsWith('.mp4');
                return (
                  <motion.div 
                    variants={fadeUp}
                    key={i} 
                    className="relative aspect-square overflow-hidden rounded-xl bg-gray-900 border border-white/10 group cursor-pointer shadow-lg" 
                    onClick={() => setSelectedMedia(item.src)}
                  >
                    {isVideo ? (
                      <video src={item.src} className="w-full h-full object-cover pointer-events-none" />
                    ) : (
                      <img src={item.src} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none" loading="lazy" />
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
              }

              // Render as a beautiful image card (like the screenshot)
              return (
                <motion.div 
                  variants={fadeUp}
                  key={i} 
                  className="flex flex-col bg-[#fdfaf6] rounded-2xl overflow-hidden shadow-lg border border-black/5 group hover:shadow-2xl hover:shadow-magenta/10 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => setSelectedMedia(item.src)}>
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl font-bold text-[#1a202c] mb-3 leading-tight">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-grow">{item.description}</p>
                    <Link to={`/services/${item.category}/${item.slug}`} className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-magenta transition-colors hover:text-orange">
                      Explore Detail <ChevronRight size={13} strokeWidth={2.5} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
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
