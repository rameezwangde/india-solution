import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, Tags, AlertCircle, TrendingDown, Loader2, 
  MessageSquare, FileText, Upload, Clock, CheckCircle, XCircle,
  Bell, Calendar, ChevronDown, ChevronRight, BarChart2, PieChart as PieChartIcon
} from 'lucide-react';
import { getDashboardData } from '../../api/dashboardService';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';

// SVG Sparkline component
const Sparkline = ({ color }) => (
  <div className="mt-4 flex-1 flex items-end h-8 w-full">
    <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible" preserveAspectRatio="none">
      <path 
        d="M0,15 C20,15 30,5 50,10 C70,15 80,5 100,8" 
        fill="none" 
        stroke={color} 
        strokeWidth="1.5" 
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="0" cy="15" r="2" fill={color} />
      <circle cx="50" cy="10" r="2" fill={color} />
      <circle cx="100" cy="8" r="2" fill={color} />
    </svg>
  </div>
);

const StatCard = ({ title, value, icon: Icon, colorClass, iconColor, sparklineColor }) => (
  <div className="bg-[#12121A] border border-white/5 rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-white/10 transition-colors">
    <div className="flex items-start justify-between mb-2">
      <div className={`p-3 rounded-full border border-white/5 bg-black/40 ${iconColor} relative flex items-center justify-center`}>
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full blur-md opacity-30 ${colorClass}`}></div>
        <Icon size={20} className="relative z-10" />
      </div>
      <div className="text-right">
        <p className="text-gray-400 text-[11px] mb-1 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-white leading-none">{value}</h3>
      </div>
    </div>
    <Sparkline color={sparklineColor} />
  </div>
);

const COLORS = ['#FF9800', '#3b82f6', '#E91E63', '#22c55e', '#10b981', '#ef4444']; 

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

  const { summary, inventoryByCategory, enquiryStatusDistribution } = data;

  return (
    <div className="space-y-6 pb-6 min-h-full flex flex-col justify-between relative z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta to-orange">India Solution</span> <span className="text-orange">Admin</span>
          </h1>
          <p className="text-gray-400 text-xs">Here's what's happening with your inventory today.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-[#12121A] border border-white/5 hover:border-white/10 px-4 py-2 rounded-lg text-sm text-gray-300 transition-colors">
            <Calendar size={16} />
            <span>18 July 2026</span>
            <ChevronDown size={16} />
          </button>
          
          <button className="p-2 bg-[#12121A] border border-white/5 hover:border-white/10 rounded-lg text-gray-300 relative transition-colors">
            <div className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <Bell size={20} />
          </button>
        </div>
      </div>

      {/* 8-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Products" value={summary.totalProducts} icon={Package} colorClass="bg-magenta" iconColor="text-magenta" sparklineColor="#E91E63" />
        <StatCard title="Total Inventory" value={summary.totalInventoryQuantity} icon={Package} colorClass="bg-orange" iconColor="text-orange" sparklineColor="#FF9800" />
        <StatCard title="Total Categories" value={summary.totalCategories} icon={Tags} colorClass="bg-purple-500" iconColor="text-purple-500" sparklineColor="#a855f7" />
        <StatCard title="Out of Stock" value={summary.outOfStockProducts} icon={AlertCircle} colorClass="bg-red-500" iconColor="text-red-500" sparklineColor="#ef4444" />
        
        <StatCard title="Total Enquiries" value={summary.totalEnquiries} icon={MessageSquare} colorClass="bg-blue-500" iconColor="text-blue-500" sparklineColor="#3b82f6" />
        <StatCard title="Pending Enquiries" value={summary.pendingEnquiries} icon={Clock} colorClass="bg-orange" iconColor="text-orange" sparklineColor="#FF9800" />
        <StatCard title="Confirmed Enquiries" value={summary.confirmedEnquiries} icon={CheckCircle} colorClass="bg-green-500" iconColor="text-green-500" sparklineColor="#22c55e" />
        <StatCard title="Completed Enquiries" value={summary.completedEnquiries} icon={FileText} colorClass="bg-teal-500" iconColor="text-teal-500" sparklineColor="#14b8a6" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1">
        {/* Bar Chart */}
        <div className="bg-[#12121A] border border-white/5 rounded-2xl p-6 shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-magenta" /> Inventory by Category
            </h2>
            <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition-colors">
              View Details <ChevronRight size={14} />
            </button>
          </div>
          
          {inventoryByCategory.length > 0 ? (
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryByCategory} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#E91E63" />
                      <stop offset="100%" stopColor="#FF9800" />
                    </linearGradient>
                  </defs>
                  <XAxis type="number" hide />
                  <YAxis dataKey="categoryName" type="category" width={90} axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.02)'}}
                    contentStyle={{ backgroundColor: '#1e1e2d', borderColor: '#3f3f46', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="totalQuantity" fill="url(#colorGradient)" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="flex justify-between px-[90px] mt-2 text-[10px] text-gray-500">
                <span>0</span>
                <span>3</span>
                <span>6</span>
                <span>9</span>
                <span>12</span>
              </div>
              <div className="text-center text-[10px] text-gray-500 mt-1">Quantity</div>
            </div>
          ) : (
            <div className="flex-1 min-h-[250px] flex items-center justify-center text-gray-500 text-sm">No category data available</div>
          )}
        </div>

        {/* Donut Chart */}
        <div className="bg-[#12121A] border border-white/5 rounded-2xl p-6 shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-magenta" /> Enquiry Status Overview
            </h2>
            <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition-colors">
              View Details <ChevronRight size={14} />
            </button>
          </div>
          
          {enquiryStatusDistribution.some(s => s.count > 0) ? (
            <div className="flex-1 min-h-[250px] flex flex-col justify-between">
              <div className="flex-1 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={enquiryStatusDistribution}
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={0}
                      dataKey="count"
                      nameKey="label"
                      stroke="transparent"
                    >
                      {enquiryStatusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e1e2d', borderColor: '#3f3f46', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="w-12 h-12 rounded-full border border-white/5 bg-black/40 flex items-center justify-center">
                     <MessageSquare size={16} className="text-white opacity-70" />
                   </div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-5 mt-4 border-t border-white/5 pt-4">
                {enquiryStatusDistribution.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                    {entry.label} ({entry.count})
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 min-h-[250px] flex items-center justify-center text-gray-500 text-sm">No enquiry data available</div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-[10px] text-gray-500 pt-4 mt-auto">
        &copy; 2026 India Solution. All rights reserved.
      </div>
    </div>
  );
};

export default AdminDashboardPage;
