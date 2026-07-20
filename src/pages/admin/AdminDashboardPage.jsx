import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, Tags, AlertCircle, TrendingDown, Loader2, 
  MessageSquare, FileText, Upload, Clock, CheckCircle, XCircle,
  Bell, Calendar, ChevronDown, ChevronRight, BarChart2, PieChart as PieChartIcon, Activity
} from 'lucide-react';
import { getDashboardData } from '../../api/dashboardService';
import { getRecentActivity } from '../../api/activityService';
import { getStockAlerts } from '../../api/stockAlertService';
import api from '../../api/api';
import { format } from 'date-fns';
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
        strokeWidth="2" 
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="0" cy="15" r="2.5" fill={color} />
      <circle cx="50" cy="10" r="2.5" fill={color} />
      <circle cx="100" cy="8" r="2.5" fill={color} />
    </svg>
  </div>
);

const StatCard = ({ title, value, icon: Icon, colorClass, iconColor, sparklineColor, linkTo }) => {
  const content = (
    <div className="bg-white border border-[#E8DFD5] rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md hover:border-[#C0602F]/50 transition-all h-full">
      <div className="flex items-start justify-between mb-2">
        <div className={`p-3 rounded-full border border-[#E8DFD5] bg-[#FAF7F2] ${iconColor} relative flex items-center justify-center`}>
          <div className={`absolute inset-0 rounded-full blur-md opacity-20 ${colorClass}`}></div>
          <Icon size={20} className="relative z-10" />
        </div>
        <div className="text-right">
          <p className="text-[#A67C65] text-[10px] mb-1 font-bold uppercase tracking-widest">{title}</p>
          <h3 className="text-[28px] font-bold text-[#4A2F1D] leading-none font-['Playfair_Display',serif]">{value}</h3>
        </div>
      </div>
      <Sparkline color={sparklineColor} />
    </div>
  );

  return linkTo ? <Link to={linkTo} className="block h-full">{content}</Link> : content;
};

