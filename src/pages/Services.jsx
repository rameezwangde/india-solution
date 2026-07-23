import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  Cake,
  ChevronRight,
  Gem,
  Gift,
  Heart,
  House,
  Megaphone,
  Music,
  PanelsTopLeft,
  PartyPopper,
  Sparkles,
  Trophy,
  Utensils,
} from 'lucide-react';
import { staggerContainer, fadeUp } from '../utils/animations';
import { serviceCatalog, slugifyServiceItem } from '../data/serviceCatalog';
import SEO from '../components/layout/SEO';

const iconMap = {
  BriefcaseBusiness,
  Cake,
  Gem,
  Gift,
  Heart,
  House,
  Megaphone,
  Music,
  PanelsTopLeft,
  PartyPopper,
  Sparkles,
  Trophy,
  Utensils,
};

const Services = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Event Management and Planning",
    "provider": {
      "@type": "EventVenue",
      "name": "India Solution Events"
    },
    "areaServed": {
      "@type": "City",
      "name": "Bengaluru"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Event Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Corporate Events",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Conferences" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Product Launches" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Networking Events" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Weddings",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wedding Planning" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stage Fabrication" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Special Entries" } }
          ]
        }
      ]
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-5 pb-24 pt-32 text-[#5c4033] lg:px-10 lg:pt-44 min-h-screen font-sans">
      <SEO 
        title="Our Services & Event Planning"
        description="Explore India Solution's comprehensive event services including corporate conferences, luxury weddings, stage fabrication, and product launches in Bengaluru."
        keywords="event services, wedding planning packages, corporate event management, stage fabrication bengaluru"
        schema={serviceSchema}
      />
      {/* Global Background Watermarks */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -right-20 top-0 w-full md:w-[60%] h-[120%] object-cover object-left opacity-[0.03]" 
          style={{ transform: 'scaleX(-1)'}} 
        />
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -left-20 top-1/4 w-full md:w-[60%] h-[120%] object-cover object-left opacity-[0.03]" 
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1300px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D5C5B9]"></span>
            <span className="text-[#A67C65] text-[10px]">❖</span>
            <span className="text-[#A67C65] text-xs font-bold tracking-[0.25em] uppercase">Services</span>
            <span className="text-[#A67C65] text-[10px]">❖</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D5C5B9]"></span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold text-[#4A2F1D] tracking-wide mb-6">
            OUR <span className="text-[#A67C65]">SERVICES</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-[#A67C65] text-sm">❖</span>
          </div>
          <p className="mx-auto mt-3 max-w-md text-sm md:text-base font-medium leading-relaxed text-[#7C5A48]">
            Comprehensive event solutions tailored to create unforgettable experiences.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {serviceCatalog.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Sparkles;

            return (
              <motion.article
                key={service.slug}
                variants={fadeUp}
                className="group relative flex min-h-[350px] flex-col overflow-hidden rounded-[1.5rem] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E8DFD5] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#D5C5B9]"
              >
                <div className="mb-6 flex items-start gap-4 flex-col sm:flex-row">
                  <Link
                    to={`/services/${service.slug}`}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FAF7F2] border-[1.5px] border-[#D5C5B9] text-[#A67C65] transition-all group-hover:border-[#A67C65] group-hover:bg-[#A67C65] group-hover:text-white"
                    aria-label={service.title}
                  >
                    <Icon size={24} strokeWidth={1.5} />
                  </Link>
                  <div className="pt-1">
                    <Link to={`/services/${service.slug}`}>
                      <h2 className="font-['Playfair_Display',serif] text-xl font-bold leading-tight text-[#4A2F1D] transition-colors hover:text-[#A67C65] md:text-2xl mb-2">
                        {service.title}
                      </h2>
                    </Link>
                    <p className="max-w-[18rem] text-[12.5px] font-medium leading-relaxed text-[#7C5A48]">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-auto grid gap-3">
                  {service.items.map((item) => (
                    <Link
                      key={item}
                      to={`/services/${service.slug}/${slugifyServiceItem(item)}`}
                      className="flex items-center gap-3 rounded-lg border border-[#E8DFD5] bg-[#FAF7F2]/50 px-4 py-3 text-[12.5px] font-semibold leading-tight text-[#5c4033] transition-all hover:-translate-y-0.5 hover:border-[#A67C65] hover:shadow-sm"
                    >
                      <ChevronRight size={14} className="shrink-0 text-[#A67C65]" strokeWidth={2.5} />
                      <span>{item}</span>
                    </Link>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;