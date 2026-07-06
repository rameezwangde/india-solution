import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Users, Award, Briefcase, Clock, Sparkles, Crosshair, Heart, Star } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';
const happyClients = ['Google', 'Capgemini', 'DHL', 'IBM', 'Bajaj', 'Audi', 'Amazon'];
const stats = [
  {
    value: '5,600+',
    label: 'Events Completed',
    icon: CalendarDays,
    ring: 'border-[#E91E63] shadow-[0_0_28px_rgba(233,30,99,0.58)]',
    dot: 'bg-[#E91E63]',
    bar: 'bg-[#E91E63]',
  },
  {
    value: '2,500+',
    label: 'Happy Clients',
    icon: Users,
    ring: 'border-[#FF2A85] shadow-[0_0_28px_rgba(255,42,133,0.58)]',
    dot: 'bg-[#FF2A85]',
    bar: 'bg-[#FF2A85]',
  },
  {
    value: '15+',
    label: 'Years Experience',
    icon: Award,
    ring: 'border-[#E91E63] shadow-[0_0_28px_rgba(233,30,99,0.5)]',
    dot: 'bg-[#E91E63]',
    bar: 'bg-[#E91E63]',
  },
  {
    value: '50+',
    label: 'Event Categories',
    icon: Star,
    ring: 'border-[#FF9800] shadow-[0_0_28px_rgba(255,152,0,0.58)]',
    dot: 'bg-[#FF9800]',
    bar: 'bg-[#FF9800]',
  },
];

