import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [filter, setFilter] = useState('All');

  const corporateCards = [
    {
      src: '/images/corporate_networking.png',
      title: 'Networking Events',
      description: 'Facilitating meaningful connections with professional and engaging networking environments.',
      slug: 'networking-events',
      category: 'corporate-events'
    },
    {
      src: '/images/corporate_conference.png',
      title: 'Conferences',
      description: 'Seamless execution of large-scale professional conferences and corporate summits.',
      slug: 'conferences',
      category: 'corporate-events'
    },
    {
      src: '/images/corporate_launch.png',
      title: 'Product Launches',
      description: 'Impactful brand reveals and product showcases designed to captivate your audience.',
      slug: 'product-launches',
      category: 'corporate-events'
    },
    {
      src: '/images/corporate_meeting.png',
      title: 'Corporate Meetings',
      description: 'Expertly managed meetings and boardrooms with flawless technical execution.',
      slug: 'corporate-meetings',
      category: 'corporate-events'
    }
  ];

  const weddingCards = [
    {
      src: '/images/wedding_decor.png',
      title: 'Event Decor and Floral Arrangements',
      description: 'Stunning floral designs and thematic decor to set the perfect mood.',
      slug: 'event-decor-and-floral-arrangements',
      category: 'pre-wedding-ceremony'
    },
    {
      src: '/images/wedding_photography.png',
      title: 'Photography and Videography',
      description: 'Capturing your precious moments with cinematic brilliance.',
      slug: 'photography-and-videography-services',
      category: 'pre-wedding-ceremony'
    },
    {
      src: '/images/wedding_catering.png',
      title: 'Catering Services',
      description: 'Exquisite culinary experiences tailored to your taste and theme.',
      slug: 'catering-services',
      category: 'pre-wedding-ceremony'
    },
    {
      src: '/images/wedding_theme.png',
      title: 'Theme Based Parties',
      description: 'Creative and immersive party themes for unforgettable celebrations.',
      slug: 'theme-based-parties',
      category: 'pre-wedding-ceremony'
    },
    {
      src: '/images/wedding_welcome.png',
      title: 'Welcome Experience',
      description: 'Creating memorable first impressions through seamless arrivals, hospitality, and guest assistance.',
      slug: 'welcome-experience',
      category: 'pre-wedding-ceremony'
    },
    {
      src: '/images/wedding_decor.png',
      title: 'Haldi Celebrations',
      description: 'Vibrant rituals brought to life with thoughtful planning, decor, and guest experiences.',
      slug: 'haldi-celebration',
      category: 'pre-wedding-ceremony'
    },
    {
      src: '/images/wedding_makeup.png',
      title: 'Mehndi Celebrations',
      description: 'A colorful celebration filled with artistry, entertainment, and joyful moments.',
      slug: 'mehendi-celebration',
      category: 'pre-wedding-ceremony'
    },
    {
      src: '/images/wedding_sangeet.png',
      title: 'Sangeet Night',
      description: 'Performance-driven evenings featuring music, dance, entertainment, and family celebrations.',
      slug: 'sangeet-night',
      category: 'pre-wedding-ceremony'
    },
    {
      src: '/images/wedding_catering.png',
      title: 'Cocktail Evening',
      description: 'Sophisticated social experiences with curated entertainment, music, and elevated hospitality.',
      slug: 'cocktail-evening',
      category: 'pre-wedding-ceremony'
    },
    {
      src: '/images/wedding_theme.png',
      title: 'Poolside Celebrations',
      description: 'Relaxed daytime festivities with themed styling, music, refreshments, and guest engagement.',
      slug: 'poolside-celebration',
      category: 'pre-wedding-ceremony'
    },
    {
      src: '/images/wedding_invitations.png',
      title: 'Invitations & Stationery',
      description: 'Elegant luxury invitations to set the tone for your big day.',
      slug: 'invitations-and-stationery',
      category: 'wedding'
    },
    {
      src: '/images/wedding_makeup.png',
      title: 'Beauty, Makeup, and Styling',
      description: 'Enhancing beauty for your special day.',
      slug: 'beauty-services-makeup-and-mehendi',
      category: 'wedding'
    },
    {
      src: '/images/wedding_attire.png',
      title: 'Bridal & Groom Wear',
      description: 'Exquisite styles for your most special moments.',
      slug: 'bridal-and-groom-wear-and-jewellery',
      category: 'wedding'
    },
    {
      src: '/images/wedding_entry.png',
      title: 'Special Entries',
      description: 'Grand entrances that leave everyone amazed.',
      slug: 'special-entries',
      category: 'wedding'
    },
    {
      src: '/images/wedding_transport.png',
      title: 'Transportation',
      description: 'Comfort, elegance, and punctuality you can trust.',
      slug: 'transportation',
      category: 'wedding'
    },
    {
      src: '/images/wedding_ceremony.png',
      title: 'Wedding Ceremony',
      description: 'Beautifully planned ceremonies full of love and tradition.',
      slug: 'wedding-ceremony',
      category: 'wedding'
    }
  ];

  const allCards = [...corporateCards, ...weddingCards];

  let displayedCards = [];
  if (filter === 'All') {
    displayedCards = allCards;
  } else if (filter === 'Corporate') {
    displayedCards = corporateCards;
  } else if (filter === 'Weddings') {
    displayedCards = weddingCards;
  } else if (filter === 'Conferences') {
    displayedCards = corporateCards.filter(c => c.title === 'Conferences');
  } else if (filter === 'Product Launches') {
    displayedCards = corporateCards.filter(c => c.title === 'Product Launches');
  }

  const filters = ['All', 'Corporate', 'Weddings', 'Conferences', 'Product Launches'];

  return (
    <section className="relative min-h-screen overflow-hidden px-5 pb-20 pt-32 lg:px-12 lg:pt-40 font-sans bg-[#FAF7F2]">
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
            <span className="text-[#A67C65] text-sm">❖</span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold tracking-wide mb-6">
            <span className="text-[#4A2F1D]">OUR</span> <span className="text-[#A67C65]">GALLERY</span>
          </h1>
          <p className="mx-auto max-w-lg text-[13.5px] font-medium leading-relaxed text-[#5c4033]">
            Explore our extensive gallery of corporate events, conferences, product launches, and professional gatherings.
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
              className={`px-6 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                filter === f
                  ? 'bg-[#5c4033] text-white border-transparent shadow-md'
                  : 'bg-transparent border-[1.5px] border-[#D5C5B9] text-[#7C5A48] hover:border-[#A67C65] hover:text-[#5c4033]'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          {displayedCards.length === 0 ? (
            <div className="text-center py-20 text-[#A67C65]">
              <p className="text-lg">No items found.</p>
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
                    <h3 className="font-serif text-[15px] font-bold text-[#4A2F1D] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11.5px] text-[#7C5A48] font-medium leading-relaxed mb-5 flex-grow">
                      {item.description}
                    </p>
                    <Link 
                      to={`/services/${item.category}/${item.slug}`} 
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#A67C65] transition-colors hover:text-[#5c4033]"
                    >
                      View More <ChevronRight size={13} strokeWidth={2.5} />
                    </Link>
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
