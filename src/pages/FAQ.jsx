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
    <div className="bg-navy-900 text-white">
      <section className="services-showcase relative overflow-hidden px-5 pb-20 pt-40 text-white lg:px-10 lg:pt-44 min-h-screen">
        <div className="services-dots services-dots-left" />
      <div className="services-dots services-dots-right" />
      <div className="services-wave services-wave-left" />
      <div className="services-wave services-wave-right" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-16 text-center"
        >
          <div className="mx-auto mb-3 flex items-center justify-center gap-3 text-magenta">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-magenta" />
            <span className="h-1.5 w-1.5 rotate-45 bg-magenta shadow-[0_0_12px_rgba(233,30,99,0.9)]" />
            <span className="h-px w-10 bg-gradient-to-r from-magenta to-orange" />
          </div>
          <h1 className="site-heading mb-6 text-4xl font-bold leading-none tracking-[0.14em] md:text-5xl lg:text-6xl">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our event planning services, process, and capabilities.
          </p>
        </motion.div>
      </div>
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-magenta/10 blur-3xl" />
        <div className="absolute right-0 bottom-20 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container relative z-10 mx-auto max-w-4xl"
        >
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div key={faq.question} variants={fadeUp} className="glass-card overflow-hidden">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left md:px-7"
                  >
                    <span className="site-heading text-lg font-semibold leading-snug md:text-xl">{faq.question}</span>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen ? 'border-gold/60 bg-gold/10 text-gold' : 'border-white/10 bg-white/5 text-magenta'}`}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: 'easeInOut' }}
                      >
                        <div className="border-t border-white/10 px-5 pb-6 pt-5 md:px-7">
                          <p className="text-base leading-8 text-gray-300 md:text-lg">{faq.answer}</p>
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