import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, Search, Filter, RefreshCw, Edit, Trash2, 
  Tags, CheckCircle, AlertTriangle, XCircle,
  ToggleLeft, ToggleRight, Box
} from 'lucide-react';
import { getAdminCategories, deleteCategory, updateCategory } from '../../api/categoryService';
import { useToast } from '../../context/ToastContext';

import CategoryFormModal from '../../components/admin/categories/CategoryFormModal';
import CategoryDeleteModal from '../../components/admin/categories/CategoryDeleteModal';

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

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, withProducts: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filters, setFilters] = useState({
    active: '',
    sort: 'name'
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { success, error: showError } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Separate function just to load overall stats without any filters
  const fetchStats = async () => {
    try {
      const allRes = await getAdminCategories(); // no filters
      let activeCount = 0, inactiveCount = 0, withProds = 0;
      allRes.forEach(c => {
        if (c.isActive) activeCount++;
        else inactiveCount++;
        if (c.productCount > 0) withProds++;
      });
      setStats({
        total: allRes.length,
        active: activeCount,
        inactive: inactiveCount,
        withProducts: withProds
      });
    } catch (err) {
      console.error("Failed to load full stats", err);
    }
  };

  const fetchCategories = useCallback(async (refreshStats = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        search: debouncedSearch,
        active: filters.active,
        sort: filters.sort
      };

      const res = await getAdminCategories(params);
      setCategories(res);

      if (refreshStats) {
        fetchStats();
      }
    } catch (err) {
      console.error(err);
      setError('Unable to load categories');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters]);

  // Initial load
  useEffect(() => {
    fetchCategories(true);
  }, [fetchCategories]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSearch('');
    setFilters({ active: '', sort: 'name' });
  };

  const openForm = (category = null) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const openDelete = (category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const handleToggleActive = async (category) => {
    if (category.productCount > 0 && category.isActive) {
      if (!window.confirm(`Deactivating this category will hide it from the public website, but the ${category.productCount} linked products are not deleted. Continue?`)) {
        return;
      }
    }

    try {
      setIsProcessing(true);
      await updateCategory(category._id, { isActive: !category.isActive });
      success(`Category ${!category.isActive ? 'activated' : 'deactivated'} successfully`);
      fetchCategories(true);
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsProcessing(true);
      await deleteCategory(selectedCategory._id);
      success('Category deleted successfully');
      setIsDeleteOpen(false);
      fetchCategories(true);
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to delete category');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-gray-400">Organize inventory into clear product groups.</p>
        </div>
        <button 
          onClick={() => openForm()}
          className="bg-gradient-to-r from-magenta to-orange hover:from-magenta-600 hover:to-orange-600 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg shadow-magenta/20"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Categories" value={stats.total} icon={Tags} color="bg-blue-500/20 text-blue-500" />
        <StatCard title="Active" value={stats.active} icon={CheckCircle} color="bg-green-500/20 text-green-500" />
        <StatCard title="Inactive" value={stats.inactive} icon={XCircle} color="bg-red-500/20 text-red-500" />
        <StatCard title="With Products" value={stats.withProducts} icon={Box} color="bg-orange-500/20 text-orange-500" />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col xl:flex-row gap-4 xl:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy-900 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-magenta"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={filters.active} 
            onChange={(e) => handleFilterChange('active', e.target.value)}
            className="bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-magenta"
          >
            <option value="">All Statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <select 
            value={filters.sort} 
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-magenta"
          >
            <option value="name">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
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

      {error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 flex flex-col items-center text-center">
          <AlertTriangle size={48} className="text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Unable to load categories</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button onClick={() => fetchCategories(true)} className="bg-white/5 hover:bg-white/10 px-6 py-2 rounded-lg text-white transition-colors">
            Retry
          </button>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-navy-900 text-gray-400 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium">Category Name</th>
                  <th className="px-6 py-4 font-medium">Slug</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium text-center">Products</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4"><div className="h-6 w-32 bg-white/5 rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-24 bg-white/5 rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-48 bg-white/5 rounded"></div></td>
                      <td className="px-6 py-4 text-center"><div className="h-6 w-8 bg-white/5 rounded-full mx-auto"></div></td>
                      <td className="px-6 py-4"><div className="h-6 w-16 bg-white/5 rounded-full"></div></td>
                      <td className="px-6 py-4"><div className="h-8 w-24 bg-white/5 rounded ml-auto"></div></td>
                    </tr>
                  ))
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Tags size={48} className="text-gray-600 mb-4" />
                        <h4 className="text-lg font-medium text-white mb-2">No categories found</h4>
                        <p className="text-gray-400 mb-4">Try adjusting your search or add a new one.</p>
                        <button onClick={resetFilters} className="text-magenta hover:text-magenta-400 font-medium">Clear Filters</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  categories.map(c => (
                    <tr key={c._id} className={`hover:bg-white/5 transition-colors group ${!c.isActive ? 'opacity-70' : ''}`}>
                      <td className="px-6 py-4">
                        <p className="font-bold text-white text-base">{c.name}</p>
                        <span className="text-xs text-gray-500">Created: {new Date(c.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-gray-400 bg-black/20 px-2 py-1 rounded text-xs">{c.slug}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-400 max-w-xs truncate">{c.description || '-'}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${c.productCount > 0 ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-gray-500/10 border-gray-500/20 text-gray-400'}`}>
                          {c.productCount} {c.productCount === 1 ? 'Product' : 'Products'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center w-fit gap-1 ${
                          c.isActive ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                          {c.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                          {c.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleToggleActive(c)} disabled={isProcessing} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors" title={c.isActive ? 'Deactivate' : 'Activate'}>
                            {c.isActive ? <ToggleRight size={18} className="text-green-400" /> : <ToggleLeft size={18} className="text-red-400" />}
                          </button>
                          <button onClick={() => openForm(c)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-blue-400 transition-colors" title="Edit Category">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => openDelete(c)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors" title="Delete Category">
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

          <div className="md:hidden flex flex-col divide-y divide-white/10">
             {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 animate-pulse space-y-3">
                    <div className="h-5 bg-white/5 rounded w-1/2"></div>
                    <div className="h-4 bg-white/5 rounded w-3/4"></div>
                    <div className="h-8 bg-white/5 rounded w-full"></div>
                  </div>
                ))
              ) : categories.length === 0 ? (
                <div className="p-8 text-center text-gray-400">No categories found.</div>
              ) : (
                categories.map(c => (
                  <div key={c._id} className={`p-4 flex flex-col gap-3 ${!c.isActive ? 'opacity-70 bg-black/10' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white text-lg">{c.name}</h4>
                        <span className="font-mono text-gray-500 text-xs mt-1 block">{c.slug}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                        c.isActive ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}>
                        {c.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </div>
                    
                    {c.description && <p className="text-sm text-gray-400 line-clamp-2">{c.description}</p>}

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-orange-400 font-medium">
                        {c.productCount} {c.productCount === 1 ? 'Product' : 'Products'} linked
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
                      <button onClick={() => handleToggleActive(c)} disabled={isProcessing} className="flex flex-col items-center justify-center py-2.5 bg-white/5 rounded-lg text-gray-300 hover:text-white text-xs gap-1">
                        {c.isActive ? <ToggleRight size={16} className="text-green-400" /> : <ToggleLeft size={16} className="text-red-400" />} 
                        {c.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={() => openForm(c)} className="flex flex-col items-center justify-center py-2.5 bg-white/5 rounded-lg text-blue-400 text-xs gap-1">
                        <Edit size={16} /> Edit
                      </button>
                      <button onClick={() => openDelete(c)} className="flex flex-col items-center justify-center py-2.5 bg-red-500/10 rounded-lg text-red-400 text-xs gap-1">
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
      )}

      <CategoryFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        category={selectedCategory}
        onSuccess={() => fetchCategories(true)}
      />

      <CategoryDeleteModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        category={selectedCategory}
        onConfirm={handleDeleteConfirm}
        isDeleting={isProcessing}
      />
    </div>
  );
};

export default AdminCategoriesPage;
