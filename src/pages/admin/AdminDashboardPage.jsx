import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, Tags, AlertCircle, TrendingDown, Loader2, 
  MessageSquare, FileText, Upload, Clock, CheckCircle, XCircle 
} from 'lucide-react';
import { getDashboardData } from '../../api/dashboardService';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

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

const COLORS = ['#eab308', '#3b82f6', '#a855f7', '#22c55e', '#10b981', '#ef4444']; // Matching our standard status colors

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await getDashboardData();
        if (res.success) {
          setData(res);
        } else {
          setError('Failed to load dashboard data');
        }
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

  if (error || !data) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center justify-between">
        <span>{error}</span>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 text-white transition-colors">Retry</button>
      </div>
    );
  }

  const { summary, inventoryByCategory, enquiryStatusDistribution, recentProducts, recentEnquiries, recentImports, lowStockProductsList } = data;

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back. Here is the latest status of your inventory and enquiries.</p>
      </div>

      {/* 8-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={summary.totalProducts} icon={Package} color="bg-blue-500/20 text-blue-500" />
        <StatCard title="Total Inventory" value={summary.totalInventoryQuantity} icon={TrendingDown} color="bg-green-500/20 text-green-500" />
        <StatCard title="Total Categories" value={summary.totalCategories} icon={Tags} color="bg-magenta/20 text-magenta" />
        <StatCard title="Out of Stock" value={summary.outOfStockProducts} icon={AlertCircle} color="bg-red-500/20 text-red-500" />
        
        <StatCard title="Total Enquiries" value={summary.totalEnquiries} icon={MessageSquare} color="bg-indigo-500/20 text-indigo-500" />
        <StatCard title="Pending Enquiries" value={summary.pendingEnquiries} icon={Clock} color="bg-yellow-500/20 text-yellow-500" />
        <StatCard title="Confirmed Enquiries" value={summary.confirmedEnquiries} icon={CheckCircle} color="bg-emerald-500/20 text-emerald-500" />
        <StatCard title="Completed Enquiries" value={summary.completedEnquiries} icon={FileText} color="bg-teal-500/20 text-teal-500" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Inventory by Category</h2>
          {inventoryByCategory.length > 0 ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryByCategory} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <XAxis type="number" stroke="#9ca3af" />
                  <YAxis dataKey="categoryName" type="category" width={100} stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e2d', borderColor: '#3f3f46', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="totalQuantity" fill="#f43f5e" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-gray-500">No category data available</div>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Enquiry Status Overview</h2>
          {enquiryStatusDistribution.some(s => s.count > 0) ? (
            <div className="h-72 flex flex-col justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={enquiryStatusDistribution}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="label"
                  >
                    {enquiryStatusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e2d', borderColor: '#3f3f46', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {enquiryStatusDistribution.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                    {entry.label} ({entry.count})
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-gray-500">No enquiry data available</div>
          )}
        </div>
      </div>

      {/* Tables Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Recent Enquiries</h2>
              <Link to="/admin/enquiries" className="text-sm text-magenta hover:text-magenta-400">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300 whitespace-nowrap">
                <thead className="bg-white/5 text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Reference</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Items</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recentEnquiries.length > 0 ? recentEnquiries.map(e => (
                    <tr 
                      key={e._id} 
                      onClick={() => navigate('/admin/enquiries')}
                      className="hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 font-medium text-white">{e.referenceNumber}</td>
                      <td className="px-6 py-4">
                        <div>{e.customerName}</div>
                        <div className="text-xs text-gray-500">{e.phone}</div>
                      </td>
                      <td className="px-6 py-4">{e.totalItems}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-md text-[10px] uppercase font-bold border border-white/10 bg-white/5">
                          {e.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{new Date(e.createdAt).toLocaleDateString()}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No recent enquiries.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Recent Imports</h2>
              <Link to="/admin/import-inventory" className="text-sm text-magenta hover:text-magenta-400">Import</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300 whitespace-nowrap">
                <thead className="bg-white/5 text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">File Name</th>
                    <th className="px-6 py-4 font-medium">Created</th>
                    <th className="px-6 py-4 font-medium">Failed</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recentImports.length > 0 ? recentImports.map(i => (
                    <tr key={i._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white truncate max-w-[150px]">{i.fileName}</td>
                      <td className="px-6 py-4 text-green-400">{i.createdCount}</td>
                      <td className="px-6 py-4 text-red-400">{i.failedCount}</td>
                      <td className="px-6 py-4 text-xs">{new Date(i.createdAt).toLocaleDateString()}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No recent imports.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Low Stock Alerts</h2>
              <Link to="/admin/products" className="text-sm text-magenta hover:text-magenta-400">View All</Link>
            </div>
            <div className="p-6 space-y-4">
              {lowStockProductsList && lowStockProductsList.length > 0 ? lowStockProductsList.map(p => (
                <div key={p._id} className="flex items-center justify-between p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                  <div>
                    <h4 className="text-white font-medium">{p.name}</h4>
                    <p className="text-xs text-orange-400 mt-1">{p.category} • {p.quantity} left in stock</p>
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
              <Link to="/admin/products" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-medium transition-colors flex items-center gap-3">
                <Package size={18} /> Manage Products
              </Link>
              <Link to="/admin/categories" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-medium transition-colors flex items-center gap-3">
                <Tags size={18} /> Manage Categories
              </Link>
              <Link to="/admin/enquiries" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-medium transition-colors flex items-center gap-3">
                <MessageSquare size={18} /> View Enquiries
              </Link>
              <Link to="/admin/import-inventory" className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-medium transition-colors flex items-center gap-3">
                <Upload size={18} /> Import Inventory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
