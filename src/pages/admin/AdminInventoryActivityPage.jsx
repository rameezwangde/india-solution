import React, { useState, useEffect } from 'react';
import { getActivities } from '../../api/activityService';
import { getDepartments } from '../../api/productService';
import { format } from 'date-fns';
import { Activity, Search, Filter, Loader2, ArrowRight, ArrowDownRight, ArrowUpRight, Plus, Edit, Trash2, Upload, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminInventoryActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    activityType: '',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 20
  });
  
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1
  });

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const data = await getActivities(filters);
      if (data.success) {
        setActivities(data.activities);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [filters.page, filters.department, filters.activityType, filters.startDate, filters.endDate]);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const data = await getDepartments();
        if (data.success) {
          setDepartments(data.departments.map(d => d.name));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchDepts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, page: 1 }));
    fetchActivities();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'PRODUCT_CREATED': return <Plus size={16} className="text-green-400" />;
      case 'PRODUCT_UPDATED': return <Edit size={16} className="text-blue-400" />;
      case 'PRODUCT_DELETED': return <Trash2 size={16} className="text-red-400" />;
      case 'EXCEL_IMPORT': return <FileSpreadsheet size={16} className="text-green-400" />;
      case 'QUANTITY_INCREASED': return <ArrowUpRight size={16} className="text-green-400" />;
      case 'QUANTITY_DECREASED': return <ArrowDownRight size={16} className="text-red-400" />;
      case 'STOCK_RESERVED': return <ArrowDownRight size={16} className="text-[#C0602F]-400" />;
      case 'STOCK_RESTORED': return <ArrowUpRight size={16} className="text-blue-400" />;
      default: return <Activity size={16} className="text-[#A67C65]" />;
    }
  };

  const formatActivityName = (type) => {
    return type.replace(/_/g, ' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#4A2F1D] mb-2">Inventory Activity</h1>
          <p className="text-[#A67C65]">Track all inventory changes, imports, and stock movements.</p>
        </div>
      </div>

      <div className="bg-white border border-[#E8DFD5] rounded-2xl p-4 lg:p-6">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A67C65]" size={20} />
            <input 
              type="text" 
              placeholder="Search product name, code, or reference..." 
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl text-[#4A2F1D] placeholder-gray-500 focus:outline-none focus:border-magenta transition-colors"
            />
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-4">
            <select
              value={filters.department}
              onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value, page: 1 }))}
              className="px-4 py-3 bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl text-[#4A2F1D] focus:outline-none focus:border-magenta min-w-[150px]"
            >
              <option value="">All Departments</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={filters.activityType}
              onChange={(e) => setFilters(prev => ({ ...prev, activityType: e.target.value, page: 1 }))}
              className="px-4 py-3 bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl text-[#4A2F1D] focus:outline-none focus:border-magenta"
            >
              <option value="">All Activities</option>
              <option value="EXCEL_IMPORT">Excel Import</option>
              <option value="STOCK_RESERVED">Stock Reserved</option>
              <option value="STOCK_RESTORED">Stock Restored</option>
              <option value="QUANTITY_INCREASED">Quantity Increased</option>
              <option value="QUANTITY_DECREASED">Quantity Decreased</option>
              <option value="PRODUCT_CREATED">Product Created</option>
              <option value="PRODUCT_UPDATED">Product Updated</option>
              <option value="PRODUCT_DELETED">Product Deleted</option>
            </select>
            <button 
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-magenta to-orange text-[#4A2F1D] font-medium rounded-xl hover:shadow-sm hover:shadow-md hover:shadow-magenta/20 transition-all whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8DFD5] text-[#A67C65] text-sm">
                <th className="py-4 px-4 font-medium">Date</th>
                <th className="py-4 px-4 font-medium">Product</th>
                <th className="py-4 px-4 font-medium">Department</th>
                <th className="py-4 px-4 font-medium">Activity</th>
                <th className="py-4 px-4 font-medium text-center">Qty Change</th>
                <th className="py-4 px-4 font-medium">Reference</th>
                <th className="py-4 px-4 font-medium">By</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
                    <Loader2 className="animate-spin text-[#9A424E] mx-auto" size={32} />
                  </td>
                </tr>
              ) : activities.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-[#A67C65]">
                    <div className="flex flex-col items-center justify-center">
                      <Activity size={48} className="mb-4 opacity-20" />
                      <p>No activity found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                activities.map(activity => (
                  <tr key={activity._id} className="border-b border-[#E8DFD5] hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap text-[#7C5A48]">
                      <div>{format(new Date(activity.performedAt), 'MMM dd, yyyy')}</div>
                      <div className="text-xs text-[#A67C65]">{format(new Date(activity.performedAt), 'hh:mm a')}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Link to={`/admin/products/${activity.productId}`} className="font-medium text-[#4A2F1D] hover:text-[#9A424E] transition-colors">
                        {activity.productName}
                      </Link>
                      <div className="text-xs text-[#A67C65]">{activity.productCode}</div>
                    </td>
                    <td className="py-4 px-4 text-[#7C5A48]">
                      {activity.department}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 mb-1">
                        {getActivityIcon(activity.activityType)}
                        <span className="font-medium text-gray-200">{formatActivityName(activity.activityType)}</span>
                      </div>
                      <div className="text-xs text-[#A67C65] truncate max-w-[200px]" title={activity.remarks}>{activity.remarks}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {activity.quantityDifference !== 0 ? (
                        <div className="inline-flex items-center gap-2 bg-[#FAF7F2] px-3 py-1 rounded-full">
                          <span className="text-[#A67C65] line-through">{activity.previousQuantity}</span>
                          <ArrowRight size={12} className="text-[#A67C65]" />
                          <span className={activity.quantityDifference > 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                            {activity.newQuantity}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#A67C65]">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {activity.referenceType !== 'None' ? (
                        <div>
                          <span className="text-xs text-[#A67C65] block">{activity.referenceType}</span>
                          <span className="text-[#4A2F1D] text-sm">{activity.referenceId}</span>
                        </div>
                      ) : (
                        <span className="text-[#A67C65]">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-[#7C5A48]">
                      {activity.performedBy}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && pagination.pages > 1 && (
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#E8DFD5]">
            <div className="text-sm text-[#A67C65]">
              Showing page {pagination.page} of {pagination.pages} ({pagination.total} total records)
            </div>
            <div className="flex gap-2">
              <button 
                disabled={pagination.page === 1}
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                className="px-4 py-2 bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg text-[#4A2F1D] disabled:opacity-50 hover:bg-[#E8DFD5] transition-colors"
              >
                Previous
              </button>
              <button 
                disabled={pagination.page === pagination.pages}
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                className="px-4 py-2 bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg text-[#4A2F1D] disabled:opacity-50 hover:bg-[#E8DFD5] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInventoryActivityPage;
