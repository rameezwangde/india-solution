import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { submitEnquiry } from '../../api/enquiryService';

const EnquiryCartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    companyName: '',
    eventDate: '',
    eventLocation: '',
    city: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.customerName.trim()) return setError('Customer name is required.');
    if (!formData.phone.trim()) return setError('Phone number is required.');
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return setError('Please enter a valid email address.');
    }
    if (cartItems.length === 0) return setError('Your cart is empty. Add at least one product.');

    for (const item of cartItems) {
      if (!item.selectedQuantity || item.selectedQuantity <= 0) {
        return setError(`Quantity for ${item.name} must be greater than 0.`);
      }
      if (item.quantity !== undefined && item.selectedQuantity > item.quantity) {
        return setError(`Requested quantity for ${item.name} exceeds available stock (${item.quantity}).`);
      }
    }

    setIsSubmitting(true);
    
    try {
      const products = cartItems.map(item => ({
        product: item.id || item._id,
        productName: item.name,
        quantity: item.selectedQuantity,
        price: item.price || 0
      }));

      const payload = { ...formData, products };
      console.log('Submitting payload:', payload); // Dev log

      const response = await submitEnquiry(payload);
      
      console.log('API Response:', response); // Dev log

      if (response.success) {
        setReferenceNumber(response.referenceNumber);
        setIsSubmitted(true);
        if (onClearCart) onClearCart();
        setFormData({
          customerName: '',
          phone: '',
          email: '',
          companyName: '',
          eventDate: '',
          eventLocation: '',
          city: '',
          notes: ''
        });
      }
    } catch (err) {
      console.error('API Error:', err.response || err);
      setError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitted) {
      setIsSubmitted(false);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white border border-[#E8DFD5] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#E8DFD5] bg-[#FAF7F2]">
            <h2 className="text-2xl font-bold text-[#4A2F1D]">Enquiry Cart</h2>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-[#7C5A48] hover:text-[#4A2F1D] transition-colors p-2 hover:bg-[#FAF7F2] rounded-full disabled:opacity-50"
            >
              <X size={24} />
            </button>
          </div>

          {isSubmitted ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-[#4A2F1D] mb-2">Enquiry Submitted Successfully</h3>
              <p className="text-[#7C5A48] mb-6 text-lg">Your reference number is:</p>
              <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl px-8 py-4 mb-8">
                <span className="text-4xl font-mono font-bold text-[#A67C65] tracking-wider">{referenceNumber}</span>
              </div>
              <p className="text-[#7C5A48] max-w-md">
                Our team will review your requirements and get back to you shortly with a formal quotation.
              </p>
              <button 
                onClick={handleClose}
                className="mt-8 px-8 py-3 bg-[#FAF7F2] hover:bg-white/20 text-[#4A2F1D] rounded-xl transition-colors font-medium"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
              {/* Cart Items */}
              <div className="flex-1 p-6 overflow-y-auto border-r border-[#E8DFD5] md:border-b-0 border-b">
                <h3 className="text-lg font-medium text-[#4A2F1D] mb-4">Selected Items</h3>
                {cartItems.length === 0 ? (
                  <div className="text-[#A67C65] text-center py-8">Your enquiry cart is empty.</div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-[#FAF7F2]" />
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-xs text-[#A67C65]">{item.code}</div>
                              <div className="text-[#4A2F1D] font-medium">{item.name}</div>
                              <div className="text-sm text-[#7C5A48]">{item.price}</div>
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-[#A67C65] hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3 bg-[#FAF7F2] rounded-full p-1 mt-2 w-fit">
                              <button 
                                onClick={() => onUpdateQuantity(item, item.selectedQuantity - 1)}
                                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-[#4A2F1D] text-sm"
                              >
                                -
                              </button>
                              <span className="text-[#4A2F1D] font-medium w-4 text-center text-sm">{item.selectedQuantity}</span>
                              <button 
                                onClick={() => {
                                  onUpdateQuantity(item, item.selectedQuantity + 1);
                                }}
                                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-[#4A2F1D] text-sm"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form */}
              <div className="w-full md:w-[350px] lg:w-[400px] p-6 overflow-y-auto bg-[#FAF7F2]">
                <h3 className="text-lg font-medium text-[#4A2F1D] mb-4">Customer Details</h3>
                
                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="customerName"
                      placeholder="Full Name *"
                      required
                      value={formData.customerName}
                      onChange={handleChange}
                      className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl px-4 py-3 text-[#4A2F1D] placeholder:text-[#A67C65] focus:outline-none focus:border-[#A67C65] focus:ring-1 focus:ring-[#A67C65] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl px-4 py-3 text-[#4A2F1D] placeholder:text-[#A67C65] focus:outline-none focus:border-[#A67C65] focus:ring-1 focus:ring-[#A67C65] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl px-4 py-3 text-[#4A2F1D] placeholder:text-[#A67C65] focus:outline-none focus:border-[#A67C65] focus:ring-1 focus:ring-[#A67C65] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl px-4 py-3 text-[#4A2F1D] placeholder:text-[#A67C65] focus:outline-none focus:border-[#A67C65] focus:ring-1 focus:ring-[#A67C65] transition-colors"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl px-4 py-3 text-[#7C5A48] focus:text-[#4A2F1D] focus:outline-none focus:border-[#A67C65] focus:ring-1 focus:ring-[#A67C65] transition-colors "
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl px-4 py-3 text-[#4A2F1D] placeholder:text-[#A67C65] focus:outline-none focus:border-[#A67C65] focus:ring-1 focus:ring-[#A67C65] transition-colors"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="eventLocation"
                        placeholder="Venue / Area"
                        value={formData.eventLocation}
                        onChange={handleChange}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl px-4 py-3 text-[#4A2F1D] placeholder:text-[#A67C65] focus:outline-none focus:border-[#A67C65] focus:ring-1 focus:ring-[#A67C65] transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <textarea
                      name="notes"
                      placeholder="Additional Notes..."
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl px-4 py-3 text-[#4A2F1D] placeholder:text-[#A67C65] focus:outline-none focus:border-[#A67C65] focus:ring-1 focus:ring-[#A67C65] transition-colors resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={cartItems.length === 0 || isSubmitting}
                    className="w-full bg-[#A67C65] text-white hover:bg-[#8B5E45] hover:shadow-md text-[#4A2F1D] font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Submitting...
                      </>
                    ) : 'Submit Enquiry'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnquiryCartModal;
