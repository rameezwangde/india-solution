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
  <div className={`flex items-center gap-1 text-[#A67C65] ${className}`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star key={star} size={18} fill="currentColor" strokeWidth={1.5} />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <div className="bg-[#FAF7F2] text-[#5c4033] font-sans relative overflow-hidden">
      {/* Global Background Watermarks */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -right-20 top-0 w-full md:w-[60%] h-[120%] object-cover object-left opacity-[0.03]" 
          style={{ transform: 'scaleX(-1)'}} 
        />
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -left-20 top-1/4 w-full md:w-[60%] h-[120%] object-cover object-left opacity-[0.03]" 
        />
      </div>

      <section className="relative z-10 px-5 pb-24 pt-32 lg:px-10 lg:pt-44 max-w-[1300px] mx-auto min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D5C5B9]"></span>
            <span className="text-[#A67C65] text-[10px]">❖</span>
            <span className="text-[#A67C65] text-xs font-bold tracking-[0.25em] uppercase">Testimonials</span>
            <span className="text-[#A67C65] text-[10px]">❖</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D5C5B9]"></span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl lg:text-[70px] font-bold text-[#4A2F1D] tracking-wide mb-6">
            WHAT PEOPLE SAY
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-[#A67C65] text-sm">❖</span>
          </div>
          <p className="text-[#5c4033] font-medium text-lg tracking-wide max-w-xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience with India Solution Events.
          </p>
        </motion.div>

        <div className="container relative mx-auto max-w-7xl">
          {/* Featured Testimonial Blocks */}
          <div className="mb-20 grid items-stretch gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-10 text-center lg:text-left shadow-sm border border-[#E8DFD5] flex flex-col justify-center"
            >
              <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
                <Star size={36} fill="currentColor" className="text-[#A67C65]" />
                <span className="font-['Playfair_Display',serif] text-7xl font-bold leading-none text-[#4A2F1D]">4.8</span>
              </div>
              <p className="text-xl font-bold text-[#7C5A48]">out of 5</p>
              <StarRow className="mt-6 justify-center lg:justify-start" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] relative overflow-hidden p-10 md:p-14 shadow-sm border border-[#E8DFD5]"
            >
              <Quote className="absolute -right-6 -top-6 h-40 w-40 text-[#FAF7F2]" />
              <StarRow className="mb-8" />
              <p className="relative max-w-3xl font-['Playfair_Display',serif] text-[26px] italic leading-relaxed text-[#4A2F1D] md:text-3xl">
                "India Solution Events redefined excellence for us. Their seamless execution and eye for detail turned our vision into reality. Truly the go-to team for any high-profile event."
              </p>
              <div className="relative mt-10 flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FAF7F2] border-[1.5px] border-[#D5C5B9] text-base font-bold text-[#A67C65]">
                  AD
                </div>
                <div>
                  <p className="font-bold text-[#4A2F1D] text-lg">Amit Desai</p>
                  <p className="text-sm font-medium text-[#7C5A48]">Managing Director, GlobalTech Corp</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Testimonial Marquee / Scroll */}
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
                  <div className={`bg-white rounded-[2rem] border border-[#E8DFD5] shadow-sm relative h-full overflow-hidden p-8 flex flex-col transition-shadow hover:shadow-md`}>
                    <Quote className="absolute -right-6 -bottom-6 h-36 w-36 text-[#FAF7F2]" />
                    <StarRow className="mb-6" />
                    <h2 className="font-['Playfair_Display',serif] mb-5 text-[22px] font-bold leading-snug text-[#4A2F1D]">{item.title}</h2>
                    <p className="relative text-[14.5px] font-medium leading-relaxed text-[#7C5A48] flex-grow">{item.quote}</p>
                    <div className="relative mt-8 flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAF7F2] border-[1.5px] border-[#D5C5B9] text-sm font-bold text-[#A67C65]">
                        {item.initials}
                      </div>
                      <div>
                        <p className="font-bold text-[#4A2F1D]">{item.name}</p>
                        <p className="text-xs font-medium text-[#A67C65]">{item.role}</p>
                      </div>
                    </div>
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