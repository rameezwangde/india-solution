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
    <div className="bg-[#FAF7F2] font-sans selection:bg-[#A67C65] selection:text-white relative">
      <SEO 
        title="Contact Us"
        description="Get in touch with India Solution Events. Call +91 6360181932 or visit our production house in Bengaluru to plan your next extraordinary event."
        keywords="contact india solution, event planners contact bengaluru, hire event management company"
      />
      <section className="relative overflow-hidden px-5 pb-14 pt-32 lg:px-12 lg:pt-40">
        <div className="absolute inset-0 z-0 bg-[#FAF7F2] overflow-hidden pointer-events-none">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover object-center opacity-[0.03]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAF7F2] to-transparent z-10" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="mb-6 flex items-center justify-center gap-4 text-[11px] font-bold tracking-[0.2em] text-[#4A2F1D]">
            <span className="text-[#8B5E45] text-sm">❖</span>
            <span className="uppercase">Contact Us</span>
            <span className="text-[#8B5E45] text-sm">❖</span>
          </motion.div>
          <h1 className="font-['Playfair_Display',serif] text-[#4A2F1D] text-5xl font-semibold leading-tight md:text-6xl mb-4">
            Let&apos;s Plan Your <span className="italic">Next Event</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] font-semibold leading-[1.8] text-[#2A1810]">
            Share your event details with us, or reach out directly through phone, email, or our Bengaluru office.
          </p>
        </motion.div>
      </section>

      <section className="relative overflow-hidden px-5 py-16 lg:px-12">
        <div className="absolute inset-0 z-0 bg-[#FAF7F2] overflow-hidden pointer-events-none">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover object-center opacity-[0.03] scale-110" />
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.form
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-[#FAF6F2] rounded-[2rem] shadow-[0_8px_30px_rgb(139,94,69,0.08)] border border-[#EBE3DC] p-6 md:p-8"
            >
              <motion.div variants={fadeUp} className="mb-7">
                <span className="mb-3 block text-[11px] font-bold tracking-[0.2em] text-[#8B5E45] uppercase">Send Message</span>
                <h2 className="font-['Playfair_Display',serif] text-3xl font-semibold text-[#4A2F1D] md:text-4xl">Tell Us About Your Event</h2>
              </motion.div>

              <div className="grid gap-5">
                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Name</span>
                  <input className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm" type="text" placeholder="Your Name" />
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Email Address</span>
                  <input className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm" type="email" placeholder="Your E mail" />
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Phone Number <span className="text-[#A87455]">*</span></span>
                  <input className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm" type="tel" placeholder="Your Contact Number" maxLength={10} />
                  <span className="mt-1 block text-right text-[11px] font-bold text-[#A69C96]">0 / 10</span>
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Type of Event</span>
                  <input className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm" type="text" placeholder="e.g. Wedding, Corporate Event" />
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Date of the Event</span>
                  <input className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm text-[#A69C96] focus:text-[#2A1810]" type="date" />
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Event Location</span>
                  <input className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm" type="text" placeholder="e.g. Bengaluru, Karnataka" />
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Message</span>
                  <textarea className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm min-h-32 resize-y" placeholder="Enter your message here..." maxLength={180} />
                  <span className="mt-1 block text-right text-[11px] font-bold text-[#A69C96]">0 / 180</span>
                </motion.label>

                <motion.div variants={fadeUp}>
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Rating</span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        aria-label={`Rate ${value}`}
                        onClick={() => setRating(value)}
                        className="text-[#D5C5B9] transition-colors hover:text-[#A87455]"
                      >
                        <Star size={28} fill={value <= rating ? 'currentColor' : 'none'} className={value <= rating ? 'text-[#A87455]' : ''} />
                      </button>
                    ))}
                    <span className="ml-2 text-[12px] font-bold text-[#A69C96]">({rating}/5)</span>
                  </div>
                  <p className="mt-2 text-[12px] font-semibold text-[#A69C96]">Rate Our Website How it helps you</p>
                </motion.div>

                <motion.button
                  variants={fadeUp}
                  type="button"
                  className="mt-3 inline-flex w-fit items-center gap-3 bg-[#A87455] hover:bg-[#8F6145] text-white px-9 py-3.5 rounded-[4px] font-bold tracking-widest text-[12px] transition-all shadow-[0_8px_20px_rgb(148,98,71,0.25)] hover:shadow-[0_8px_20px_rgb(148,98,71,0.4)]"
                >
                  SEND MESSAGE
                  <Send size={15} strokeWidth={2.5} />
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
                  <motion.div key={card.title} variants={fadeUp} className="bg-[#FAF6F2] rounded-[2rem] shadow-[0_8px_30px_rgb(139,94,69,0.08)] border border-[#EBE3DC] p-6">
                    <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#D5C5B9] bg-transparent text-[#946247]">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-['Playfair_Display',serif] text-2xl font-semibold text-[#4A2F1D] mb-4">{card.title}</h3>
                    <div className="space-y-2 text-[15px] font-semibold leading-[1.8] text-[#2A1810]">
                      {card.lines.map((line, index) => card.hrefs?.[index] ? (
                        <a key={line} href={card.hrefs[index]} className="block hover:text-[#A87455] transition-colors">{line}</a>
                      ) : (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}

              <motion.div variants={fadeUp} className="bg-[#FAF6F2] rounded-[2rem] shadow-[0_8px_30px_rgb(139,94,69,0.08)] border border-[#EBE3DC] p-6">
                <h3 className="font-['Playfair_Display',serif] text-2xl font-semibold text-[#4A2F1D] mb-5">Follow Us</h3>
                <div className="flex flex-wrap gap-3">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a key={social.label} href="#" aria-label={social.label} className={`flex h-11 w-11 items-center justify-center rounded-[0.8rem] text-white shadow-md transition-transform hover:-translate-y-1 ${social.className}`}>
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
            className="mt-12 overflow-hidden rounded-[2rem] border border-[#EBE3DC] shadow-[0_12px_40px_rgba(139,94,69,0.12)] bg-[#FAF6F2]"
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