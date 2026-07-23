import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, RefreshCw, Edit, Trash2, 
  Image as ImageIcon, Package, CheckCircle, AlertTriangle, XCircle,
  ChevronLeft, ChevronRight, Hash, DollarSign
} from 'lucide-react';
import { getProducts, deleteProduct, updateProduct, getDepartments } from '../../api/productService';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';

import ProductFormModal from '../../components/admin/products/ProductFormModal';
import UpdateQuantityModal from '../../components/admin/products/UpdateQuantityModal';
import ProductImageModal from '../../components/admin/products/ProductImageModal';
import DeleteConfirmModal from '../../components/admin/products/DeleteConfirmModal';
import BulkActionToolbar from '../../components/admin/products/BulkActionToolbar';
import BulkActionModal from '../../components/admin/products/BulkActionModal';
import ExportModal from '../../components/admin/products/ExportModal';

import { 
  bulkUpdateDepartment, bulkUpdateCategory, bulkActivate, 
  bulkDeactivate, bulkDelete, bulkUpdateThresholds 
} from '../../api/bulkProductService';
import { generateExport } from '../../api/exportService';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-5 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon size={20} className="text-[#4A2F1D]" />
    </div>
    <div>
      <p className="text-[#A67C65] text-xs font-medium mb-1">{title}</p>
      <h3 className="text-xl font-bold text-[#4A2F1D]">{value}</h3>
    </div>
  </div>
);

