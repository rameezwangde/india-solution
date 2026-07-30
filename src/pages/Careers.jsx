import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';
import { MapPin, Phone, Navigation } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { jobsData } from '../data/jobsData';

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! Your application has been submitted.');
    setFormData({ name: '', email: '', phone: '', city: '', comment: '' });
  };

  return (
    <div className="bg-[#FAF7F2] text-[#2A1810] font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -right-20 top-0 w-full md:w-[60%] h-[120%] object-cover object-left opacity-[0.03]" 
          style={{ transform: 'scaleX(-1)'}} 
        />
      </div>

      <section className="relative z-10 px-6 pb-24 pt-32 lg:px-12 lg:pt-44 max-w-[1300px] mx-auto min-h-screen">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D5C5B9]"></span>
            <span className="text-[#4A2F1D] text-[10px]">❖</span>
            <span className="text-[#4A2F1D] text-xs font-bold tracking-[0.25em] uppercase">Join Our Team</span>
            <span className="text-[#4A2F1D] text-[10px]">❖</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D5C5B9]"></span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold text-[#4A2F1D] tracking-wide mb-6 uppercase">
            CAREERS
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-[#4A2F1D] text-sm">❖</span>
          </div>
          <p className="text-[#2A1810] font-medium text-lg tracking-wide max-w-xl mx-auto">
            Be part of a team that creates unforgettable experiences. We are always looking for passionate, creative, and driven individuals.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-24"
        >
          {jobsData.map((job) => (
            <motion.div 
              key={job.id}
              variants={fadeUp}
              className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-sm border border-[#E8DFD5] flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-bold text-[#4A2F1D] text-xl mb-6 pr-4">
                  {job.title}
                </h3>
                <div className="space-y-3 mb-8">
                  <p className="text-[15px] text-[#2A1810]">
                    <span className="font-bold text-[#8B5E45]">Location:</span> {job.location}
                  </p>
                  <p className="text-[15px] text-[#2A1810]">
                    <span className="font-bold text-[#8B5E45]">Experience Required:</span> {job.experience}
                  </p>
                  <p className="text-[15px] text-[#2A1810]">
                    <span className="font-bold text-[#8B5E45]">Job Type:</span> {job.jobType}
                  </p>
                </div>
              </div>
              
              <Link 
                to={`/careers/${job.id}`}
                className="self-center bg-[#C0602F] text-white font-bold py-3.5 px-8 rounded-full text-sm tracking-widest hover:bg-[#A05025] transition-colors shadow-sm mt-auto uppercase w-fit"
              >
                Learn More
              </Link>
            </motion.div>
          ))}
        </motion.div>


        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-[#E8DFD5] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
          id="apply-form"
        >
          <div className="space-y-12">
            
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-[1px] w-8 bg-[#D5C5B9]"></span>
                <h2 className="text-3xl font-bold text-[#4A2F1D] uppercase">LOCATIONS</h2>
              </div>
              
              <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-sm border border-[#E8DFD5] relative overflow-visible">
                <div className="absolute -right-6 top-10 bg-[#1A0F0A] w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#FAF7F2]">
                  <MapPin className="text-white" size={20} />
                </div>
                
                <h3 className="font-bold text-[#4A2F1D] text-lg mb-4">India Solution Events</h3>
                <p className="font-bold text-[#4A2F1D] mb-4">Bengaluru</p>
                <p className="text-[#2A1810] text-[15px] leading-relaxed max-w-[200px]">
                  Battahalasur,<br/>
                  Bangalore — Karnataka 560001
                </p>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-sm border border-[#E8DFD5] relative overflow-visible">
                <div className="absolute -right-6 top-10 bg-[#1A0F0A] w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#FAF7F2]">
                  <Phone className="text-white" size={20} />
                </div>
                
                <h3 className="font-bold text-[#4A2F1D] text-lg mb-8">Contact Info</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="font-bold text-[#2A1810] text-sm mb-1">Email:</p>
                    <a href="mailto:info@india-solution.com" className="text-[#4CA7CD] hover:text-[#3B82A0] font-medium transition-colors text-[15px]">
                      info@india-solution.com
                    </a>
                  </div>
                  <div>
                    <p className="font-bold text-[#2A1810] text-sm mb-1">Phone:</p>
                    <a href="tel:+916360181932" className="flex items-center gap-2 text-[#25D366] hover:text-[#128C7E] font-medium transition-colors text-[15px]">
                      <FaWhatsapp size={18} /> +91 6360181932
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-sm border border-[#E8DFD5] mt-10 lg:mt-0">
             <div className="flex items-center justify-center gap-3 mb-10">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D5C5B9]"></span>
              <span className="text-[#4A2F1D] text-[10px]">❖</span>
              <span className="text-[#4A2F1D] text-xs font-bold tracking-[0.25em] uppercase">Apply Now</span>
              <span className="text-[#4A2F1D] text-[10px]">❖</span>
              <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D5C5B9]"></span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name" 
                  required
                  className="w-full bg-white border border-[#E8DFD5] rounded-lg px-5 py-3 focus:outline-none focus:border-[#C0602F] focus:ring-1 focus:ring-[#C0602F] transition-all text-[#2A1810] placeholder-[#8B5E45]/60"
                />
              </div>
              
              <div>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email" 
                  required
                  className="w-full bg-white border border-[#E8DFD5] rounded-lg px-5 py-3 focus:outline-none focus:border-[#C0602F] focus:ring-1 focus:ring-[#C0602F] transition-all text-[#2A1810] placeholder-[#8B5E45]/60"
                />
              </div>
              
              <div>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone" 
                  required
                  className="w-full bg-white border border-[#E8DFD5] rounded-lg px-5 py-3 focus:outline-none focus:border-[#C0602F] focus:ring-1 focus:ring-[#C0602F] transition-all text-[#2A1810] placeholder-[#8B5E45]/60"
                />
              </div>
              
              <div>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City" 
                  required
                  className="w-full bg-white border border-[#E8DFD5] rounded-lg px-5 py-3 focus:outline-none focus:border-[#C0602F] focus:ring-1 focus:ring-[#C0602F] transition-all text-[#2A1810] placeholder-[#8B5E45]/60"
                />
              </div>
              
              <div>
                <textarea 
                  name="comment" 
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Comment" 
                  rows="4"
                  className="w-full bg-white border border-[#E8DFD5] rounded-lg px-5 py-3 focus:outline-none focus:border-[#C0602F] focus:ring-1 focus:ring-[#C0602F] transition-all text-[#2A1810] placeholder-[#8B5E45]/60 resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="bg-[#C0602F] text-white font-bold py-3 px-12 rounded-full text-base hover:bg-[#A05025] transition-colors shadow-sm"
              >
                Submit
              </button>
            </form>
          </div>
        </motion.div>

      </section>
    </div>
  );
};

export default Careers;
