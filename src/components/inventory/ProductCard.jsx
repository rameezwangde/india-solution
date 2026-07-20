import { motion } from 'framer-motion';

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
      <div className="relative aspect-[4/3] overflow-hidden border-b border-[#E8DFD5]">
        <img 
          src={product.image || null} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-[11px] text-[#A67C65] font-bold tracking-widest uppercase mb-2">{product.code}</div>
        <h3 className="text-xl font-bold text-[#4A2F1D] mb-2 leading-tight font-['Playfair_Display',serif]">{product.name}</h3>
        
        <div className="flex justify-between items-center mb-5">
          <p className="text-[13px] font-medium text-[#7C5A48]">{product.size}</p>
          <p className="text-[13px] font-bold text-[#A67C65]">Available: {product.quantity - currentQuantity}</p>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#E8DFD5]">
          <div className="font-bold text-[#4A2F1D]">{product.price}</div>
          
          {product.quantity === 0 ? (
            <button 
              disabled
              className="bg-[#E8DFD5] cursor-not-allowed text-[#7C5A48] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Out of Stock
            </button>
          ) : currentQuantity === 0 ? (
            <button 
              onClick={handleAdd}
              className="bg-[#A67C65] hover:bg-[#8B5E45] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-full p-1 shadow-inner">
              <button 
                onClick={handleDecrease}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#E8DFD5] hover:border-[#D5C5B9] transition-colors text-[#4A2F1D] font-bold shadow-sm"
              >
                -
              </button>
              <span className="text-[#4A2F1D] font-bold w-6 text-center text-[13px]">{currentQuantity}</span>
              <button 
                onClick={handleAdd}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#E8DFD5] hover:border-[#D5C5B9] transition-colors text-[#4A2F1D] font-bold shadow-sm"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
