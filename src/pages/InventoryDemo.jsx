import { useState, useMemo } from 'react';
import { Search, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { inventoryData, inventoryCategories } from '../data/inventoryData';
import ProductCard from '../components/inventory/ProductCard';
import CategoryTabs from '../components/inventory/CategoryTabs';
import EnquiryCartBar from '../components/inventory/EnquiryCartBar';
import EnquiryCartModal from '../components/inventory/EnquiryCartModal';
import AdminPreviewSection from '../components/inventory/AdminPreviewSection';

const InventoryDemo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return inventoryData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleUpdateQuantity = (product, quantity) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (quantity === 0) {
        return prev.filter(item => item.id !== product.id);
      }
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, selectedQuantity: quantity } : item
        );
      }
      return [...prev, { ...product, selectedQuantity: quantity }];
    });
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <div className="pt-40 min-h-screen bg-navy-900 flex flex-col relative pb-40">
      {/* Header Section */}
      <section className="container mx-auto px-6 lg:px-12 py-12 relative z-10">
        <div className="max-w-3xl mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Inventory Enquiry <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta to-orange">Demo</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Browse available rental inventory, add items to your enquiry cart, and send an enquiry without online payment.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-xl mb-12"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search by product name or code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-magenta transition-colors"
          />
          <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-magenta transition-colors">
            <Mic size={20} />
          </button>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CategoryTabs 
            categories={inventoryCategories} 
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              cartItem={cartItems.find(item => item.id === product.id)}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found matching your search.</p>
          </div>
        )}
      </section>

      {/* Admin Preview Section */}
      <AdminPreviewSection />

      {/* Sticky Cart Bar */}
      <EnquiryCartBar 
        cartItems={cartItems} 
        onViewCart={() => setIsModalOpen(true)} 
      />

      {/* Modal */}
      <EnquiryCartModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default InventoryDemo;