const ClientLogo = ({ brand }) => {
  switch (brand) {
    case 'Google':
      return (
        <span className="text-4xl font-medium tracking-tight md:text-5xl" aria-label="Google">
          <span className="text-[#4285F4]">G</span><span className="text-[#DB4437]">o</span><span className="text-[#F4B400]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#0F9D58]">l</span><span className="text-[#DB4437]">e</span>
        </span>
      );
    case 'Capgemini':
      return (
        <span className="flex items-center gap-2 text-3xl font-semibold italic text-[#0070AD] md:text-4xl" aria-label="Capgemini">
          Capgemini
          <span className="h-5 w-7 rounded-full bg-[#12ABDB] [clip-path:ellipse(45%_35%_at_50%_50%)]" />
        </span>
      );
    case 'DHL':
      return (
        <span className="flex items-end gap-2 text-[#D40511]" aria-label="DHL Group">
          <span className="text-4xl font-black italic tracking-tight md:text-5xl">DHL</span>
          <span className="mb-1 text-sm font-bold">Group</span>
        </span>
      );
    case 'IBM':
      return <span className="ibm-wordmark" aria-label="IBM">IBM</span>;
    case 'Bajaj':
      return (
        <span className="flex items-center gap-3 text-[#005BAA]" aria-label="Bajaj">
          <span className="text-4xl font-black leading-none md:text-5xl">B</span>
          <span className="text-2xl font-black tracking-widest md:text-3xl">BAJAJ</span>
        </span>
      );
    case 'Audi':
      return (
        <span className="flex flex-col items-center leading-none" aria-label="Audi">
          <span className="flex -space-x-2">
            {[0, 1, 2, 3].map((ring) => (
              <span key={ring} className="h-8 w-8 rounded-full border-[3px] border-[#9B9B9B] bg-transparent" />
            ))}
          </span>
          <span className="mt-1 text-2xl font-bold text-[#E0001B]">Audi</span>
        </span>
      );
    case 'Amazon':
      return <span className="amazon-wordmark" aria-label="Amazon">amazon</span>;
    default:
      return <span>{brand}</span>;
  }
};

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-showcase relative min-h-[680px] overflow-hidden px-5 pb-6 pt-28 text-white sm:px-8 lg:px-12 lg:pt-32">
        <div className="hero-showcase-glow hero-showcase-glow-left" />
        <div className="hero-showcase-glow hero-showcase-glow-right" />

        <div className="container relative z-10 mx-auto max-w-[1340px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={fadeUp} className="mb-3 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.36em] text-gold">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-magenta" />
              <span>Crafting Unforgettable Moments</span>
              <span className="h-px w-8 bg-gradient-to-r from-orange to-transparent" />
            </motion.div>

            <motion.h1 variants={fadeUp} className="site-heading text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Designed,
              <span className="site-heading-accent block italic">Produced & Delivered</span>
              <span className="block text-2xl tracking-[0.36em] sm:text-3xl lg:text-4xl">Under One Roof.</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="mx-auto my-3 flex w-52 items-center justify-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-magenta" />
              <span className="text-gold">&#10022;</span>
              <span className="h-px flex-1 bg-gradient-to-r from-magenta to-transparent" />
            </motion.div>

            <motion.p variants={fadeUp} className="mx-auto max-w-xl text-sm leading-6 text-gray-300 md:text-base">
              At India Solution, we bring your vision to life, from intimate celebrations to grand corporate gatherings. Trust us to handle the details while you enjoy the moment.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hero-stat-bar mx-auto mt-5 max-w-[860px]"
          >
            <div className="grid grid-cols-2 gap-y-5 md:grid-cols-4 md:gap-y-0">
              {stats.map((stat, index) => (
                <div key={stat.label} className={`flex items-center justify-center gap-4 px-5 ${index > 0 ? 'md:border-l md:border-white/10' : ''}`}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-magenta/35 bg-magenta/10 text-magenta shadow-[0_0_18px_rgba(233,30,99,0.2)]">
                    <stat.icon size={20} strokeWidth={1.7} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold leading-none text-white">{stat.value}</h3>
                    <p className="mt-1 text-xs text-gray-300">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="hero-photo-stage relative mx-auto mt-5 h-[300px] max-w-[1200px] sm:h-[340px] lg:h-[360px]"
          >
            <div className="hero-photo-card hero-photo-card-one">
              <img src="/about-us.png" alt="Wedding floral aisle decor" />
            </div>
            <div className="hero-photo-card hero-photo-card-two">
              <img src="/hero-stage.png" alt="Candlelit event table" />
            </div>
            <div className="hero-photo-card hero-photo-card-main">
              <img src="/about-us.png" alt="Grand stage celebration" />
            </div>
            <div className="hero-photo-card hero-photo-card-four">
              <img src="/hero-stage.png" alt="Corporate event stage" />
            </div>
            <div className="hero-photo-card hero-photo-card-five">
              <img src="/about-us.png" alt="Evening celebration lounge" />
            </div>

            <div className="hero-years-badge">
              <span className="text-gold">&#9819;</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-magenta">Celebrating</span>
              <span className="font-display text-5xl font-semibold leading-none text-white">15+</span>
              <span className="text-xs font-bold uppercase tracking-widest text-white">Years of Excellence</span>
              <span className="mt-1 h-0.5 w-9 bg-orange" />
            </div>
          </motion.div>
        </div>
      </section>
      {/* About Us Section */}
      <section className="about-showcase relative overflow-hidden px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="about-showcase-wave about-showcase-wave-left" />
        <div className="about-showcase-wave about-showcase-wave-right" />

        <div className="container relative z-10 mx-auto">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] xl:gap-14">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <motion.span variants={fadeUp} className="mb-3 block text-xs font-bold uppercase tracking-widest text-gold">
                About India Solution
              </motion.span>
              <motion.span variants={fadeUp} className="mb-5 block h-0.5 w-10 bg-[#FF4B64]" />
              <motion.h2 variants={fadeUp} className="site-heading text-4xl font-semibold leading-tight md:text-5xl">
                Designed, Produced & Delivered
                <span className="site-heading-accent block text-3xl mt-2">Under One Roof.</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="my-6 flex items-center gap-5 text-magenta/70">
                <span className="h-px w-24 bg-gradient-to-r from-magenta to-orange/70" />
                <span className="text-sm text-gold">&#10022;</span>
                <span className="h-px w-24 bg-gradient-to-r from-orange/70 to-transparent" />
              </motion.div>
              <motion.p variants={fadeUp} className="mb-5 text-sm leading-7 text-gray-300 md:text-base">
                For over 15 years, <strong className="site-gold-text">India Solution</strong> has been one of Bengaluru’s trusted names in Event Management and In-House Event Production, delivering seamless, premium-quality experiences for events of every scale.
              </motion.p>
              <motion.p variants={fadeUp} className="mb-5 text-sm leading-7 text-gray-300 md:text-base">
                What truly sets us apart is that everything you see at an event is produced and managed in-house. From concept development, stage production, LED walls, sound, lighting, trussing, fabrication, décor, branding, artist management, technical execution, logistics, and on-ground operations—we handle it all under one roof.
              </motion.p>
              <motion.p variants={fadeUp} className="mb-7 text-sm leading-7 text-gray-300 md:text-base">
                That means no middlemen, no multiple vendors, no communication gaps—just one dedicated point of contact for your entire event.
              </motion.p>
              <motion.p variants={fadeUp} className="mb-7 text-sm leading-7 text-gray-300 md:text-base">
                Because our entire team works together as one unit, every department is perfectly synchronized. The result is better coordination, faster execution, consistent quality, and cost-effective solutions without compromising on creativity or premium standards.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-0"
            >
              <div className="overflow-hidden rounded-[38px] border border-white/10 shadow-[0_0_40px_rgba(233,30,99,0.12)]">
                <img src="/hero-stage.png" alt="India Solution event decor" className="h-[300px] w-full object-cover md:h-[420px]" />
              </div>

              <div className="stats-glow-panel relative -mt-1 overflow-hidden rounded-[22px] border border-magenta/50 px-5 py-8 shadow-[0_0_32px_rgba(233,30,99,0.18)] md:px-7 md:py-9">
                <div className="stats-wave stats-wave-purple" />
                <div className="stats-wave stats-wave-orange" />
                <div className="relative z-10 grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className={`relative flex flex-col items-center text-center ${index > 0 ? 'md:border-l md:border-white/20' : ''}`}>
                      <div className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white/5 ${stat.ring}`}>
                        <stat.icon size={28} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.75)]" strokeWidth={1.7} />
                        <span className={`absolute -right-1 bottom-2 h-3 w-3 rounded-full shadow-[0_0_12px_currentColor] ${stat.dot}`} />
                      </div>
                      <h4 className="font-display text-3xl font-semibold leading-none text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.18)] md:text-4xl">{stat.value}</h4>
                      <p className="mt-2 text-xs font-medium text-gray-300 md:text-sm">{stat.label}</p>
                      <span className={`mt-4 h-1 w-10 rounded-full ${stat.bar}`} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 mx-auto max-w-5xl text-center space-y-6">
            <p className="text-gray-300 text-sm md:text-base leading-7">
              Whether you’re planning an intimate celebration for 15 guests or a large-scale production for 15,000 attendees, we deliver the same attention to detail, professionalism, and world-class execution.
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-7">
              Over the years, we have proudly served as official production and event partners for leading event management companies, premium venues, corporate organizations, educational institutions, government bodies, brands, and private clients across Karnataka and beyond. Our experience spans both B2B and B2C projects, earning us long-term relationships built on trust, reliability, and exceptional delivery.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Brand Statement Section */}
      <section className="brand-collage-section relative overflow-hidden px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="brand-collage-dots" />
        <div className="container relative z-10 mx-auto max-w-[1320px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="brand-collage-frame"
            >
              <div className="brand-collage-slice brand-collage-slice-one">
                <img src="/about-us.png" alt="Wedding aisle decor" />
              </div>
              <div className="brand-collage-slice brand-collage-slice-two">
                <img src="/hero-stage.png" alt="Event table floral decor" />
              </div>
              <div className="brand-collage-slice brand-collage-slice-three">
                <img src="/about-us.png" alt="Corporate event lighting" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="max-w-xl"
            >
              <h2 className="site-heading text-4xl font-semibold italic leading-tight md:text-5xl lg:text-6xl">
                Creating
                <span className="site-heading-accent block">Unforgettable</span>
                <span className="block">Events</span>
              </h2>

              <div className="my-7 flex items-center gap-4">
                <span className="h-px w-24 bg-gradient-to-r from-magenta to-gold" />
                <span className="text-[#FF7A59]">&#10022;</span>
                <span className="h-px w-24 bg-gradient-to-r from-gold to-orange" />
              </div>

              <p className="site-heading text-3xl font-semibold italic tracking-[0.18em] md:text-4xl">
                Since <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">2010</span>
              </p>

              <p className="mt-8 max-w-lg text-lg leading-8 text-gray-300">
                At India Solution, we bring your vision to life, from intimate celebrations to grand corporate gatherings. Trust us to handle the details while you enjoy the moment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Why Choose Us & Expertise */}
      <section className="relative overflow-hidden bg-[#10172A] px-5 py-16 text-white sm:px-8 lg:px-12">
        <div className="container mx-auto max-w-[1460px]">
          <div className="mb-20">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 text-center">
              <h3 className="font-display text-3xl font-semibold text-gold md:text-4xl">Our Expertise</h3>
              <div className="mx-auto mt-4 flex w-24 items-center gap-2">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-magenta" />
                <span className="text-xs text-magenta">&#10022;</span>
                <span className="h-px flex-1 bg-gradient-to-r from-magenta to-transparent" />
              </div>
            </motion.div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Corporate Events & Conferences", "Product Launches & Brand Activations", 
                "Award Ceremonies & Annual Days", "Weddings & Reception Productions", 
                "Fashion Shows & Lifestyle Events", "Concerts & Live Entertainment", 
                "Store & Business Launches", "Inaugurations & Groundbreaking Ceremonies", 
                "Exhibitions & Trade Shows", "Cultural & Community Events", 
                "College Festivals & Graduation Ceremonies", "Birthday Celebrations & Private Parties", 
                "Social & Family Events", "Government & Public Events", 
                "Sports Events & Tournaments", "Roadshows & Promotional Campaigns"
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-5 border border-white/5 hover:border-magenta/40 hover:bg-white/[0.06] transition-all"
                >
                  <Star className="text-magenta shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(233,30,99,0.5)]" size={18} />
                  <span className="text-sm font-medium text-gray-200">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 text-center">
              <h3 className="font-display text-3xl font-semibold text-orange md:text-4xl">Why Choose India Solution?</h3>
              <div className="mx-auto mt-4 flex w-24 items-center gap-2">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-orange" />
                <span className="text-xs text-gold">&#10022;</span>
                <span className="h-px flex-1 bg-gradient-to-r from-gold to-transparent" />
              </div>
            </motion.div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "15+ Years of Industry Experience", "Complete In-House Production", 
                "No Middlemen or Third-Party Dependencies", "Single Point of Contact", 
                "Premium Quality at Every Scale", "Cost-Effective Solutions", 
                "Highly Experienced Technical & Creative Team", "End-to-End Event Management", 
                "Reliable Execution & On-Time Delivery", "Customized Concepts & Innovative Designs", 
                "Trusted by Event Companies, Venues, Brands & Corporates"
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-5 border border-white/5 hover:border-orange/40 hover:bg-white/[0.06] transition-all"
                >
                  <Star className="text-orange shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(255,152,0,0.5)]" size={18} />
                  <span className="text-sm font-medium text-gray-200">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-4xl text-center">
            <p className="text-gray-300 text-sm md:text-base leading-7 mb-10">
              At India Solution, we don’t just organize events—we design experiences, produce excellence, and execute with precision. Every event reflects our commitment to quality, creativity, innovation, and flawless execution, ensuring every client receives the same premium service, regardless of the event size or budget.
            </p>
            <h4 className="text-xl md:text-3xl font-display font-bold tracking-[0.15em] uppercase">
              <span className="bg-gradient-to-r from-magenta via-gold to-orange bg-clip-text text-transparent">One Team. One Partner. Endless Possibilities.</span>
            </h4>
          </motion.div>
        </div>
      </section>
      {/* Happy Clients */}
      <section className="bg-[#10172A] px-5 py-16 text-white sm:px-8 lg:px-12">
        <div className="happy-clients-panel relative mx-auto max-w-[1320px] overflow-hidden rounded-[22px] px-5 py-8 sm:px-8 lg:px-12">
          <div className="happy-clients-dots happy-clients-dots-left" />
          <div className="happy-clients-dots happy-clients-dots-right" />

          <div className="relative z-10 text-center">
            <div className="mx-auto mb-4 flex max-w-xl items-center justify-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-magenta" />
              <span className="text-gold">&#10022;</span>
              <span className="h-px flex-1 bg-gradient-to-r from-orange to-transparent" />
            </div>
            <h2 className="site-heading text-4xl font-semibold md:text-5xl">
              Our <span className="site-heading-accent">Happy</span> Clients
            </h2>
            <div className="mx-auto mt-4 flex max-w-4xl items-center justify-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-magenta/40" />
              <span className="text-gold">&#10022;</span>
              <span className="h-px flex-1 bg-gradient-to-r from-orange/40 via-white/10 to-transparent" />
            </div>
          </div>

          <div className="relative z-10 mt-9 overflow-hidden py-5">
            <div className="client-logo-track flex items-center gap-0">
              {[...happyClients, ...happyClients].map((brand, index) => (
                <div key={`${brand}-${index}`} className="client-logo-item happy-client-logo-item" aria-hidden={index >= happyClients.length}>
                  <ClientLogo brand={brand} />
                  <span className="happy-client-logo-divider" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;