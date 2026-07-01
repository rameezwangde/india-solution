import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, Clock, Sparkles, Crosshair, Heart, Star } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 lg:pt-48 pb-16 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-5%] left-[-5%] w-[60%] lg:w-[40%] h-[40%] bg-magenta/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[60%] lg:w-[40%] h-[40%] bg-orange/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.p variants={fadeUp} className="text-gray-400 font-semibold tracking-widest uppercase mb-4 text-xs lg:text-sm text-center lg:text-left mt-8 lg:mt-0">
                CREATING <span className="text-[#B026FF]">UNFORGETTABLE</span> MOMENTS
              </motion.p>
              
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-display font-medium leading-tight mb-6 text-white text-center lg:text-left">
                Extraordinary Events.<br />
                <span className="text-[#B026FF]">Impeccable </span>
                <span className="text-[#FF512F]">Execution.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0">
                From intimate celebrations to grand corporate affairs, we turn your vision into unforgettable experiences with creativity, precision, and passion.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6">
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-magenta to-orange text-white font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2 group shadow-lg shadow-magenta/20">
                  EXPLORE SERVICES
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-6 py-3 rounded-full text-white font-medium text-sm hover:text-magenta transition-colors flex items-center gap-3">
                  WATCH SHOWREEL
                  <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                    <Play size={12} className="text-white ml-0.5" />
                  </span>
                </button>
              </motion.div>
            </motion.div>

            {/* Right Image / Visual */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-[350px] md:h-[450px] lg:h-[600px] mt-8 lg:mt-0"
            >
              <div className="absolute inset-0 rounded-[40px] overflow-hidden">
                <img 
                  src="/hero-stage.png" 
                  alt="Luxury Event Setup" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-transparent to-transparent" />
                
                {/* Curved Design Element Overlay */}
                <svg className="absolute left-[-2px] top-0 h-full w-[100px] text-navy-900 drop-shadow-2xl" viewBox="0 0 100 1000" preserveAspectRatio="none" fill="currentColor">
                  <path d="M0,0 L100,0 C30,300 30,700 100,1000 L0,1000 Z" />
                </svg>
              </div>

              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[-40px] bottom-[20%] glass-card p-6 rounded-full w-40 h-40 flex flex-col items-center justify-center text-center border-magenta/30"
              >
                <span className="text-magenta text-[10px] tracking-widest uppercase mb-1">Celebrating</span>
                <span className="text-4xl font-display font-semibold text-white leading-none mb-1">15+</span>
                <span className="text-gray-300 text-xs uppercase tracking-wide">Years of<br/>Excellence</span>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative z-20 -mt-10 mb-20 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="bg-white p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 rounded-2xl shadow-xl">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-magenta to-purple-600 flex items-center justify-center text-white shadow-lg shadow-magenta/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div>
                <h4 className="text-2xl font-medium font-display text-navy-900">5,600+</h4>
                <p className="text-gray-500 text-sm">Events Completed</p>
              </div>
            </div>

            <div className="hidden lg:block w-px bg-gray-200"></div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-magenta flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
              </div>
              <div>
                <h4 className="text-2xl font-medium font-display text-navy-900">15+</h4>
                <p className="text-gray-500 text-sm">Years Experience</p>
              </div>
            </div>

            <div className="hidden lg:block w-px bg-gray-200"></div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-magenta flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div>
                <h4 className="text-2xl font-medium font-display text-navy-900">2,500+</h4>
                <p className="text-gray-500 text-sm">Happy Clients</p>
              </div>
            </div>

            <div className="w-px bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-magenta flex items-center justify-center text-white shadow-lg shadow-magenta/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <div>
                <h4 className="text-2xl font-medium font-display text-navy-900">50+</h4>
                <p className="text-gray-500 text-sm">Event Categories</p>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section className="py-20 px-6 lg:px-12 relative z-20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-[30px] overflow-hidden">
                <img src="/about-us.png" alt="India Solution Events" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-navy-900/40"></div>
                <div className="absolute bottom-6 left-6 right-6 glass-card p-6 border-magenta/30">
                  <p className="text-white font-display font-medium text-lg">"Turning visions into reality for personal and professional events."</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span variants={fadeUp} className="text-magenta font-semibold tracking-widest uppercase mb-4 block text-sm">About Our Company</motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-medium mb-6 leading-tight">Welcome to <span className="text-gradient">India Solution</span></motion.h2>
              <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-6 leading-relaxed">
                Since 2010, India Solution Events has been a trusted name in event management, delivering over 15 years of expertise in crafting unforgettable experiences. Based in Bengaluru, we specialize in turning visions into reality for both personal and professional events, ensuring every detail is executed to perfection.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-8 leading-relaxed">
                Whether it’s an intimate gathering or a grand corporate affair, our dedicated team is ready to bring creativity, professionalism, and excellence to your special moments.
              </motion.p>
              <motion.button variants={fadeUp} className="px-8 py-3 rounded-full border-2 border-magenta text-magenta font-semibold hover:bg-magenta hover:text-white transition-all shadow-[0_0_15px_rgba(233,30,99,0.3)]">
                Discover More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 lg:px-12 relative overflow-hidden bg-navy-800/30">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-orange font-semibold tracking-widest uppercase mb-4 block text-sm">Why Us</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">Why Choose <span className="text-gradient">India Solution</span></h2>
            <p className="text-gray-400 text-lg">
              At India Solution Events, we pride ourselves on delivering unmatched quality and excellence. Your dream event is our priority, and quality is our promise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {[
              { title: "Skilled Team", desc: "Our experienced and passionate professionals bring creativity, innovation, and expertise.", icon: Users, color: "from-magenta to-purple-600" },
              { title: "Flawless Punctuality", desc: "We ensure every event unfolds seamlessly, adhering to meticulously planned timelines.", icon: Clock, color: "from-orange to-pink-500" },
              { title: "Endless Creativity", desc: "From imaginative wedding themes to innovative corporate setups, we craft events that stand out.", icon: Sparkles, color: "from-purple-600 to-magenta" },
              { title: "Attention to Detail", desc: "Every detail, big or small, matters to us. We ensure everything is flawlessly executed.", icon: Crosshair, color: "from-pink-500 to-orange" },
              { title: "Long-Lasting Bonds", desc: "Many of our clients become part of the family, returning for future celebrations.", icon: Heart, color: "from-magenta to-orange" },
              { title: "Proven Excellence", desc: "Our reputation is built on the heartfelt recommendations of those we've had the privilege to serve.", icon: Star, color: "from-orange to-purple-600" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl bg-[#0F1423] border border-white/5 p-8 overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-xl"
              >
                {/* Glowing Hover Border Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${feature.color} blur-[20px] -z-10`} />
                <div className="absolute inset-[1px] bg-[#0F1423] rounded-2xl -z-10" />

                {/* Card Number Background - Removed as requested */}

                {/* Icon */}
                <div className="mb-6 relative">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} opacity-20 absolute top-0 left-0 blur-md group-hover:opacity-50 transition-opacity`} />
                  <div className="w-14 h-14 rounded-full bg-[#1A2235] border border-white/10 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon size={24} className="text-white font-light stroke-1" />
                  </div>
                </div>

                <h3 className="text-xl font-display font-medium mb-3 text-white group-hover:text-magenta transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
