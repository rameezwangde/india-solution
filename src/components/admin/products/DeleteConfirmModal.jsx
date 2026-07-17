import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, product, isDeleting }) => {
  if (!isOpen || !product) return null;

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
          className="bg-navy-800 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
        >
          <button onClick={onClose} disabled={isDeleting} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50">
            <X size={20} />
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Delete Product?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{product.name} ({product.code})</span>? 
              This action cannot be undone.
            </p>

            <div className="flex w-full gap-3">
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? <Loader2 className="animate-spin" size={18} /> : 'Delete'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
