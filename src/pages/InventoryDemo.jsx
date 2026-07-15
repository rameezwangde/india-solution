import { useState, useMemo, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/inventory/ProductCard';
import CategoryTabs from '../components/inventory/CategoryTabs';
import EnquiryCartBar from '../components/inventory/EnquiryCartBar';
import EnquiryCartModal from '../components/inventory/EnquiryCartModal';
import AdminPreviewSection from '../components/inventory/AdminPreviewSection';
import { getProducts } from '../api/productService';
import { getCategories } from '../api/categoryService';

const ProductSkeleton = () => (
  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full animate-pulse">
    <div className="relative aspect-[4/3] bg-white/10 w-full" />
    <div className="p-5 flex flex-col flex-grow">
      <div className="h-4 bg-white/10 rounded w-1/4 mb-3" />
      <div className="h-6 bg-white/10 rounded w-3/4 mb-4" />
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 bg-white/10 rounded w-1/3" />
        <div className="h-4 bg-white/10 rounded w-1/4" />
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div className="h-6 bg-white/10 rounded w-1/4" />
        <div className="h-10 bg-white/10 rounded-full w-24" />
      </div>
    </div>
  </div>
);

const InventoryDemo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        if (isMounted) {
          setProducts(fetchedProducts);
          setCategories(['All', ...fetchedCategories]);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError('Unable to load inventory');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchInventory();
    return () => { isMounted = false; };
  }, []);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, products]);

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
          {!loading && !error && (
            <CategoryTabs 
              categories={categories} 
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          )}
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
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
        )}
        
        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No Inventory Available</p>
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
