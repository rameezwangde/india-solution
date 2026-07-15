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
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-magenta/50 transition-all duration-300 group flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-magenta mb-1 font-medium">{product.code}</div>
        <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-400">{product.size}</p>
          <p className="text-sm font-medium text-gold">Available: {product.quantity - currentQuantity}</p>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="font-semibold text-white">{product.price}</div>
          
          {product.quantity === 0 ? (
            <button 
              disabled
              className="bg-gray-600 cursor-not-allowed text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Out of Stock
            </button>
          ) : currentQuantity === 0 ? (
            <button 
              onClick={handleAdd}
              className="bg-magenta hover:bg-magenta-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-white/10 rounded-full p-1">
              <button 
                onClick={handleDecrease}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                -
              </button>
              <span className="text-white font-medium w-4 text-center">{currentQuantity}</span>
              <button 
                onClick={handleAdd}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
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
