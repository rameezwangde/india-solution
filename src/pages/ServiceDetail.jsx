import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BriefcaseBusiness,
  Cake,
  CheckCircle2,
  ChevronRight,
  Gem,
  Gift,
  Heart,
  House,
  Mail,
  Megaphone,
  Music,
  PanelsTopLeft,
  PartyPopper,
  Sparkles,
  Trophy,
  Utensils,
  X,
  Camera,
  Video
} from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';
import { corporateMedia } from '../data/corporateMedia';
import { useTina } from 'tinacms/dist/react';
import servicesFallbackData from '../content/services.json';

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

const serviceImageMapping = {
  'Wedding Planning': 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Stage Fabrication': 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Decorations': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Invitations & Stationery': 'https://images.unsplash.com/photo-1538356111053-748a48e1acb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Theme-Based Parties': 'https://images.unsplash.com/photo-1530103862676-de8892b12fa7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Event Decor and Floral Arrangements': 'https://images.unsplash.com/photo-1522057385408-161b17a1aee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Photography and Videography Services': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};

const Lightbox = ({ item, onClose, onNext, onPrev }) => {
  if (!item) return null;
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={24} />
      </button>

      {onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-6 top-1/2 z-10 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ChevronRight size={32} className="rotate-180" />
        </button>
      )}

      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-6 top-1/2 z-10 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ChevronRight size={32} />
        </button>
      )}

      <div className="relative flex max-h-[85vh] w-full max-w-6xl items-center justify-center">
        {item.type === 'video' ? (
          <video src={item.url} controls autoPlay className="max-h-full max-w-full rounded-lg shadow-2xl" />
        ) : (
          <img src={item.url} alt="Gallery item" className="max-h-full max-w-full rounded-lg object-contain shadow-2xl" />
        )}
      </div>
    </motion.div>,
    document.body
  );
};

