import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { uploadProductImage, deleteProductImage } from '../../../api/productService';
import { useToast } from '../../../context/ToastContext';

const ProductImageModal = ({ isOpen, onClose, product, onUpdate }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { success, error } = useToast();

  if (!isOpen || !product) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      error('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setIsUploading(true);
      const data = await uploadProductImage(product.id, file);
      success('Image uploaded successfully');
      onUpdate(data.product);
      onClose();
      setFile(null);
      setPreview('');
    } catch (err) {
      error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const data = await deleteProductImage(product.id);
      success('Image removed successfully');
      setFile(null);
      setPreview('');
      onUpdate(data.product);
      onClose();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to remove image');
    } finally {
      setIsDeleting(false);
    }
  };

  const currentImage = preview || product.image;

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
          <button onClick={onClose} disabled={isUploading || isDeleting} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
          
          <h3 className="text-xl font-bold text-white mb-1">Manage Image</h3>
          <p className="text-sm text-gray-400 mb-6">{product.name}</p>

          <div className="mb-6 flex flex-col items-center">
            {currentImage ? (
              <div className="relative group w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-navy-900">
                <img src={currentImage} alt="Product" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-full aspect-video rounded-xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center text-gray-400">
                <ImageIcon size={48} className="mb-2 opacity-50" />
                <p>No image available</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
                disabled={isUploading || isDeleting}
              />
              <label 
                htmlFor="image-upload"
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors cursor-pointer ${isUploading || isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <Upload size={18} />
                {file ? 'Choose Different File' : 'Select Image File'}
              </label>
            </div>

            {file && (
              <button
                onClick={handleUpload}
                disabled={isUploading || isDeleting}
                className="w-full bg-gradient-to-r from-magenta to-orange hover:from-magenta-600 hover:to-orange-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isUploading ? <Loader2 className="animate-spin" size={18} /> : 'Upload Image'}
              </button>
            )}

            {product.image && !file && (
              <button
                onClick={handleDelete}
                disabled={isUploading || isDeleting}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 border border-red-500/20 transition-colors"
              >
                {isDeleting ? <Loader2 className="animate-spin" size={18} /> : <><Trash2 size={18} /> Remove Current Image</>}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductImageModal;
