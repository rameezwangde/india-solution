import { motion } from 'framer-motion';
import { Award, Clock, Crosshair, Eye, Handshake, Lightbulb, Target, Users, Calendar, Trophy, MapPin, ChevronRight, Star } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const highlights = [
  {
    title: 'Skilled\nTeam',
    description: 'Our experienced and passionate\nprofessionals bring creativity to every event.',
    icon: Users,
  },
  {
    title: 'Flawless\nPunctuality',
    description: 'We ensure every event unfolds\nseamlessly and on time.',
    icon: Clock,
  },
  {
    title: 'Long-Lasting\nBonds',
    description: 'Many clients become part of the\nIndia Solution family.',
    icon: Handshake,
  },
  {
    title: 'Endless\nCreativity',
    description: 'From imaginative themes to\ninnovative corporate setups.',
    icon: Lightbulb,
  },
  {
    title: 'Attention\nto Detail',
    description: 'Every detail matters to us.\nFlawlessly executed.',
    icon: Crosshair,
  },
  {
    title: 'Proven\nExcellence',
    description: "Our reputation is built on the\nheartfelt recommendations of clients.",
    icon: Award,
  },
];

const stats = [
  { value: '15+', label: 'Years of\nExcellence', icon: Calendar },
  { value: '5000+', label: 'Events\nExecuted', icon: Users },
  { value: '2500+', label: 'Happy\nClients', icon: Trophy },
  { value: 'Pan India', label: 'Presence\n', icon: MapPin },
];

