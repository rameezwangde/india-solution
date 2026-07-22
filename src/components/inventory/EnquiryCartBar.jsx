import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const EnquiryCartBar = ({ cartItems, onViewCart }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.selectedQuantity, 0);

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onViewCart}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-[#A67C65] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(166,124,101,0.4)] flex items-center justify-center hover:bg-[#8B5E45] transition-colors"
        >
          <ShoppingBag size={28} />
          
          <motion.div 
            key={totalItems}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#FAF7F2] shadow-sm"
          >
            {totalItems}
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default EnquiryCartBar;
