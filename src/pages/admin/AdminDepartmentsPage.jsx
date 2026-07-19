import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, AlertTriangle, Box, Loader2, Info } from 'lucide-react';
import { getDepartments } from '../../api/productService';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Dashboard totals (mocked for now, or we can fetch dashboard stats)
  const [totals, setTotals] = useState({ products: 0, quantity: 0 });

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-magenta" size={40} />
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
          <h1 className="text-3xl font-bold text-white mb-2">Inventory by Department</h1>
          <p className="text-gray-400">View and manage stock specific to each department.</p>
        </div>
        
        {/* Development Totals Verifier */}
        <div className="flex items-center gap-4 bg-navy-800 border border-white/5 p-3 rounded-xl">
          <div className="text-sm">
            <span className="text-gray-400">Total Unique: </span>
            <span className="text-white font-bold">{totals.products}</span>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="text-sm">
            <span className="text-gray-400">Total Items: </span>
            <span className="text-white font-bold">{totals.quantity.toLocaleString()}</span>
          </div>
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
              className="bg-navy-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col h-full"
            >
              <div className="p-6 flex-grow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-magenta/20 to-orange/20 flex items-center justify-center text-magenta">
                    <Package size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{dept.name}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Products</div>
                    <div className="text-2xl font-bold text-white">{dept.totalProducts}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Qty</div>
                    <div className="text-2xl font-bold text-magenta">{dept.totalQuantity.toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">In Stock</span>
                    <span className="text-green-400 font-medium">{dept.inStock}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Low Stock</span>
                    <span className="text-orange-400 font-medium">{dept.lowStock}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Out of Stock</span>
                    <span className="text-red-400 font-medium">{dept.outOfStock}</span>
                  </div>
                </div>
                
                <div className="h-px bg-white/10 w-full my-4"></div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Active / Inactive</span>
                  <span className="text-gray-300">{dept.activeProducts} / {dept.inactiveProducts}</span>
                </div>
              </div>
              
              <div className="p-4 bg-white/5 mt-auto">
                <Link 
                  to={`/admin/inventory-departments/${dept.slug}`}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  View Products
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {departments.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white/5 rounded-2xl border border-white/10">
            <Box size={48} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Departments Found</h3>
            <p className="text-gray-400 mb-6">Import inventory or create products to see departments here.</p>
            <Link to="/admin/import" className="px-6 py-2 bg-gradient-to-r from-magenta to-orange text-white rounded-lg">
              Import Inventory
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDepartmentsPage;
