import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  Cake,
  ChevronRight,
  Gem,
  Gift,
  Heart,
  House,
  Megaphone,
  Music,
  PanelsTopLeft,
  PartyPopper,
  Sparkles,
  Trophy,
  Utensils,
} from 'lucide-react';
import { staggerContainer, fadeUp } from '../utils/animations';
import { serviceCatalog, slugifyServiceItem } from '../data/serviceCatalog';

const iconMap = {
  BriefcaseBusiness,
  Cake,
  Gem,
  Gift,
  Heart,
  House,
  Megaphone,
  Music,
  PanelsTopLeft,
  PartyPopper,
  Sparkles,
  Trophy,
  Utensils,
};

const Services = () => {
  return (
    <section className="services-showcase relative overflow-hidden px-5 pb-20 pt-40 text-white lg:px-10 lg:pt-44">
      <div className="services-dots services-dots-left" />
      <div className="services-dots services-dots-right" />
      <div className="services-wave services-wave-left" />
      <div className="services-wave services-wave-right" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <div className="mx-auto mb-3 flex items-center justify-center gap-3 text-magenta">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-magenta" />
            <span className="h-1.5 w-1.5 rotate-45 bg-magenta shadow-[0_0_12px_rgba(233,30,99,0.9)]" />
            <span className="h-px w-10 bg-gradient-to-r from-magenta to-orange" />
          </div>
          <h1 className="site-heading text-4xl font-bold leading-none tracking-[0.14em] md:text-5xl">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-xs leading-5 text-gray-300 md:text-sm">
            Comprehensive event solutions tailored to create unforgettable experiences.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {serviceCatalog.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Sparkles;
            const accentClass = index % 3 === 2 ? 'service-card-gold' : 'service-card-magenta';

            return (
              <motion.article
                key={service.slug}
                variants={fadeUp}
                className={`service-card group relative flex min-h-[315px] flex-col overflow-hidden rounded-xl p-5 ${accentClass}`}
              >
                <div className="mb-4 flex items-start gap-3">
                  <Link
                    to={`/services/${service.slug}`}
                    className="service-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-magenta transition-colors group-hover:text-gold"
                    aria-label={service.title}
                  >
                    <Icon size={19} strokeWidth={1.8} />
                  </Link>
                  <div>
                    <Link to={`/services/${service.slug}`}>
                      <h2 className="site-heading service-title text-lg font-bold leading-tight text-gold transition-colors hover:text-orange md:text-xl">
                        {service.title}
                      </h2>
                    </Link>
                    <p className="mt-1 max-w-[18rem] text-[11px] leading-4 text-gray-400">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-auto grid gap-2">
                  {service.items.map((item) => (
                    <Link
                      key={item}
                      to={`/services/${service.slug}/${slugifyServiceItem(item)}`}
                      className="service-point flex items-center gap-2 rounded border px-3 py-2 text-[11px] font-medium leading-tight text-gray-200 transition-all hover:translate-x-1 hover:text-gold md:text-xs"
                    >
                      <ChevronRight size={12} className="shrink-0 text-magenta" strokeWidth={2.2} />
                      <span>{item}</span>
                    </Link>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;