import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Phone, User, Loader2 } from 'lucide-react';
import { submitEnquiry } from '../../api/enquiryService';

const LeadCaptureModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ customerName: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if they've already unlocked it
    const hasUnlocked = localStorage.getItem('india_solution_catalog_unlocked');
    if (!hasUnlocked) {
      // Delay slightly so it doesn't jarringly pop up immediately on load
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.phone.trim()) {
      setError('Please provide both your name and phone number.');
      return;
    }
    
    // Basic phone validation (just check length roughly)
    if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      setError('Please provide a valid phone number.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Submit to the existing Enquiries endpoint
      await submitEnquiry({
        customerName: formData.customerName,
        phone: formData.phone,
        message: '🚨 [SYSTEM ALERT]: This user just unlocked and is currently viewing the Products Catalog.',
        items: []
      });

      // Save token in localStorage so they aren't asked again
      localStorage.setItem('india_solution_catalog_unlocked', 'true');
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to submit lead capture:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Heavy Blur) */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl border border-[#E8DFD5]"
            >
              {/* Header */}
              <div className="bg-[#FAF7F2] p-8 text-center border-b border-[#E8DFD5]">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#4A2F1D] text-white shadow-lg">
                  <Lock size={28} strokeWidth={2} />
                </div>
                <h2 className="font-['Playfair_Display',serif] text-2xl font-bold text-[#2A1810] mb-2">
                  Unlock Exclusive Catalog
                </h2>
                <p className="text-sm font-medium text-[#4A2F1D]">
                  Please enter your details to view our premium inventory and pricing.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#4A2F1D]">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#8B5E45]">
                        <User size={18} strokeWidth={2} />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#E8DFD5] bg-[#FAF7F2] py-3 pl-12 pr-4 text-sm font-semibold text-[#2A1810] transition-colors focus:border-[#4A2F1D] focus:outline-none focus:ring-0"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#4A2F1D]">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#8B5E45]">
                        <Phone size={18} strokeWidth={2} />
                      </div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#E8DFD5] bg-[#FAF7F2] py-3 pl-12 pr-4 text-sm font-semibold text-[#2A1810] transition-colors focus:border-[#4A2F1D] focus:outline-none focus:ring-0"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="mt-4 text-center text-sm font-bold text-red-600">{error}</p>
                )}

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A2F1D] py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#2A1810] hover:shadow-lg disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Unlocking...
                      </>
                    ) : (
                      'Unlock Catalog'
                    )}
                  </button>
                </div>
                
                <p className="mt-4 text-center text-[10px] font-semibold text-[#8B5E45] uppercase tracking-wide">
                  Your information is secure and will not be shared.
                </p>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadCaptureModal;
