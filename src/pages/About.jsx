import { motion } from 'framer-motion';
import { Award, Clock, Crosshair, Eye, Handshake, Lightbulb, Target, Users, Calendar, Trophy, MapPin, ChevronRight, Star } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';
import SEO from '../components/layout/SEO';
import { useTina } from 'tinacms/dist/react';
import aboutData from '../content/about.json';

const iconMap = {
  Award, Clock, Crosshair, Eye, Handshake, Lightbulb, Target, Users, Calendar, Trophy, MapPin, Star
};

const About = () => {
  const { data } = useTina({
    query: `query {
      about(relativePath: "about.json") {
        seo { title description keywords }
        hero { subtitle title description }
        mainSection { paragraphs buttonText image }
        stats { value label iconName }
        mission { title text }
        vision { title text }
        founder { sectionSubtitle sectionTitleLine1 sectionTitleLine2 image name role location aboutMyselfText expertiseText }
        credentials { title items }
        achievements { title items }
        whyChooseUs { subtitle titleLine1 titleLine2 description highlights { title description iconName } }
      }
    }`,
    variables: typeof window !== 'undefined' ? (window['_tina_var_' + "about.json"] = window['_tina_var_' + "about.json"] || { relativePath: "about.json" }) : { relativePath: "about.json" },
    data: typeof window !== 'undefined' ? (window['_tina_data_' + 'About.jsx_about'] = window['_tina_data_' + 'About.jsx_about'] || { about: aboutData }) : { about: aboutData }
  });

  const activeData = data.about;

  return (
    <div className="bg-[#FAF7F2] font-sans text-[#2A1810] relative overflow-hidden">
      <SEO 
        title={activeData.seo.title}
        description={activeData.seo.description}
        keywords={activeData.seo.keywords}
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
            <span className="text-[#4A2F1D] text-xs font-bold tracking-[0.25em] uppercase">{activeData.hero.subtitle}</span>
            <span className="text-[#4A2F1D] text-[10px]">❖</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D5C5B9]"></span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold text-[#4A2F1D] tracking-wide mb-6">
            {activeData.hero.title}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-[#4A2F1D] text-sm">❖</span>
          </div>
          <p className="text-[#2A1810] font-bold text-[20px] tracking-wide">
            {activeData.hero.description}
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
            {activeData.mainSection.paragraphs.map((p, i) => (
              <p key={i} className={`text-[15px] font-semibold leading-[1.8] text-[#2A1810] mb-${i === activeData.mainSection.paragraphs.length - 1 ? '10' : '6'}`} dangerouslySetInnerHTML={{__html: p.replace(/\*\*(.*?)\*\*/g, '<span class="text-[#4A2F1D] font-bold">$1</span>')}} />
            ))}
            
            <button className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-[#D5C5B9] bg-transparent text-[#2A1810] font-bold text-xs uppercase tracking-widest hover:bg-[#A67C65] hover:text-white hover:border-[#A67C65] transition-all">
              {activeData.mainSection.buttonText} <ChevronRight size={14} strokeWidth={2.5} />
            </button>
          </motion.div>

          {/* Right Image Column */}
          <motion.div variants={fadeUp} className="relative mt-12 lg:mt-0 pl-0 lg:pl-10">
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-white/50 aspect-[4/3]">
              <img src={activeData.mainSection.image} alt="India Solution Event Setup" className="w-full h-full object-cover" />
            </div>
            
            {/* Stats Pill overlapping bottom left */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:-left-6 bg-[#FAF7F2] rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#E8DFD5] px-6 py-5 flex items-center justify-between gap-6 md:gap-8 z-10 whitespace-nowrap">
              {activeData.stats.map((stat, i) => {
                const IconComponent = iconMap[stat.iconName] || Star;
                return (
                  <div key={i} className="flex flex-col items-center text-center">
                    <IconComponent size={22} strokeWidth={1.5} className="text-[#4A2F1D] mb-2" />
                    <span className="font-bold text-[#4A2F1D] text-[17px] leading-none mb-1">{stat.value}</span>
                    <span className="text-[9px] text-[#4A2F1D] font-bold uppercase tracking-wider leading-tight whitespace-pre-line">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
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
            <h2 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#4A2F1D] mb-4">{activeData.mission.title}</h2>
            <div className="mb-6 text-[#D5C5B9] text-xs">❖</div>
            <p className="text-[15px] font-semibold leading-[1.8] text-[#2A1810] max-w-sm">
              {activeData.mission.text}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white rounded-[2rem] p-10 lg:p-12 shadow-sm border border-[#E8DFD5] flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#D5C5B9] bg-[#FAF7F2] text-[#4A2F1D]">
              <Eye size={28} strokeWidth={1.5} />
            </div>
            <h2 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#4A2F1D] mb-4">{activeData.vision.title}</h2>
            <div className="mb-6 text-[#D5C5B9] text-xs">❖</div>
            <p className="text-[15px] font-semibold leading-[1.8] text-[#2A1810] max-w-sm">
              {activeData.vision.text}
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
            <span className="uppercase">{activeData.founder.sectionSubtitle}</span>
            <span className="text-[#8B5E45] text-xs">❖</span>
          </div>
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-[42px] font-semibold text-[#4A2F1D] mb-6">
            {activeData.founder.sectionTitleLine1} <span className="italic text-[#4A2F1D]">{activeData.founder.sectionTitleLine2}</span>
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
              <img src={activeData.founder.image} alt={activeData.founder.name} className="w-full h-auto object-cover object-top aspect-[4/5]" />
              <div className="px-8 pt-6 pb-6 text-center bg-[#FAF7F2]">
                <h3 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#4A2F1D] mb-2">{activeData.founder.name}</h3>
                <p className="text-[#8B5E45] font-bold text-sm tracking-widest uppercase">{activeData.founder.role}</p>
                <p className="text-[#2A1810] text-sm mt-1 font-medium">{activeData.founder.location}</p>
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
                {activeData.founder.aboutMyselfText.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#4A2F1D] mb-4 uppercase tracking-wide flex items-center gap-2">
                <span className="h-[2px] w-6 bg-[#C0602F]"></span> Expertise
              </h4>
              <p className="text-[15px] leading-[1.8] text-[#2A1810] font-medium">
                {activeData.founder.expertiseText}
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
              <span className="h-[2px] w-6 bg-[#C0602F]"></span> {activeData.credentials.title}
            </h4>
            <ul className="list-disc pl-5 space-y-3 text-[14.5px] leading-[1.6] text-[#2A1810] font-medium">
              {activeData.credentials.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold text-[#4A2F1D] mb-6 uppercase tracking-wide flex items-center gap-2">
              <span className="h-[2px] w-6 bg-[#C0602F]"></span> {activeData.achievements.title}
            </h4>
            <ul className="list-disc pl-5 text-[14.5px] leading-[1.6] text-[#2A1810] font-medium columns-1 md:columns-2 gap-x-12 space-y-3">
              {activeData.achievements.items.map((item, i) => <li key={i}>{item}</li>)}
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
              <span className="uppercase">{activeData.whyChooseUs.subtitle}</span>
              <span className="text-[#8B5E45] text-xs">❖</span>
            </div>
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-[42px] font-semibold text-[#4A2F1D] mb-6">
              {activeData.whyChooseUs.titleLine1} <span className="italic text-[#4A2F1D]">{activeData.whyChooseUs.titleLine2}</span>
            </h2>
            <div className="mx-auto mb-6 flex justify-center">
              <span className="text-[#4A2F1D] text-sm">❖</span>
            </div>
            <p className="text-[15px] font-semibold leading-relaxed text-[#2A1810] max-w-2xl mx-auto">
              {activeData.whyChooseUs.description}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 lg:gap-8 max-w-[1100px] mx-auto"
          >
            {activeData.whyChooseUs.highlights.map((item, i) => {
              const IconComponent = iconMap[item.iconName] || Star;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center rounded-[2rem] bg-transparent py-4 px-2 w-[100%] sm:w-[calc(50%-1.5rem)] md:w-[calc(33.333%-1.5rem)]"
                >
                  <div className="flex h-14 w-14 mb-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#D5C5B9] bg-white shadow-sm transition-all duration-300 hover:border-[#A67C65] hover:shadow-md">
                    <IconComponent className="text-[#4A2F1D]" size={22} strokeWidth={1.5} />
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