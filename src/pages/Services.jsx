import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../utils/animations';
import { Sparkles, Music, Users, Camera, Gift, Coffee, Calendar, Star, Building, Briefcase, Heart, Speaker } from 'lucide-react';

const servicesList = [
  { title: "Wedding", icon: Heart, desc: "Flawless planning for your big day, creating memories for a lifetime." },
  { title: "Corporate Events", icon: Briefcase, desc: "Professional and seamless execution for seminars, product launches, and more." },
  { title: "Birthday", icon: Gift, desc: "Fun, vibrant, and customized birthday celebrations for all ages." },
  { title: "Catering", icon: Coffee, desc: "Exquisite culinary experiences tailored to your guests' tastes." },
  { title: "Pre-Wedding Ceremony", icon: Camera, desc: "Beautifully organized haldi, mehendi, and sangeet functions." },
  { title: "Trade Shows & Exhibitions", icon: Building, desc: "Engaging booth designs and comprehensive exhibition management." },
  { title: "Promotions", icon: Speaker, desc: "Impactful brand promotions and activations to reach your audience." },
  { title: "Special Entries", icon: Sparkles, desc: "Grand and cinematic entry concepts for the bride, groom, or VIPs." },
  { title: "Festivals", icon: Calendar, desc: "Vibrant and culturally rich festival celebrations." },
  { title: "House Warming", icon: Star, desc: "Warm and inviting setups for your griha pravesh." },
  { title: "Parties", icon: Music, desc: "High-energy DJ nights, cocktail parties, and get-togethers." },
  { title: "Sporting Events", icon: Users, desc: "Organized sports tournaments and athletic events." },
];

const Services = () => {
  return (
    <div className="pt-32 pb-20 px-6 lg:px-12">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-magenta font-semibold tracking-widest uppercase mb-4 block text-sm">What We Do</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Our Premium <span className="text-gradient">Services</span></h1>
          <p className="text-gray-400 text-lg">We offer a wide range of event management services tailored to your specific needs, ensuring every detail is perfectly executed.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={index}
                variants={fadeUp}
                className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-magenta to-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-magenta/10 group-hover:border-magenta/30 transition-colors">
                  <Icon className="text-white group-hover:text-magenta transition-colors" size={24} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
