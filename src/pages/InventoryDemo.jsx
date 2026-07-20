import { useState, useMemo, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/inventory/ProductCard';
import CategoryTabs from '../components/inventory/CategoryTabs';
import EnquiryCartBar from '../components/inventory/EnquiryCartBar';
import EnquiryCartModal from '../components/inventory/EnquiryCartModal';

import { getProducts } from '../api/productService';
import { getCategories } from '../api/categoryService';

const ProductSkeleton = () => (
  <div className="bg-white border border-[#E8DFD5] shadow-sm rounded-[1.5rem] overflow-hidden flex flex-col h-full animate-pulse">
    <div className="relative aspect-[4/3] bg-[#E8DFD5]/50 w-full" />
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-3 bg-[#E8DFD5] rounded w-1/4 mb-3" />
      <div className="h-5 bg-[#E8DFD5] rounded w-3/4 mb-4" />
      <div className="flex justify-between items-center mb-6">
        <div className="h-4 bg-[#E8DFD5] rounded w-1/3" />
        <div className="h-4 bg-[#E8DFD5] rounded w-1/4" />
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div className="h-5 bg-[#E8DFD5] rounded w-1/4" />
        <div className="h-10 bg-[#E8DFD5] rounded-full w-24" />
      </div>
    </div>
  </div>
);

const InventoryDemo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(20);
  
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
          getProducts({ limit: 2000 }),
          getCategories()
        ]);
        if (isMounted) {
          setProducts(fetchedProducts.products);
          setCategories(['All', ...fetchedCategories.map(c => c.name)]);
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
      const matchesCategory = activeCategory === 'All' || 
        (product.category && activeCategory && 
         product.category.trim().toLowerCase() === activeCategory.trim().toLowerCase()) ||
        (product.department && activeCategory && 
         product.department.trim().toLowerCase() === activeCategory.trim().toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, products]);

  useEffect(() => {
    setDisplayLimit(20);
  }, [searchQuery, activeCategory]);

  const displayedProducts = filteredProducts.slice(0, displayLimit);

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
    <div className="pt-32 min-h-screen bg-[#FAF7F2] font-sans flex flex-col relative pb-40 lg:pt-44">
      {/* Global Background Watermarks */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -right-20 top-0 w-full md:w-[60%] h-[120%] object-cover object-left opacity-30 mix-blend-multiply" 
          style={{ transform: 'scaleX(-1)'}} 
        />
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -left-20 top-1/4 w-full md:w-[60%] h-[120%] object-cover object-left opacity-20 mix-blend-multiply" 
        />
      </div>

      {/* Header Section */}
      <section className="container mx-auto px-6 lg:px-12 py-12 relative z-10 max-w-[1300px]">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D5C5B9]"></span>
            <span className="text-[#A67C65] text-xs font-bold tracking-[0.25em] uppercase">Our Catalog</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold text-[#4A2F1D] tracking-wide mb-6 uppercase"
          >
            Our <span className="text-[#A67C65]">Products</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#7C5A48] text-[14.5px] font-medium leading-[1.8] max-w-2xl"
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
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="text-[#A67C65]" size={20} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            placeholder="Search by product name or code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#E8DFD5] shadow-sm rounded-full py-4 pl-14 pr-14 text-[14.5px] font-semibold text-[#4A2F1D] placeholder:text-[#A67C65]/70 focus:outline-none focus:border-[#A67C65] transition-colors"
          />
          <button className="absolute inset-y-0 right-0 pr-5 flex items-center text-[#A67C65]/70 hover:text-[#A67C65] transition-colors">
            <Mic size={20} strokeWidth={2.5} />
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
          <div className="bg-red-50/80 border border-red-200 text-red-600 p-4 rounded-[1rem] mb-8 font-semibold text-sm">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  cartItem={cartItems.find(item => item.id === product.id)}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>
            
            {/* Load More Button */}
            {displayLimit < filteredProducts.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setDisplayLimit(prev => prev + 20)}
                  className="bg-white border border-[#E8DFD5] hover:border-[#A67C65] text-[#4A2F1D] px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Load More Inventory
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white border border-[#E8DFD5] rounded-[1.5rem] shadow-sm mt-8">
            <p className="text-[#A67C65] font-semibold text-lg">No Inventory Available</p>
          </div>
        )}
      </section>


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
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
};

export default InventoryDemo;
