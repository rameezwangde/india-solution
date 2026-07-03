import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Users, Award, Briefcase, Clock, Sparkles, Crosshair, Heart, Star } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';
const happyClients = ['Google', 'Capgemini', 'DHL', 'IBM', 'Bajaj', 'Audi', 'Amazon'];
const stats = [
  {
    value: '5,600+',
    label: 'Events Completed',
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
    <div>
      {/* Hero Section */}
      <section className="hero-showcase relative min-h-[680px] overflow-hidden px-5 pb-6 pt-28 text-white sm:px-8 lg:px-12 lg:pt-32">
        <div className="hero-showcase-glow hero-showcase-glow-left" />
        <div className="hero-showcase-glow hero-showcase-glow-right" />

        <div className="container relative z-10 mx-auto max-w-[1340px]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={fadeUp} className="mb-3 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.36em] text-[#FF4B64]">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-magenta" />
              <span>Crafting Unforgettable Moments</span>
              <span className="h-px w-8 bg-gradient-to-r from-orange to-transparent" />
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-display text-4xl font-semibold uppercase leading-tight tracking-[0.18em] text-white sm:text-5xl lg:text-6xl">
              Creating
              <span className="block bg-gradient-to-r from-[#B026FF] via-magenta to-orange bg-clip-text italic text-transparent">Unforgettable Events</span>
              <span className="block text-2xl tracking-[0.36em] sm:text-3xl lg:text-4xl">Since 2010</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="mx-auto my-3 flex w-52 items-center justify-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-magenta" />
              <span className="text-orange">&#10022;</span>
              <span className="h-px flex-1 bg-gradient-to-r from-magenta to-transparent" />
            </motion.div>

            <motion.p variants={fadeUp} className="mx-auto max-w-xl text-sm leading-6 text-gray-300 md:text-base">
              At India Solution, we bring your vision to life, from intimate celebrations to grand corporate gatherings. Trust us to handle the details while you enjoy the moment.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hero-stat-bar mx-auto mt-5 max-w-[860px]"
          >
            <div className="grid grid-cols-2 gap-y-5 md:grid-cols-4 md:gap-y-0">
              {stats.map((stat, index) => (
                <div key={stat.label} className={`flex items-center justify-center gap-4 px-5 ${index > 0 ? 'md:border-l md:border-white/10' : ''}`}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-magenta/35 bg-magenta/10 text-magenta shadow-[0_0_18px_rgba(233,30,99,0.2)]">
                    <stat.icon size={20} strokeWidth={1.7} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold leading-none text-white">{stat.value}</h3>
                    <p className="mt-1 text-xs text-gray-300">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="hero-photo-stage relative mx-auto mt-5 h-[300px] max-w-[1200px] sm:h-[340px] lg:h-[360px]"
          >
            <div className="hero-photo-card hero-photo-card-one">
              <img src="/about-us.png" alt="Wedding floral aisle decor" />
            </div>
            <div className="hero-photo-card hero-photo-card-two">
              <img src="/hero-stage.png" alt="Candlelit event table" />
            </div>
            <div className="hero-photo-card hero-photo-card-main">
              <img src="/about-us.png" alt="Grand stage celebration" />
            </div>
            <div className="hero-photo-card hero-photo-card-four">
              <img src="/hero-stage.png" alt="Corporate event stage" />
            </div>
            <div className="hero-photo-card hero-photo-card-five">
              <img src="/about-us.png" alt="Evening celebration lounge" />
            </div>

            <div className="hero-years-badge">
              <span className="text-orange">&#9819;</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-magenta">Celebrating</span>
              <span className="font-display text-5xl font-semibold leading-none text-white">15+</span>
              <span className="text-xs font-bold uppercase tracking-widest text-white">Years of Excellence</span>
              <span className="mt-1 h-0.5 w-9 bg-orange" />
            </div>
          </motion.div>
        </div>
      </section>
      {/* About Us Section */}
      <section className="about-showcase relative overflow-hidden px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="about-showcase-wave about-showcase-wave-left" />
        <div className="about-showcase-wave about-showcase-wave-right" />

        <div className="container relative z-10 mx-auto">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] xl:gap-14">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <motion.span variants={fadeUp} className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#FF4B64]">
                About Our Company
              </motion.span>
              <motion.span variants={fadeUp} className="mb-5 block h-0.5 w-10 bg-[#FF4B64]" />
              <motion.h2 variants={fadeUp} className="font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
                Welcome to
                <span className="block bg-gradient-to-r from-magenta via-[#FF4B64] to-orange bg-clip-text text-transparent">India Solution</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="my-6 flex items-center gap-5 text-magenta/70">
                <span className="h-px w-24 bg-gradient-to-r from-magenta to-orange/70" />
                <span className="text-sm text-[#FF4B64]">&#10022;</span>
                <span className="h-px w-24 bg-gradient-to-r from-orange/70 to-transparent" />
              </motion.div>
              <motion.p variants={fadeUp} className="mb-5 text-sm leading-7 text-gray-300 md:text-base">
                Since 2010, <strong className="text-white">India Solution Events</strong> has been a trusted name in event management, delivering over 15 years of expertise in crafting unforgettable experiences. Based in Bengaluru, we specialize in turning visions into reality for both <strong className="text-white">personal and professional events</strong>, ensuring every detail is executed to perfection.
              </motion.p>
              <motion.p variants={fadeUp} className="mb-7 text-sm leading-7 text-gray-300 md:text-base">
                Whether it&rsquo;s an intimate gathering or a grand corporate affair, our dedicated team is ready to bring creativity, professionalism, and excellence to your special moments.
              </motion.p>

              <div className="space-y-4">
                <motion.div variants={fadeUp} className="about-info-card group">
                  <div className="about-info-icon border-magenta text-magenta shadow-[0_0_24px_rgba(233,30,99,0.34)]">
                    <Users size={28} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">About Celebratory Events</h3>
                    <span className="my-2 block h-0.5 w-12 bg-magenta" />
                    <p className="text-xs leading-5 text-gray-400 md:text-sm">
                      We bring your special moments to life with unmatched creativity and attention to detail. From dreamy weddings with stunning d&eacute;cor to fun-filled birthday parties, elegant engagement ceremonies, and even pre-wedding festivities like mehndi and sangeet nights, we ensure every occasion is as unique as your story.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="about-info-card group">
                  <div className="about-info-icon border-orange text-orange shadow-[0_0_24px_rgba(255,152,0,0.32)]">
                    <Briefcase size={28} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">Corporate &amp; Formal Events</h3>
                    <span className="my-2 block h-0.5 w-12 bg-orange" />
                    <p className="text-xs leading-5 text-gray-400 md:text-sm">
                      Our expertise in corporate and formal event management ensures your professional gatherings are handled seamlessly. Be it a dynamic product launch, an inspiring corporate conference, a grand stage show, or team-building retreats, we execute every detail with precision and innovation.
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.button variants={fadeUp} className="mt-5 inline-flex items-center gap-8 rounded-full bg-gradient-to-r from-magenta via-[#FF4B64] to-orange px-8 py-4 text-sm font-bold uppercase text-white shadow-[0_0_26px_rgba(233,30,99,0.35)] transition-transform hover:-translate-y-0.5">
                Discover More
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-0"
            >
              <div className="overflow-hidden rounded-[38px] border border-white/10 shadow-[0_0_40px_rgba(233,30,99,0.12)]">
                <img src="/hero-stage.png" alt="India Solution event decor" className="h-[300px] w-full object-cover md:h-[420px]" />
              </div>

              <div className="stats-glow-panel relative -mt-1 overflow-hidden rounded-[22px] border border-magenta/50 px-5 py-8 shadow-[0_0_32px_rgba(233,30,99,0.18)] md:px-7 md:py-9">
                <div className="stats-wave stats-wave-purple" />
                <div className="stats-wave stats-wave-orange" />
                <div className="relative z-10 grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className={`relative flex flex-col items-center text-center ${index > 0 ? 'md:border-l md:border-white/20' : ''}`}>
                      <div className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white/5 ${stat.ring}`}>
                        <stat.icon size={28} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.75)]" strokeWidth={1.7} />
                        <span className={`absolute -right-1 bottom-2 h-3 w-3 rounded-full shadow-[0_0_12px_currentColor] ${stat.dot}`} />
                      </div>
                      <h4 className="font-display text-3xl font-semibold leading-none text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.18)] md:text-4xl">{stat.value}</h4>
                      <p className="mt-2 text-xs font-medium text-gray-300 md:text-sm">{stat.label}</p>
                      <span className={`mt-4 h-1 w-10 rounded-full ${stat.bar}`} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Brand Statement Section */}
      <section className="brand-collage-section relative overflow-hidden px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="brand-collage-dots" />
        <div className="container relative z-10 mx-auto max-w-[1320px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="brand-collage-frame"
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
              <h2 className="font-display text-4xl font-semibold italic uppercase leading-tight tracking-[0.08em] text-white md:text-5xl lg:text-6xl">
                Creating
                <span className="block bg-gradient-to-r from-magenta via-[#FF4B64] to-orange bg-clip-text text-transparent">Unforgettable</span>
                <span className="block">Events</span>
              </h2>

              <div className="my-7 flex items-center gap-4">
                <span className="h-px w-24 bg-gradient-to-r from-magenta to-[#FF4B64]" />
                <span className="text-[#FF7A59]">&#10022;</span>
                <span className="h-px w-24 bg-gradient-to-r from-[#FF4B64] to-orange" />
              </div>

              <p className="font-display text-3xl font-semibold italic uppercase tracking-[0.18em] text-white md:text-4xl">
                Since <span className="bg-gradient-to-r from-[#FF4B64] to-orange bg-clip-text text-transparent">2010</span>
              </p>

              <p className="mt-8 max-w-lg text-lg leading-8 text-gray-300">
                At India Solution, we bring your vision to life, from intimate celebrations to grand corporate gatherings. Trust us to handle the details while you enjoy the moment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="relative overflow-hidden bg-[#050917] px-5 py-16 text-white sm:px-8 lg:px-12">
        <div className="container mx-auto max-w-[1460px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-8 max-w-3xl text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#FF4B64]">
              <span className="h-px w-9 bg-gradient-to-r from-transparent to-[#FF4B64]" />
              <span>&#10022;</span>
              <span>Why Choose Us</span>
              <span>&#10022;</span>
              <span className="h-px w-9 bg-gradient-to-r from-[#FF4B64] to-transparent" />
            </div>
            <h2 className="font-display text-4xl font-medium leading-tight text-white md:text-6xl">
              Why Choose <span className="text-magenta">India</span> <span className="text-orange">Solution</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-300">
              We combine creativity, precision and passion to deliver events that leave a lasting impression.
            </p>
          </motion.div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Skilled Team", desc: "Our experienced professionals bring creativity, innovation and expertise to every event.", icon: Users, image: "/about-us.png", position: "center" },
              { title: "Flawless Punctuality", desc: "We ensure every event unfolds seamlessly, adhering to meticulously planned timelines.", icon: Clock, image: "/hero-stage.png", position: "center" },
              { title: "Endless Creativity", desc: "From imaginative themes to innovative corporate setups, we craft events that stand out and inspire.", icon: Sparkles, image: "/about-us.png", position: "right center" },
              { title: "Attention to Detail", desc: "Every detail, big or small, matters to us. We ensure everything is flawlessly executed.", icon: Crosshair, image: "/hero-stage.png", position: "left center" },
              { title: "Long-Lasting Bonds", desc: "Many of our clients become part of the family, returning for future celebrations.", icon: Heart, image: "/about-us.png", position: "center bottom" },
              { title: "Proven Excellence", desc: "Our reputation is built on the heartfelt recommendations of those we have had the privilege to serve.", icon: Star, image: "/hero-stage.png", position: "right center" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative h-[260px] overflow-hidden rounded-xl border border-white/15 bg-[#0F1423] shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
              >
                <img
                  src={feature.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: feature.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050917]/95 via-[#050917]/55 to-[#050917]/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050917]/65 via-transparent to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-magenta bg-[#111827]/65 text-magenta shadow-[0_0_22px_rgba(233,30,99,0.22)]">
                    <feature.icon size={23} strokeWidth={1.7} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">{feature.title}</h3>
                  <span className="my-2 block h-0.5 w-8 bg-gradient-to-r from-magenta to-orange" />
                  <p className="max-w-[310px] text-sm leading-5 text-gray-300">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Happy Clients */}
      <section className="bg-white pb-20 text-black">
        <div className="border-b-[14px] border-[#103A69]">
          <div className="rounded-[28px] bg-[#5AA4EE] px-6 py-5 text-center md:rounded-[34px]">
            <h2 className="text-4xl font-black text-white md:text-5xl">Our Happy Clients</h2>
          </div>

          <div className="overflow-hidden py-14">
            <div className="client-logo-track flex items-center gap-16 md:gap-24">
              {[...happyClients, ...happyClients].map((brand, index) => (
                <div key={`${brand}-${index}`} className="client-logo-item" aria-hidden={index >= happyClients.length}>
                  <ClientLogo brand={brand} />
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
