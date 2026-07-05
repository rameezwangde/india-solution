import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
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
} from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';
import {
  findServiceBySlug,
  findServiceItemBySlug,
  serviceCatalog,
  slugifyServiceItem,
} from '../data/serviceCatalog';

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

const ServiceDetail = () => {
  const { serviceSlug, itemSlug } = useParams();
  const service = findServiceBySlug(serviceSlug);
  const selectedItem = itemSlug ? findServiceItemBySlug(service, itemSlug) : null;

  if (!service || (itemSlug && !selectedItem)) {
    return (
      <div className="bg-navy-900 px-6 pb-20 pt-40 text-white lg:px-12 lg:pt-44">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="site-eyebrow mb-4 block">Service</span>
          <h1 className="site-heading mb-6 text-4xl font-bold">Service Not Found</h1>
          <p className="mb-8 text-gray-300">The service you opened is not available.</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-magenta to-orange px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white"
          >
            <ArrowLeft size={16} />
            View All Services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] ?? Sparkles;
  const relatedServices = serviceCatalog.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <div className="bg-navy-900 px-6 pb-20 pt-40 text-white lg:px-12 lg:pt-44">
      <div className="container mx-auto max-w-7xl">
        <Link
          to="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-gray-300 transition-colors hover:text-gold"
        >
          <ArrowLeft size={16} />
          All Services
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card relative overflow-hidden p-8 md:p-10"
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-magenta/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-orange/15 blur-3xl" />

            <div className="relative">
              <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-magenta/40 bg-magenta/10 text-magenta shadow-[0_0_28px_rgba(233,30,99,0.25)]">
                <Icon size={36} strokeWidth={1.7} />
              </div>
              <span className="site-eyebrow mb-4 block">{service.title}</span>
              <h1 className="site-heading mb-6 text-4xl font-bold leading-tight md:text-6xl">
                {selectedItem ? (
                  <>
                    {selectedItem}
                    <span className="text-gradient block text-3xl md:text-5xl">Service</span>
                  </>
                ) : (
                  <>
                    {service.title}
                    <span className="text-gradient block text-3xl md:text-5xl">Planning</span>
                  </>
                )}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-gray-300">
                {selectedItem
                  ? `India Solution handles ${selectedItem.toLowerCase()} as part of our ${service.title.toLowerCase()} service, with careful planning, polished execution, and attention to every guest-facing detail.`
                  : service.description}
              </p>
              <div className="mt-9">
                <Link
                  to="/contact"
                  className="inline-flex rounded-full bg-gradient-to-r from-magenta to-orange px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          </motion.section>

          <motion.aside
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="glass-card p-7 md:p-8"
          >
            <span className="site-eyebrow mb-4 block">Service Points</span>
            <h2 className="site-heading mb-6 text-3xl font-semibold">Choose A Detail</h2>
            <div className="grid gap-3">
              {service.items.map((item) => {
                const isActive = item === selectedItem;
                return (
                  <motion.div key={item} variants={fadeUp}>
                    <Link
                      to={`/services/${service.slug}/${slugifyServiceItem(item)}`}
                      className={`block rounded-xl border px-4 py-4 text-sm font-semibold transition-all ${
                        isActive
                          ? 'border-gold/60 bg-gold/15 text-gold'
                          : 'border-white/10 bg-white/[0.03] text-gray-200 hover:border-magenta/50 hover:bg-magenta/10 hover:text-white'
                      }`}
                    >
                      {item}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.aside>
        </div>

        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14"
        >
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="site-eyebrow mb-3 block">Related Services</span>
              <h2 className="site-heading text-3xl font-semibold">Explore More</h2>
            </div>
            <Link to="/services" className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              View All
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {relatedServices.map((item) => {
              const RelatedIcon = iconMap[item.icon] ?? Sparkles;
              return (
                <motion.article key={item.slug} variants={fadeUp} className="glass-card p-6">
                  <RelatedIcon className="mb-5 text-magenta" size={30} strokeWidth={1.7} />
                  <h3 className="site-heading mb-3 text-xl font-semibold">{item.title}</h3>
                  <p className="mb-5 text-sm leading-6 text-gray-400">{item.description}</p>
                  <Link to={`/services/${item.slug}`} className="text-sm font-semibold text-gold">
                    Open Service
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ServiceDetail;
