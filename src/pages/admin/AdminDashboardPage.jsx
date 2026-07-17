import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Tags, AlertCircle, TrendingDown, Loader2 } from 'lucide-react';
import { getProducts } from '../../api/productService';
import { getCategories } from '../../api/categoryService';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
    <div className={`p-4 rounded-xl ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
    </div>
  </div>
);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalInventory: 0,
    outOfStock: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [productsResponse, categories] = await Promise.all([
          getProducts({ limit: 100 }),
          getCategories()
        ]);
        
        let inventoryCount = 0;
        let outOfStockCount = 0;
        let lowStock = [];
        
        const products = productsResponse.products;

        products.forEach(p => {
          inventoryCount += (p.quantity || 0);
          if (p.quantity === 0 || p.status === 'out_of_stock') {
            outOfStockCount++;
          } else if (p.quantity > 0 && p.quantity <= 5) {
            lowStock.push(p);
          }
        });

        setStats({
          totalProducts: products.length,
          totalCategories: categories.length,
          totalInventory: inventoryCount,
          outOfStock: outOfStockCount
        });

        setRecentProducts(products.slice(0, 5));
        setLowStockProducts(lowStock);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-magenta w-10 h-10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center justify-between">
        <span>{error}</span>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 text-white transition-colors">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back. Here is the latest status of your inventory.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Products" value={stats.totalProducts} icon={Package} color="bg-blue-500/20 text-blue-500" />
        <StatCard title="Total Categories" value={stats.totalCategories} icon={Tags} color="bg-magenta/20 text-magenta" />
        <StatCard title="Total Inventory" value={stats.totalInventory} icon={TrendingDown} color="bg-green-500/20 text-green-500" />
        <StatCard title="Out of Stock" value={stats.outOfStock} icon={AlertCircle} color="bg-red-500/20 text-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Recent Products</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-white/5 text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Product</th>
                    <th className="px-6 py-4 font-medium">Code</th>
                    <th className="px-6 py-4 font-medium">Quantity</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recentProducts.length > 0 ? recentProducts.map(p => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-white/10" />
                        <span className="font-medium text-white">{p.name}</span>
                      </td>
                      <td className="px-6 py-4">{p.code}</td>
                      <td className="px-6 py-4">{p.quantity}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${p.quantity === 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                          {p.quantity === 0 ? 'Out of Stock' : 'Available'}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No products found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Low Stock Alerts</h2>
            </div>
            <div className="p-6 space-y-4">
              {lowStockProducts.length > 0 ? lowStockProducts.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                  <div>
                    <h4 className="text-white font-medium">{p.name}</h4>
                    <p className="text-xs text-orange-400 mt-1">Only {p.quantity} left in stock</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-6 text-gray-500">
                  No low stock items.
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Quick Actions</h2>
            </div>
            <div className="p-6 flex flex-col gap-3">
              <Link to="/admin/products" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-medium transition-colors">
                Add Product
              </Link>
              <Link to="/admin/categories" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-medium transition-colors">
                Manage Categories
              </Link>
              <Link to="/admin/enquiries" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-medium transition-colors">
                View Enquiries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
