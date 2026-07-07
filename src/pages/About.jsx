import { motion } from 'framer-motion';
import { Award, Clock, Crosshair, Eye, Handshake, Lightbulb, Target, Users } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const highlights = [
  {
    title: 'Skilled Team',
    description: 'Our experienced and passionate professionals bring creativity, innovation, and expertise to every event we manage.',
    icon: Users,
  },
  {
    title: 'Flawless Punctuality',
    description: 'We ensure every event unfolds seamlessly, adhering to meticulously planned timelines.',
    icon: Clock,
  },
  {
    title: 'Long-Lasting Bonds',
    description: 'Many of our clients become part of the India Solution family, returning to us for their future celebrations and events.',
    icon: Handshake,
  },
  {
    title: 'Endless Creativity',
    description: 'From imaginative wedding themes to innovative corporate setups, we craft events that stand out.',
    icon: Lightbulb,
  },
  {
    title: 'Attention to Detail',
    description: 'Every detail, big or small, matters to us. We ensure everything is flawlessly executed.',
    icon: Crosshair,
  },
  {
    title: 'Proven Excellence',
    description: "Our reputation is built on the heartfelt recommendations of those we've had the privilege to serve.",
    icon: Award,
  },
];

const About = () => {
  return (
    <div className="bg-navy-900 text-white">
      <section className="services-showcase relative overflow-hidden pb-20 pt-40 lg:pt-44">
        <div className="services-dots services-dots-left" />
      <div className="services-dots services-dots-right" />
      <div className="services-wave services-wave-left" />
      <div className="services-wave services-wave-right" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="mx-auto mb-3 flex items-center justify-center gap-3 text-magenta">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-magenta" />
            <span className="h-1.5 w-1.5 rotate-45 bg-magenta shadow-[0_0_12px_rgba(233,30,99,0.9)]" />
            <span className="h-px w-10 bg-gradient-to-r from-magenta to-orange" />
          </div>
          <h1 className="site-heading text-4xl font-bold leading-none tracking-[0.14em] md:text-5xl lg:text-6xl">
            About <span className="text-gradient">Us</span>
          </h1>
        </motion.div>
      </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 lg:px-12">
        <div className="absolute inset-0 bg-[#121A2D]" />
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-magenta/10 blur-3xl" />
        <div className="absolute right-0 bottom-20 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />

        <div className="container relative z-10 mx-auto max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
          >
            <motion.div variants={fadeUp} className="space-y-6 text-center text-gray-300 lg:text-left">
              <p className="text-base leading-relaxed md:text-lg">
                For over 15 years, <strong className="site-gold-text">India Solution</strong> has been one of Bengaluru’s trusted names in Event Management and In-House Event Production, delivering seamless, premium-quality experiences for events of every scale.
              </p>
              <p className="text-base leading-relaxed md:text-lg">
                What truly sets us apart is that everything you see at an event is produced and managed in-house. From concept development, stage production, LED walls, sound, lighting, trussing, fabrication, décor, branding, artist management, technical execution, logistics, and on-ground operations—we handle it all under one roof.
              </p>
              <p className="text-base leading-relaxed md:text-lg">
                That means no middlemen, no multiple vendors, no communication gaps—just one dedicated point of contact for your entire event.
              </p>
              <p className="text-base leading-relaxed md:text-lg">
                Because our entire team works together as one unit, every department is perfectly synchronized. The result is better coordination, faster execution, consistent quality, and cost-effective solutions without compromising on creativity or premium standards.
              </p>
              <p className="text-base leading-relaxed md:text-lg">
                Whether you’re planning an intimate celebration for 15 guests or a large-scale production for 15,000 attendees, we deliver the same attention to detail, professionalism, and world-class execution.
              </p>
              <p className="text-base leading-relaxed md:text-lg">
                Over the years, we have proudly served as official production and event partners for leading event management companies, premium venues, corporate organizations, educational institutions, government bodies, brands, and private clients across Karnataka and beyond. Our experience spans both B2B and B2C projects, earning us long-term relationships built on trust, reliability, and exceptional delivery.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid gap-5">
              <div className="glass-card p-7">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-magenta/40 bg-magenta/10 text-magenta">
                  <Target size={28} />
                </div>
                <h2 className="mb-3 site-heading text-2xl font-semibold">Our Mission</h2>
                <p className="leading-relaxed text-gray-300">
                  To deliver exceptional event solutions by blending creativity, precision, and personalized service, ensuring every event reflects the unique personality and aspirations of our clients.
                </p>
              </div>

              <div className="glass-card p-7">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-orange/40 bg-orange/10 text-orange">
                  <Eye size={28} />
                </div>
                <h2 className="mb-3 site-heading text-2xl font-semibold">Our Vission</h2>
                <p className="leading-relaxed text-gray-300">
                  To be the most trusted and innovative event management company in India, redefining celebrations and creating unforgettable experiences for our clients.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 lg:px-12">
        <div className="absolute inset-0 bg-[#10172A]" />
        <div className="container relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-4xl text-center"
          >
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.35em] text-gold">Why Choose Us</span>
            <h2 className="site-heading text-4xl font-semibold md:text-5xl">Why Should You Hire Us</h2>
            <div className="mx-auto my-5 h-1 w-20 rounded-full bg-gradient-to-r from-magenta to-orange" />
            <p className="text-lg leading-relaxed text-gray-300">
              At <strong className="site-gold-text">India Solution</strong>, we don't just plan events; we create experiences that leave lasting impressions. Here's why we are the perfect choice for your event management needs:
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={fadeUp} className="glass-card group p-7 transition-all duration-300 hover:-translate-y-1 hover:border-magenta/40">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-magenta/35 bg-white/5 text-magenta transition-colors group-hover:bg-magenta/10">
                    <Icon size={25} />
                  </div>
                  <h3 className="mb-3 site-heading text-xl font-semibold">{item.title}</h3>
                  <p className="leading-relaxed text-gray-400">{item.description}</p>
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