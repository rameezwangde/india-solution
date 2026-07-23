import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Star } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../utils/animations';
import SEO from '../components/layout/SEO';

const contactCards = [
  {
    title: 'Call Us',
    icon: Phone,
    lines: ['+91 6360181932', '+91 9742091362'],
    hrefs: ['tel:+916360181932', 'tel:+919742091362'],
  },
  {
    title: 'E Mail',
    icon: Mail,
    lines: ['info@india-solution.com'],
    hrefs: ['mailto:info@india-solution.com'],
  },
  {
    title: 'Visit Us',
    icon: MapPin,
    lines: [
      'India Solution Production House,',
      'Railway Mens Employees layout,',
      '50, 10th Cross, Ullal Main Road,',
      'Bengaluru, Karnataka 560056',
    ],
  },
];

const socials = [
  { label: 'Twitter', icon: FaTwitter, className: 'bg-[#1DA1F2]' },
  { label: 'Instagram', icon: FaInstagram, className: 'bg-[#1F1F1F]' },
  { label: 'YouTube', icon: FaYoutube, className: 'bg-[#CD201F]' },
  { label: 'Facebook', icon: FaFacebookF, className: 'bg-[#3B5998]' },
];

const Contact = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-navy-900 text-white">
      <SEO 
        title="Contact Us"
        description="Get in touch with India Solution Events. Call +91 6360181932 or visit our production house in Bengaluru to plan your next extraordinary event."
        keywords="contact india solution, event planners contact bengaluru, hire event management company"
      />
      <section className="relative overflow-hidden px-6 pb-14 pt-40 lg:px-12 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(233,30,99,0.22),transparent_30%),radial-gradient(circle_at_86%_14%,rgba(255,152,0,0.18),transparent_28%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-magenta/50 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container relative z-10 mx-auto max-w-5xl text-center"
        >
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.35em] text-gold">Contact Us</span>
          <h1 className="site-heading text-4xl font-semibold leading-tight md:text-6xl">
            Let&apos;s Plan Your <span className="site-heading-accent">Next Event</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
            Share your event details with us, or reach out directly through phone, email, or our Bengaluru office.
          </p>
        </motion.div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 lg:px-12">
        <div className="absolute inset-0 bg-[#10172A]" />
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-magenta/10 blur-3xl" />
        <div className="absolute right-0 bottom-20 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />

        <div className="container relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.form
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8"
            >
              <motion.div variants={fadeUp} className="mb-7">
                <span className="site-eyebrow mb-3 block">Send Message</span>
                <h2 className="site-heading text-3xl font-semibold md:text-4xl">Tell Us About Your Event</h2>
              </motion.div>

              <div className="grid gap-5">
                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-200">Name</span>
                  <input className="contact-input" type="text" placeholder="Your Name" />
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-200">Email Address</span>
                  <input className="contact-input" type="email" placeholder="Your E mail" />
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-200">Phone Number <span className="text-magenta">*</span></span>
                  <input className="contact-input" type="tel" placeholder="Your Contact Number" maxLength={10} />
                  <span className="mt-1 block text-right text-xs text-gray-500">0 / 10</span>
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-200">Message</span>
                  <textarea className="contact-input min-h-32 resize-y" placeholder="Enter your message here..." maxLength={180} />
                  <span className="mt-1 block text-right text-xs text-gray-500">0 / 180</span>
                </motion.label>

                <motion.div variants={fadeUp}>
                  <span className="mb-2 block text-sm font-medium text-gray-200">Rating</span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        aria-label={`Rate ${value}`}
                        onClick={() => setRating(value)}
                        className="text-gray-500 transition-colors hover:text-gold"
                      >
                        <Star size={30} fill={value <= rating ? 'currentColor' : 'none'} className={value <= rating ? 'text-gold' : ''} />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-400">({rating}/5)</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">Rate Our Website How it helps you</p>
                </motion.div>

                <motion.button
                  variants={fadeUp}
                  type="button"
                  className="mt-3 inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-magenta via-gold to-orange px-7 py-3 text-sm font-bold uppercase text-white shadow-[0_0_26px_rgba(233,30,99,0.28)] transition-transform hover:-translate-y-0.5"
                >
                  Send Message
                  <Send size={17} />
                </motion.button>
              </div>
            </motion.form>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-5"
            >
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div key={card.title} variants={fadeUp} className="glass-card p-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-magenta/35 bg-magenta/10 text-magenta shadow-[0_0_20px_rgba(233,30,99,0.2)]">
                      <Icon size={25} />
                    </div>
                    <h3 className="site-heading mb-4 text-xl font-semibold">{card.title}</h3>
                    <div className="space-y-2 text-base leading-7 text-gray-300">
                      {card.lines.map((line, index) => card.hrefs?.[index] ? (
                        <a key={line} href={card.hrefs[index]} className="block hover:text-gold">{line}</a>
                      ) : (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}

              <motion.div variants={fadeUp} className="glass-card p-6">
                <h3 className="site-heading mb-5 text-xl font-semibold">Follow Us</h3>
                <div className="flex flex-wrap gap-3">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a key={social.label} href="#" aria-label={social.label} className={`flex h-11 w-11 items-center justify-center rounded-lg text-white shadow-lg transition-transform hover:-translate-y-1 ${social.className}`}>
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-navy-800/65 shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
          >
            <iframe
              title="India Solution location map"
              src="https://www.google.com/maps?q=India%20Solution%20Production%20House%2C%2050%2C%2010th%20Cross%2C%20Ullal%20Main%20Road%2C%20Bengaluru%2C%20Karnataka%20560056&output=embed"
              className="h-[360px] w-full border-0 md:h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;