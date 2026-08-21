import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, CalendarCheck, Clock, 
  Gift, Percent, Crown, Users, Heart, Sparkles, Star, Target, Check, X,
  BadgeCheck, Gem, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/layout/SEO';
import { fadeUp, staggerContainer } from '../utils/animations';
import { useTina } from 'tinacms/dist/react';
import membershipDataFallback from '../content/membership.json';

const iconMap = {
  ShieldCheck, CalendarCheck, Clock, Gift, Percent, Crown, Users, Heart, Sparkles, Star, Target, Gem
};

const Membership = () => {
  const { data } = useTina({
    query: `query {
      membership(relativePath: "membership.json") {
        seo { title description }
        hero { eyebrow titleLine1 titleItalic titleLine3 description badges }
        whySection { title description cards { icon title desc } }
        benefitsSection { title cards { icon title items gradient } }
        milestoneSection { title description milestones { title icon } }
        rewardsSection { title rewards }
        exclusiveOffersSection { title offers }
        perfectForSection { title items { title icon } }
        promiseSection { title text signature }
        ctaSection { titleLine1 titleLine2 description }
      }
    }`,
    variables: typeof window !== 'undefined' ? (window['_tina_var_' + "membership.json"] = window['_tina_var_' + "membership.json"] || { relativePath: "membership.json" }) : { relativePath: "membership.json" },
    data: typeof window !== 'undefined' ? (window['_tina_data_' + 'Membership.jsx_membership'] = window['_tina_data_' + 'Membership.jsx_membership'] || { membership: membershipDataFallback }) : { membership: membershipDataFallback }
  });

  const pageData = data.membership;

  return (
    <div 
      className="bg-[#FAF7F2] font-sans selection:bg-[#A67C65] selection:text-white relative overflow-hidden select-none"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <SEO 
        title={pageData.seo?.title || "Premium Celebration Circle Membership | India Solution"}
        description={pageData.seo?.description || ""}
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 px-5 sm:px-8 lg:px-12 bg-[#FAF7F2]">
        {/* Soft Luxury Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#F3EAE0] to-[#FAF7F2] overflow-hidden">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#F5E6DA] rounded-full blur-[100px] opacity-40 translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#E8DFD5] rounded-full blur-[100px] opacity-30 -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
        </div>

        <div className="container relative z-20 mx-auto max-w-[1200px]">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4 text-[11px] font-bold tracking-[0.2em] text-[#C0602F]">
                <span className="uppercase">{pageData.hero?.eyebrow}</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="font-['Playfair_Display',serif] text-[#4A2F1D] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
                {pageData.hero?.titleLine1}<br/>
                <span className="italic font-normal text-[#C0602F]">{pageData.hero?.titleItalic}</span><br/>
                {pageData.hero?.titleLine3}
              </motion.h1>

              <motion.p variants={fadeUp} className="text-[#8B5E45] text-[16px] md:text-[18px] leading-relaxed font-medium mb-8 max-w-xl">
                {pageData.hero?.description}
              </motion.p>

              {/* Luxury Trust Badges */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
                {(pageData.hero?.badges || []).map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#4A2F1D] font-bold text-sm">
                    <Check size={16} strokeWidth={3} className="text-[#C0602F]" />
                    {badge}
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#4A2F1D] hover:bg-[#2A1810] text-white px-8 py-4 rounded-xl font-bold tracking-wide text-[14px] transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(74,47,29,0.3)] hover:shadow-[0_10px_30px_rgba(74,47,29,0.5)] group">
                  Become a Member <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="#plans" className="bg-transparent border-2 border-[#E8DFD5] text-[#4A2F1D] hover:border-[#4A2F1D] px-8 py-4 rounded-xl font-bold tracking-wide text-[14px] transition-all flex items-center justify-center gap-3">
                  Explore Membership Plans
                </a>
              </motion.div>
            </motion.div>

            {/* Right Artistic Collage */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-[550px] lg:h-[650px] hidden md:block"
            >
              {/* Central Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-r from-[#F5E6DA] to-[#E8DFD5] rounded-full opacity-60 blur-3xl pointer-events-none"></div>
              
              {/* Layer 1: Wedding */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[5%] left-[2%] w-[44%] aspect-[4/5] rounded-tl-[100px] rounded-br-[100px] rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-4 border-white/50 backdrop-blur-sm z-20"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none"></div>
                <img src="/images/wedding_decor.png" alt="Wedding" className="w-full h-full object-cover" />
                <span className="absolute bottom-4 left-6 z-20 text-white font-['Playfair_Display',serif] italic text-xl">Wedding</span>
              </motion.div>
              
              {/* Layer 2: Cocktail Evenings */}
              <motion.div 
                animate={{ y: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[5%] right-[2%] w-[44%] aspect-[4/5] rounded-tr-[100px] rounded-bl-[100px] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-4 border-white/50 backdrop-blur-sm z-30"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none"></div>
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Cocktail Evenings" className="w-full h-full object-cover" />
                <span className="absolute bottom-4 left-6 z-20 text-white font-['Playfair_Display',serif] italic text-xl">Cocktail Evenings</span>
              </motion.div>
              
              {/* Layer 3: Anniversary/Housewarming */}
              <motion.div 
                animate={{ y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[5%] left-[5%] right-[5%] w-[90%] aspect-[21/9] rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-[6px] border-white z-40"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none"></div>
                <img src="/images/welcome_experience.png" alt="Anniversary" className="w-full h-full object-cover" />
                <span className="absolute bottom-4 left-6 z-20 text-white font-['Playfair_Display',serif] italic text-xl">Anniversary</span>
              </motion.div>

              {/* Floating Accents */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[20%] right-[45%] z-50 text-[#C0602F] opacity-80">
                <Sparkles size={28} />
              </motion.div>
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute bottom-[30%] left-[10%] z-50 text-[#8B5E45] opacity-60">
                <Star size={24} fill="currentColor" />
              </motion.div>
              <div className="absolute bottom-[5%] right-[20%] w-24 h-24 bg-white/40 backdrop-blur-xl rounded-full border border-white/60 shadow-xl z-50 flex items-center justify-center">
                <Gem className="text-[#C0602F]" size={32} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. WHY BECOME A MEMBER */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 bg-transparent relative z-10 -mt-8">
        <div className="container mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-[#4A2F1D] mb-6">{pageData.whySection?.title}</h2>
            <p className="text-[#8B5E45] text-[16px] md:text-[18px] max-w-3xl mx-auto font-medium">
              {pageData.whySection?.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(pageData.whySection?.cards || []).map((card, i) => {
              const IconComponent = iconMap[card.icon];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`bg-white/60 backdrop-blur-md p-8 lg:p-10 rounded-[2rem] border border-white hover:border-[#C0602F]/30 shadow-[0_10px_40px_rgba(139,94,69,0.05)] hover:shadow-[0_0_40px_rgba(192,96,47,0.1)] transition-all duration-500 group relative overflow-hidden ${i === 3 ? 'lg:col-span-1 lg:col-start-1 lg:ml-auto' : ''} ${i === 4 ? 'lg:col-span-2' : ''}`}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C0602F] to-[#E8DFD5] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-[#F5E6DA] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white text-[#C0602F] group-hover:scale-110 transition-transform duration-500">
                    {IconComponent && <IconComponent size={26} strokeWidth={2} />}
                  </div>
                  <h3 className="font-['Playfair_Display',serif] text-2xl font-bold text-[#4A2F1D] mb-4">{card.title}</h3>
                  <p className="text-[#8B5E45] font-medium leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MEMBERSHIP BENEFITS (Four Column Layout) */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8DFD5] to-transparent"></div>
        <div className="container relative z-10 mx-auto max-w-[1400px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-[#4A2F1D] mb-4">{pageData.benefitsSection?.title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(pageData.benefitsSection?.cards || []).map((card, i) => {
              const IconComponent = iconMap[card.icon];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`bg-gradient-to-b ${card.gradient} bg-opacity-50 backdrop-blur-lg p-8 rounded-[2rem] border shadow-[0_8px_30px_rgb(139,94,69,0.03)] group`}
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#C0602F] shadow-sm mb-6 border border-[#E8DFD5]/50 group-hover:-translate-y-1 transition-transform">
                    {IconComponent && <IconComponent size={22} strokeWidth={2.5} />}
                  </div>
                  <h3 className="font-['Playfair_Display',serif] text-[22px] font-bold text-[#4A2F1D] mb-6 leading-tight">{card.title}</h3>
                  <ul className="space-y-4">
                    {(card.items || []).map((item, j) => (
                      <motion.li 
                        key={j} 
                        initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + (j * 0.05) }}
                        className="flex items-start gap-3 group/item"
                      >
                        <Check size={16} strokeWidth={3} className="text-[#C0602F] mt-1 shrink-0 opacity-60 group-hover/item:opacity-100 transition-opacity" />
                        <span className="text-[#4A2F1D] font-medium leading-relaxed text-[15px]">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CELEBRATION JOURNEY (Horizontal Timeline) */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 bg-[#FAF7F2] relative overflow-hidden">
        <div className="container mx-auto max-w-[1200px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold text-[#4A2F1D] mb-4">{pageData.milestoneSection?.title}</h2>
            <p className="text-[#8B5E45] font-medium">{pageData.milestoneSection?.description}</p>
          </motion.div>

          {/* Desktop Horizontal Timeline / Mobile Vertical */}
          <div className="relative max-w-5xl mx-auto">
            {/* The Line */}
            <div className="absolute left-[39px] md:left-0 top-0 md:top-1/2 w-[2px] md:w-full h-full md:h-[2px] bg-gradient-to-b md:bg-gradient-to-r from-transparent via-[#C0602F]/30 to-transparent md:-translate-y-1/2 z-0"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 relative z-10 px-4 md:px-0">
              {(pageData.milestoneSection?.milestones || []).map((milestone, i) => {
                const IconComponent = iconMap[milestone.icon];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className="relative group flex md:flex-col items-center gap-6 md:gap-4 w-full md:w-auto"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full border-4 border-[#FAF7F2] shadow-[0_4px_20px_rgba(192,96,47,0.15)] flex items-center justify-center text-[#C0602F] z-10 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(192,96,47,0.3)] transition-all duration-300 relative">
                      {IconComponent && <IconComponent size={20} className="md:w-6 md:h-6" strokeWidth={2.5} />}
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-[#C0602F] rounded-full opacity-0 group-hover:opacity-10 blur-md transition-opacity"></div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#E8DFD5] shadow-sm text-center md:absolute md:top-20 md:left-1/2 md:-translate-x-1/2 md:whitespace-nowrap group-hover:border-[#C0602F]/50 transition-colors">
                      <span className="text-[#4A2F1D] font-bold text-sm">{milestone.title}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. REFERRAL REWARDS */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 bg-[#2A1810] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C0602F] rounded-full blur-[150px] opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white rounded-full blur-[120px] opacity-5"></div>
        </div>
        
        <div className="container relative z-10 mx-auto max-w-[1000px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-white mb-6">{pageData.rewardsSection?.title}</h2>
            <div className="w-20 h-[2px] bg-[#C0602F] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(pageData.rewardsSection?.rewards || []).map((reward, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[#D5C5B9] group-hover:bg-[#C0602F] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  <Gift size={24} />
                </div>
                <span className="font-bold text-[#D5C5B9] text-[15px]">{reward}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MEMBER EXCLUSIVE OFFERS */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 bg-white relative">
        <div className="container mx-auto max-w-[1200px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center mb-16">
             <Star className="text-[#C0602F] mb-4" size={32} />
             <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-[#4A2F1D]">{pageData.exclusiveOffersSection?.title}</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {(pageData.exclusiveOffersSection?.offers || []).map((offer, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ rotate: 2, scale: 1.05 }}
                className="bg-[#FAF7F2] p-6 rounded-[2rem] border border-[#E8DFD5] shadow-sm flex flex-col items-center justify-center text-center min-h-[160px] cursor-pointer"
              >
                <span className="font-bold text-[#4A2F1D] text-sm leading-snug">{offer}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MEMBERSHIP PLANS (Luxury Cards) */}
      <section id="plans" className="py-24 px-5 sm:px-8 lg:px-12 bg-[#FAF7F2] relative">
        <div className="container mx-auto max-w-[1200px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-[#4A2F1D] mb-4">Membership Plans</h2>
            <p className="text-[#8B5E45] font-medium">Select the tier that elevates your celebrations.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch">
            
            {/* Silver Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-b from-white to-[#F5F7FA] rounded-[2.5rem] p-8 md:p-10 border border-[#E5E7EB] flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
            >
              <h3 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#6B7280] mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#9CA3AF] to-[#6B7280]">Silver</h3>
              <p className="text-[#4A2F1D] font-bold text-sm mb-10 tracking-widest uppercase opacity-70">Annual Membership</p>
              
              <ul className="space-y-5 flex-grow mb-10">
                <li className="flex items-center justify-between"><span className="text-[#4A2F1D] text-sm font-medium">Event Consultation</span> <Check size={18} className="text-[#6B7280]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#4A2F1D] text-sm font-bold">Décor Discounts</span> <span className="font-bold text-[#6B7280]">10%</span></li>
                <li className="flex items-center justify-between"><span className="text-[#4A2F1D] text-sm font-medium">Priority Booking</span> <Check size={18} className="text-[#6B7280]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#4A2F1D] text-sm font-medium">Vendor Discounts</span> <Check size={18} className="text-[#6B7280]" /></li>
                <li className="flex items-center justify-between opacity-40"><span className="text-[#4A2F1D] text-sm font-medium">Complimentary Upgrade</span> <X size={18} /></li>
                <li className="flex items-center justify-between opacity-40"><span className="text-[#4A2F1D] text-sm font-medium">Digital Invitation</span> <X size={18} /></li>
                <li className="flex items-center justify-between opacity-40"><span className="text-[#4A2F1D] text-sm font-medium">Surprise Gift</span> <X size={18} /></li>
                <li className="flex items-center justify-between opacity-40"><span className="text-[#4A2F1D] text-sm font-medium">VIP Coordinator</span> <X size={18} /></li>
                <li className="flex items-center justify-between opacity-40"><span className="text-[#4A2F1D] text-sm font-medium">Exclusive Package</span> <X size={18} /></li>
              </ul>
              
              <button className="w-full py-4 rounded-xl border-2 border-[#6B7280] text-[#6B7280] font-bold hover:bg-[#6B7280] hover:text-white transition-all relative overflow-hidden group">
                <span className="relative z-10">Choose Silver</span>
                <div className="absolute inset-0 h-full w-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
              </button>
            </motion.div>

            {/* Gold Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-gradient-to-b from-[#FFFDF0] to-[#FFF9DB] rounded-[2.5rem] p-8 md:p-10 border-2 border-[#EAB308]/30 flex flex-col relative shadow-[0_20px_50px_rgba(234,179,8,0.15)] transform lg:-translate-y-4"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#EAB308] to-[#CA8A04] text-white px-6 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-md">
                Most Popular
              </div>
              <h3 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#CA8A04] mb-2 mt-2 bg-clip-text text-transparent bg-gradient-to-r from-[#EAB308] to-[#A16207]">Gold</h3>
              <p className="text-[#4A2F1D] font-bold text-sm mb-10 tracking-widest uppercase opacity-80">Annual Membership</p>
              
              <ul className="space-y-5 flex-grow mb-10">
                <li className="flex items-center justify-between"><span className="text-[#4A2F1D] text-sm font-medium">Event Consultation</span> <Check size={18} className="text-[#CA8A04]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#4A2F1D] text-sm font-bold">Décor Discounts</span> <span className="font-bold text-[#CA8A04]">15%</span></li>
                <li className="flex items-center justify-between"><span className="text-[#4A2F1D] text-sm font-medium">Priority Booking</span> <Check size={18} className="text-[#CA8A04]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#4A2F1D] text-sm font-medium">Vendor Discounts</span> <Check size={18} className="text-[#CA8A04]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#4A2F1D] text-sm font-medium">Complimentary Upgrade</span> <Check size={18} className="text-[#CA8A04]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#4A2F1D] text-sm font-medium">Digital Invitation</span> <Check size={18} className="text-[#CA8A04]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#4A2F1D] text-sm font-medium">Surprise Gift</span> <Check size={18} className="text-[#CA8A04]" /></li>
                <li className="flex items-center justify-between opacity-40"><span className="text-[#4A2F1D] text-sm font-medium">VIP Coordinator</span> <X size={18} /></li>
                <li className="flex items-center justify-between opacity-40"><span className="text-[#4A2F1D] text-sm font-medium">Exclusive Package</span> <X size={18} /></li>
              </ul>
              
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#EAB308] to-[#CA8A04] text-white font-bold hover:shadow-lg transition-all relative overflow-hidden group">
                <span className="relative z-10">Choose Gold</span>
                <div className="absolute inset-0 h-full w-full bg-white/30 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
              </button>
            </motion.div>

            {/* Platinum Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#2A1810] to-[#1A0F0A] rounded-[2.5rem] p-8 md:p-10 border border-[#4A2F1D] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden"
            >
              {/* Sparkles */}
              <Sparkles className="absolute top-8 right-8 text-[#D5C5B9] opacity-30" size={24} />
              
              <h3 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#EBE3DC] mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#EBE3DC] to-[#A67C65]">Platinum</h3>
              <p className="text-white/60 font-bold text-sm mb-10 tracking-widest uppercase">Annual Membership</p>
              
              <ul className="space-y-5 flex-grow mb-10">
                <li className="flex items-center justify-between"><span className="text-[#EBE3DC] text-sm font-medium">Event Consultation</span> <Check size={18} className="text-[#A67C65]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#EBE3DC] text-sm font-bold">Décor Discounts</span> <span className="font-bold text-[#A67C65]">20%</span></li>
                <li className="flex items-center justify-between"><span className="text-[#EBE3DC] text-sm font-medium">Priority Booking</span> <Check size={18} className="text-[#A67C65]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#EBE3DC] text-sm font-medium">Vendor Discounts</span> <Check size={18} className="text-[#A67C65]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#EBE3DC] text-sm font-medium">Complimentary Upgrade</span> <Check size={18} className="text-[#A67C65]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#EBE3DC] text-sm font-medium">Digital Invitation</span> <Check size={18} className="text-[#A67C65]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#EBE3DC] text-sm font-medium">Surprise Gift</span> <Check size={18} className="text-[#A67C65]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#EBE3DC] text-sm font-medium">VIP Coordinator</span> <Check size={18} className="text-[#A67C65]" /></li>
                <li className="flex items-center justify-between"><span className="text-[#EBE3DC] text-sm font-medium">Exclusive Package</span> <Check size={18} className="text-[#A67C65]" /></li>
              </ul>
              
              <button className="w-full py-4 rounded-xl border-2 border-[#A67C65] text-[#EBE3DC] font-bold hover:bg-[#A67C65] hover:text-[#1A0F0A] transition-all relative overflow-hidden group">
                <span className="relative z-10">Choose Platinum</span>
                <div className="absolute inset-0 h-full w-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 8. PERFECT FOR */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 bg-white relative">
        <div className="container mx-auto max-w-[1200px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-[#4A2F1D]">{pageData.perfectForSection?.title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(pageData.perfectForSection?.items || []).map((audience, i) => {
              const IconComponent = iconMap[audience.icon];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#FAF7F2] p-8 rounded-[2rem] border border-[#E8DFD5] flex items-center gap-6 group hover:border-[#C0602F]/40 transition-colors"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-[#C0602F] group-hover:scale-110 group-hover:bg-[#C0602F] group-hover:text-white transition-all duration-300">
                    {IconComponent && <IconComponent size={24} />}
                  </div>
                  <h4 className="font-bold text-[#4A2F1D] text-[16px] leading-snug">{audience.title}</h4>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. OUR PROMISE */}
      <section className="py-32 px-5 sm:px-8 lg:px-12 bg-[#FAF7F2] relative overflow-hidden text-center">
        {/* Soft Floral Decorations */}
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none">
          <img src="/hero-bg.png" alt="Floral" className="w-full h-full object-cover" />
        </div>
        
        <div className="container relative z-10 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center mb-8">
             <Quote className="text-[#E8DFD5]" size={48} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-[#4A2F1D] mb-10"
          >
            {pageData.promiseSection?.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-[22px] md:text-[32px] leading-relaxed text-[#2A1810] font-medium font-['Playfair_Display',serif] max-w-3xl mx-auto"
          >
            {pageData.promiseSection?.text}
          </motion.p>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-12 flex flex-col items-center">
            {/* Elegant Divider */}
            <div className="w-24 h-[1px] bg-[#C0602F]/40 mb-6"></div>
            {/* Signature Graphic text placeholder */}
            <span className="font-['Playfair_Display',serif] italic text-[#C0602F] text-2xl">{pageData.promiseSection?.signature}</span>
          </motion.div>
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 relative overflow-hidden text-center">
        {/* Premium Gradient Banner */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#2A1810] via-[#4A2F1D] to-[#2A1810]">
           {/* Luxury Illustrations / Accents */}
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C0602F] opacity-[0.15] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        </div>
        
        <div className="container relative z-10 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[3rem] p-12 md:p-20 shadow-2xl">
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {pageData.ctaSection?.titleLine1}<br/>{pageData.ctaSection?.titleLine2}
            </h2>
            <p className="text-[#D5C5B9] text-[16px] md:text-[20px] mb-12 font-medium max-w-2xl mx-auto">
              {pageData.ctaSection?.description}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-[#C0602F] text-white px-10 py-5 rounded-xl font-bold tracking-wide text-[15px] transition-all hover:bg-[#A05025] shadow-[0_10px_30px_rgba(192,96,47,0.4)] hover:shadow-[0_15px_40px_rgba(192,96,47,0.6)] group flex items-center justify-center gap-2">
                Become a Member <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link to="/contact" className="bg-transparent border-2 border-white/30 text-white hover:border-white hover:bg-white/10 px-10 py-5 rounded-xl font-bold tracking-wide text-[15px] transition-all">
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Membership;
