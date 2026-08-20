import { m as motion, LazyMotion, domAnimation } from 'framer-motion';
import { ArrowRight, CalendarDays, Users, Award, Star, Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/layout/SEO';
import { fadeUp, staggerContainer } from '../utils/animations';
import { Link } from 'react-router-dom';
import { serviceCatalog } from '../data/serviceCatalog';
import homeData from '../content/home.json';
import { useTina } from 'tinacms/dist/react';


const iconMap = {
  CalendarDays,
  Users,
  Award,
  Star
};



const Home = () => {
  const { data } = useTina({
    query: `query {
      home(relativePath: "home.json") {
        seo { title description keywords }
        heroImages { img alt }
        hero { subtitle titleLine1 titleLine2 titleLine3 contactButtonText description }
        about { subtitle titleLine1 titleLine2 titleLine3 image paragraphs }
        stats { value label iconName }
        brandStatement { image titleLine1 titleLine2 titleLine3 sinceText1 sinceText2 description }
        expertiseSection { subtitle titleLine1 titleLine2 }
        whyChooseUs { subtitle titleLine1 titleLine2 reasons { title desc } }
        bottomStatement { paragraph titleLine1 titleLine2 }
        happyClients { name logo }
      }
    }`,
    variables: { relativePath: "home.json" },
    data: { home: homeData },
  });

  const activeData = data.home;

  const stats = activeData.stats.map(stat => ({
    ...stat,
    icon: iconMap[stat.iconName] || Star
  }));

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EventVenue",
        "@id": "https://www.india-solution.com/#organization",
        "name": "India Solution Events",
        "url": "https://www.india-solution.com/",
        "logo": "https://www.india-solution.com/logo-only.png",
        "telephone": "+916360181932",
        "email": "info@india-solution.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "India Solution Production House, Railway Mens Employees layout, Jnananjyothinagar",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "postalCode": "560056",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.facebook.com/indiasolutionevents",
          "https://www.instagram.com/indiasolutionevents"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.india-solution.com/#website",
        "url": "https://www.india-solution.com/",
        "name": "India Solution",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.india-solution.com/inventory-demo?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-[#FAF7F2] font-sans selection:bg-[#A67C65] selection:text-white relative">
        <SEO
          title={activeData.seo.title}
          description={activeData.seo.description}
          keywords={activeData.seo.keywords}
          schema={homeSchema}
        />
        {/* Hero Section */}
        <section className="relative min-h-[900px] overflow-hidden px-5 pt-32 pb-10 sm:px-8 lg:px-12 lg:pt-40 bg-[#FAF7F2] font-sans">
          {/* Background Layer */}
          <div className="absolute inset-0 z-0 bg-[#FAF7F2] overflow-hidden">
            {/* Display the subtle floral texture across the entire background */}
            <img
              src="/hero-bg.webp"
              alt="Background Floral Texture"
              fetchPriority="high"
              className="w-full h-full object-cover object-center opacity-[0.03]"
            />
            {/* Bottom fade for smooth transition */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent z-10" />
          </div>

          <div className="container relative z-20 mx-auto max-w-[1200px] text-center">
            <div className="mx-auto flex flex-col items-center">
              <div className="mb-6 flex items-center justify-center gap-4 text-[11px] font-bold tracking-[0.2em] text-[#4A2F1D]">
                <span className="text-[#8B5E45] text-sm">❖</span>
                <span className="uppercase">{activeData.hero.subtitle}</span>
                <span className="text-[#8B5E45] text-sm">❖</span>
              </div>

              <h1 className="font-['Playfair_Display',serif] text-[#4A2F1D]">
                <span className="block font-black text-6xl sm:text-7xl lg:text-[90px] tracking-wide mb-1 leading-none text-[#2A1810]">{activeData.hero.titleLine1}</span>
                <span className="block italic font-bold text-[54px] sm:text-[64px] lg:text-[78px] text-[#4A2F1D] tracking-wide leading-[1.1]">{activeData.hero.titleLine2}</span>
                <span className="block font-black tracking-[0.2em] text-3xl sm:text-4xl lg:text-[40px] mt-5 text-[#2A1810]">{activeData.hero.titleLine3}</span>
              </h1>

              <div className="mx-auto my-7 flex items-center justify-center">
                <span className="text-[#8B5E45] text-lg">❖</span>
              </div>

              <p className="mx-auto max-w-2xl text-[15px] leading-[1.8] text-[#2A1810] md:text-[16px] font-semibold">
                {activeData.hero.description}
              </p>
            </div>

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
                        <p className="text-[11.5px] font-medium text-[#2A1810] leading-tight whitespace-pre-line">{stat.label}</p>
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
                <span className="text-[#4A2F1D] text-sm">❖</span>
                <Link to="/contact" className="bg-[#A87455] hover:bg-[#8F6145] text-white px-9 py-3.5 rounded-[4px] font-bold tracking-widest text-[12px] transition-all flex items-center gap-3 shadow-[0_8px_20px_rgb(148,98,71,0.25)] hover:shadow-[0_8px_20px_rgb(148,98,71,0.4)]">
                  {activeData.hero.contactButtonText} <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
                <span className="text-[#4A2F1D] text-sm">❖</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5"
            >
              {activeData.heroImages.map((item, idx) => (
                <div key={idx} className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] sm:aspect-[3/4] shadow-[0_10px_30px_rgb(0,0,0,0.08)] border-[6px] border-white bg-white group">
                  <img src={item.img} alt={item.alt} fetchPriority={idx < 2 ? "high" : "auto"} loading={idx < 2 ? "eager" : "lazy"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
        {/* About Us Section */}
        <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:px-12 bg-[#FAF7F2] font-sans">
          {/* Subtle left-aligned floral watermark */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img src="/hero-bg.webp" alt="" className="absolute -left-10 top-0 w-full md:w-[60%] h-full object-cover object-left opacity-[0.03]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
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
                <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-[#4A2F1D]">
                  <span className="text-[#8B5E45] text-xs">❖</span>
                  <span className="uppercase">{activeData.about.subtitle}</span>
                  <span className="text-[#8B5E45] text-xs">❖</span>
                </motion.div>

                <motion.h2 variants={fadeUp} className="font-['Playfair_Display',serif] text-[#2A1810] mb-8">
                  <span className="block font-black text-5xl md:text-6xl tracking-wide mb-1 leading-[1.1]">{activeData.about.titleLine1}</span>
                  <span className="block font-bold text-4xl md:text-5xl text-[#4A2F1D] tracking-wide leading-[1.2]">{activeData.about.titleLine2}</span>
                  <span className="block font-black tracking-[0.2em] text-2xl md:text-3xl mt-4 text-[#2A1810]">{activeData.about.titleLine3}</span>
                </motion.h2>

                <div className="space-y-6 text-[#2A1810] text-[15.5px] leading-[1.8] font-semibold">
                  {activeData.about.paragraphs.map((paragraph, index) => {
                    const formatText = (text) => {
                      const parts = text.split(/(\*\*.*?\*\*)/);
                      return parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={i} className="text-[#4A2F1D] font-black">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      });
                    };
                    return (
                      <motion.p key={index} variants={fadeUp}>
                        {formatText(paragraph)}
                      </motion.p>
                    );
                  })}
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
                  <img src={activeData.about.image} alt="India Solution event decor" loading="lazy" decoding="async" className="h-[350px] md:h-[450px] w-full object-cover" />
                </div>

                <div className="bg-[#FAF6F2] rounded-[1.5rem] shadow-sm border border-[#EBE3DC] py-6 px-4">
                  <div className="grid grid-cols-4 relative">
                    {stats.map((stat, index) => (
                      <div key={stat.label} className="flex flex-col items-center justify-center text-center px-1 relative">
                        {index > 0 && (
                          <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-[60%] bg-[#DFD3C8]"></div>
                        )}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#D5C5B9] bg-transparent text-[#4A2F1D] mb-4">
                          <stat.icon size={20} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-[22px] font-bold text-[#4A2F1D] font-['Playfair_Display',serif] leading-none mb-2">{stat.value}</h3>
                        <p className="text-[10px] font-bold text-[#4A2F1D] leading-[1.3] whitespace-pre-line">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Brand Statement Section */}
        <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:px-12 bg-[#FAF7F2] font-sans">
          {/* Subtle right-aligned floral watermark */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img src="/hero-bg.webp" alt="" loading="lazy" decoding="async" className="absolute -right-10 top-0 w-full md:w-[60%] h-full object-cover object-right opacity-[0.03]" style={{ transform: 'scaleX(-1)', maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
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
                <img src={activeData.brandStatement.image} alt="India Solution Luxury Event Setup" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="max-w-xl"
              >
                <h2 className="font-['Playfair_Display',serif] text-5xl md:text-[62px] lg:text-[72px] leading-[1.1] text-[#4A2F1D]">
                  <span className="block mb-1">{activeData.brandStatement.titleLine1}</span>
                  <span className="block italic text-[#4A2F1D]">{activeData.brandStatement.titleLine2}</span>
                  <span className="block mt-1">{activeData.brandStatement.titleLine3}</span>
                </h2>

                <div className="my-8 flex items-center gap-4">
                  <span className="h-[1.5px] w-16 bg-[#D5C5B9]" />
                  <span className="text-[#4A2F1D] text-sm">❖</span>
                  <span className="h-[1.5px] w-16 bg-[#D5C5B9]" />
                </div>

                <p className="font-['Playfair_Display',serif] text-[26px] md:text-[32px] italic tracking-widest text-[#4A2F1D] mb-6">
                  {activeData.brandStatement.sinceText1} <span className="text-[#4A2F1D]">{activeData.brandStatement.sinceText2}</span>
                </p>

                <p className="text-[15px] leading-[1.8] font-bold text-[#2A1810] max-w-[400px]">
                  {activeData.brandStatement.description}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Why Choose Us & Expertise */}
        <section className="relative overflow-hidden bg-[#FAF7F2] px-5 py-10 sm:px-8 lg:px-12 font-sans content-visibility-auto">
          {/* Floral watermarks on both sides */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img src="/hero-bg.webp" alt="" loading="lazy" decoding="async" className="absolute -left-20 top-0 w-[40%] h-[120%] object-cover object-left opacity-[0.03]" style={{ maskImage: 'linear-gradient(to right, black 20%, transparent)' }} />
            <img src="/hero-bg.webp" alt="" loading="lazy" decoding="async" className="absolute -right-20 top-0 w-[40%] h-[120%] object-cover object-left opacity-[0.03]" style={{ transform: 'scaleX(-1)', maskImage: 'linear-gradient(to right, black 20%, transparent)' }} />
          </div>

          <div className="container relative z-10 mx-auto max-w-[1300px]">
            {/* Our Expertise Section */}
            <div className="mb-14">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 text-center">
                <div className="mb-6 flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.2em] text-[#4A2F1D]">
                  <span className="text-[#8B5E45] text-xs">❖</span>
                  <span className="uppercase">{activeData.expertiseSection.subtitle}</span>
                  <span className="text-[#8B5E45] text-xs">❖</span>
                </div>
                <h3 className="font-['Playfair_Display',serif] text-4xl md:text-5xl lg:text-[54px] font-semibold text-[#4A2F1D]">
                  {activeData.expertiseSection.titleLine1} <span className="italic text-[#4A2F1D]">{activeData.expertiseSection.titleLine2}</span>
                </h3>
                <div className="mt-8 flex items-center justify-center">
                  <span className="text-[#8B5E45] text-sm">❖</span>
                </div>
              </motion.div>

              <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 max-w-[1100px] mx-auto">
                {serviceCatalog.map((service, i) => (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="flex items-center gap-4 rounded-[1.2rem] bg-[#FAF4F0]/80 p-3.5 border border-[#E8DFD5] shadow-sm hover:border-[#D5C5B9] hover:shadow-md transition-all h-full group"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8A563C] to-[#603A28] shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <Star className="text-white drop-shadow-sm" size={16} strokeWidth={2} />
                      </div>
                      <span className="text-[14px] leading-[1.3] font-bold text-[#2A1810] whitespace-pre-line group-hover:text-[#4A2F1D]">{service.title}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Why Choose India Solution Section */}
            <div className="mb-10">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 text-center">
                <div className="mb-6 flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.2em] text-[#4A2F1D]">
                  <span className="text-[#8B5E45] text-xs">❖</span>
                  <span className="uppercase">{activeData.whyChooseUs.subtitle}</span>
                  <span className="text-[#8B5E45] text-xs">❖</span>
                </div>
                <h3 className="font-['Playfair_Display',serif] text-4xl md:text-5xl lg:text-[54px] font-semibold text-[#4A2F1D]">
                  {activeData.whyChooseUs.titleLine1} <span className="italic text-[#4A2F1D]">{activeData.whyChooseUs.titleLine2}</span>
                </h3>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-6 lg:gap-8 max-w-[1200px] mx-auto">
                {activeData.whyChooseUs.reasons.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="flex flex-col items-center text-center rounded-[2rem] bg-transparent py-4 px-2 w-[100%] sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2rem)]"
                  >
                    <div className="flex h-14 w-14 mb-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#C0602F]/30 bg-transparent transition-colors">
                      <Star className="text-[#C0602F]" fill="#C0602F" size={22} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-[16px] md:text-[18px] leading-snug font-black text-[#2A1810] whitespace-pre-line mb-2">{item.title}</h4>
                    <p className="text-[14px] leading-relaxed font-medium text-[#4A2F1D] whitespace-pre-line">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Missing Text & Headings */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-4xl text-center mt-12 mb-6">
              <p className="text-[15px] font-semibold text-[#2A1810] leading-relaxed mb-10 whitespace-pre-line">
                {activeData.bottomStatement.paragraph}
              </p>
              <div className="flex justify-center mb-8"><span className="text-[#4A2F1D] text-sm">❖</span></div>
              <h4 className="font-['Playfair_Display',serif] text-4xl md:text-[42px] lg:text-[48px] font-semibold text-[#4A2F1D]">
                {activeData.bottomStatement.titleLine1}<br />
                <span className="italic text-[#4A2F1D] mt-2 block tracking-wide">{activeData.bottomStatement.titleLine2}</span>
              </h4>
              <div className="flex justify-center mt-8 mb-4"><span className="text-[#4A2F1D] text-sm">❖</span></div>
            </motion.div>
          </div>
        </section>

        {/* Happy Clients */}
        <section className="bg-[#FAF7F2] px-5 pb-24 sm:px-8 lg:px-12 font-sans relative z-10 content-visibility-auto">
          <div className="relative mx-auto max-w-[1050px] overflow-hidden rounded-[2rem] border border-[#E8DFD5] bg-[#FAF6F2] shadow-sm px-5 py-12 sm:px-8 lg:px-12">

            <div className="relative z-10 text-center">
              <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-semibold text-[#4A2F1D] tracking-wide">
                OUR <span className="italic text-[#4A2F1D]">HAPPY</span> CLIENTS
              </h2>
              <div className="mx-auto mt-6 flex justify-center">
                <span className="text-[#4A2F1D] text-sm">❖</span>
              </div>
            </div>

            <div className="relative z-10 mt-12 overflow-hidden py-5" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
              <div className="client-logo-track flex items-center gap-0">
                {[...activeData.happyClients, ...activeData.happyClients].map((client, index) => (
                  <div key={`${client.name}-${index}`} className="relative flex flex-col items-center justify-center min-w-[260px] px-8 h-[80px]" aria-hidden={index >= activeData.happyClients.length}>
                    <img src={client.logo} alt={client.name} className="h-[45px] object-contain" />
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
    </LazyMotion>
  );
};

export default Home;