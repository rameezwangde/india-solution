import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Minus, Plus } from 'lucide-react';

const UpdateQuantityModal = ({ isOpen, onClose, onConfirm, product, isUpdating }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (product) setQuantity(product.quantity || 0);
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAdjust = (amount) => {
    setQuantity(prev => Math.max(0, prev + amount));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-navy-800 border border-[#E8DFD5] rounded-2xl p-6 w-full max-w-sm shadow-2xl relative"
        >
          <button onClick={onClose} disabled={isUpdating} className="absolute top-4 right-4 text-[#A67C65] hover:text-[#4A2F1D] transition-colors">
            <X size={20} />
          </button>
          
          <h3 className="text-xl font-bold text-[#4A2F1D] mb-1">Update Quantity</h3>
          <p className="text-sm text-[#A67C65] mb-6">{product.name} ({product.code})</p>

          <div className="bg-white rounded-xl p-4 mb-6 border border-[#E8DFD5]">
            <div className="text-center mb-4 text-sm text-[#A67C65]">Current Stock: <span className="text-[#4A2F1D] font-bold">{product.quantity}</span></div>
            
            <div className="flex items-center justify-center gap-4">
              <button type="button" onClick={() => handleAdjust(-5)} className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#A67C65] hover:text-[#4A2F1D] hover:bg-[#E8DFD5] transition-colors" title="-5">-5</button>
              <button type="button" onClick={() => handleAdjust(-1)} className="w-10 h-10 rounded-full bg-[#E8DFD5] flex items-center justify-center text-[#4A2F1D] hover:bg-white/20 transition-colors"><Minus size={18} /></button>
              
              <input 
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-20 text-center bg-transparent text-3xl font-bold text-[#4A2F1D] focus:outline-none focus:ring-2 focus:ring-magenta rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              
              <button type="button" onClick={() => handleAdjust(1)} className="w-10 h-10 rounded-full bg-[#E8DFD5] flex items-center justify-center text-[#4A2F1D] hover:bg-white/20 transition-colors"><Plus size={18} /></button>
              <button type="button" onClick={() => handleAdjust(5)} className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#A67C65] hover:text-[#4A2F1D] hover:bg-[#E8DFD5] transition-colors" title="+5">+5</button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isUpdating}
              className="flex-1 px-4 py-2 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#4A2F1D] rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(quantity)}
              disabled={isUpdating || quantity === product.quantity}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-magenta to-orange hover:from-magenta-600 hover:to-orange-600 text-[#4A2F1D] rounded-lg transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? <Loader2 className="animate-spin" size={18} /> : 'Save'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateQuantityModal;
