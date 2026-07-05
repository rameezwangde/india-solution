import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BriefcaseBusiness,
  Cake,
  CheckCircle2,
  Gem,
  Gift,
  Heart,
  House,
  Mail,
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

const invitationSections = [
  {
    title: 'Invitations & Stationery',
    description: (
      <>
        Make your event unforgettable with our <strong>Invitation & Stationery Services</strong>, offering customized, high-quality invitations and stationery to match your unique style. From <strong>luxury invitations</strong> to <strong>RSVP cards, thank-you notes, and event signage</strong>, we ensure every detail is perfect. Our expert designers work closely with you to create personalized designs for <strong>corporate events, personal celebrations</strong>, and more. Let us set the tone for your event with stunning custom stationery that leaves a lasting impression
      </>
    ),
    items: [
      'Luxury Foil-Stamped Invitations',
      'Laser-Cut Invitations',
      'Vintage Letterpress Invitations',
      'Modern Minimalist Invitations',
      'Floral Watercolor Invitations',
      'Rustic Kraft Paper Invitations',
      'Custom Illustration Invitations',
      'Destination Wedding Invitations',
      'Interactive Invitations',
    ],
  },
  {
    title: 'Digital Invitations',
    description: (
      <>
        Make your event stand out with our <strong>Digital Invitation Services</strong>, offering modern, eco-friendly, and interactive invitations tailored to your style. From <strong>animated e-vites</strong> to <strong>RSVP-integrated invitations, social media invites, and custom digital cards</strong>, we ensure a seamless, engaging experience for your guests. Our expert designers create personalized digital invitations for <strong>corporate events, personal celebrations</strong>, and more, making it easy to share event details instantly. Set the tone for your event with digital invitations that are both stylish and convenient
      </>
    ),
    items: [
      'Animated Video Invitations',
      'E-vites with RSVP Integration',
      'Email Invitations',
      'Interactive Webpage Invitations',
      'Social Media Invitations',
      'QR Code Invitations',
      'Virtual Event Invitations',
      'Animated GIF Invitations',
      'Personalized E-Cards',
    ],
  },
];

const beautySections = [
  {
    title: 'Bridal Makeup Services',
    description: 'Transform your bridal look with our expert Bridal Makeup Service, designed to enhance your natural beauty for your big day. Whether you prefer a classic, glamorous, or modern style, our skilled makeup artists use high-quality products and personalized techniques to create a flawless, long-lasting look. Trust our makeup experts to make you feel radiant, from the ceremony to the celebration. Book your bridal makeup consultation today for a perfect, glowing look',
    items: [
      'Pre-Wedding Trial Session',
      'Customizable Makeup Styles',
      'Flawless Foundation Application',
      'Eye Makeup & Lashes',
      'Contouring & Highlighting',
      'Bridal Hair Styling',
      'Long-Lasting Makeup',
      'Touch-Up Services',
      'Makeup for Bridesmaids & Guests',
    ],
  },
  {
    title: 'Mehndi Services for Brides',
    description: 'Enhance your bridal beauty with our expert Mehndi services. Our skilled Mehndi artists create custom, intricate designs that blend tradition and elegance. Whether traditional or modern styles, we craft the perfect design for your bridal look using natural henna for long-lasting, stunning results. Book your bridal Mehndi consultation today for a flawless, personalized experience',
    items: [
      'Bridal Mehndi Designs',
      'Henna Tattoo Services',
      'Custom Mehndi Designs',
      'Pre-Wedding Mehndi Trial',
      'Full-Hand & Foot Mehndi',
      'Traditional Bridal Mehndi',
      'Modern & Fusion Mehndi Styles',
      'Bridal Mehndi for Sangeet or Engagement',
      'Henna Removal Services',
    ],
  },
];

const InvitationStationeryContent = () => (
  <motion.section
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="mt-12 grid gap-6"
  >
    {invitationSections.map((section) => (
      <motion.article
        key={section.title}
        variants={fadeUp}
        className="glass-card relative overflow-hidden border-magenta/25 p-7 md:p-9"
      >
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <span className="site-eyebrow mb-3 block">Custom Designs</span>
            <h2 className="site-heading mb-5 text-3xl font-bold leading-tight md:text-5xl">
              {section.title.includes('&') ? (
                <>
                  Invitations <span className="text-gradient">& Stationery</span>
                </>
              ) : (
                <span className="text-gradient">{section.title}</span>
              )}
            </h2>
            <p className="text-base leading-8 text-gray-300 md:text-lg">{section.description}</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-magenta to-orange px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
            >
              <Mail size={17} />
              Contact us
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {section.items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-gray-100"
              >
                <CheckCircle2 size={18} className="shrink-0 text-gold" strokeWidth={2} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.article>
    ))}
  </motion.section>
);

const BeautyServicesContent = () => (
  <motion.section
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="mt-12 grid gap-6"
  >
    <motion.div variants={fadeUp} className="glass-card relative overflow-hidden p-7 text-center md:p-9">
      <div className="absolute left-1/2 top-0 h-32 w-72 -translate-x-1/2 rounded-full bg-magenta/20 blur-3xl" />
      <div className="relative mx-auto max-w-4xl">
        <span className="site-eyebrow mb-3 block">Bridal Beauty</span>
        <h2 className="site-heading mb-4 text-3xl font-bold leading-tight md:text-5xl">
          Beauty Services, <span className="text-gradient">Makeup, and Mehndi</span>
        </h2>
        <p className="text-base leading-8 text-gray-300 md:text-lg">
          Enhance your beauty and glow with our expert Beauty Services, Makeup, and Mehndi - creating the perfect look for your unforgettable moments
        </p>
      </div>
    </motion.div>

    {beautySections.map((section) => (
      <motion.article
        key={section.title}
        variants={fadeUp}
        className="glass-card relative overflow-hidden border-magenta/25 p-7 md:p-9"
      >
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-magenta/10 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <span className="site-eyebrow mb-3 block">Wedding Ready</span>
            <h2 className="site-heading mb-5 text-3xl font-bold leading-tight md:text-5xl">
              {section.title.includes('Mehndi') ? (
                <span className="text-gradient">{section.title}</span>
              ) : (
                section.title
              )}
            </h2>
            <p className="text-base leading-8 text-gray-300 md:text-lg">{section.description}</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-magenta to-orange px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
            >
              <Mail size={17} />
              Contact us
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {section.items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-gray-100"
              >
                <CheckCircle2 size={18} className="shrink-0 text-gold" strokeWidth={2} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.article>
    ))}
  </motion.section>
);

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
  const selectedItemSlug = selectedItem ? slugifyServiceItem(selectedItem) : '';
  const isInvitationStationery = selectedItemSlug === 'invitations-and-stationery';
  const isBeautyServices = selectedItemSlug === 'beauty-services-makeup-and-mehndi';

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

        {isInvitationStationery && <InvitationStationeryContent />}
        {isBeautyServices && <BeautyServicesContent />}

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