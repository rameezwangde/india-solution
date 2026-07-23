import { useState, useMemo, useEffect } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { Search, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/inventory/ProductCard';
import CategoryTabs from '../components/inventory/CategoryTabs';
import { useCart } from '../context/CartContext';
import SEO from '../components/layout/SEO';

import { getProducts, getDepartments } from '../api/productService';

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
  const { cartItems, handleUpdateQuantity } = useCart();
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch departments
  const { data: departmentsData } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
    staleTime: 1000 * 60 * 60, // cache for 1 hour
  });

  const categories = useMemo(() => {
    const visibleDepts = (departmentsData?.departments || []).filter(d => !d.isHidden);
    return ['All', ...visibleDepts.map(d => d.name)];
  }, [departmentsData]);

  // Fetch products with infinite scroll
  const {
    data: productsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError
  } = useInfiniteQuery({
    queryKey: ['products', activeCategory, debouncedSearchQuery],
    queryFn: ({ pageParam = 1 }) => {
      const params = { limit: 20, page: pageParam };
      if (activeCategory !== 'All') params.department = activeCategory;
      if (debouncedSearchQuery.trim()) params.search = debouncedSearchQuery.trim();
      return getProducts(params);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination && lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    keepPreviousData: true,
  });

  // Flatten the pages array into a single array of products
  const products = useMemo(() => {
    return productsData?.pages.flatMap(page => page.products) || [];
  }, [productsData]);

  const loading = isFetching && products.length === 0;
  const error = isError ? 'Unable to load inventory' : null;
  return (
    <div className="pt-32 min-h-screen bg-[#FAF7F2] font-sans flex flex-col relative pb-40 lg:pt-44">
      <SEO 
        title="Event Equipment & Inventory Catalog"
        description="Browse our extensive catalog of event equipment, stage decor, lighting, AV, and luxury furniture available for rent in Bengaluru."
        keywords="event equipment rental bengaluru, stage decor, av rental, luxury event furniture"
      />
      {/* Global Background Watermarks */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -right-20 top-0 w-full md:w-[60%] h-[120%] object-cover object-left opacity-[0.03]" 
          style={{ transform: 'scaleX(-1)'}} 
        />
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -left-20 top-1/4 w-full md:w-[60%] h-[120%] object-cover object-left opacity-[0.02]" 
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
          className="relative max-w-2xl mb-12 flex bg-white border border-[#E8DFD5] shadow-sm rounded-full overflow-hidden focus-within:border-[#A67C65] transition-colors"
        >
          <div className="pl-5 flex items-center pointer-events-none">
            <Search className="text-[#A67C65]" size={20} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            placeholder="Search by product name or code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow bg-transparent py-4 pl-3 pr-3 text-[14.5px] font-semibold text-[#4A2F1D] placeholder:text-[#A67C65]/70 focus:outline-none min-w-0"
          />
          <div className="border-l border-[#E8DFD5] flex items-center bg-[#FAF7F2] shrink-0 relative">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="bg-transparent py-4 pl-4 pr-10 text-[13px] font-bold text-[#4A2F1D] focus:outline-none cursor-pointer uppercase appearance-none max-w-[150px] sm:max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="absolute right-3 pointer-events-none text-[#A67C65]">
              <ChevronDown size={16} strokeWidth={2.5} />
            </div>
          </div>
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
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  cartItem={cartItems.find(item => item.id === product.id)}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>
            
            {/* Load More Button */}
            {hasNextPage && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetching}
                  className="bg-white border border-[#E8DFD5] hover:border-[#A67C65] text-[#4A2F1D] px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50"
                >
                  {isFetching ? 'Loading...' : 'Load More Inventory'}
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20 bg-white border border-[#E8DFD5] rounded-[1.5rem] shadow-sm mt-8">
            <p className="text-[#A67C65] font-semibold text-lg">No Inventory Available</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default InventoryDemo;
