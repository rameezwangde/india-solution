import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { createCategory, updateCategory } from '../../../api/categoryService';
import { useToast } from '../../../context/ToastContext';

const CategoryFormModal = ({ isOpen, onClose, category, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setFormData({
          name: category.name || '',
          description: category.description || '',
          isActive: category.isActive !== false
        });
      } else {
        setFormData({
          name: '',
          description: '',
          isActive: true
        });
      }
    }
  }, [isOpen, category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimName = formData.name.trim();
    if (!trimName) {
      error('Category name cannot be empty');
      return;
    }

    try {
      setLoading(true);
      if (category) {
        await updateCategory(category._id, { ...formData, name: trimName });
        success('Category updated successfully');
      } else {
        await createCategory({ ...formData, name: trimName });
        success('Category created successfully');
      }
      onSuccess();
      onClose();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-navy-800 border border-[#E8DFD5] rounded-2xl w-full max-w-lg shadow-2xl relative"
        >
          <div className="border-b border-[#E8DFD5] p-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#4A2F1D]">{category ? 'Edit Category' : 'Add New Category'}</h3>
            <button onClick={onClose} disabled={loading} className="text-[#A67C65] hover:text-[#4A2F1D] transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#7C5A48]">Category Name *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-magenta focus:outline-none" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#7C5A48]">Description</label>
              <textarea rows="3" name="description" value={formData.description} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-magenta focus:outline-none resize-none"></textarea>
            </div>

            <div className="flex items-center gap-3 bg-[#FAF7F2] p-4 rounded-lg border border-[#E8DFD5]">
              <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 rounded border-white/20 text-[#9A424E] focus:ring-magenta focus:ring-offset-navy-800 bg-transparent" />
              <div>
                <label htmlFor="isActive" className="text-sm font-medium text-[#4A2F1D] cursor-pointer select-none block">
                  Active Category
                </label>
                <p className="text-xs text-[#A67C65] mt-1">If unchecked, the category and its products will be hidden from the public website.</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-[#E8DFD5]">
              <button type="button" onClick={onClose} disabled={loading} className="flex-1 px-4 py-3 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#4A2F1D] rounded-lg transition-colors font-medium">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="flex-1 px-4 py-3 bg-gradient-to-r from-magenta to-orange hover:from-magenta-600 hover:to-orange-600 text-[#4A2F1D] rounded-lg transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Save Category'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryFormModal;
