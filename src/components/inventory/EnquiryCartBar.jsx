import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const EnquiryCartBar = ({ cartItems, onViewCart, onClearCart }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.selectedQuantity, 0);

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white/95 backdrop-blur-xl border border-[#E8DFD5] rounded-2xl p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-4">
                <div className="bg-[#FAF7F2] border border-[#E8DFD5] p-3 rounded-xl text-[#A67C65]">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <div className="text-[#A67C65] text-sm">Enquiry Cart</div>
                  <div className="text-[#4A2F1D] font-bold text-lg">
                    {totalItems} {totalItems === 1 ? 'Item' : 'Items'} Selected
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClearCart}
                  className="bg-transparent border border-[#E8DFD5] text-[#A67C65] hover:bg-red-50 hover:border-red-200 hover:text-red-600 px-6 py-3 rounded-full font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={onViewCart}
                  className="bg-[#A67C65] text-white hover:bg-[#8B5E45] hover:shadow-md px-6 py-3 rounded-full font-medium transition-all"
                >
                  View Enquiry Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryCartBar;
