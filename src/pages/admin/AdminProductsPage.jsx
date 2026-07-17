import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, Search, Filter, RefreshCw, Edit, Trash2, 
  Image as ImageIcon, Package, CheckCircle, AlertTriangle, XCircle,
  ChevronLeft, ChevronRight, Hash, DollarSign
} from 'lucide-react';
import { getProducts, deleteProduct, updateProduct } from '../../api/productService';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';

import ProductFormModal from '../../components/admin/products/ProductFormModal';
import UpdateQuantityModal from '../../components/admin/products/UpdateQuantityModal';
import ProductImageModal from '../../components/admin/products/ProductImageModal';
import DeleteConfirmModal from '../../components/admin/products/DeleteConfirmModal';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-gray-400 text-xs font-medium mb-1">{title}</p>
      <h3 className="text-xl font-bold text-white">{value}</h3>
    </div>
  </div>
);

const AdminProductsPage = () => {
  // Data States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ total: 0, available: 0, outOfStock: 0, lowStock: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 12;

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    sort: '-createdAt'
  });

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isQtyOpen, setIsQtyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { success, error: showError } = useToast();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset to page 1 on search
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Load overall stats and categories once
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get('/categories'),
          getProducts({ limit: 1000 }) // fetching a larger set to calculate stats
        ]);
        setCategories(catRes.data.categories || []);
        
        let avail = 0, oos = 0, low = 0;
        prodRes.products.forEach(p => {
          if (p.quantity === 0 || p.status === 'out_of_stock') oos++;
          else if (p.quantity > 0 && p.quantity <= 5) {
            low++;
            avail++;
          }
          else avail++;
        });

        setStats({
          total: prodRes.products.length,
          available: avail,
          outOfStock: oos,
          lowStock: low
        });
      } catch (err) {
        console.error("Failed to load stats/categories", err);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch paginated products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit,
        search: debouncedSearch,
        category: filters.category,
        status: filters.status,
        sort: filters.sort
      };

      const res = await getProducts(params);
      setProducts(res.products);
      
      if (res.pagination) {
        setTotalPages(res.pagination.pages);
        setTotalCount(res.pagination.total);
        if (page > res.pagination.pages && res.pagination.pages > 0) {
          setPage(res.pagination.pages);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Unable to load products');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const resetFilters = () => {
    setSearch('');
    setFilters({ category: '', status: '', sort: '-createdAt' });
    setPage(1);
  };

  const openForm = (product = null) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const openQuantity = (product) => {
    setSelectedProduct(product);
    setIsQtyOpen(true);
  };

  const openImage = (product) => {
    setSelectedProduct(product);
    setIsImageOpen(true);
  };

  const openDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsProcessing(true);
      await deleteProduct(selectedProduct.id);
      success('Product deleted successfully');
      setIsDeleteOpen(false);
      fetchProducts();
      // Optional: recalculate stats
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to delete product');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuantityConfirm = async (newQuantity) => {
    try {
      setIsProcessing(true);
      await updateProduct(selectedProduct.id, { quantity: newQuantity });
      success('Quantity updated successfully');
      setIsQtyOpen(false);
      fetchProducts();
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to update quantity');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-gray-400">Manage inventory products, quantities, pricing and images.</p>
        </div>
        <button 
          onClick={() => openForm()}
          className="bg-gradient-to-r from-magenta to-orange hover:from-magenta-600 hover:to-orange-600 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg shadow-magenta/20"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={stats.total} icon={Package} color="bg-blue-500/20 text-blue-500" />
        <StatCard title="Available" value={stats.available} icon={CheckCircle} color="bg-green-500/20 text-green-500" />
        <StatCard title="Low Stock" value={stats.lowStock} icon={AlertTriangle} color="bg-orange-500/20 text-orange-500" />
        <StatCard title="Out of Stock" value={stats.outOfStock} icon={XCircle} color="bg-red-500/20 text-red-500" />
      </div>

      {/* Toolbar */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col xl:flex-row gap-4 xl:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy-900 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-magenta"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-navy-900 border border-white/10 rounded-lg px-3 py-1">
            <Filter size={16} className="text-gray-400" />
            <select 
              value={filters.category} 
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="bg-transparent text-sm text-white py-1.5 focus:outline-none w-32"
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <select 
            value={filters.status} 
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-magenta"
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="hidden">Hidden</option>
          </select>

          <select 
            value={filters.sort} 
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-magenta"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="name">Name A-Z</option>
            <option value="-name">Name Z-A</option>
            <option value="price">Price Low-High</option>
            <option value="-price">Price High-Low</option>
            <option value="quantity">Qty Low-High</option>
            <option value="-quantity">Qty High-Low</option>
          </select>

          <button 
            onClick={resetFilters}
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
            title="Reset Filters"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 flex flex-col items-center text-center">
          <AlertTriangle size={48} className="text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Unable to load products</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button onClick={fetchProducts} className="bg-white/5 hover:bg-white/10 px-6 py-2 rounded-lg text-white transition-colors">
            Retry
          </button>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-navy-900 text-gray-400 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Code & Category</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium">Quantity</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4"><div className="h-10 w-48 bg-white/5 rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-24 bg-white/5 rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-16 bg-white/5 rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-12 bg-white/5 rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-6 w-20 bg-white/5 rounded-full"></div></td>
                      <td className="px-6 py-4"><div className="h-8 w-24 bg-white/5 rounded ml-auto"></div></td>
                    </tr>
                  ))
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Package size={48} className="text-gray-600 mb-4" />
                        <h4 className="text-lg font-medium text-white mb-2">No products found</h4>
                        <p className="text-gray-400 mb-4">Try adjusting your search or filters.</p>
                        <button onClick={resetFilters} className="text-magenta hover:text-magenta-400 font-medium">Clear Filters</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-navy-900 border border-white/10" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                              <ImageIcon size={20} />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-white">{p.name}</p>
                            {p.size && <p className="text-xs text-gray-500 mt-0.5">{p.size}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-300">
                          <Hash size={14} className="text-gray-500" />
                          <span>{p.code || 'N/A'}</span>
                        </div>
                        <p className="text-xs text-magenta mt-1">{p.category}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-white">
                        ₹{p.price?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className={`font-bold ${p.quantity === 0 ? 'text-red-400' : p.quantity <= 5 ? 'text-orange-400' : 'text-white'}`}>
                            {p.quantity}
                          </span>
                          <button onClick={() => openQuantity(p)} className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Quick Update">
                            <Edit size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          p.quantity === 0 ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
                          p.status === 'hidden' ? 'bg-gray-500/10 border-gray-500/20 text-gray-400' : 
                          'bg-green-500/10 border-green-500/20 text-green-400'
                        }`}>
                          {p.quantity === 0 ? 'Out of Stock' : p.status === 'hidden' ? 'Hidden' : 'Available'}
                        </span>
                        {p.isFeatured && <span className="ml-2 text-xs text-orange-400" title="Featured">★</span>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openImage(p)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors" title="Manage Image">
                            <ImageIcon size={16} />
                          </button>
                          <button onClick={() => openForm(p)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-blue-400 transition-colors" title="Edit Product">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => openDelete(p)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors" title="Delete Product">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden flex flex-col divide-y divide-white/10">
             {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 animate-pulse flex gap-4">
                    <div className="w-16 h-16 bg-white/5 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-white/5 rounded w-3/4"></div>
                      <div className="h-3 bg-white/5 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : products.length === 0 ? (
                <div className="p-8 text-center text-gray-400">No products found.</div>
              ) : (
                products.map(p => (
                  <div key={p.id} className="p-4 flex flex-col gap-3">
                    <div className="flex items-start gap-4">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg object-cover bg-navy-900 border border-white/10" />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                          <ImageIcon size={24} />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-sm line-clamp-1">{p.name}</h4>
                        <p className="text-xs text-magenta my-1">{p.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-md ${p.quantity === 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                            Qty: {p.quantity}
                          </span>
                          <span className="text-sm font-bold text-white">₹{p.price?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/5">
                      <button onClick={() => openQuantity(p)} className="flex flex-col items-center justify-center py-2 bg-white/5 rounded-lg text-gray-400 hover:text-white text-xs gap-1">
                        <Hash size={14} /> Qty
                      </button>
                      <button onClick={() => openImage(p)} className="flex flex-col items-center justify-center py-2 bg-white/5 rounded-lg text-gray-400 hover:text-white text-xs gap-1">
                        <ImageIcon size={14} /> Image
                      </button>
                      <button onClick={() => openForm(p)} className="flex flex-col items-center justify-center py-2 bg-white/5 rounded-lg text-blue-400 text-xs gap-1">
                        <Edit size={14} /> Edit
                      </button>
                      <button onClick={() => openDelete(p)} className="flex flex-col items-center justify-center py-2 bg-red-500/10 rounded-lg text-red-400 text-xs gap-1">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="p-4 border-t border-white/10 bg-navy-900 flex items-center justify-between">
              <p className="text-sm text-gray-400 hidden sm:block">
                Showing page <span className="font-medium text-white">{page}</span> of <span className="font-medium text-white">{totalPages}</span> ({totalCount} total)
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <ChevronLeft size={16} /> <span className="sm:hidden">Prev</span>
                </button>
                <div className="text-sm font-medium text-white sm:hidden">{page} / {totalPages}</div>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <span className="sm:hidden">Next</span> <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <ProductFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        product={selectedProduct}
        onSuccess={() => {
          fetchProducts();
          // Ideally re-fetch overall stats too, but list refresh is enough for UX
        }}
      />

      <UpdateQuantityModal 
        isOpen={isQtyOpen}
        onClose={() => setIsQtyOpen(false)}
        product={selectedProduct}
        onConfirm={handleQuantityConfirm}
        isUpdating={isProcessing}
      />

      <ProductImageModal 
        isOpen={isImageOpen}
        onClose={() => setIsImageOpen(false)}
        product={selectedProduct}
        onUpdate={() => fetchProducts()}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        product={selectedProduct}
        onConfirm={handleDeleteConfirm}
        isDeleting={isProcessing}
      />
    </div>
  );
};

export default AdminProductsPage;
