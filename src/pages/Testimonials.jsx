import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const testimonials = [
  {
    title: 'A Flawless Corporate Experience',
    quote: 'India Solution Events turned our annual corporate meet into a seamless and impressive experience. From the elegant decor to the flawless management of our schedule, everything exceeded expectations. Our team and clients were highly impressed. Thank you for making it a grand success!',
    name: 'Ananya Gupta',
    role: 'Marketing Head, Prism Solutions',
    initials: 'AG',
    offset: 'lg:mt-10',
  },
  {
    title: 'Professionalism at Its Best',
    quote: "Our product launch event was a huge success, all thanks to India Solution Events. The attention to detail, innovative ideas, and their ability to handle last-minute changes with grace truly stood out. We couldn't have asked for a better partner!",
    name: 'Rajesh Kumar',
    role: 'CEO, TechNext Innovations',
    initials: 'RK',
    offset: 'lg:mt-0',
  },
  {
    title: 'A Dream Wedding Come True',
    quote: 'India Solution made our wedding day absolutely magical. From the breathtaking decor to ensuring every guest felt special, they handled everything with care and professionalism. It was a day straight out of a fairy tale!',
    name: 'Simran & Arjun',
    role: 'Wedding Clients',
    initials: 'SA',
    offset: 'lg:mt-16',
  },
  {
    title: 'The Perfect Birthday Bash',
    quote: "I couldn't believe how perfectly India Solution Events brought my son's superhero-themed birthday party to life! The decor, activities, and even the smallest details were just amazing. My son and his friends had the time of their lives!",
    name: 'Nisha Mehta',
    role: 'Birthday Celebration Client',
    initials: 'NM',
    offset: 'lg:-mt-4',
  },
  {
    title: 'An Unforgettable Engagement Celebration',
    quote: "India Solution made our engagement party so special! From the romantic ambiance to the flawless coordination, everything was picture-perfect. Our guests couldn't stop raving about how beautiful it was. Thank you for making it so memorable!",
    name: 'Riya & Karan',
    role: 'Engagement Clients',
    initials: 'RK',
    offset: 'lg:mt-12',
  },
  {
    title: 'A Celebration to Remember',
    quote: "India Solution Events planned my retirement party with such thoughtfulness and creativity. It was the perfect blend of nostalgia and joy, and every moment felt heartfelt. I couldn't have imagined a better way to celebrate this milestone!",
    name: 'Vinod Sharma',
    role: 'Retirement Celebration Client',
    initials: 'VS',
    offset: 'lg:mt-2',
  },
];

const StarRow = ({ className = '' }) => (
  <div className={`flex items-center gap-1 text-gold ${className}`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star key={star} size={18} fill="currentColor" strokeWidth={1.5} />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <div className="bg-navy-900 text-white">
      <section className="services-showcase relative overflow-hidden px-5 pb-20 pt-40 text-white lg:px-10 lg:pt-44">
        <div className="services-dots services-dots-left" />
      <div className="services-dots services-dots-right" />
      <div className="services-wave services-wave-left" />
      <div className="services-wave services-wave-right" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <div className="mx-auto mb-3 flex items-center justify-center gap-3 text-magenta">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-magenta" />
            <span className="h-1.5 w-1.5 rotate-45 bg-magenta shadow-[0_0_12px_rgba(233,30,99,0.9)]" />
            <span className="h-px w-10 bg-gradient-to-r from-magenta to-orange" />
          </div>
          <h1 className="site-heading mb-6 text-4xl font-bold leading-none tracking-[0.14em] md:text-5xl lg:text-6xl">
            What People <span className="text-gradient">Say</span>
          </h1>
          <p className="text-gray-300">
            Don't just take our word for it. Here's what our clients have to say about their experience with India Solution Events.
          </p>
        </motion.div>
      </div>
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-magenta/10 blur-3xl" />
        <div className="absolute right-0 bottom-20 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />

        <div className="container relative z-10 mx-auto max-w-7xl">
          <div className="mb-14 grid items-center gap-6 lg:grid-cols-[0.65fr_1.35fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-7 text-center lg:text-left"
            >
              <div className="mb-3 flex items-center justify-center gap-3 lg:justify-start">
                <Star size={30} fill="currentColor" className="text-gold" />
                <span className="font-display text-6xl font-semibold leading-none text-white">4.2</span>
              </div>
              <p className="text-lg font-semibold text-gray-200">out of 5</p>
              <StarRow className="mt-5 justify-center lg:justify-start" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card relative overflow-hidden p-8 md:p-10"
            >
              <Quote className="absolute -right-8 -top-8 h-36 w-36 text-white/[0.04]" />
              <StarRow className="mb-6" />
              <p className="relative max-w-3xl font-display text-2xl italic leading-relaxed text-white md:text-3xl">
                India Solution Events redefined excellence for us. Their seamless execution and eye for detail turned our vision into reality. Truly the go-to team for any high-profile event.
              </p>
              <div className="relative mt-7 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-magenta to-orange text-sm font-bold text-white">AD</div>
                <div>
                  <p className="font-semibold text-white">Amit Desai</p>
                  <p className="text-sm text-gray-400">Managing Director, GlobalTech Corp</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="testimonial-scroll-viewport">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="testimonial-scroll-wrap"
          >
            {[...testimonials, ...testimonials].map((item, index) => (
              <motion.article
                key={`${item.title}-${index}`}
                variants={fadeUp}
                className="testimonial-scroll-item" aria-hidden={index >= testimonials.length}
              >
                <div className={`glass-card relative h-full overflow-hidden p-7`}>
                  <Quote className="absolute -right-6 -bottom-8 h-32 w-32 text-white/[0.035]" />
                  <StarRow className="mb-6" />
                  <h2 className="site-heading mb-5 text-xl font-semibold leading-snug text-white">{item.title}</h2>
                  <p className="relative text-base italic leading-8 text-gray-300">{item.quote}</p>
                  <div className="relative mt-8 flex items-center gap-4">
                    <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-magenta via-gold to-orange text-sm font-bold text-white shadow-[0_0_22px_rgba(233,30,99,0.22)]">
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">{item.role}</p>
                    </div>
                  </div>
                  <span className={`absolute left-7 top-0 h-1 w-16 rounded-full ${index % 2 === 0 ? 'bg-magenta' : 'bg-orange'}`} />
                </div>
              </motion.article>
            ))}
          </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;