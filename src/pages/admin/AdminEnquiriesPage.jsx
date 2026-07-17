import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Filter, RefreshCw, Eye, Trash2, 
  Inbox, CheckCircle, XCircle, Clock, CheckSquare,
  AlertTriangle, ClipboardList, Loader2
} from 'lucide-react';
import { getEnquiries, deleteEnquiry } from '../../api/enquiryService';
import { useToast } from '../../context/ToastContext';

import EnquiryDetailsDrawer from '../../components/admin/enquiries/EnquiryDetailsDrawer';

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

const StatusBadge = ({ status }) => {
  const styles = {
    'Pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'Contacted': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Quotation Sent': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Confirmed': 'bg-green-500/10 text-green-400 border-green-500/20',
    'Completed': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Cancelled': 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border ${styles[status] || styles['Pending']}`}>
      {status}
    </span>
  );
};

const AdminEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    sort: 'newest'
  });

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProcessingId, setIsProcessingId] = useState(null);

  const { success, error: showError } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Load stats specifically (unfiltered)
  const fetchStats = async () => {
    try {
      const res = await getEnquiries({ limit: 1000 }); // Assuming max 1000 for stats realistically
      const allEnquiries = res.enquiries || [];
      
      let pending = 0, confirmed = 0, completed = 0, cancelled = 0;
      allEnquiries.forEach(e => {
        if (e.status === 'Pending') pending++;
        if (e.status === 'Confirmed') confirmed++;
        if (e.status === 'Completed') completed++;
        if (e.status === 'Cancelled') cancelled++;
      });
      
      setStats({
        total: allEnquiries.length,
        pending,
        confirmed,
        completed,
        cancelled
      });
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  const fetchEnquiriesList = useCallback(async (refreshStats = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        search: debouncedSearch,
        status: filters.status,
        sort: filters.sort,
        limit: 50 // Just fetching the top 50 for this demo
      };

      const res = await getEnquiries(params);
      setEnquiries(res.enquiries || []);

      if (refreshStats) {
        fetchStats();
      }
    } catch (err) {
      console.error(err);
      setError('Unable to load enquiries');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters]);

  // Initial load
  useEffect(() => {
    fetchEnquiriesList(true);
  }, [fetchEnquiriesList]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSearch('');
    setFilters({ status: '', sort: 'newest' });
  };

  const openDrawer = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this enquiry?')) return;
    
    try {
      setIsProcessingId(id);
      await deleteEnquiry(id);
      success('Enquiry deleted successfully');
      fetchEnquiriesList(true);
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to delete enquiry');
    } finally {
      setIsProcessingId(null);
    }
  };

  const handleStatusUpdated = () => {
    fetchEnquiriesList(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Enquiries</h1>
          <p className="text-gray-400">Manage incoming inventory rental requests.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total" value={stats.total} icon={ClipboardList} color="bg-blue-500/20 text-blue-500" />
        <StatCard title="Pending" value={stats.pending} icon={Clock} color="bg-yellow-500/20 text-yellow-500" />
        <StatCard title="Confirmed" value={stats.confirmed} icon={CheckSquare} color="bg-green-500/20 text-green-500" />
        <StatCard title="Completed" value={stats.completed} icon={CheckCircle} color="bg-emerald-500/20 text-emerald-500" />
        <StatCard title="Cancelled" value={stats.cancelled} icon={XCircle} color="bg-red-500/20 text-red-500" />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col xl:flex-row gap-4 xl:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Ref #, Name, Phone, Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy-900 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-magenta"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={filters.status} 
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-magenta"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Contacted">Contacted</option>
            <option value="Quotation Sent">Quotation Sent</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select 
            value={filters.sort} 
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-magenta"
          >
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
          <h3 className="text-xl font-bold text-white mb-2">Unable to load enquiries</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button onClick={() => fetchEnquiriesList(true)} className="bg-white/5 hover:bg-white/10 px-6 py-2 rounded-lg text-white transition-colors">
            Retry
          </button>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-navy-900 text-gray-400 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium">Reference</th>
                  <th className="px-6 py-4 font-medium">Customer Details</th>
                  <th className="px-6 py-4 font-medium">Event Info</th>
                  <th className="px-6 py-4 font-medium text-center">Items</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4"><div className="h-5 w-24 bg-white/5 rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-5 w-32 bg-white/5 rounded mb-2"></div><div className="h-4 w-24 bg-white/5 rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-5 w-24 bg-white/5 rounded mb-2"></div><div className="h-4 w-20 bg-white/5 rounded"></div></td>
                      <td className="px-6 py-4"><div className="h-6 w-8 bg-white/5 rounded mx-auto"></div></td>
                      <td className="px-6 py-4"><div className="h-6 w-20 bg-white/5 rounded-full"></div></td>
                      <td className="px-6 py-4"><div className="h-8 w-16 bg-white/5 rounded ml-auto"></div></td>
                    </tr>
                  ))
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Inbox size={48} className="text-gray-600 mb-4" />
                        <h4 className="text-lg font-medium text-white mb-2">No enquiries found</h4>
                        <p className="text-gray-400 mb-4">You have no enquiries matching your criteria.</p>
                        <button onClick={resetFilters} className="text-magenta hover:text-magenta-400 font-medium">Clear Filters</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  enquiries.map(enq => (
                    <tr key={enq._id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-magenta font-bold">{enq.referenceNumber}</span>
                        <span className="block text-[10px] text-gray-500 mt-1">{new Date(enq.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td className="px-6 py-4 max-w-[200px] truncate">
                        <p className="font-bold text-white text-base truncate">{enq.customerName}</p>
                        <span className="text-xs text-gray-400">{enq.phone}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white text-sm">{enq.eventDate ? new Date(enq.eventDate).toLocaleDateString() : 'No date'}</p>
                        <span className="text-xs text-gray-400 max-w-[150px] truncate block">{enq.city || 'No city'}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white">
                          {enq.totalItems}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={enq.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openDrawer(enq)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-blue-400 transition-colors" title="View Enquiry">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => handleDelete(enq._id)} disabled={isProcessingId === enq._id} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors disabled:opacity-50" title="Delete Enquiry">
                            {isProcessingId === enq._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden flex flex-col divide-y divide-white/10">
             {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 animate-pulse space-y-3">
                    <div className="flex justify-between"><div className="h-5 bg-white/5 rounded w-1/3"></div><div className="h-5 bg-white/5 rounded-full w-20"></div></div>
                    <div className="h-4 bg-white/5 rounded w-1/2"></div>
                    <div className="h-8 bg-white/5 rounded w-full"></div>
                  </div>
                ))
              ) : enquiries.length === 0 ? (
                <div className="p-8 text-center text-gray-400">No enquiries found.</div>
              ) : (
                enquiries.map(enq => (
                  <div key={enq._id} className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-magenta font-bold text-sm">{enq.referenceNumber}</span>
                        <h4 className="font-bold text-white text-lg mt-1">{enq.customerName}</h4>
                      </div>
                      <StatusBadge status={enq.status} />
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{enq.phone}</span>
                      <span>Items: {enq.totalItems}</span>
                    </div>

                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>Event: {enq.eventDate ? new Date(enq.eventDate).toLocaleDateString() : '-'}</span>
                      <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
                      <button onClick={() => openDrawer(enq)} className="flex items-center justify-center py-2 bg-white/5 rounded-lg text-blue-400 text-sm gap-2">
                        <Eye size={16} /> View
                      </button>
                      <button onClick={() => handleDelete(enq._id)} disabled={isProcessingId === enq._id} className="flex items-center justify-center py-2 bg-red-500/10 rounded-lg text-red-400 text-sm gap-2 disabled:opacity-50">
                        {isProcessingId === enq._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />} Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
      )}

      <EnquiryDetailsDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        enquiry={selectedEnquiry}
        onStatusUpdated={handleStatusUpdated}
      />
    </div>
  );
};

export default AdminEnquiriesPage;
