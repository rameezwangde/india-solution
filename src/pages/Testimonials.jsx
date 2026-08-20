import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';
import SEO from '../components/layout/SEO';
import { useTina } from 'tinacms/dist/react';
import testimonialsDataFallback from '../content/testimonials.json';

const StarRow = ({ className = '' }) => (
  <div className={`flex items-center gap-1 text-[#4A2F1D] ${className}`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star key={star} size={18} fill="currentColor" strokeWidth={1.5} />
    ))}
  </div>
);

const Testimonials = () => {
  const { data } = useTina({
    query: `query {
      testimonials(relativePath: "testimonials.json") {
        seo { title description keywords }
        header { eyebrow title description }
        overallRating { score totalReviews }
        featured { quote name role initials }
        items { title quote name role initials offset }
      }
    }`,
    variables: { relativePath: "testimonials.json" },
    data: { testimonials: testimonialsDataFallback }
  });

  const pageData = data.testimonials;
  const testimonials = pageData.items || [];
  const featured = pageData.featured;

  return (
    <div className="bg-[#FAF7F2] text-[#2A1810] font-sans relative overflow-hidden">
      <SEO 
        title={pageData.seo?.title || "Client Testimonials & Reviews"}
        description={pageData.seo?.description || ""}
        keywords={pageData.seo?.keywords || ""}
      />
      
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
            <span className="text-[#4A2F1D] text-[10px]">❖</span>
            <span className="text-[#4A2F1D] text-xs font-bold tracking-[0.25em] uppercase">{pageData.header?.eyebrow}</span>
            <span className="text-[#4A2F1D] text-[10px]">❖</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D5C5B9]"></span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold text-[#4A2F1D] tracking-wide mb-6">
            {pageData.header?.title}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-[#4A2F1D] text-sm">❖</span>
          </div>
          <p className="text-[#2A1810] font-medium text-lg tracking-wide max-w-xl mx-auto">
            {pageData.header?.description}
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
                <Star size={36} fill="currentColor" className="text-[#4A2F1D]" />
                <span className="font-['Playfair_Display',serif] text-6xl font-bold leading-none text-[#4A2F1D]">{pageData.overallRating?.score}</span>
              </div>
              <p className="text-xl font-bold text-[#4A2F1D]">out of 5</p>
              <StarRow className="mt-6 justify-center lg:justify-start" />
            </motion.div>

            {featured && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] relative overflow-hidden p-10 md:p-14 shadow-sm border border-[#E8DFD5]"
              >
                <Quote className="absolute -right-6 -top-6 h-40 w-40 text-[#FAF7F2]" />
                <StarRow className="mb-8" />
                <p className="relative max-w-3xl font-['Playfair_Display',serif] text-xl italic leading-relaxed text-[#4A2F1D] md:text-2xl">
                  "{featured.quote}"
                </p>
                <div className="relative mt-10 flex items-center gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FAF7F2] border-[1.5px] border-[#D5C5B9] text-base font-bold text-[#4A2F1D]">
                    {featured.initials}
                  </div>
                  <div>
                    <p className="font-bold text-[#4A2F1D] text-lg">{featured.name}</p>
                    <p className="text-sm font-medium text-[#4A2F1D]">{featured.role}</p>
                  </div>
                </div>
              </motion.div>
            )}
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
              {/* Duplicate for infinite scrolling effect */}
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
                    <p className="relative text-[14.5px] font-medium leading-relaxed text-[#4A2F1D] flex-grow">{item.quote}</p>
                    <div className="relative mt-8 flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAF7F2] border-[1.5px] border-[#D5C5B9] text-sm font-bold text-[#4A2F1D]">
                        {item.initials}
                      </div>
                      <div>
                        <p className="font-bold text-[#4A2F1D]">{item.name}</p>
                        <p className="text-xs font-medium text-[#4A2F1D]">{item.role}</p>
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