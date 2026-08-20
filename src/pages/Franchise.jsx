import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';
import SEO from '../components/layout/SEO';
import { CheckCircle2, TrendingUp, Users, Target, ShieldCheck, HeartHandshake, Briefcase, MapPin, HandCoins, Laptop, CalendarHeart, Star } from 'lucide-react';
import { useTina } from 'tinacms/dist/react';
import franchiseDataFallback from '../content/franchise.json';

const iconMap = {
  TrendingUp,
  Briefcase,
  ShieldCheck,
  HeartHandshake,
  HandCoins,
  Users,
  Laptop,
  Target
};

const Franchise = () => {
  const { data } = useTina({
    query: `query {
      franchise(relativePath: "franchise.json") {
        seo { title description }
        header { eyebrow title titleItalic subtitle highlight }
        sections { title icon items }
        modelsTitle
        models { name investment }
        visionTitle
        vision
        closing { line1 line1Italic line2 }
      }
    }`,
    variables: { relativePath: "franchise.json" },
    data: { franchise: franchiseDataFallback }
  });

  const pageData = data.franchise;

  return (
    <div className="bg-[#FAF7F2] font-sans text-[#2A1810] relative overflow-hidden min-h-screen">
      <SEO 
        title={pageData.seo?.title || "Franchise Opportunity"}
        description={pageData.seo?.description || ""}
      />

      {/* Hero Section */}
      <section className="relative pt-44 lg:pt-48 pb-20 px-5 sm:px-8 lg:px-12 bg-[#F3EBE3]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#C0602F_0%,_transparent_100%)]"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="mb-6 flex items-center justify-center gap-3 text-[12px] font-bold tracking-[0.2em] text-[#C0602F] uppercase">
              <span className="text-xs">❖</span>
              <span>{pageData.header?.eyebrow}</span>
              <span className="text-xs">❖</span>
            </div>
            <h1 className="mb-6 font-['Playfair_Display',serif] text-4xl md:text-5xl lg:text-6xl font-semibold text-[#4A2F1D] leading-tight">
              {pageData.header?.title} <span className="italic text-[#C0602F]">{pageData.header?.titleItalic}</span>
            </h1>
            <p className="mb-6 text-xl md:text-2xl font-medium text-[#4A2F1D] max-w-3xl mx-auto">
              {pageData.header?.subtitle}
            </p>
            <p className="text-lg md:text-xl font-bold tracking-wide text-[#C0602F]">
              {pageData.header?.highlight}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          >
            {(pageData.sections || []).map((section, idx) => {
              const IconComponent = iconMap[section.icon];
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-white rounded-3xl p-8 border border-[#E8DFD5] shadow-sm hover:shadow-md transition-shadow group"
                >
                  {IconComponent && <IconComponent className="text-[#C0602F] mb-4" size={32} />}
                  <h3 className="mb-5 font-['Playfair_Display',serif] text-2xl font-semibold text-[#4A2F1D]">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {(section.items || []).map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#C0602F] shrink-0 mt-0.5" size={18} />
                        <span className="text-[#4A2F1D] font-medium leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Models & Vision Section */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#F8F1EB]">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Franchise Models */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-[#E8DFD5] shadow-sm"
          >
            <h3 className="mb-8 font-['Playfair_Display',serif] text-3xl font-semibold text-[#4A2F1D] text-center">
              {pageData.modelsTitle}
            </h3>
            <div className="space-y-5">
              {(pageData.models || []).map((model, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5]">
                  <span className="font-bold text-xl text-[#2A1810]">{model.name}</span>
                  <span className="font-bold text-lg text-[#C0602F]">{model.investment}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="bg-[#4A2F1D] rounded-3xl p-8 md:p-12 shadow-md text-center text-white flex flex-col justify-center"
          >
            <h3 className="mb-10 font-['Playfair_Display',serif] text-3xl font-semibold text-[#E8DFD5]">
              {pageData.visionTitle}
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {(pageData.vision || []).map((item, idx) => {
                const [number, ...text] = item.split(' ');
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-4xl font-black text-[#C0602F] mb-2">{number}</span>
                    <span className="font-medium text-[#D5C5B9] text-lg">{text.join(' ')}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Closing Section */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 text-center bg-white relative z-10">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-3xl"
        >
          <div className="flex justify-center mb-6">
            <Star className="text-[#C0602F] fill-[#C0602F]" size={40} />
          </div>
          <h2 className="mb-6 font-['Playfair_Display',serif] text-3xl md:text-5xl font-semibold text-[#4A2F1D] leading-tight">
            {pageData.closing?.line1}
            <br />
            <span className="italic text-[#C0602F]">{pageData.closing?.line1Italic}</span>
          </h2>
          <p className="text-xl md:text-2xl font-bold tracking-wide text-[#4A2F1D] mt-8">
            {pageData.closing?.line2}
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default Franchise;
