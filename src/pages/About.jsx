import { motion } from 'framer-motion';
import { Award, Clock, Crosshair, Eye, Handshake, Lightbulb, Target, Users, Calendar, Trophy, MapPin, ChevronRight, Star } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';
import SEO from '../components/layout/SEO';

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
  { value: '4300+', label: 'Happy\nClients', icon: Trophy },
  { value: 'Pan India', label: 'Presence\n', icon: MapPin },
];

const About = () => {
  return (
    <div className="bg-[#FAF7F2] font-sans text-[#2A1810] relative overflow-hidden">
      <SEO 
        title="About Us"
        description="Learn about India Solution, Bengaluru's premier event management company. We specialize in bringing bold ideas to life with unparalleled precision and creativity since 2010."
        keywords="about india solution, best event planners bengaluru, event management company history, corporate event planners"
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

      {/* Hero Header */}
      <section className="relative pt-32 pb-6 lg:pt-44 lg:pb-10 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl px-5"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D5C5B9]"></span>
            <span className="text-[#4A2F1D] text-[10px]">❖</span>
            <span className="text-[#4A2F1D] text-xs font-bold tracking-[0.25em] uppercase">Who We Are</span>
            <span className="text-[#4A2F1D] text-[10px]">❖</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D5C5B9]"></span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold text-[#4A2F1D] tracking-wide mb-6">
            ABOUT US
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-[#4A2F1D] text-sm">❖</span>
          </div>
          <p className="text-[#2A1810] font-bold text-[20px] tracking-wide">
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
            <p className="text-base md:text-lg font-semibold leading-relaxed text-[#2A1810] mb-5">
              For over 15 years, <span className="text-[#4A2F1D] font-bold">India Solution</span> has been one of Bengaluru's trusted names in Event Management and In-House Event Production, delivering seamless, premium-quality experiences for events of every scale.
            </p>
            
            <p className="text-[15px] font-semibold leading-[1.8] text-[#2A1810] mb-6">
              What truly sets us apart is that everything you see at an event is produced and managed in-house. From concept development, stage production, LED walls, sound, lighting, trussing, fabrication, décor, branding, artist management, technical execution to on-site management — we handle it all under one roof.
            </p>
            
            <p className="text-[15px] font-semibold leading-[1.8] text-[#2A1810] mb-10">
              Our passionate team and state-of-the-art infrastructure allow us to maintain the highest standards of quality, creativity, and reliability, ensuring every detail is perfect and every experience is unforgettable.
            </p>
            
            <button className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-[#D5C5B9] bg-transparent text-[#2A1810] font-bold text-xs uppercase tracking-widest hover:bg-[#A67C65] hover:text-white hover:border-[#A67C65] transition-all">
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
                  <stat.icon size={22} strokeWidth={1.5} className="text-[#4A2F1D] mb-2" />
                  <span className="font-bold text-[#4A2F1D] text-[17px] leading-none mb-1">{stat.value}</span>
                  <span className="text-[9px] text-[#4A2F1D] font-bold uppercase tracking-wider leading-tight whitespace-pre-line">
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
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#D5C5B9] bg-[#FAF7F2] text-[#4A2F1D]">
              <Target size={28} strokeWidth={1.5} />
            </div>
            <h2 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#4A2F1D] mb-4">Our Mission</h2>
            <div className="mb-6 text-[#D5C5B9] text-xs">❖</div>
            <p className="text-[15px] font-semibold leading-[1.8] text-[#2A1810] max-w-sm">
              To deliver exceptional event solutions by blending creativity, precision, and personalized service, ensuring every event reflects the unique personality and aspirations of our clients.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white rounded-[2rem] p-10 lg:p-12 shadow-sm border border-[#E8DFD5] flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#D5C5B9] bg-[#FAF7F2] text-[#4A2F1D]">
              <Eye size={28} strokeWidth={1.5} />
            </div>
            <h2 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#4A2F1D] mb-4">Our Vision</h2>
            <div className="mb-6 text-[#D5C5B9] text-xs">❖</div>
            <p className="text-[15px] font-semibold leading-[1.8] text-[#2A1810] max-w-sm">
              To be the most trusted and innovative event management company in India, redefining celebrations and creating unforgettable experiences for our clients.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Founder Section */}
      <section className="relative z-10 px-6 pt-20 pb-10 lg:px-12 max-w-[1300px] mx-auto border-t border-[#E8DFD5]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.2em] text-[#4A2F1D]">
            <span className="text-[#8B5E45] text-xs">❖</span>
            <span className="uppercase">Our Leadership</span>
            <span className="text-[#8B5E45] text-xs">❖</span>
          </div>
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-[42px] font-semibold text-[#4A2F1D] mb-6">
            Meet the <span className="italic text-[#4A2F1D]">Founder</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[40%] shrink-0 lg:sticky lg:top-32"
          >
            <div className="rounded-[2rem] overflow-hidden shadow-xl border border-[#E8DFD5] bg-white">
              <img src="/FOunder.PNG" alt="Reneesh Rajan - CEO & Founder" className="w-full h-auto object-cover object-top aspect-[4/5]" />
              <div className="px-8 pt-6 pb-6 text-center bg-[#FAF7F2]">
                <h3 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#4A2F1D] mb-2">Reneesh Rajan</h3>
                <p className="text-[#8B5E45] font-bold text-sm tracking-widest uppercase">CEO & Founder</p>
                <p className="text-[#2A1810] text-sm mt-1 font-medium">India Solution, Bangalore</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[60%] space-y-10"
          >
            <div>
              <h4 className="text-xl font-bold text-[#4A2F1D] mb-4 uppercase tracking-wide flex items-center gap-2">
                <span className="h-[2px] w-6 bg-[#C0602F]"></span> About Myself
              </h4>
              <div className="space-y-4 text-[15px] leading-[1.8] text-[#2A1810] font-medium">
                <p>Born and raised in Bangalore, I am very passionate about Events & Production, have a strong root to my Indian culture and am an Engineer by profession. As a business owner, I have strived to find the balance in everyday challenges.</p>
                <p>Additionally, I love what I do! I can't wait to get started each day and I enjoy working with the amazing and dynamic team I have. I am a trusted partner to all my clients. I treasure seeing an event plan coming to life and getting executed from concept to reality.</p>
                <p>My hobbies are Playing Guitar, Dancing, Snooker and Racing.</p>
                <p>Doing social work for a cause and helping the needy has been my passion in recent times. After years in the industry across various platforms, I founded India Solution, an event company established to make a mark in the industry by creating unique experiences for both the public and society while catering to their needs and supporting social causes.</p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#4A2F1D] mb-4 uppercase tracking-wide flex items-center gap-2">
                <span className="h-[2px] w-6 bg-[#C0602F]"></span> Expertise
              </h4>
              <p className="text-[15px] leading-[1.8] text-[#2A1810] font-medium">
                Over 13 years of experience in Event Management having worked extensively in Sales, Marketing, Communications, Cultural, Environment, Education & Social Service. Being organized, meticulous, possessing creative imagination, thoughtful communication, remarkable reliability, concept designing skills, and contagious enthusiasm for social activities.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-0 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start"
        >
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-[#4A2F1D] mb-6 uppercase tracking-wide flex items-center gap-2">
              <span className="h-[2px] w-6 bg-[#C0602F]"></span> Membership Credentials
            </h4>
            <ul className="list-disc pl-5 space-y-3 text-[14.5px] leading-[1.6] text-[#2A1810] font-medium">
              <li>Founder and CEO, Events by INDIA SOLUTION, Bengaluru.</li>
              <li>General Secretary for Indian National Congress – Labor Cell.</li>
              <li>Secretary for Y's Men International, Bengaluru, India.</li>
              <li>Board Member for Karnataka, Indian National Congress – Labor Cell, Karnataka.</li>
              <li>Business Development Head for Kannada TV Channel.</li>
              <li>Board Committee Member of Karnataka Press Club Association.</li>
              <li>Consultant for International Schools – NPS.</li>
              <li>Concept Designer for Radio Mirchi Bangalore.</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold text-[#4A2F1D] mb-6 uppercase tracking-wide flex items-center gap-2">
              <span className="h-[2px] w-6 bg-[#C0602F]"></span> Achievements & Awards
            </h4>
            <ul className="list-disc pl-5 text-[14.5px] leading-[1.6] text-[#2A1810] font-medium columns-1 md:columns-2 gap-x-12 space-y-3">
              <li>Bash Event Style Awards (2012) – Best Wedding Planner.</li>
              <li>ICWF – Best Entertainment Design for Social Award Winner.</li>
              <li>Silicon India – Award for Professional Excellence in Real Estate.</li>
              <li>Awarded as Best Event Planner by various schools and colleges.</li>
              <li>Business Excellence Award – Game Changer of the Year.</li>
              <li>WOW Awards – Best Infrastructure Provider.</li>
              <li>Successfully executed event production for 5000+ clients across cultural, fashion, corporate, wedding, and movie events throughout PAN India and abroad.</li>
              <li>Recognized and awarded by direct clients, event managers, institutions, artist managers, clubs, sports authorities of India, and celebrities.</li>
              <li>Kala Ratna Kanike from Exide Life.</li>
              <li>Silicon India – Young Achiever Award.</li>
              <li>Silicon India – Best Audio-Visual Partner of the Year.</li>
              <li>Tuborg Award as the Best Event Planning Company.</li>
              <li>Created the "Save a Life with Bread" initiative for the hungry across Karnataka during 2015–2016.</li>
              <li>Provided 1000 manpower support for the KPCC Quit India 75 Rally at Freedom Park, Bengaluru.</li>
              <li>Managed event requirements for the KPCC Rally in Basavanagudi, Bengaluru.</li>
              <li>Initiated event production for the rally marking the 150th Birth Anniversary of Mahatma Gandhi Ji (2019), Bengaluru.</li>
              <li>Made all arrangements for various election campaigns.</li>
              <li>Active participation in Bengaluru party meetings and party initiatives.</li>
              <li>A rigorous social worker who has stood against anti-social elements in society.</li>
              <li>Assisted in organizing various CSR events in partnership with multiple colleges and universities in Bengaluru.</li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 px-6 pt-10 pb-24 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-4xl text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.2em] text-[#4A2F1D]">
              <span className="text-[#8B5E45] text-xs">❖</span>
              <span className="uppercase">Why Choose Us</span>
              <span className="text-[#8B5E45] text-xs">❖</span>
            </div>
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-[42px] font-semibold text-[#4A2F1D] mb-6">
              Why Should You <span className="italic text-[#4A2F1D]">Hire Us</span>
            </h2>
            <div className="mx-auto mb-6 flex justify-center">
              <span className="text-[#4A2F1D] text-sm">❖</span>
            </div>
            <p className="text-[15px] font-semibold leading-relaxed text-[#2A1810] max-w-2xl mx-auto">
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
                    <Star className="text-[#4A2F1D]" size={22} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[15px] leading-snug font-black text-[#2A1810] whitespace-pre-line mb-3">{item.title}</h4>
                  <p className="text-[13px] leading-relaxed font-semibold text-[#4A2F1D] whitespace-pre-line">{item.description}</p>
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