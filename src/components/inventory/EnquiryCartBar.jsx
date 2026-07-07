import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const EnquiryCartBar = ({ cartItems, onViewCart }) => {
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
            <div className="bg-[#12182A]/95 backdrop-blur-xl border border-magenta/30 rounded-2xl p-4 shadow-[0_0_40px_rgba(233,30,99,0.3)] flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-4">
                <div className="bg-magenta/20 p-3 rounded-xl text-magenta">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <div className="text-gray-300 text-sm">Enquiry Cart</div>
                  <div className="text-white font-bold text-lg">
                    {totalItems} {totalItems === 1 ? 'Item' : 'Items'} Selected
                  </div>
                </div>
              </div>
              <button
                onClick={onViewCart}
                className="bg-gradient-to-r from-magenta to-orange hover:glow-magenta text-white px-6 py-3 rounded-full font-medium transition-all"
              >
                View Enquiry Cart
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryCartBar;
