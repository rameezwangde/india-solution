import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Navigation } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTina } from 'tinacms/dist/react';
import careersDataFallback from '../content/careers.json';
import SEO from '../components/layout/SEO';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { data } = useTina({
    query: `query {
      careers(relativePath: "careers.json") {
        jobs { id title location experience jobType companyDescription mandatoryCriteria responsibilities workingConditions }
      }
    }`,
    variables: { relativePath: "careers.json" },
    data: { careers: careersDataFallback }
  });

  const [job, setJob] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    comment: ''
  });

  useEffect(() => {
    const jobsList = data.careers?.jobs || [];
    const foundJob = jobsList.find(j => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
      window.scrollTo(0, 0);
    } else {
      navigate('/careers');
    }
  }, [jobId, navigate, data.careers]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*New Job Application*\n*Role:* ${job.title}\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*City:* ${formData.city}\n*Comment:* ${formData.comment}`;
    const whatsappUrl = `https://wa.me/916360181932?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', email: '', phone: '', city: '', comment: '' });
  };

  if (!job) return null;

  return (
    <div className="bg-[#FAF7F2] text-[#2A1810] font-sans relative overflow-hidden">
      <SEO 
        title={`${job.title} - Careers at India Solution`}
        description={job.companyDescription?.substring(0, 150)}
        keywords={`${job.title}, event management jobs, career india solution`}
      />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -right-20 top-0 w-full md:w-[60%] h-[120%] object-cover object-left opacity-[0.03]" 
          style={{ transform: 'scaleX(-1)'}} 
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 z-10 bg-[#F3EAE0]">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1300px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="font-['Playfair_Display',serif] text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A2F1D] tracking-wide mb-4">
              {job.title}
            </h1>
            <p className="text-[#8B5E45] text-sm md:text-base font-medium tracking-wide">
              Home / Careers / {job.title}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job Details Content */}
      <section className="relative z-10 px-6 py-16 lg:py-24 max-w-[1300px] mx-auto">
        <div className="bg-white rounded-[2rem] p-8 lg:p-16 shadow-sm border border-[#E8DFD5] mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-12"
          >
            <h2 className="font-bold text-[#4A2F1D] text-xl md:text-2xl">
              Job Title: {job.title}
            </h2>
            <h2 className="font-bold text-[#4A2F1D] text-xl md:text-2xl">
              Location: {job.location}
            </h2>
            <h2 className="font-bold text-[#4A2F1D] text-xl md:text-2xl">
              Experience Required: {job.experience}
            </h2>
            <h2 className="font-bold text-[#4A2F1D] text-xl md:text-2xl">
              Job Type: {job.jobType}
            </h2>
          </motion.div>

          {job.companyDescription && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h3 className="font-bold text-[#4A2F1D] text-2xl mb-4">Company Description:</h3>
              <p className="text-[#2A1810] leading-relaxed whitespace-pre-wrap">
                {job.companyDescription}
              </p>
            </motion.div>
          )}

          {job.mandatoryCriteria && job.mandatoryCriteria.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h3 className="font-bold text-[#4A2F1D] text-2xl mb-4">Mandatory Criteria:</h3>
              <ul className="list-disc pl-6 space-y-2 text-[#2A1810]">
                {job.mandatoryCriteria.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {job.responsibilities && job.responsibilities.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <h3 className="font-bold text-[#4A2F1D] text-2xl mb-4">Job description:</h3>
              <h4 className="font-bold text-[#2A1810] text-lg mb-4">Responsibilities:-</h4>
              <ul className="list-disc pl-6 space-y-2 text-[#2A1810]">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {job.workingConditions && job.workingConditions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="font-bold text-[#2A1810] text-lg mb-4 text-[#4A2F1D]">
                Events will require work during evenings and weekends, so flexibility with work hours is often necessary
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-[#2A1810]">
                {job.workingConditions.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Locations and Contact Form Section */}
        <div 
          className="pt-16 border-t border-[#E8DFD5] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
          id="apply-form"
        >
          <div className="space-y-12">
            
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-[1px] w-8 bg-[#D5C5B9]"></span>
                <h2 className="text-3xl font-bold text-[#4A2F1D] uppercase">LOCATIONS</h2>
              </div>
              
              <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-sm border border-[#E8DFD5]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#1A0F0A] w-12 h-12 rounded-full flex items-center justify-center shadow-md shrink-0">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <h3 className="font-bold text-[#4A2F1D] text-lg">India Solution events and production</h3>
                </div>
                <p className="text-[#2A1810] text-[15px] leading-relaxed max-w-[300px] pl-16">
                  83/1A Muddinpalaya, Main Rd,<br/>
                  Jnananjyothinagar, Railway Layout, Mallathahalli,<br/>
                  Bengaluru, Karnataka 560056
                </p>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-sm border border-[#E8DFD5]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#1A0F0A] w-12 h-12 rounded-full flex items-center justify-center shadow-md shrink-0">
                    <Phone className="text-white" size={20} />
                  </div>
                  <h3 className="font-bold text-[#4A2F1D] text-lg">Contact Info</h3>
                </div>
                
                <div className="space-y-6 pl-16">
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
        </div>

      </section>
    </div>
  );
};

export default JobDetail;
