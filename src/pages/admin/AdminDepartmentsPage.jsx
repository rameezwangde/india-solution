import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, AlertTriangle, Box, Loader2, Info, Trash2, Eye, EyeOff } from 'lucide-react';
import { getDepartments, clearDepartmentInventory, toggleDepartmentVisibility } from '../../api/productService';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import ExportModal from '../../components/admin/products/ExportModal';
import { generateExport } from '../../api/exportService';

const AdminDepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Dashboard totals (mocked for now, or we can fetch dashboard stats)
  const [totals, setTotals] = useState({ products: 0, quantity: 0 });
  const { success: showSuccess, error: showError } = useToast();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toggling, setToggling] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        if (data.success) {
          setDepartments(data.departments);
          
          // Calculate totals to verify against dashboard later
          const totalProds = data.departments.reduce((acc, d) => acc + d.totalProducts, 0);
          const totalQty = data.departments.reduce((acc, d) => acc + d.totalQuantity, 0);
          setTotals({ products: totalProds, quantity: totalQty });
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch departments');
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const handleDeleteDepartment = async () => {
    if (!departmentToDelete) return;
    setIsDeleting(true);
    try {
      await clearDepartmentInventory(departmentToDelete);
      const data = await getDepartments();
      if (data.success) {
        setDepartments(data.departments);
        const totalProds = data.departments.reduce((acc, d) => acc + d.totalProducts, 0);
        const totalQty = data.departments.reduce((acc, d) => acc + d.totalQuantity, 0);
        setTotals({ products: totalProds, quantity: totalQty });
      }
      showSuccess(`Inventory for ${departmentToDelete} has been deleted successfully.`);
      setDeleteModalOpen(false);
      setDepartmentToDelete(null);
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to clear department');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleVisibility = async (departmentName, currentIsHidden) => {
    setToggling(departmentName);
    try {
      const res = await toggleDepartmentVisibility(departmentName, !currentIsHidden);
      if (res.success) {
        setDepartments(prev => 
          prev.map(dept => 
            dept.name === departmentName 
              ? { ...dept, isHidden: !currentIsHidden } 
              : dept
          )
        );
        showSuccess(res.message);
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to toggle visibility');
    } finally {
      setToggling(null);
    }
  };

  const handleExport = async (format, scope) => {
    try {
      const res = await generateExport(format, scope, {}, []);
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
      showSuccess('Export generated successfully');
    } catch (err) {
      showError('Failed to generate export');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#9A424E]" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl flex items-center gap-3">
        <AlertTriangle size={24} />
        <div>
          <h3 className="font-bold">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#4A2F1D] mb-2">Inventory by Department</h1>
          <p className="text-[#A67C65]">View and manage stock specific to each department.</p>
        </div>
        
        {/* Development Totals Verifier */}
        <div className="flex items-center gap-4 bg-white shadow-sm border border-[#E8DFD5] p-3 rounded-xl">
          <div className="text-sm">
            <span className="text-[#A67C65] font-semibold uppercase tracking-wider text-[11px]">Total Unique: </span>
            <span className="text-[#4A2F1D] font-bold text-lg">{totals.products}</span>
          </div>
          <div className="w-px h-8 bg-[#E8DFD5]"></div>
          <div className="text-sm">
            <span className="text-[#A67C65] font-semibold uppercase tracking-wider text-[11px]">Total Items: </span>
            <span className="text-[#4A2F1D] font-bold text-lg">{totals.quantity.toLocaleString()}</span>
          </div>
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="bg-[#FAF7F2] border border-[#E8DFD5] hover:border-[#9A424E]/50 hover:bg-white text-[#4A2F1D] hover:text-[#9A424E] px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ml-2 text-sm shadow-sm"
          >
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {departments.map((dept, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={dept.slug}
              className="bg-white border border-[#E8DFD5] rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col h-full"
            >
              <div className="p-6 flex-grow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-magenta/20 to-orange/20 flex items-center justify-center text-[#9A424E]">
                    <Package size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-[#4A2F1D] flex-grow">{dept.name}</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleToggleVisibility(dept.name, dept.isHidden)}
                      disabled={toggling === dept.name}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        dept.isHidden 
                          ? 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20' 
                          : 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                      }`}
                      title={dept.isHidden ? "Currently hidden. Click to show." : "Currently visible. Click to hide."}
                    >
                      {toggling === dept.name ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : dept.isHidden ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                    <button 
                      onClick={() => { setDepartmentToDelete(dept.name); setDeleteModalOpen(true); }}
                      className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                      title="Clear Department Inventory"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#FAF7F2] rounded-xl p-4">
                    <div className="text-[#A67C65] text-xs uppercase tracking-wider mb-1">Products</div>
                    <div className="text-2xl font-bold text-[#4A2F1D]">{dept.totalProducts}</div>
                  </div>
                  <div className="bg-[#FAF7F2] rounded-xl p-4">
                    <div className="text-[#A67C65] text-xs uppercase tracking-wider mb-1">Total Qty</div>
                    <div className="text-2xl font-bold text-[#9A424E]">{dept.totalQuantity.toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#A67C65]">In Stock</span>
                    <span className="text-green-400 font-medium">{dept.inStock}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#A67C65]">Low Stock</span>
                    <span className="text-[#C0602F]-400 font-medium">{dept.lowStock}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#A67C65]">Out of Stock</span>
                    <span className="text-red-400 font-medium">{dept.outOfStock}</span>
                  </div>
                </div>
                
                <div className="h-px bg-[#E8DFD5] w-full my-4"></div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#A67C65]">Active / Inactive</span>
                  <span className="text-[#7C5A48]">{dept.activeProducts} / {dept.inactiveProducts}</span>
                </div>
              </div>
              
              <div className="p-4 bg-[#FAF7F2] mt-auto">
                <Link 
                  to={`/admin/inventory-departments/${dept.slug}`}
                  className="w-full py-2.5 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#4A2F1D] font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  View Products
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {departments.length === 0 && (
          <div className="col-span-full py-12 text-center bg-[#FAF7F2] rounded-2xl border border-[#E8DFD5]">
            <Box size={48} className="mx-auto text-[#A67C65] mb-4" />
            <h3 className="text-xl font-bold text-[#4A2F1D] mb-2">No Departments Found</h3>
            <p className="text-[#A67C65] mb-6">Import inventory or create products to see departments here.</p>
            <Link to="/admin/import" className="px-6 py-2 bg-gradient-to-r from-magenta to-orange text-[#4A2F1D] rounded-lg">
              Import Inventory
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !isDeleting && setDeleteModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#1e293b] border border-[#E8DFD5] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-red-400">
                  <div className="p-3 bg-red-500/10 rounded-full">
                    <AlertTriangle size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#4A2F1D]">Clear {departmentToDelete}?</h3>
                </div>
                
                <p className="text-[#7C5A48] mb-2">
                  Are you sure you want to delete <span className="font-bold text-[#4A2F1D]">ALL inventory</span> in the <span className="text-[#9A424E] font-semibold">{departmentToDelete}</span> department?
                </p>
                <p className="text-[#A67C65] text-sm mb-6">
                  This action cannot be undone. All products belonging to this department will be permanently removed from the database.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setDeleteModalOpen(false)}
                    disabled={isDeleting}
                    className="px-5 py-2.5 rounded-xl text-[#7C5A48] hover:bg-[#FAF7F2] hover:text-[#4A2F1D] transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteDepartment}
                    disabled={isDeleting}
                    className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-[#4A2F1D] transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <><Loader2 size={18} className="animate-spin" /> Deleting...</>
                    ) : (
                      <><Trash2 size={18} /> Clear Department</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        totalProducts={totals.products}
        hasSelection={false}
      />
    </div>
  );
};

export default AdminDepartmentsPage;
