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
import SEO from '../components/layout/SEO';
import { useTina } from 'tinacms/dist/react';
import servicesData from '../content/services.json';

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
  const { data } = useTina({
    query: `query {
      services(relativePath: "services.json") {
        seo { title description keywords }
        hero { subtitle titleLine1 titleLine2 description }
        catalog { title slug icon description items { name slug } }
      }
    }`,
    variables: { relativePath: "services.json" },
    data: { 
      services: servicesData
    }
  });

  const activeData = data.services;
  const serviceCatalog = activeData.catalog;

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
    <section className="relative overflow-hidden bg-[#FAF7F2] px-5 pb-24 pt-32 text-[#2A1810] lg:px-10 lg:pt-44 min-h-screen font-sans">
      <SEO 
        title={activeData.seo.title}
        description={activeData.seo.description}
        keywords={activeData.seo.keywords}
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
            <span className="text-[#4A2F1D] text-[10px]">❖</span>
            <span className="text-[#4A2F1D] text-xs font-bold tracking-[0.25em] uppercase">{activeData.hero.subtitle}</span>
            <span className="text-[#4A2F1D] text-[10px]">❖</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D5C5B9]"></span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold text-[#4A2F1D] tracking-wide mb-6">
            {activeData.hero.titleLine1} <span className="text-[#4A2F1D]">{activeData.hero.titleLine2}</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-[#4A2F1D] text-sm">❖</span>
          </div>
          <p className="mx-auto mt-3 max-w-md text-base md:text-lg font-semibold leading-relaxed text-[#2A1810]">
            {activeData.hero.description}
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
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FAF7F2] border-[1.5px] border-[#D5C5B9] text-[#4A2F1D] transition-all group-hover:border-[#A67C65] group-hover:bg-[#A67C65] group-hover:text-white"
                    aria-label={service.title}
                  >
                    <Icon size={24} strokeWidth={1.5} />
                  </Link>
                  <div className="pt-1">
                    <Link to={`/services/${service.slug}`}>
                      <h2 className="font-['Playfair_Display',serif] text-xl font-black leading-tight text-[#2A1810] transition-colors hover:text-[#4A2F1D] md:text-2xl mb-2">
                        {service.title}
                      </h2>
                    </Link>
                    <p className="max-w-[18rem] text-[14px] font-semibold leading-relaxed text-[#4A2F1D]">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  {service.items && service.items.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/services/${service.slug}/${item.slug}`}
                      className="flex items-center gap-3 rounded-lg border border-[#E8DFD5] bg-[#FAF7F2]/50 px-4 py-3 text-[13px] font-bold leading-tight text-[#2A1810] transition-all hover:-translate-y-0.5 hover:border-[#A67C65] hover:shadow-sm"
                    >
                      <ChevronRight size={14} className="shrink-0 text-[#4A2F1D]" strokeWidth={2.5} />
                      <span>{item.name}</span>
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