const About = () => {
  return (
    <div className="bg-[#FAF7F2] font-sans text-[#5c4033] relative overflow-hidden">
      {/* Global Background Watermarks */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -right-20 top-0 w-full md:w-[60%] h-[120%] object-cover object-left opacity-30 mix-blend-multiply" 
          style={{ transform: 'scaleX(-1)'}} 
        />
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -left-20 top-1/4 w-full md:w-[60%] h-[120%] object-cover object-left opacity-20 mix-blend-multiply" 
        />
      </div>

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl px-5"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D5C5B9]"></span>
            <span className="text-[#A67C65] text-[10px]">❖</span>
            <span className="text-[#A67C65] text-xs font-bold tracking-[0.25em] uppercase">Who We Are</span>
            <span className="text-[#A67C65] text-[10px]">❖</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D5C5B9]"></span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-6xl md:text-7xl lg:text-[90px] font-bold text-[#4A2F1D] tracking-wide mb-6">
            ABOUT US
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-[#A67C65] text-sm">❖</span>
          </div>
          <p className="text-[#5c4033] font-medium text-lg tracking-wide">
            Crafting experiences. Building relationships.
          </p>
        </motion.div>
      </section>

      {/* Main Split Section */}
      <section className="relative z-10 px-6 pb-24 lg:px-12 max-w-[1300px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-16 lg:gap-20 lg:grid-cols-2 items-center"
        >
          {/* Left Text Column */}
          <motion.div variants={fadeUp} className="flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[#A67C65] text-sm">❖</span>
            </div>
            
            <p className="font-['Playfair_Display',serif] text-2xl md:text-[28px] font-bold text-[#4A2F1D] leading-[1.4] mb-8">
              For over 15 years, <span className="text-[#A67C65]">India Solution</span> has been one of Bengaluru's trusted names in Event Management and In-House Event Production, delivering seamless, premium-quality experiences for events of every scale.
            </p>
            
            <div className="flex items-center gap-2 mb-8">
              <span className="text-[#D5C5B9] text-xs">❖</span>
            </div>
            
            <p className="text-[13.5px] font-medium leading-[1.8] text-[#5c4033] mb-6">
              What truly sets us apart is that everything you see at an event is produced and managed in-house. From concept development, stage production, LED walls, sound, lighting, trussing, fabrication, décor, branding, artist management, technical execution to on-site management — we handle it all under one roof.
            </p>
            
            <p className="text-[13.5px] font-medium leading-[1.8] text-[#5c4033] mb-10">
              Our passionate team and state-of-the-art infrastructure allow us to maintain the highest standards of quality, creativity, and reliability, ensuring every detail is perfect and every experience is unforgettable.
            </p>
            
            <button className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-[#D5C5B9] bg-transparent text-[#5c4033] font-bold text-xs uppercase tracking-widest hover:bg-[#A67C65] hover:text-white hover:border-[#A67C65] transition-all">
              Our Journey <ChevronRight size={14} strokeWidth={2.5} />
            </button>
          </motion.div>

          {/* Right Image Column */}
          <motion.div variants={fadeUp} className="relative mt-12 lg:mt-0 pl-0 lg:pl-10">
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-white/50 aspect-[4/3]">
              <img src="/images/corporate_conference.png" alt="India Solution Event Setup" className="w-full h-full object-cover" />
            </div>
            
            {/* Stats Pill overlapping bottom left */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:-left-6 bg-[#FAF7F2] rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#E8DFD5] px-6 py-5 flex items-center justify-between gap-6 md:gap-8 z-10 whitespace-nowrap">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <stat.icon size={22} strokeWidth={1.5} className="text-[#A67C65] mb-2" />
                  <span className="font-bold text-[#4A2F1D] text-[17px] leading-none mb-1">{stat.value}</span>
                  <span className="text-[9px] text-[#7C5A48] font-bold uppercase tracking-wider leading-tight whitespace-pre-line">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative z-10 px-6 py-20 lg:px-12 max-w-[1300px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="bg-white rounded-[2rem] p-10 lg:p-12 shadow-sm border border-[#E8DFD5] flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#D5C5B9] bg-[#FAF7F2] text-[#A67C65]">
              <Target size={28} strokeWidth={1.5} />
            </div>
            <h2 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#4A2F1D] mb-4">Our Mission</h2>
            <div className="mb-6 text-[#D5C5B9] text-xs">❖</div>
            <p className="text-[13.5px] font-medium leading-[1.8] text-[#5c4033] max-w-sm">
              To deliver exceptional event solutions by blending creativity, precision, and personalized service, ensuring every event reflects the unique personality and aspirations of our clients.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white rounded-[2rem] p-10 lg:p-12 shadow-sm border border-[#E8DFD5] flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#D5C5B9] bg-[#FAF7F2] text-[#A67C65]">
              <Eye size={28} strokeWidth={1.5} />
            </div>
            <h2 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#4A2F1D] mb-4">Our Vision</h2>
            <div className="mb-6 text-[#D5C5B9] text-xs">❖</div>
            <p className="text-[13.5px] font-medium leading-[1.8] text-[#5c4033] max-w-sm">
              To be the most trusted and innovative event management company in India, redefining celebrations and creating unforgettable experiences for our clients.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 px-6 py-24 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-4xl text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.2em] text-[#A67C65]">
              <span className="text-[#8B5E45] text-xs">❖</span>
              <span className="uppercase">Why Choose Us</span>
              <span className="text-[#8B5E45] text-xs">❖</span>
            </div>
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-[42px] font-semibold text-[#4A2F1D] mb-6">
              Why Should You <span className="italic text-[#A67C65]">Hire Us</span>
            </h2>
            <div className="mx-auto mb-6 flex justify-center">
              <span className="text-[#A67C65] text-sm">❖</span>
            </div>
            <p className="text-[13.5px] font-medium leading-relaxed text-[#5c4033] max-w-2xl mx-auto">
              At India Solution, we don't just plan events; we create experiences that leave lasting impressions. Here's why we are the perfect choice for your event management needs:
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 lg:gap-8 max-w-[1100px] mx-auto"
          >
            {highlights.map((item, i) => {
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center rounded-[2rem] bg-transparent py-4 px-2 w-[100%] sm:w-[calc(50%-1.5rem)] md:w-[calc(33.333%-1.5rem)]"
                >
                  <div className="flex h-14 w-14 mb-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#D5C5B9] bg-white shadow-sm transition-all duration-300 hover:border-[#A67C65] hover:shadow-md">
                    <Star className="text-[#A67C65]" size={22} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[14px] leading-snug font-bold text-[#4A2F1D] whitespace-pre-line mb-3">{item.title}</h4>
                  <p className="text-[11px] leading-relaxed font-medium text-[#7C5A48] whitespace-pre-line">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;