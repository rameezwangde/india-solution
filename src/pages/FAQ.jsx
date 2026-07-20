import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const faqs = [
  {
    question: 'Can India Solution handle both small and large-scale events?',
    answer: "India Solution specializes in both intimate celebrations and large-scale events, delivering personalized attention and flawless execution for every occasion. Whether it's a private wedding, birthday party, housewarming, or a grand corporate event, our expert teams ensure meticulous planning, creative decor, and seamless event management. Trust us to transform your special moments into unforgettable experiences with customized services tailored to your event's unique style and size.",
  },
  {
    question: 'How does India Solution manage both corporate and personal events professionally?',
    answer: "India Solution boasts two dedicated expert teams: one specializing in corporate event management and the other focusing on personalized celebrations. This dual expertise ensures professional event handling, meticulous attention to detail, and customized services for every occasion. Whether it's a grand wedding, birthday party, housewarming, or a corporate gathering, our experienced teams deliver flawless execution and memorable experiences tailored to your unique requirements.",
  },
  {
    question: 'How much experience does India Solution have in the event industry?',
    answer: 'India Solution, a leading event management company with over 15 years of expertise, specializes in crafting unforgettable experiences for personal celebrations and corporate events. Renowned for creative event planning, stunning wedding decorations, personalized themes, and flawless execution, we ensure every event is memorable. Our services cover weddings, birthday parties, housewarmings, corporate gatherings, and milestone celebrations, offering professional event coordination across Bengaluru, Goa, Mumbai, Delhi, and Malaysia. Trust India Solution for exceptional event planning, innovative designs, and seamless event management tailored to exceed expectations.',
  },
  {
    question: 'What makes India Solution stand out from other event planners?',
    answer: "India Solution is renowned for creative stage decor, personalized event themes, and meticulous event management. With extensive experience in high-profile weddings and corporate collaborations, we specialize in delivering unforgettable experiences through professional event planning, stunning decorations, and seamless execution. Whether it's a luxurious wedding, milestone celebration, or corporate gathering, our expert team ensures every event is flawlessly managed and uniquely memorable.",
  },
  {
    question: 'What services does India Solution offer?',
    answer: 'India Solution is a premier event management company specializing in personalized parties and professional corporate events across Bengaluru, Goa, Mumbai, Delhi, and Malaysia. Our expert services include luxury wedding planning, themed housewarming celebrations, milestone birthday parties, bride-to-be and groom-to-be events, corporate gatherings, stage decorations, professional security services, DJ parties, and customized catering solutions. With over 15 years of experience, we ensure unforgettable experiences through creative event design, flawless execution, and personalized attention to detail.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-[#FAF7F2] text-[#5c4033] font-sans relative overflow-hidden min-h-screen">
      {/* Global Background Watermarks */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -right-20 top-0 w-full md:w-[60%] h-[120%] object-cover object-left opacity-30 mix-blend-multiply" 
          style={{ transform: 'scaleX(-1)'}} 
        />
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -left-20 top-1/4 w-full md:w-[60%] h-[120%] object-cover object-left opacity-20 mix-blend-multiply" 
        />
      </div>

      <section className="relative z-10 px-5 pb-24 pt-32 lg:px-10 lg:pt-44 max-w-[1300px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D5C5B9]"></span>
            <span className="text-[#A67C65] text-[10px]">❖</span>
            <span className="text-[#A67C65] text-xs font-bold tracking-[0.25em] uppercase">FAQ</span>
            <span className="text-[#A67C65] text-[10px]">❖</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D5C5B9]"></span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold text-[#4A2F1D] tracking-wide mb-6">
            FREQUENTLY ASKED<br/> <span className="text-[#A67C65] italic font-normal">Questions</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-[#A67C65] text-sm">❖</span>
          </div>
          <p className="text-[#5c4033] font-medium text-lg tracking-wide max-w-2xl mx-auto">
            Find answers to common questions about our event planning services, process, and capabilities.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container relative z-10 mx-auto max-w-4xl"
        >
          <div className="space-y-5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div key={faq.question} variants={fadeUp} className={`bg-white rounded-[1.5rem] overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#D5C5B9]' : 'shadow-sm border border-[#E8DFD5] hover:shadow-md hover:border-[#D5C5B9]'}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left md:px-8"
                  >
                    <span className="font-['Playfair_Display',serif] text-[20px] font-bold leading-snug text-[#4A2F1D] pr-4">{faq.question}</span>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-300 ${isOpen ? 'border-[#A67C65] bg-[#FAF7F2] text-[#A67C65] rotate-180' : 'border-[#D5C5B9] bg-transparent text-[#7C5A48] hover:border-[#A67C65] hover:text-[#A67C65]'}`}>
                      {isOpen ? <Minus size={22} strokeWidth={1.5} /> : <Plus size={22} strokeWidth={1.5} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-8 pt-2 md:px-8">
                          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#E8DFD5] to-transparent mb-6"></div>
                          <p className="text-[14.5px] font-medium leading-[1.8] text-[#7C5A48]">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default FAQ;