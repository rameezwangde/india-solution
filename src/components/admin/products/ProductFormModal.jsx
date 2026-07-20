import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { createProduct, updateProduct } from '../../../api/productService';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const ProductFormModal = ({ isOpen, onClose, product, onSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    productCode: '',
    category: '',
    department: '',
    description: '',
    size: '',
    price: 0,
    quantity: 0,
    status: 'available',
    isFeatured: false
  });

  useEffect(() => {
    if (isOpen) {
      loadCategories();
      if (product) {
        setFormData({
          name: product.name || '',
          productCode: product.code || '',
          category: product.categoryId || '',
          department: product.department || '',
          description: product.description || '',
          size: product.size || '',
          price: product.price || 0,
          quantity: product.quantity || 0,
          status: product.status || 'available',
          isFeatured: product.isFeatured || false
        });
      } else {
        setFormData({
          name: '',
          productCode: '',
          category: '',
          department: '',
          description: '',
          size: '',
          price: 0,
          quantity: 0,
          status: 'available',
          isFeatured: false
        });
      }
    }
  }, [isOpen, product]);

  const loadCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.quantity < 0 || formData.price < 0) {
      error('Quantity and Price cannot be negative');
      return;
    }
    if (!formData.name || !formData.category) {
      error('Name and Category are required');
      return;
    }

    try {
      setLoading(true);
      if (product) {
        await updateProduct(product.id, formData);
        success('Product updated successfully');
      } else {
        await createProduct(formData);
        success('Product created successfully');
      }
      onSuccess();
      onClose();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to save product');
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white border border-[#E8DFD5] rounded-2xl w-full max-w-2xl shadow-2xl relative my-8"
        >
          <div className="sticky top-0 bg-white border-b border-[#E8DFD5] p-6 rounded-t-2xl flex items-center justify-between z-10">
            <h3 className="text-xl font-bold text-[#4A2F1D]">{product ? 'Edit Product' : 'Add New Product'}</h3>
            <button onClick={onClose} disabled={loading} className="text-[#A67C65] hover:text-[#4A2F1D] transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#7C5A48]">Product Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-[#A67C65] focus:outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#7C5A48]">Product Code</label>
                <input type="text" name="productCode" value={formData.productCode} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-[#A67C65] focus:outline-none" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#7C5A48]">Category *</label>
                <select required name="category" value={formData.category} onChange={handleChange} className="w-full bg-white border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-[#A67C65] focus:outline-none">
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#7C5A48]">Department</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-[#A67C65] focus:outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#7C5A48]">Size / Specifications</label>
                <input type="text" name="size" value={formData.size} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-[#A67C65] focus:outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#7C5A48]">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-white border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-[#A67C65] focus:outline-none">
                  <option value="available">Available</option>
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#7C5A48]">Price (₹) *</label>
                <input required type="number" min="0" name="price" value={formData.price} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-[#A67C65] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#7C5A48]">Quantity *</label>
                <input required type="number" min="0" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-[#A67C65] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#7C5A48]">Description</label>
              <textarea rows="3" name="description" value={formData.description} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-[#A67C65] focus:outline-none resize-none"></textarea>
            </div>

            <div className="flex items-center gap-3 bg-[#FAF7F2] p-4 rounded-lg border border-[#E8DFD5]">
              <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 rounded border-[#E8DFD5] text-[#9A424E] focus:ring-[#A67C65] focus:ring-offset-white bg-transparent" />
              <label htmlFor="isFeatured" className="text-sm font-medium text-[#4A2F1D] cursor-pointer select-none">
                Mark as Featured Product
              </label>
            </div>

            <div className="flex gap-4 pt-4 border-t border-[#E8DFD5]">
              <button type="button" onClick={onClose} disabled={loading} className="flex-1 px-4 py-3 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#4A2F1D] rounded-lg transition-colors font-medium">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="flex-1 px-4 py-3 bg-gradient-to-r from-magenta to-orange hover:from-magenta-600 hover:to-orange-600 text-[#4A2F1D] rounded-lg transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Save Product'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductFormModal;