const COLORS = ['#C0602F', '#9A424E', '#D5C5B9', '#8B5E45', '#C48B71', '#4A2F1D']; 

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const [stockAlerts, setStockAlerts] = useState([]);
  const [auditWarning, setAuditWarning] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [res, actRes] = await Promise.all([
          getDashboardData(),
          getRecentActivity(5).catch(() => ({ activities: [] }))
        ]);
        if (res.success) {
          setData(res);
          setActivities(actRes.activities || []);
          
          try {
            const alertsRes = await getStockAlerts({ limit: 5 });
            if (alertsRes) {
              setStockAlerts(alertsRes.products || []);
            }
          } catch (alertErr) {
            console.error("Failed to load stock alerts for dashboard", alertErr);
          }

          if (import.meta.env.MODE === 'development') {
            try {
              const auditRes = await api.get('/admin/data-audit');
              if (auditRes.data.status !== 'healthy') {
                setAuditWarning(`Data inconsistency detected: ${auditRes.data.summary.issuesFound} issues found.`);
              }
            } catch (auditErr) {
              console.error("Failed to run development data audit", auditErr);
            }
          }
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
        <Loader2 className="animate-spin text-[#9A424E] w-10 h-10" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center justify-between font-medium">
        <span>{error}</span>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-white rounded-lg hover:bg-gray-50 border border-gray-200 text-gray-700 transition-colors">Retry</button>
      </div>
    );
  }

  const { summary, inventoryByCategory, enquiryStatusDistribution } = data;

  return (
    <div className="space-y-6 pb-6 min-h-full flex flex-col justify-between relative z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-[28px] font-bold text-[#4A2F1D] mb-1 font-['Playfair_Display',serif]">
            Welcome back, <span className="text-[#9A424E]">India Solution</span> <span className="text-[#C0602F]">Admin</span>
          </h1>
          <p className="text-[#7C5A48] text-[13px] font-medium">Here's what's happening with your inventory today.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-white border border-[#E8DFD5] hover:border-[#C0602F]/50 px-4 py-2.5 rounded-xl text-[13px] text-[#4A2F1D] font-bold shadow-sm transition-colors">
            <Calendar size={16} className="text-[#A67C65]" />
            <span>{format(new Date(), 'dd MMMM yyyy')}</span>
            <ChevronDown size={16} className="text-[#A67C65]" />
          </button>
          
          <button className="p-2.5 bg-white border border-[#E8DFD5] hover:border-[#C0602F]/50 rounded-xl text-[#A67C65] hover:text-[#C0602F] relative shadow-sm transition-colors">
            <div className="absolute top-2 right-2.5 w-2 h-2 bg-[#9A424E] rounded-full border border-white"></div>
            <Bell size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {auditWarning && (
        <div className="bg-orange-50 border border-orange-200 text-[#C0602F]-600 p-4 rounded-xl flex items-center gap-3 font-semibold text-sm shadow-sm">
          <AlertCircle size={18} />
          {auditWarning} (Development Warning)
        </div>
      )}

      {/* 8-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Products" value={summary.totalProducts} icon={Package} colorClass="bg-[#9A424E]" iconColor="text-[#9A424E]" sparklineColor="#9A424E" />
        <StatCard title="Total Inventory" value={summary.totalInventoryQuantity} icon={Package} colorClass="bg-[#C0602F]" iconColor="text-[#C0602F]" sparklineColor="#C0602F" />
        <StatCard title="Total Categories" value={summary.totalCategories} icon={Tags} colorClass="bg-[#8B5E45]" iconColor="text-[#8B5E45]" sparklineColor="#8B5E45" />
        <StatCard title="Out of Stock / Low" value={summary.outOfStockProducts} icon={AlertCircle} colorClass="bg-red-500" iconColor="text-red-500" sparklineColor="#ef4444" linkTo="/admin/low-stock" />
        
        <StatCard title="Total Enquiries" value={summary.totalEnquiries} icon={MessageSquare} colorClass="bg-[#C48B71]" iconColor="text-[#C48B71]" sparklineColor="#C48B71" />
        <StatCard title="Pending Enquiries" value={summary.pendingEnquiries} icon={Clock} colorClass="bg-[#C0602F]" iconColor="text-[#C0602F]" sparklineColor="#C0602F" />
        <StatCard title="Confirmed Enquiries" value={summary.confirmedEnquiries} icon={CheckCircle} colorClass="bg-green-600" iconColor="text-green-600" sparklineColor="#16a34a" />
        <StatCard title="Completed Enquiries" value={summary.completedEnquiries} icon={FileText} colorClass="bg-blue-600" iconColor="text-blue-600" sparklineColor="#2563eb" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1">
        {/* Bar Chart */}
        <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-[#4A2F1D] flex items-center gap-2 tracking-wide uppercase">
              <BarChart2 className="w-5 h-5 text-[#9A424E]" strokeWidth={2.5} /> Inventory by Category
            </h2>
            <button className="text-[11px] font-bold text-[#A67C65] hover:text-[#C0602F] flex items-center gap-1 bg-[#FAF7F2] border border-[#E8DFD5] px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider">
              View Details <ChevronRight size={14} />
            </button>
          </div>
          
          {inventoryByCategory.length > 0 ? (
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryByCategory} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#9A424E" />
                      <stop offset="100%" stopColor="#C0602F" />
                    </linearGradient>
                  </defs>
                  <XAxis type="number" hide />
                  <YAxis dataKey="categoryName" type="category" width={90} axisLine={false} tickLine={false} tick={{fill: '#7C5A48', fontSize: 11, fontWeight: 500}} />
                  <Tooltip 
                    cursor={{fill: 'rgba(232, 223, 213, 0.3)'}}
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#E8DFD5', borderRadius: '12px', color: '#4A2F1D', fontSize: '13px', fontWeight: 'bold', boxShadow: '0 4px 20px rgba(74,47,29,0.08)' }}
                  />
                  <Bar dataKey="totalQuantity" fill="url(#colorGradient)" radius={[0, 6, 6, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="flex justify-between px-[90px] mt-2 text-[11px] font-medium text-[#A67C65]">
                <span>0</span>
                <span>3</span>
                <span>6</span>
                <span>9</span>
                <span>12</span>
              </div>
              <div className="text-center text-[11px] font-bold text-[#A67C65] mt-1 uppercase tracking-wider">Quantity</div>
            </div>
          ) : (
            <div className="flex-1 min-h-[250px] flex items-center justify-center text-[#A67C65] text-sm font-medium">No category data available</div>
          )}
        </div>

        {/* Donut Chart */}
        <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-[#4A2F1D] flex items-center gap-2 tracking-wide uppercase">
              <PieChartIcon className="w-5 h-5 text-[#9A424E]" strokeWidth={2.5} /> Enquiry Status Overview
            </h2>
            <button className="text-[11px] font-bold text-[#A67C65] hover:text-[#C0602F] flex items-center gap-1 bg-[#FAF7F2] border border-[#E8DFD5] px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider">
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
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="count"
                      nameKey="label"
                      stroke="none"
                    >
                      {enquiryStatusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderColor: '#E8DFD5', borderRadius: '12px', color: '#4A2F1D', fontSize: '13px', fontWeight: 'bold', boxShadow: '0 4px 20px rgba(74,47,29,0.08)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="w-14 h-14 rounded-full border border-[#E8DFD5] bg-[#FAF7F2] flex items-center justify-center shadow-inner">
                     <MessageSquare size={20} className="text-[#9A424E]" strokeWidth={2} />
                   </div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-5 mt-4 pt-4 border-t border-[#E8DFD5]/50">
                {enquiryStatusDistribution.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-[#7C5A48] uppercase tracking-wider">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                    {entry.label} ({entry.count})
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 min-h-[250px] flex items-center justify-center text-[#A67C65] text-sm font-medium">No enquiry data available</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Alerts Requiring Attention */}
        <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 shadow-sm flex flex-col h-[400px] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h2 className="text-sm font-bold text-[#4A2F1D] flex items-center gap-2 tracking-wide uppercase">
              <AlertCircle className="w-5 h-5 text-red-500" strokeWidth={2.5} /> Stock Alerts
            </h2>
            <Link to="/admin/low-stock" className="text-[11px] font-bold text-[#A67C65] hover:text-[#C0602F] uppercase tracking-wider transition-colors">
              View All
            </Link>
          </div>
          <div className="overflow-y-auto pr-2 space-y-4 styled-scrollbar flex-1">
            {stockAlerts.length === 0 ? (
              <div className="text-center text-[#A67C65] text-sm h-full flex items-center justify-center font-medium">
                All inventory levels are healthy
              </div>
            ) : (
              stockAlerts.map(alert => (
                <div key={alert._id} className="flex gap-4 items-center bg-[#FAF7F2] border border-[#E8DFD5] p-4 rounded-xl hover:bg-white hover:shadow-sm hover:border-[#C0602F]/30 transition-all group cursor-pointer">
                  <div className={`p-2.5 rounded-xl bg-white border border-[#E8DFD5] shadow-sm ${alert.stockStatus === 'OUT_OF_STOCK' ? 'text-red-500' : alert.stockStatus === 'CRITICAL_STOCK' ? 'text-[#C0602F]-500' : 'text-yellow-600'}`}>
                    {alert.stockStatus === 'OUT_OF_STOCK' ? <XCircle size={18} strokeWidth={2.5} /> : <TrendingDown size={18} strokeWidth={2.5} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#4A2F1D] text-sm font-bold truncate">{alert.name}</p>
                    <p className="text-[#A67C65] text-xs font-medium truncate mt-0.5">{alert.department}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[#4A2F1D] text-sm font-bold">{alert.quantity} {alert.quantityUnit}</p>
                    <p className={`text-[10px] uppercase font-bold tracking-wider mt-1 ${alert.stockStatus === 'OUT_OF_STOCK' ? 'text-red-500' : alert.stockStatus === 'CRITICAL_STOCK' ? 'text-[#C0602F]-500' : 'text-yellow-600'}`}>
                      {alert.stockStatus.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity Widget */}
        <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 shadow-sm flex flex-col h-[400px] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h2 className="text-sm font-bold text-[#4A2F1D] flex items-center gap-2 tracking-wide uppercase">
              <Activity className="w-5 h-5 text-[#9A424E]" strokeWidth={2.5} /> Recent Activity
            </h2>
            <Link to="/admin/inventory-activity" className="text-[11px] font-bold text-[#A67C65] hover:text-[#C0602F] flex items-center gap-1 bg-[#FAF7F2] border border-[#E8DFD5] px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          
          {activities.length > 0 ? (
            <div className="space-y-3 overflow-y-auto pr-2 styled-scrollbar flex-1">
              {activities.map(activity => (
                <div key={activity._id} className="flex items-center gap-4 p-3.5 bg-white border border-[#E8DFD5] hover:border-[#C0602F]/30 hover:shadow-sm rounded-xl transition-all">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#4A2F1D] truncate">{activity.productName}</p>
                    <p className="text-xs text-[#7C5A48] font-medium truncate mt-0.5">{activity.remarks}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[13px] font-bold">
                      {activity.quantityDifference !== 0 ? (
                        <span className={activity.quantityDifference > 0 ? "text-green-600" : "text-red-500"}>
                          {activity.quantityDifference > 0 ? '+' : ''}{activity.quantityDifference} qty
                        </span>
                      ) : (
                        <span className="text-[#A67C65]">-</span>
                      )}
                    </p>
                    <p className="text-[10px] font-semibold text-[#A67C65] mt-1 tracking-wide uppercase">{format(new Date(activity.performedAt), 'MMM dd, hh:mm a')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#A67C65] text-sm font-medium">No recent activity</div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-[11px] font-bold text-[#A67C65] pt-6 mt-auto uppercase tracking-wider">
        &copy; 2026 India Solution. All rights reserved.
      </div>
    </div>
  );
};

export default AdminDashboardPage;
