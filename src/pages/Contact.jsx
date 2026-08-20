import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Star } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../utils/animations';
import SEO from '../components/layout/SEO';
import { useTina } from 'tinacms/dist/react';
import contactDataFallback from '../content/contact.json';

const iconMap = {
  Phone, Mail, MapPin,
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube
};

const Contact = () => {
  const { data } = useTina({
    query: `query {
      contact(relativePath: "contact.json") {
        seo { title description keywords }
        header { eyebrow titleLine1 titleLine2 description }
        contactCards { title icon lines hrefs }
        socials { label url icon className }
      }
    }`,
    variables: { relativePath: "contact.json" },
    data: { contact: contactDataFallback }
  });

  const pageData = data.contact;

  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    let text = `*New Contact Inquiry*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}`;
    if (formData.email) text += `\n*Email:* ${formData.email}`;
    if (formData.eventType) text += `\n*Event Type:* ${formData.eventType}`;
    if (formData.eventDate) text += `\n*Event Date:* ${formData.eventDate}`;
    if (formData.eventLocation) text += `\n*Location:* ${formData.eventLocation}`;
    if (formData.message) text += `\n*Message:* ${formData.message}`;
    if (rating > 0) text += `\n*Website Rating:* ${rating}/5`;
    
    const whatsappUrl = `https://wa.me/916360181932?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-[#FAF7F2] font-sans selection:bg-[#A67C65] selection:text-white relative">
      <SEO 
        title={pageData.seo?.title || "Contact Us"}
        description={pageData.seo?.description || ""}
        keywords={pageData.seo?.keywords || ""}
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
            <span className="uppercase">{pageData.header?.eyebrow}</span>
            <span className="text-[#8B5E45] text-sm">❖</span>
          </motion.div>
          <h1 className="font-['Playfair_Display',serif] text-[#4A2F1D] text-5xl font-semibold leading-tight md:text-6xl mb-4">
            {pageData.header?.titleLine1} <span className="italic">{pageData.header?.titleLine2}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] font-semibold leading-[1.8] text-[#2A1810]">
            {pageData.header?.description}
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
              onSubmit={handleSubmit}
              className="bg-[#FAF6F2] rounded-[2rem] shadow-[0_8px_30px_rgb(139,94,69,0.08)] border border-[#EBE3DC] p-6 md:p-8"
            >
              <motion.div variants={fadeUp} className="mb-7">
                <span className="mb-3 block text-[11px] font-bold tracking-[0.2em] text-[#8B5E45] uppercase">Send Message</span>
                <h2 className="font-['Playfair_Display',serif] text-3xl font-semibold text-[#4A2F1D] md:text-4xl">Tell Us About Your Event</h2>
              </motion.div>

              <div className="grid gap-5">
                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Name</span>
                  <input name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm" type="text" placeholder="Your Name" />
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Email Address</span>
                  <input name="email" value={formData.email} onChange={handleChange} className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm" type="email" placeholder="Your E mail" />
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Phone Number <span className="text-[#A87455]">*</span></span>
                  <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm" type="tel" placeholder="Your Contact Number" maxLength={10} />
                  <span className="mt-1 block text-right text-[11px] font-bold text-[#A69C96]">{formData.phone.length} / 10</span>
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Type of Event</span>
                  <input name="eventType" value={formData.eventType} onChange={handleChange} className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm" type="text" placeholder="e.g. Wedding, Corporate Event" />
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Date of the Event</span>
                  <input name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm text-[#A69C96] focus:text-[#2A1810]" type="date" />
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Event Location</span>
                  <input name="eventLocation" value={formData.eventLocation} onChange={handleChange} className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm" type="text" placeholder="e.g. Bengaluru, Karnataka" />
                </motion.label>

                <motion.label variants={fadeUp} className="block">
                  <span className="mb-2 block text-[13px] font-bold text-[#4A2F1D]">Message</span>
                  <textarea name="message" value={formData.message} onChange={handleChange} className="w-full rounded-[0.8rem] border border-[#EBE3DC] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2A1810] outline-none transition-all placeholder:text-[#A69C96] focus:border-[#A87455] focus:ring-1 focus:ring-[#A87455] shadow-sm min-h-32 resize-y" placeholder="Enter your message here..." maxLength={180} />
                  <span className="mt-1 block text-right text-[11px] font-bold text-[#A69C96]">{formData.message.length} / 180</span>
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
                  type="submit"
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
              {(pageData.contactCards || []).map((card) => {
                const Icon = iconMap[card.icon];
                return (
                  <motion.div key={card.title} variants={fadeUp} className="bg-[#FAF6F2] rounded-[2rem] shadow-[0_8px_30px_rgb(139,94,69,0.08)] border border-[#EBE3DC] p-6">
                    <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#D5C5B9] bg-transparent text-[#946247]">
                      {Icon && <Icon size={24} strokeWidth={1.5} />}
                    </div>
                    <h3 className="font-['Playfair_Display',serif] text-2xl font-semibold text-[#4A2F1D] mb-4">{card.title}</h3>
                    <div className="space-y-2 text-[15px] font-semibold leading-[1.8] text-[#2A1810]">
                      {(card.lines || []).map((line, index) => card.hrefs?.[index] ? (
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
                  {(pageData.socials || []).map((social) => {
                    const Icon = iconMap[social.icon];
                    return (
                      <a key={social.label} href={social.url} aria-label={social.label} className={`flex h-11 w-11 items-center justify-center rounded-[0.8rem] text-white shadow-md transition-transform hover:-translate-y-1 ${social.className}`}>
                        {Icon && <Icon size={18} />}
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
              src="https://www.google.com/maps?q=India%20Solution%20events%20and%20production%2C%2083%2F1A%20Muddinpalaya%2C%20Main%20Rd%2C%20Jnananjyothinagar%2C%20Railway%20Layout%2C%20Mallathahalli%2C%20Bengaluru%2C%20Karnataka%20560056&output=embed"
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