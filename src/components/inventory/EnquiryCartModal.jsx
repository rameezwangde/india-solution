import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { useState } from 'react';

const EnquiryCartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    location: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const itemsText = cartItems.map(item => `- ${item.name} (${item.code}) - Qty: ${item.selectedQuantity}`).join('%0A');
    const message = `*New Inventory Enquiry*%0A%0A*Customer Details:*%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email || 'N/A'}%0AEvent Date: ${formData.date}%0ALocation: ${formData.location}%0ANotes: ${formData.notes || 'None'}%0A%0A*Selected Items:*%0A${itemsText}`;
    
    const whatsappUrl = `https://wa.me/919742091362?text=${message}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-navy-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
            <h2 className="text-2xl font-bold text-white">Enquiry Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
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
              <h3 className="text-2xl font-bold text-white mb-2">Enquiry Sent Successfully!</h3>
              <p className="text-gray-400">Our team will get back to you shortly with a formal quotation.</p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
              {/* Cart Items */}
              <div className="flex-1 p-6 overflow-y-auto border-r border-white/5 md:border-b-0 border-b">
                <h3 className="text-lg font-medium text-white mb-4">Selected Items</h3>
                {cartItems.length === 0 ? (
                  <div className="text-gray-500 text-center py-8">Your enquiry cart is empty.</div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-xs text-magenta">{item.code}</div>
                              <div className="text-white font-medium">{item.name}</div>
                              <div className="text-sm text-gray-400">{item.price}</div>
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-gray-500 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3 bg-white/10 rounded-full p-1 mt-2 w-fit">
                              <button 
                                onClick={() => onUpdateQuantity(item, item.selectedQuantity - 1)}
                                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white text-sm"
                              >
                                -
                              </button>
                              <span className="text-white font-medium w-4 text-center text-sm">{item.selectedQuantity}</span>
                              <button 
                                onClick={() => {
                                  if (item.selectedQuantity < item.quantity) {
                                    onUpdateQuantity(item, item.selectedQuantity + 1);
                                  }
                                }}
                                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white text-sm"
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
              <div className="w-full md:w-[350px] lg:w-[400px] p-6 overflow-y-auto bg-black/20">
                <h3 className="text-lg font-medium text-white mb-4">Customer Details</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-magenta transition-colors"
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-magenta transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-magenta transition-colors"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-magenta transition-colors [color-scheme:dark]"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="location"
                      placeholder="Event Location *"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-magenta transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      name="notes"
                      placeholder="Additional Notes..."
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-magenta transition-colors resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={cartItems.length === 0}
                    className="w-full bg-gradient-to-r from-magenta to-orange hover:glow-magenta text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    Submit Enquiry
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
