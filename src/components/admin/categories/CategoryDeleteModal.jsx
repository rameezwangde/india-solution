import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Loader2, Info } from 'lucide-react';
import { updateCategory } from '../../../api/categoryService';
import { useToast } from '../../../context/ToastContext';

const CategoryDeleteModal = ({ isOpen, onClose, onConfirm, category, isDeleting }) => {
  const [isDeactivating, setIsDeactivating] = useState(false);
  const { success, error } = useToast();

  if (!isOpen || !category) return null;

  const hasProducts = category.productCount > 0;

  const handleDeactivate = async () => {
    try {
      setIsDeactivating(true);
      await updateCategory(category._id, { isActive: false });
      success('Category deactivated successfully');
      onConfirm(); // Triggers a list refresh in the parent component
    } catch (err) {
      error(err.response?.data?.message || 'Failed to deactivate category');
    } finally {
      setIsDeactivating(false);
    }
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
          className="bg-navy-800 border border-[#E8DFD5] rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
        >
          <button onClick={onClose} disabled={isDeleting || isDeactivating} className="absolute top-4 right-4 text-[#A67C65] hover:text-[#4A2F1D] transition-colors disabled:opacity-50">
            <X size={20} />
          </button>
          
          <div className="flex flex-col items-center text-center">
            {hasProducts ? (
              <>
                <div className="w-12 h-12 bg-orange-500/20 text-[#C0602F]-500 rounded-full flex items-center justify-center mb-4">
                  <Info size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#4A2F1D] mb-2">Deletion Blocked</h3>
                <div className="text-[#A67C65] text-sm mb-6 space-y-2">
                  <p>
                    <span className="text-[#4A2F1D] font-medium">{category.name}</span> cannot be deleted because <strong className="text-[#C0602F]-400">{category.productCount} {category.productCount === 1 ? 'product is' : 'products are'}</strong> linked to it.
                  </p>
                  <p>
                    To remove it from the public view without deleting products, you can deactivate it instead.
                  </p>
                </div>

                <div className="flex w-full gap-3 flex-col sm:flex-row">
                  <button
                    onClick={onClose}
                    disabled={isDeactivating}
                    className="flex-1 px-4 py-2 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#4A2F1D] rounded-lg transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeactivate}
                    disabled={isDeactivating || category.isActive === false}
                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-[#4A2F1D] rounded-lg transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeactivating ? <Loader2 className="animate-spin" size={18} /> : 'Deactivate Category'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#4A2F1D] mb-2">Delete Category?</h3>
                <p className="text-[#A67C65] text-sm mb-6">
                  Are you sure you want to delete <span className="text-[#4A2F1D] font-medium">{category.name}</span>? 
                  This action cannot be undone.
                </p>

                <div className="flex w-full gap-3">
                  <button
                    onClick={onClose}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#4A2F1D] rounded-lg transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => onConfirm(true)}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-[#4A2F1D] rounded-lg transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isDeleting ? <Loader2 className="animate-spin" size={18} /> : 'Delete'}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryDeleteModal;
