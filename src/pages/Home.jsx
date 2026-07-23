import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Users, Award, Star, Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/layout/SEO';
import { fadeUp, staggerContainer } from '../utils/animations';
const happyClients = ['Google', 'Capgemini', 'DHL', 'IBM', 'Bajaj', 'Audi', 'Amazon'];
const stats = [
  {
    value: '5,600+',
    label: 'Events\nCompleted',
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
    <div className="bg-[#FAF7F2] font-sans selection:bg-[#A67C65] selection:text-white relative">
      <SEO 
        title="Premium Event Management in Bengaluru"
        description="India Solution provides world-class event management, wedding planning, corporate events, and staging across Bengaluru and India. Turn your vision into extraordinary experiences with flawless execution."
        keywords="event management bengaluru, wedding planners india, corporate events, stage fabrication, premium event planners"
      />
      {/* Hero Section */}
      <section className="relative min-h-[900px] overflow-hidden px-5 pt-32 pb-20 sm:px-8 lg:px-12 lg:pt-40 bg-[#FAF7F2] font-sans">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 bg-[#FAF7F2] overflow-hidden">
          {/* Display the subtle floral texture across the entire background */}
          <img 
            src="/hero-bg.png" 
            alt="Background Floral Texture" 
            className="w-full h-full object-cover object-center opacity-[0.03]"
          />
          {/* Bottom fade for smooth transition */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent z-10" />
        </div>

        <div className="container relative z-20 mx-auto max-w-[1200px] text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="mb-6 flex items-center justify-center gap-4 text-[11px] font-bold tracking-[0.2em] text-[#A67C65]">
              <span className="text-[#8B5E45] text-sm">❖</span>
              <span className="uppercase">Crafting Unforgettable Moments</span>
              <span className="text-[#8B5E45] text-sm">❖</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-['Playfair_Display',serif] text-[#4A2F1D]">
              <span className="block font-bold text-6xl sm:text-7xl lg:text-[90px] tracking-wide mb-1 leading-none">DESIGNED,</span>
              <span className="block italic font-medium text-[54px] sm:text-[64px] lg:text-[78px] text-[#A67C65] tracking-wide leading-[1.1]">PRODUCED & DELIVERED</span>
              <span className="block font-bold tracking-[0.2em] text-3xl sm:text-4xl lg:text-[40px] mt-5 text-[#4A2F1D]">UNDER ONE ROOF.</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="mx-auto my-7 flex items-center justify-center">
              <span className="text-[#8B5E45] text-lg">❖</span>
            </motion.div>

            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-[14px] leading-[1.8] text-[#5c4033] md:text-[15px] font-medium">
              At India Solution, we bring your vision to life, from intimate celebrations to grand corporate gatherings. Trust us to handle the details while you enjoy the moment.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mx-auto mt-12 max-w-[1000px]"
          >
            <div className="bg-[#FAF6F2] rounded-[2rem] shadow-[0_8px_30px_rgb(139,94,69,0.08)] border border-[#EBE3DC] p-6 sm:p-7">
              <div className="grid grid-cols-2 md:grid-cols-4 relative gap-y-6 md:gap-y-0">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="flex flex-row items-center justify-center gap-5 px-2 relative">
                    {index > 0 && (
                       <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-[60%] bg-[#DFD3C8]"></div>
                    )}
                    <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#D5C5B9] bg-transparent text-[#946247]">
                      <stat.icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col text-left justify-center">
                      <h3 className="text-[28px] font-bold text-[#4A2F1D] font-['Playfair_Display',serif] leading-none mb-1">{stat.value}</h3>
                      <p className="text-[11.5px] font-medium text-[#5c4033] leading-tight whitespace-pre-line">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 mb-14 flex justify-center items-center gap-6 relative"
          >
             <div className="flex items-center gap-4">
               <span className="text-[#A67C65] text-sm">❖</span>
               <button className="bg-[#A87455] hover:bg-[#8F6145] text-white px-9 py-3.5 rounded-[4px] font-bold tracking-widest text-[12px] transition-all flex items-center gap-3 shadow-[0_8px_20px_rgb(148,98,71,0.25)] hover:shadow-[0_8px_20px_rgb(148,98,71,0.4)]">
                  CONTACT US <ArrowRight size={15} strokeWidth={2.5} />
               </button>
               <span className="text-[#A67C65] text-sm">❖</span>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5"
          >
            {[
              { img: '/about-us.png', alt: 'Wedding floral aisle decor' },
              { img: '/hero-stage.png', alt: 'Candlelit event table' },
              { img: '/about-us.png', alt: 'Grand stage celebration' },
              { img: '/hero-stage.png', alt: 'Corporate event stage' },
              { img: '/about-us.png', alt: 'Evening celebration lounge' }
            ].map((item, idx) => (
              <div key={idx} className={`relative overflow-hidden rounded-[2.5rem] aspect-[4/5] sm:aspect-[3/4] shadow-[0_10px_30px_rgb(0,0,0,0.08)] border-[6px] border-white bg-white group ${idx === 4 ? 'hidden lg:block' : ''}`}>
                <img src={item.img} alt={item.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* About Us Section */}
      <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 bg-[#FAF7F2] font-sans">
        {/* Subtle left-aligned floral watermark */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <img src="/hero-bg.png" alt="" className="absolute -left-10 top-0 w-full md:w-[60%] h-full object-cover object-left opacity-[0.03]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'}} />
        </div>

        <div className="container relative z-10 mx-auto max-w-[1300px]">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] xl:gap-16">
            
            {/* Left Column: Text Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-2xl pt-4"
            >
              <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-[#A67C65]">
                <span className="text-[#8B5E45] text-xs">❖</span>
                <span className="uppercase">Crafting Unforgettable Moments</span>
                <span className="text-[#8B5E45] text-xs">❖</span>
              </motion.div>

              <motion.h2 variants={fadeUp} className="font-['Playfair_Display',serif] text-[#4A2F1D] mb-8">
                <span className="block font-bold text-5xl md:text-6xl tracking-wide mb-1 leading-[1.1]">DESIGNED, PRODUCED</span>
                <span className="block font-medium text-4xl md:text-5xl text-[#A67C65] tracking-wide leading-[1.2]">& DELIVERED</span>
                <span className="block font-bold tracking-[0.2em] text-2xl md:text-3xl mt-4 text-[#4A2F1D]">UNDER ONE ROOF.</span>
              </motion.h2>

              <div className="space-y-6 text-[#5c4033] text-[14.5px] leading-[1.8] font-medium">
                <motion.p variants={fadeUp}>
                  At <strong className="text-[#A67C65] font-bold">India Solution</strong>, we blend creativity, precision, and passion to craft events that leave a lasting impression. From intimate celebrations to grand corporate gatherings, every detail is thoughtfully planned and flawlessly executed.
                </motion.p>
                <motion.p variants={fadeUp}>
                  With years of experience and a dedicated team of experts, we offer end-to-end event solutions tailored to your unique vision. Our commitment to excellence, innovation, and elegance ensures that your event is not just well-managed — but truly unforgettable.
                </motion.p>
                <motion.p variants={fadeUp}>
                  Trust us to handle the details while you enjoy the moment. At <strong className="text-[#A67C65] font-bold">India Solution</strong>, we don't just organize events — we create memories that last a lifetime.
                </motion.p>
              </div>
            </motion.div>

            {/* Right Column: Image and Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="overflow-hidden rounded-[2rem] shadow-[0_12px_40px_rgba(139,94,69,0.15)] border border-[#E8DFD5]">
                <img src="/hero-stage.png" alt="India Solution event decor" className="h-[350px] md:h-[450px] w-full object-cover" />
              </div>

              <div className="bg-[#FAF6F2] rounded-[1.5rem] shadow-sm border border-[#EBE3DC] py-6 px-4">
                <div className="grid grid-cols-4 relative">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className="flex flex-col items-center justify-center text-center px-1 relative">
                      {index > 0 && (
                         <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-[60%] bg-[#DFD3C8]"></div>
                      )}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#D5C5B9] bg-transparent text-[#A67C65] mb-4">
                        <stat.icon size={20} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-[22px] font-bold text-[#4A2F1D] font-['Playfair_Display',serif] leading-none mb-2">{stat.value}</h3>
                      <p className="text-[10px] font-bold text-[#A67C65] leading-[1.3] whitespace-pre-line">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Brand Statement Section */}
      <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 bg-[#FAF7F2] font-sans">
        {/* Subtle right-aligned floral watermark */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <img src="/hero-bg.png" alt="" className="absolute -right-10 top-0 w-full md:w-[60%] h-full object-cover object-right opacity-[0.03]" style={{ transform: 'scaleX(-1)', maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'}} />
        </div>
        <div className="container relative z-10 mx-auto max-w-[1250px]">
          <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[clamp(320px,35vw,500px)] overflow-hidden rounded-[2.5rem] border border-[#D5C5B9] shadow-[0_12px_40px_rgba(139,94,69,0.15)]"
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
              <h2 className="font-['Playfair_Display',serif] text-5xl md:text-[62px] lg:text-[72px] leading-[1.1] text-[#4A2F1D]">
                <span className="block mb-1">CREATING</span>
                <span className="block italic text-[#A67C65]">UNFORGETTABLE</span>
                <span className="block mt-1">EVENTS</span>
              </h2>

              <div className="my-8 flex items-center gap-4">
                <span className="h-[1.5px] w-16 bg-[#D5C5B9]" />
                <span className="text-[#A67C65] text-sm">❖</span>
                <span className="h-[1.5px] w-16 bg-[#D5C5B9]" />
              </div>

              <p className="font-['Playfair_Display',serif] text-[26px] md:text-[32px] italic tracking-widest text-[#4A2F1D] mb-6">
                SINCE <span className="text-[#A67C65]">2010</span>
              </p>

              <p className="text-[14px] leading-[1.8] font-medium text-[#5c4033] max-w-[400px]">
                At India Solution, we bring your vision to life, from intimate celebrations to grand corporate gatherings. Trust us to handle the details while you enjoy the moment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Why Choose Us & Expertise */}
      <section className="relative overflow-hidden bg-[#FAF7F2] px-5 py-24 sm:px-8 lg:px-12 font-sans">
        {/* Floral watermarks on both sides */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/hero-bg.png" alt="" className="absolute -left-20 top-0 w-[40%] h-[120%] object-cover object-left opacity-[0.03]" style={{ maskImage: 'linear-gradient(to right, black 20%, transparent)'}} />
          <img src="/hero-bg.png" alt="" className="absolute -right-20 top-0 w-[40%] h-[120%] object-cover object-left opacity-[0.03]" style={{ transform: 'scaleX(-1)', maskImage: 'linear-gradient(to right, black 20%, transparent)'}} />
        </div>

        <div className="container relative z-10 mx-auto max-w-[1300px]">
          {/* Our Expertise Section */}
          <div className="mb-24">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 text-center">
              <div className="mb-6 flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.2em] text-[#A67C65]">
                <span className="text-[#8B5E45] text-xs">❖</span>
                <span className="uppercase">Our Expertise</span>
                <span className="text-[#8B5E45] text-xs">❖</span>
              </div>
              <h3 className="font-['Playfair_Display',serif] text-4xl md:text-5xl lg:text-[54px] font-semibold text-[#4A2F1D]">
                Crafting Experiences. <span className="italic text-[#A67C65]">Creating Memories.</span>
              </h3>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-[#8B5E45] text-sm">❖</span>
              </div>
            </motion.div>

            <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 max-w-[1100px] mx-auto">
              {[
                "Corporate Events &\nConferences", "Product Launches &\nBrand Activations",
                "Award Ceremonies &\nAnnual Days", "Weddings & Reception\nProductions",
                "Fashion Shows &\nLifestyle Events", "Concerts & Live\nEntertainment",
                "Store & Business\nLaunches", "Inaugurations &\nGroundbreaking Ceremonies",
                "Exhibitions &\nTrade Shows", "Cultural & Community\nEvents",
                "College Festivals &\nGraduation Ceremonies", "Birthday Celebrations &\nPrivate Parties",
                "Social &\nFamily Events", "Government &\nPublic Events",
                "Sports Events &\nTournaments", "Roadshows &\nPromotional Campaigns"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-4 rounded-[1.2rem] bg-[#FAF4F0]/80 p-3.5 border border-[#E8DFD5] shadow-sm hover:border-[#D5C5B9] hover:shadow-md transition-all"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8A563C] to-[#603A28] shadow-inner">
                    <Star className="text-white drop-shadow-sm" size={16} strokeWidth={2} />
                  </div>
                  <span className="text-[11px] leading-[1.3] font-bold text-[#5c4033] whitespace-pre-line">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why Choose India Solution Section */}
          <div className="mb-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 text-center">
              <div className="mb-6 flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.2em] text-[#A67C65]">
                <span className="text-[#8B5E45] text-xs">❖</span>
                <span className="uppercase">Why Choose India Solution?</span>
                <span className="text-[#8B5E45] text-xs">❖</span>
              </div>
              <h3 className="font-['Playfair_Display',serif] text-4xl md:text-5xl lg:text-[54px] font-semibold text-[#4A2F1D]">
                Excellence in <span className="italic text-[#A67C65]">Every Detail</span>
              </h3>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6 lg:gap-8 max-w-[1200px] mx-auto">
              {[
                { title: "15+ Years of\nIndustry Experience", desc: "A legacy of trust, creativity\nand flawless execution." },
                { title: "Complete In-House\nProduction", desc: "End to end solutions under\none roof for seamless delivery." },
                { title: "No Middlemen or\nThird-Party Dependencies", desc: "Direct communication,\ntransparent processes." },
                { title: "Single Point\nof Contact", desc: "One dedicated partner\nyou can rely on." },
                { title: "Premium Quality\nat Every Scale", desc: "Uncompromising quality\nwhether intimate or grand." },
                { title: "Cost-Effective\nSolutions", desc: "Maximum value without\ncompromising on quality." },
                { title: "Highly Experienced\nTechnical & Creative Team", desc: "Passionate professionals bringing\nyour vision to life." },
                { title: "End-to-End Event\nManagement", desc: "From concept to completion,\nwe handle it all." },
                { title: "Reliable Execution &\nOn-Time Delivery", desc: "Your deadlines are our\ncommitment." },
                { title: "Customized Concepts &\nInnovative Designs", desc: "Unique ideas tailored\njust for you." },
                { title: "Trusted by Event Companies,\nVenues, Brands & Corporates", desc: "Long-term partnerships built\non trust and excellence." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center text-center rounded-[2rem] bg-transparent py-4 px-2 w-[100%] sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2rem)]"
                >
                  <div className="flex h-14 w-14 mb-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#D5C5B9] bg-transparent">
                    <Star className="text-[#A67C65]" size={22} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[12.5px] leading-snug font-bold text-[#4A2F1D] whitespace-pre-line mb-2">{item.title}</h4>
                  <p className="text-[10.5px] leading-relaxed font-medium text-[#7C5A48] whitespace-pre-line">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Missing Text & Headings */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-4xl text-center mt-12 mb-16">
            <p className="text-[13px] font-medium text-[#5c4033] leading-relaxed mb-10">
              At India Solution, we don’t just organize events—we design experiences, produce excellence,<br/>and execute with precision. Every event reflects our commitment to quality, creativity,<br/>innovation, and flawless execution, ensuring every client receives the same premium service,<br/>regardless of the event size or budget.
            </p>
            <div className="flex justify-center mb-8"><span className="text-[#A67C65] text-sm">❖</span></div>
            <h4 className="font-['Playfair_Display',serif] text-4xl md:text-[42px] lg:text-[48px] font-semibold text-[#4A2F1D]">
              ONE TEAM. ONE PARTNER.<br/>
              <span className="italic text-[#A67C65] mt-2 block tracking-wide">ENDLESS POSSIBILITIES.</span>
            </h4>
            <div className="flex justify-center mt-8 mb-4"><span className="text-[#A67C65] text-sm">❖</span></div>
          </motion.div>
        </div>
      </section>
      
      {/* Happy Clients */}
      <section className="bg-[#FAF7F2] px-5 pb-24 sm:px-8 lg:px-12 font-sans relative z-10">
        <div className="relative mx-auto max-w-[1050px] overflow-hidden rounded-[2rem] border border-[#E8DFD5] bg-[#FAF6F2] shadow-sm px-5 py-12 sm:px-8 lg:px-12">
          
          <div className="relative z-10 text-center">
            <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-semibold text-[#4A2F1D] tracking-wide">
              OUR <span className="italic text-[#A67C65]">HAPPY</span> CLIENTS
            </h2>
            <div className="mx-auto mt-6 flex justify-center">
              <span className="text-[#A67C65] text-sm">❖</span>
            </div>
          </div>

          <div className="relative z-10 mt-12 overflow-hidden py-5" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'}}>
            <div className="client-logo-track flex items-center gap-0">
              {[...happyClients, ...happyClients].map((brand, index) => (
                <div key={`${brand}-${index}`} className="relative flex flex-col items-center justify-center min-w-[260px] px-8" aria-hidden={index >= happyClients.length}>
                  <ClientLogo brand={brand} />
                  {/* Small diamond below the logo */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[#D5C5B9] text-[10px]">❖</div>
                  {/* Vertical separator between items */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-[#E8DFD5]"></div>
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