const AdminProductsPage = () => {
  const { departmentSlug } = useParams();

  // Data States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [stats, setStats] = useState({ total: 0, available: 0, outOfStock: 0, lowStock: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 50;

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    department: '',
    status: '',
    sort: '-createdAt'
  });

  const [lockedDepartment, setLockedDepartment] = useState(null);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isQtyOpen, setIsQtyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Bulk & Export States
  const [selectedProductIds, setSelectedProductIds] = useState(new Set());
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [bulkModal, setBulkModal] = useState({ isOpen: false, mode: null });

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
        const [catRes, prodRes, deptRes] = await Promise.all([
          api.get('/categories'),
          getProducts({ limit: 1000 }), // fetching a larger set to calculate stats
          getDepartments()
        ]);
        setCategories(catRes.data.categories || []);
        
        let depts = deptRes.departments || [];
        setDepartmentsList(depts);
        
        // Handle URL slug locking
        if (departmentSlug) {
          const matchedDept = depts.find(d => d.slug === departmentSlug);
          if (matchedDept) {
            setLockedDepartment(matchedDept.name);
            setFilters(prev => ({ ...prev, department: matchedDept.name }));
          }
        }
        
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

  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch paginated products
  const fetchProducts = useCallback(async (isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);
      
      setError(null);
      
      const params = {
        page,
        limit,
        search: debouncedSearch,
        category: filters.category,
        department: lockedDepartment || filters.department,
        status: filters.status,
        sort: filters.sort
      };

      const res = await getProducts(params);
      
      if (isLoadMore && page > 1) {
        setProducts(prev => {
          // Prevent duplicates by checking ids
          const newProducts = res.products.filter(p => !prev.find(existing => existing.id === p.id));
          return [...prev, ...newProducts];
        });
      } else {
        setProducts(res.products);
      }
      
      if (res.pagination) {
        setTotalPages(res.pagination.totalPages || res.pagination.pages);
        setTotalCount(res.pagination.totalProducts || res.pagination.total);
        if (page > (res.pagination.totalPages || res.pagination.pages) && (res.pagination.totalPages || res.pagination.pages) > 0) {
          setPage(res.pagination.totalPages || res.pagination.pages);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Unable to load products');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [page, debouncedSearch, filters]);

  useEffect(() => {
    fetchProducts(page > 1);
  }, [fetchProducts, page]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setProducts([]);
    setPage(1);
  };

  const resetFilters = () => {
    setSearch('');
    setFilters({ category: '', status: '', sort: '-createdAt' });
    setProducts([]);
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
      
      // Local state removal
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
      setTotalCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to delete product');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuantityConfirm = async (newQuantity) => {
    try {
      setIsProcessing(true);
      const res = await updateProduct(selectedProduct.id, { quantity: newQuantity });
      success('Quantity updated successfully');
      setIsQtyOpen(false);
      
      // Local state update
      setProducts(prev => prev.map(p => {
        if (p.id === selectedProduct.id) {
          return { ...p, quantity: newQuantity, status: newQuantity > 0 ? 'available' : 'out_of_stock' };
        }
        return p;
      }));
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to update quantity');
    } finally {
      setIsProcessing(false);
    }
  };

  // --- BULK ACTION HANDLERS ---
  const toggleSelectAll = () => {
    if (selectedProductIds.size === products.length && products.length > 0) {
      setSelectedProductIds(new Set());
    } else {
      setSelectedProductIds(new Set(products.map(p => p.id)));
    }
  };

  const toggleSelectProduct = (id) => {
    const newSet = new Set(selectedProductIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedProductIds(newSet);
  };

  const handleBulkConfirm = async (mode, data) => {
    const ids = Array.from(selectedProductIds);
    try {
      if (mode === 'department') await bulkUpdateDepartment(ids, data.newDepartment);
      if (mode === 'category') await bulkUpdateCategory(ids, data.newCategoryId);
      if (mode === 'activate') await bulkActivate(ids);
      if (mode === 'deactivate') await bulkDeactivate(ids);
      if (mode === 'delete') await bulkDelete(ids);
      if (mode === 'thresholds') await bulkUpdateThresholds(ids, data.lowStockThreshold, data.criticalStockThreshold);

      success(`Bulk ${mode} completed successfully.`);
      setSelectedProductIds(new Set());
      fetchProducts(); // Refresh list
    } catch (err) {
      showError(err.response?.data?.message || `Failed to perform bulk ${mode}`);
    }
  };

  const handleExport = async (format, scope) => {
    try {
      const ids = Array.from(selectedProductIds);
      const res = await generateExport(format, scope, filters, ids);
      
      // Download file
      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const contentDisposition = res.headers['content-disposition'];
      let filename = `export.${format}`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch && filenameMatch.length === 2) filename = filenameMatch[1];
      }
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      success('Export generated successfully');
    } catch (err) {
      showError('Failed to generate export');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#4A2F1D] mb-2">Products</h1>
          <p className="text-[#A67C65]">Manage inventory products, quantities, pricing and images.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="bg-white border border-[#E8DFD5] hover:bg-[#FAF7F2] text-[#4A2F1D] px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all"
          >
            Export
          </button>
          <button 
            onClick={() => openForm()}
            className="bg-gradient-to-r from-magenta to-orange hover:from-magenta-600 hover:to-orange-600 text-[#4A2F1D] px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow-md shadow-magenta/20"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={stats.total} icon={Package} color="bg-blue-500/20 text-blue-500" />
        <StatCard title="Available" value={stats.available} icon={CheckCircle} color="bg-green-500/20 text-green-500" />
        <StatCard title="Low Stock" value={stats.lowStock} icon={AlertTriangle} color="bg-orange-500/20 text-[#C0602F]-500" />
        <StatCard title="Out of Stock" value={stats.outOfStock} icon={XCircle} color="bg-red-500/20 text-red-500" />
      </div>

      {/* Toolbar */}
      <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-4 flex flex-col xl:flex-row gap-4 xl:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A67C65]" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#E8DFD5] rounded-lg pl-10 pr-4 py-2.5 text-[#4A2F1D] focus:outline-none focus:border-magenta"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {!lockedDepartment && (
            <div className="flex items-center gap-2 bg-white border border-[#E8DFD5] rounded-lg px-3 py-1">
              <Package size={16} className="text-[#A67C65]" />
              <select 
                value={filters.department} 
                onChange={(e) => handleFilterChange('department', e.target.value)}
                className="bg-transparent text-sm text-[#4A2F1D] py-1.5 focus:outline-none w-36 truncate"
              >
                <option value="">All Departments</option>
                {departmentsList.map(d => (
                  <option key={d.slug} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-2 bg-white border border-[#E8DFD5] rounded-lg px-3 py-1">
            <Filter size={16} className="text-[#A67C65]" />
            <select 
              value={filters.category} 
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="bg-transparent text-sm text-[#4A2F1D] py-1.5 focus:outline-none w-32"
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
            className="bg-white border border-[#E8DFD5] rounded-lg px-3 py-2.5 text-sm text-[#4A2F1D] focus:outline-none focus:border-magenta"
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="hidden">Hidden</option>
          </select>

          <select 
            value={filters.sort} 
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="bg-white border border-[#E8DFD5] rounded-lg px-3 py-2.5 text-sm text-[#4A2F1D] focus:outline-none focus:border-magenta"
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
            className="p-2.5 bg-[#FAF7F2] hover:bg-[#E8DFD5] border border-[#E8DFD5] rounded-lg text-[#A67C65] hover:text-[#4A2F1D] transition-colors"
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
          <h3 className="text-xl font-bold text-[#4A2F1D] mb-2">Unable to load products</h3>
          <p className="text-[#A67C65] mb-6">{error}</p>
          <button onClick={() => fetchProducts()} className="bg-[#FAF7F2] hover:bg-[#E8DFD5] px-6 py-2 rounded-lg text-[#4A2F1D] transition-colors">
            Retry
          </button>
        </div>
      ) : (
        <div 
          className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl flex flex-col max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar relative"
          onScroll={(e) => {
            const { scrollTop, scrollHeight, clientHeight } = e.target;
            // Fetch more when scrolled near the bottom (within 100px)
            if (scrollHeight - scrollTop <= clientHeight + 100) {
              if (!loadingMore && !loading && page < totalPages) {
                setPage(prev => prev + 1);
              }
            }
          }}
        >
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8DFD5] bg-[#FAF7F2] text-[#A67C65] text-sm">
                <th className="p-4 w-12">
                  <input 
                    type="checkbox" 
                    checked={products.length > 0 && selectedProductIds.size === products.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded bg-gray-900 border-[#E8DFD5] text-[#9A424E] focus:ring-magenta focus:ring-offset-gray-900"
                  />
                </th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Code & Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Quantity</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading && products.length === 0 ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4"><div className="h-10 w-48 bg-[#FAF7F2] rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-24 bg-[#FAF7F2] rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-16 bg-[#FAF7F2] rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-12 bg-[#FAF7F2] rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-6 w-20 bg-[#FAF7F2] rounded-full"></div></td>
                      <td className="px-6 py-4"><div className="h-8 w-24 bg-[#FAF7F2] rounded ml-auto"></div></td>
                    </tr>
                  ))
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Package size={48} className="text-gray-600 mb-4" />
                        <h4 className="text-lg font-medium text-[#4A2F1D] mb-2">No products found</h4>
                        <p className="text-[#A67C65] mb-4">Try adjusting your search or filters.</p>
                        <button onClick={resetFilters} className="text-[#9A424E] hover:text-[#9A424E]-400 font-medium">Clear Filters</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p.id} className="border-b border-[#E8DFD5] hover:bg-[#FAF7F2] transition-colors group">
                    <td className="p-4 w-12">
                      <input 
                        type="checkbox" 
                        checked={selectedProductIds.has(p.id)}
                        onChange={() => toggleSelectProduct(p.id)}
                        className="w-4 h-4 rounded bg-gray-900 border-[#E8DFD5] text-[#9A424E] focus:ring-magenta focus:ring-offset-gray-900"
                      />
                    </td>
                    <td className="p-4">
                        <div className="flex items-center gap-4">
                          {p.image ? (
                            <img src={p.image} alt={p.name} onClick={() => openImage(p)} className="w-12 h-12 rounded-lg object-cover bg-white border border-[#E8DFD5] cursor-pointer hover:opacity-80 transition-opacity" title="Manage Image" />
                          ) : (
                            <div onClick={() => openImage(p)} className="w-12 h-12 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#A67C65] cursor-pointer hover:bg-[#E8DFD5] transition-colors" title="Manage Image">
                              <ImageIcon size={20} />
                            </div>
                          )}
                          <div>
                            <Link to={`/admin/products/${p.id}`} className="font-medium text-[#4A2F1D] hover:text-[#9A424E] transition-colors">
                              {p.name}
                            </Link>
                            {p.size && <p className="text-xs text-[#A67C65] mt-0.5">{p.size}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-[#7C5A48]">
                          <Hash size={14} className="text-[#A67C65]" />
                          <span>{p.code || 'N/A'}</span>
                        </div>
                        <p className="text-xs text-[#9A424E] mt-1">{p.category}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-[#4A2F1D]">
                        ₹{p.price?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className={`font-bold ${p.quantity === 0 ? 'text-red-400' : p.quantity <= 5 ? 'text-[#C0602F]-400' : 'text-[#4A2F1D]'}`}>
                            {p.quantity}
                          </span>
                          <button onClick={() => openQuantity(p)} className="p-1 rounded hover:bg-[#E8DFD5] text-[#A67C65] hover:text-[#4A2F1D] transition-colors" title="Quick Update">
                            <Edit size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          p.quantity === 0 ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
                          p.status === 'hidden' ? 'bg-gray-500/10 border-gray-500/20 text-[#A67C65]' : 
                          'bg-green-500/10 border-green-500/20 text-green-400'
                        }`}>
                          {p.quantity === 0 ? 'Out of Stock' : p.status === 'hidden' ? 'Hidden' : 'Available'}
                        </span>
                        {p.isFeatured && <span className="ml-2 text-xs text-[#C0602F]-400" title="Featured">★</span>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to={`/admin/products/${p.id}`} className="p-2 bg-[#FAF7F2] hover:bg-[#E8DFD5] rounded-lg text-[#9A424E] transition-colors" title="View Details">
                            <CheckCircle size={16} />
                          </Link>
                          <button onClick={() => openImage(p)} className="p-2 bg-[#FAF7F2] hover:bg-[#E8DFD5] rounded-lg text-[#7C5A48] transition-colors" title="Manage Image">
                            <ImageIcon size={16} />
                          </button>
                          <button onClick={() => openForm(p)} className="p-2 bg-[#FAF7F2] hover:bg-[#E8DFD5] rounded-lg text-blue-400 transition-colors" title="Edit Product">
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
             {loading && products.length === 0 ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 animate-pulse flex gap-4">
                    <div className="w-16 h-16 bg-[#FAF7F2] rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-[#FAF7F2] rounded w-3/4"></div>
                      <div className="h-3 bg-[#FAF7F2] rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : products.length === 0 ? (
                <div className="p-8 text-center text-[#A67C65]">No products found.</div>
              ) : (
                products.map(p => (
                  <div key={p.id} className="p-4 flex flex-col gap-3">
                    <div className="flex items-start gap-4">
                      {p.image ? (
                        <img src={p.image} alt={p.name} onClick={() => openImage(p)} className="w-16 h-16 rounded-lg object-cover bg-white border border-[#E8DFD5] cursor-pointer hover:opacity-80 transition-opacity" title="Manage Image" />
                      ) : (
                        <div onClick={() => openImage(p)} className="w-16 h-16 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#A67C65] cursor-pointer hover:bg-[#E8DFD5] transition-colors" title="Manage Image">
                          <ImageIcon size={24} />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-[#4A2F1D] text-sm line-clamp-1">{p.name}</h4>
                        <p className="text-xs text-[#9A424E] my-1">{p.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-md ${p.quantity === 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                            Qty: {p.quantity}
                          </span>
                          <span className="text-sm font-bold text-[#4A2F1D]">₹{p.price?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#E8DFD5]">
                      <button onClick={() => openQuantity(p)} className="flex flex-col items-center justify-center py-2 bg-[#FAF7F2] rounded-lg text-[#A67C65] hover:text-[#4A2F1D] text-xs gap-1">
                        <Hash size={14} /> Qty
                      </button>
                      <button onClick={() => openImage(p)} className="flex flex-col items-center justify-center py-2 bg-[#FAF7F2] rounded-lg text-[#A67C65] hover:text-[#4A2F1D] text-xs gap-1">
                        <ImageIcon size={14} /> Image
                      </button>
                      <button onClick={() => openForm(p)} className="flex flex-col items-center justify-center py-2 bg-[#FAF7F2] rounded-lg text-blue-400 text-xs gap-1">
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

          {/* Infinite Scroll Indicators */}
          {products.length > 0 && (
            <div className="p-6 flex justify-center items-center text-sm font-medium">
              {loadingMore ? (
                <div className="text-[#9A424E] flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-magenta border-t-transparent animate-spin"></div>
                  Loading more products...
                </div>
              ) : page >= totalPages ? (
                <div className="text-[#A67C65]">All inventory products loaded</div>
              ) : null}
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
      <BulkActionToolbar 
        selectedCount={selectedProductIds.size}
        onClearSelection={() => setSelectedProductIds(new Set())}
        onBulkDepartment={() => setBulkModal({ isOpen: true, mode: 'department' })}
        onBulkCategory={() => setBulkModal({ isOpen: true, mode: 'category' })}
        onBulkActivate={() => setBulkModal({ isOpen: true, mode: 'activate' })}
        onBulkDeactivate={() => setBulkModal({ isOpen: true, mode: 'deactivate' })}
        onBulkDelete={() => setBulkModal({ isOpen: true, mode: 'delete' })}
        onBulkThresholds={() => setBulkModal({ isOpen: true, mode: 'thresholds' })}
      />

      <BulkActionModal 
        isOpen={bulkModal.isOpen}
        mode={bulkModal.mode}
        selectedCount={selectedProductIds.size}
        departments={departmentsList}
        categories={categories}
        onClose={() => setBulkModal({ isOpen: false, mode: null })}
        onConfirm={handleBulkConfirm}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        totalProducts={stats.total}
        hasSelection={selectedProductIds.size > 0}
      />

    </div>
  );
};

export default AdminProductsPage;