const ServiceGallery = ({ title, mediaFiles }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!mediaFiles || mediaFiles.length === 0) return null;

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === mediaFiles.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? mediaFiles.length - 1 : prev - 1));
  };

  return (
    <>
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="mb-10 text-center">
          <span className="text-[#4A2F1D] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 block">Gallery</span>
          <h2 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#4A2F1D]">Past {title}</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {mediaFiles.map((media, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              onClick={() => setSelectedIndex(index)}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-[1rem] bg-[#E8DFD5]"
            >
              {media.type === 'video' ? (
                <video src={media.url} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" muted playsInline />
              ) : (
                <img src={media.url} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              )}
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                <span className="translate-y-4 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Camera size={24} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Lightbox
        item={selectedIndex !== null ? mediaFiles[selectedIndex] : null}
        onClose={() => setSelectedIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
};

const ImageGridServiceContent = ({ items, serviceSlug }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => (
        <motion.div key={item.slug} variants={fadeUp} className="group relative overflow-hidden rounded-[1.5rem] bg-white border border-[#E8DFD5] shadow-sm cursor-pointer hover:shadow-md hover:border-[#D5C5B9] transition-all duration-300">
          <Link to={`/services/${serviceSlug}/${item.slug}`} className="block h-full">
            <div className="aspect-[4/3] overflow-hidden relative p-3 pb-0">
               <img src={serviceImageMapping[item.name] || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={item.name} className="w-full h-full object-cover rounded-t-[1rem] transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="p-6 bg-white relative z-10">
               <h3 className="font-['Playfair_Display',serif] text-lg font-bold text-[#4A2F1D] mb-3 group-hover:text-[#4A2F1D] transition-colors leading-snug">{item.name}</h3>
               <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A2F1D] flex items-center gap-2">
                 Explore Detail <ChevronRight size={14} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
               </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.section>
  );
};

const DetailTitle = ({ title, accent }) => {
  if (!accent || !title || !title.includes(accent)) {
    return <>{title}</>;
  }

  const [before, after] = title.split(accent);
  return (
    <>
      {before}<span className="text-[#4A2F1D]">{accent}</span>{after}
    </>
  );
};

const ServiceContentSections = ({ sections }) => (
  <motion.section
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="mt-8 grid gap-8"
  >
    {sections.map((section, idx) => (
      <motion.article key={idx} variants={fadeUp} className="relative overflow-hidden rounded-[1.5rem] bg-white p-8 md:p-10 shadow-sm border border-[#E8DFD5]">
        <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="text-[#4A2F1D] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 block">{section.eyebrow}</span>
            <h2 className="font-['Playfair_Display',serif] mb-6 text-4xl font-bold leading-tight md:text-[42px] text-[#4A2F1D]">
              <DetailTitle title={section.title} accent={section.accent} />
            </h2>
            {section.description && (
              <p className="max-w-2xl text-[14.5px] font-medium leading-[1.8] text-[#4A2F1D]" dangerouslySetInnerHTML={{ __html: section.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            )}
            <Link to="/contact" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#A67C65] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#8B5E45]">
              <Mail size={15} />
              Contact Us
            </Link>
          </div>
          {section.listItems && section.listItems.length > 0 && (
            <div>
              <h3 className="font-['Playfair_Display',serif] mb-6 text-2xl font-bold text-[#4A2F1D]">
                Included in this service
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {section.listItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-[#E8DFD5] bg-[#FAF7F2] p-4 transition-colors hover:border-[#D5C5B9]">
                    <span className="mt-0.5 shrink-0 text-[#A67C65]"><CheckCircle2 size={16} strokeWidth={2.5} /></span>
                    <span className="text-[13.5px] font-bold text-[#4A2F1D]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.article>
    ))}
  </motion.section>
);

const ServiceDetail = () => {
  const { serviceSlug, itemSlug } = useParams();
  
  const { data } = useTina({
    query: `query {
      services(relativePath: "services.json") {
        catalog {
          title slug icon description
          sections { eyebrow title accent description listItems }
          items {
            name slug
            sections { eyebrow title accent description listItems }
          }
        }
      }
    }`,
    variables: { relativePath: "services.json" },
    data: { 
      services: servicesFallbackData
    }
  });

  const activeCatalog = data.services.catalog;
  
  const service = activeCatalog.find((item) => item.slug === serviceSlug);
  const selectedItem = itemSlug ? service?.items?.find((item) => item.slug === itemSlug) : null;

  if (!service || (itemSlug && !selectedItem)) {
    return (
      <section className="relative overflow-hidden px-6 pb-20 pt-40 bg-[#FAF7F2] text-[#2A1810] lg:px-12 lg:pt-44 min-h-screen">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <span className="text-[#4A2F1D] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 block">Service</span>
          <h1 className="font-['Playfair_Display',serif] mb-6 text-4xl font-bold text-[#4A2F1D]">Service Not Found</h1>
          <p className="mb-8 font-semibold text-[#4A2F1D]">The service you opened is not available.</p>
          <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A2F1D]">
            <ArrowLeft size={16} />
            View All Services
          </Link>
        </div>
      </section>
    );
  }

  const Icon = iconMap[service.icon] ?? Sparkles;
  const relatedServices = activeCatalog.filter((item) => item.slug !== service.slug).slice(0, 3);
  
  // Decide what sections to render
  const sectionsToRender = selectedItem?.sections || service.sections || [];

  // Determine if a gallery should be rendered
  let galleryMedia = null;
  let galleryTitle = "";
  if (selectedItem?.slug === 'networking-events') { galleryMedia = corporateMedia['corporate-1']; galleryTitle = "Networking Events"; }
  if (selectedItem?.slug === 'conferences') { galleryMedia = corporateMedia['corporate-2']; galleryTitle = "Conferences"; }
  if (selectedItem?.slug === 'product-launches') { galleryMedia = corporateMedia['corporate-3']; galleryTitle = "Product Launches"; }
  if (selectedItem?.slug === 'corporate-meetings') { galleryMedia = corporateMedia['corporate-1']; galleryTitle = "Corporate Meetings"; }

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] font-sans px-5 pb-24 pt-32 text-[#2A1810] lg:px-10 lg:pt-44 min-h-screen">
      {/* Global Background Watermarks */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -right-20 top-0 w-[60%] h-[120%] object-cover object-left opacity-[0.03]" 
          style={{ transform: 'scaleX(-1)'}} 
        />
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -left-20 top-1/4 w-[60%] h-[120%] object-cover object-left opacity-[0.03]" 
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1300px]">
        <Link 
          to="/services" 
          onClick={() => window.scrollTo(0,0)}
          className="relative z-20 mb-8 inline-flex w-fit cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#4A2F1D] transition-colors hover:text-[#8B5E45]"
        >
          <ArrowLeft size={14} />
          All Services
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[1.5rem] bg-white p-8 md:p-10 shadow-sm border border-[#E8DFD5]"
          >
            <div className="relative">
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF7F2] border-[1.5px] border-[#D5C5B9] text-[#4A2F1D]">
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <span className="text-[#4A2F1D] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 block">{service.title}</span>
              <h1 className="font-['Playfair_Display',serif] max-w-3xl text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#4A2F1D]">
                {selectedItem ? (
                  <>
                    {selectedItem.name}
                    <span className="block text-[#4A2F1D] italic font-normal mt-2">Service</span>
                  </>
                ) : (
                  <>
                    {service.title}
                    <span className="block text-[#4A2F1D] italic font-normal mt-2">Planning</span>
                  </>
                )}
              </h1>
              <p className="mt-6 max-w-2xl text-[14.5px] font-medium leading-[1.8] text-[#4A2F1D]">
                {selectedItem
                  ? `India Solution handles ${selectedItem.name.toLowerCase()} as part of our ${service.title.toLowerCase()} service, with careful planning, polished execution, and attention to every guest-facing detail.`
                  : service.description}
              </p>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#A67C65] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#8B5E45]">
                Enquire Now
                <ChevronRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.section>

          {service.items && service.items.length > 0 && (
            <motion.aside
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative overflow-hidden rounded-[1.5rem] bg-[#FAF7F2] p-8 md:p-10 shadow-inner border border-[#E8DFD5]"
            >
              <span className="text-[#4A2F1D] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 block">Service Points</span>
              <h2 className="font-['Playfair_Display',serif] mb-6 text-3xl font-bold text-[#4A2F1D]">Choose A Detail</h2>
              <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {service.items.map((item) => {
                  const isActive = item.slug === selectedItem?.slug;
                  return (
                    <motion.div key={item.slug} variants={fadeUp}>
                      <Link
                        to={`/services/${service.slug}/${item.slug}`}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3.5 text-[13px] font-semibold leading-tight transition-all ${
                          isActive 
                            ? 'border-[#A67C65] bg-white text-[#4A2F1D] shadow-sm' 
                            : 'border-[#E8DFD5] bg-transparent text-[#4A2F1D] hover:border-[#D5C5B9] hover:bg-white/60 hover:text-[#4A2F1D]'
                        }`}
                      >
                        <ChevronRight size={14} className={`shrink-0 ${isActive ? 'text-[#4A2F1D]' : 'text-[#D5C5B9]'}`} strokeWidth={2.5} />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.aside>
          )}
        </div>

        {/* Top-Level Service Sub-Items Grid */}
        {(!selectedItem && (service.slug === 'wedding' || service.slug === 'pre-wedding-ceremony')) && (
          <ImageGridServiceContent items={service.items} serviceSlug={service.slug} />
        )}

        {/* Dynamic Detail Sections Rendering */}
        {sectionsToRender && sectionsToRender.length > 0 && (
           <ServiceContentSections sections={sectionsToRender} />
        )}

        {/* Optional Media Gallery Rendering */}
        {galleryMedia && (
           <ServiceGallery title={galleryTitle} mediaFiles={galleryMedia} />
        )}

        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-[#E8DFD5]"
        >
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[#4A2F1D] text-[11px] font-bold tracking-[0.25em] uppercase mb-2 block">Related Services</span>
              <h2 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#4A2F1D]">Explore More</h2>
            </div>
            <Link to="/services" className="text-xs font-bold uppercase tracking-[0.18em] text-[#4A2F1D] transition-colors hover:text-[#8B5E45]">
              View All
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedServices.map((item) => {
              const RelatedIcon = iconMap[item.icon] ?? Sparkles;
              return (
                <motion.article key={item.slug} variants={fadeUp} className="rounded-[1.5rem] bg-white p-8 shadow-sm border border-[#E8DFD5] transition-shadow hover:shadow-md">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF7F2] border border-[#D5C5B9] text-[#4A2F1D]">
                    <RelatedIcon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-['Playfair_Display',serif] mb-3 text-xl font-bold text-[#4A2F1D]">{item.title}</h3>
                  <p className="mb-6 text-[12.5px] font-medium leading-relaxed text-[#4A2F1D]">{item.description}</p>
                  <Link to={`/services/${item.slug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A2F1D] transition-colors hover:text-[#8B5E45]">
                    Explore Service <ChevronRight size={14} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default ServiceDetail;
