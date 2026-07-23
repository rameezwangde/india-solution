import { motion } from 'framer-motion';
import { optimizeCloudinaryUrl } from '../../utils/cloudinary';

const ProductCard = ({ product, cartItem, onUpdateQuantity }) => {
  const currentQuantity = cartItem ? cartItem.selectedQuantity : 0;
  
  const handleAdd = () => {
    if (currentQuantity < product.quantity) {
      onUpdateQuantity(product, currentQuantity + 1);
    }
  };

  const handleDecrease = () => {
    if (currentQuantity > 0) {
      onUpdateQuantity(product, currentQuantity - 1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#E8DFD5] shadow-sm rounded-[1.5rem] overflow-hidden hover:border-[#D5C5B9] hover:shadow-md transition-all duration-300 group flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-[#E8DFD5] bg-[#FFFDF9] p-4 flex items-center justify-center">
        <img 
          src={product.image ? optimizeCloudinaryUrl(product.image) : null} 
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#4A2F1D] mb-2 leading-tight font-['Playfair_Display',serif]">{product.name}</h3>
        
        {product.size && (
          <p className="text-sm text-[#A67C65] mb-2 font-medium">{product.size}</p>
        )}
        
        <p className="text-sm text-[#7C5A48] mb-6 flex-grow leading-relaxed">
          {product.description || 'Professional event equipment available for rent.'}
        </p>
        
        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-xs text-[#A67C65] uppercase tracking-wider font-bold mb-1">Status</p>
            {product.quantity > 0 ? (
              <p className="text-sm font-bold text-green-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Available
              </p>
            ) : (
              <p className="text-sm font-bold text-red-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                Out of Stock
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {currentQuantity > 0 ? (
              <div className="flex items-center bg-[#FAF7F2] rounded-full p-1 border border-[#E8DFD5]">
                <button 
                  onClick={handleDecrease}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#7C5A48] hover:bg-white hover:shadow-sm transition-all"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-[#4A2F1D]">{currentQuantity}</span>
                <button 
                  onClick={handleAdd}
                  disabled={currentQuantity >= product.quantity}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#7C5A48] hover:bg-white hover:shadow-sm transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none"
                >
                  +
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAdd}
                disabled={product.quantity === 0}
                className="bg-[#4A2F1D] hover:bg-[#5c3a24] text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow active:scale-95"
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
