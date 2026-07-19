import React, { useState, useEffect, useCallback } from 'react';
import { getStockAlerts, getStockAlertsSummary, acknowledgeAlert, unacknowledgeAlert, quickUpdateQuantity, updateStockThresholds } from '../../api/stockAlertService';
import { useToast } from '../../context/ToastContext';
import { AlertTriangle, Package, Edit, CheckCircle, XCircle, Search, Filter, RefreshCw, X, TrendingUp, TrendingDown, Clock, Activity, Download } from 'lucide-react';
import { format } from 'date-fns';
import ExportModal from '../../components/admin/products/ExportModal';
import { generateExport } from '../../api/exportService';

const StockBadge = ({ status }) => {
  const styles = {
    'OUT_OF_STOCK': 'bg-red-500/10 text-red-500 border-red-500/20',
    'CRITICAL_STOCK': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'LOW_STOCK': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'IN_STOCK': 'bg-green-500/10 text-green-500 border-green-500/20',
  };
  const labels = {
    'OUT_OF_STOCK': 'Out of Stock',
    'CRITICAL_STOCK': 'Critical',
    'LOW_STOCK': 'Low Stock',
    'IN_STOCK': 'In Stock'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status] || styles['IN_STOCK']}`}>
      {labels[status] || status}
    </span>
  );
};

export default function AdminLowStockPage() {
  const [summary, setSummary] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ department: '', status: '', acknowledged: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast } = useToast();

  const [updateModal, setUpdateModal] = useState({ isOpen: false, product: null, mode: 'set', value: '', remarks: '' });
  const [thresholdModal, setThresholdModal] = useState({ isOpen: false, product: null, low: '', critical: '' });
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const fetchSummary = useCallback(async () => {
    try {
      const res = await getStockAlertsSummary();
      setSummary(res.summary);
      setDepartments(res.departments);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getStockAlerts({ page, limit: 20, search, ...filters });
      setProducts(res.products);
      setTotalPages(res.totalPages);
    } catch (err) {
      showToast('Failed to load stock alerts', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, search, filters, showToast]);

  useEffect(() => {
    fetchSummary();
    fetchProducts();
  }, [fetchSummary, fetchProducts]);

  const handleQuickUpdate = async (e) => {
    e.preventDefault();
    try {
      await quickUpdateQuantity(updateModal.product._id, { mode: updateModal.mode, value: updateModal.value, remarks: updateModal.remarks });
      showToast('Quantity updated successfully', 'success');
      setUpdateModal({ isOpen: false, product: null, mode: 'set', value: '', remarks: '' });
      fetchProducts();
      fetchSummary();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update quantity', 'error');
    }
  };

  const handleThresholdUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateStockThresholds(thresholdModal.product._id, { lowStockThreshold: thresholdModal.low, criticalStockThreshold: thresholdModal.critical });
      showToast('Thresholds updated successfully', 'success');
      setThresholdModal({ isOpen: false, product: null, low: '', critical: '' });
      fetchProducts();
      fetchSummary();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update thresholds', 'error');
    }
  };

  const toggleAcknowledge = async (product) => {
    try {
      if (product.stockAlertAcknowledged) {
        await unacknowledgeAlert(product._id);
        showToast('Alert unacknowledged', 'info');
      } else {
        await acknowledgeAlert(product._id);
        showToast('Alert acknowledged', 'success');
      }
      fetchProducts();
    } catch (err) {
      showToast('Failed to update acknowledgement', 'error');
    }
  };

  const handleExport = async (format, scope) => {
    try {
      // By default scope will export what is currently filtered, or entire low stock if 'filtered'
      // If the user selects 'entire', it exports entire DB.
      // If 'filtered', it will use the low_stock scope on the backend.
      const currentScope = scope === 'filtered' ? 'low_stock' : scope; 
      const res = await generateExport(format, currentScope, filters, []);
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
      showToast('Export generated successfully', 'success');
    } catch (err) {
      showToast('Failed to generate export', 'error');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" /> Low Stock Centre
          </h1>
          <p className="text-gray-400 mt-1">Monitor and manage inventory shortages</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsExportModalOpen(true)} className="px-4 py-2 bg-gray-800 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700">
            <Download size={18} /> Export
          </button>
          <button onClick={() => { fetchSummary(); fetchProducts(); }} className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Attention Required</p>
              <h3 className="text-2xl font-bold text-white">{summary.totalAttentionRequired}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
              <Activity size={24} />
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Out of Stock</p>
              <h3 className="text-2xl font-bold text-red-500">{summary.outOfStock}</h3>
            </div>
            <div className="p-3 bg-red-500/10 text-red-500 rounded-lg">
              <XCircle size={24} />
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Critical Stock</p>
              <h3 className="text-2xl font-bold text-orange-500">{summary.criticalStock}</h3>
            </div>
            <div className="p-3 bg-orange-500/10 text-orange-500 rounded-lg">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Low Stock</p>
              <h3 className="text-2xl font-bold text-yellow-500">{summary.lowStock}</h3>
            </div>
            <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-lg">
              <TrendingDown size={24} />
            </div>
          </div>
        </div>
      )}

      {/* Department Summary */}
      {departments && departments.length > 0 && (
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-4 min-w-max">
            {departments.map(dept => (
              <div key={dept.department} className="bg-gray-800/30 border border-gray-700 p-3 rounded-lg min-w-[200px]">
                <h4 className="text-white font-medium mb-2">{dept.department}</h4>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Low:</span>
                  <span className="text-yellow-500">{dept.lowStock}</span>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Critical:</span>
                  <span className="text-orange-500">{dept.criticalStock}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">OOS:</span>
                  <span className="text-red-500">{dept.outOfStock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters & Table */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-700/50 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Search className="text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 w-full"
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({...prev, status: e.target.value}))}
            >
              <option value="">All Statuses</option>
              <option value="LOW_STOCK">Low Stock</option>
              <option value="CRITICAL_STOCK">Critical</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
            </select>
            <select 
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
              value={filters.acknowledged}
              onChange={(e) => setFilters(prev => ({...prev, acknowledged: e.target.value}))}
            >
              <option value="">All Alerts</option>
              <option value="false">Unacknowledged</option>
              <option value="true">Acknowledged</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700/50 bg-gray-800/20 text-gray-400 text-sm">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Department</th>
                <th className="p-4 font-medium">Quantity</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Thresholds</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No products match the selected filters.</td></tr>
              ) : (
                products.map(p => (
                  <tr key={p._id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <td className="p-4">
                      <div className="text-white font-medium">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.productCode}</div>
                    </td>
                    <td className="p-4 text-gray-400">{p.department}</td>
                    <td className="p-4">
                      <div className="text-white font-medium">{p.quantity} {p.quantityUnit}</div>
                    </td>
                    <td className="p-4">
                      <StockBadge status={p.stockStatus} />
                      {p.stockAlertAcknowledged && (
                        <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                          <CheckCircle size={10} /> Acknowledged
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-gray-400 text-xs">
                      <div>Low: {p.lowStockThreshold}</div>
                      <div>Crit: {p.criticalStockThreshold}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setUpdateModal({ isOpen: true, product: p, mode: 'set', value: p.quantity, remarks: '' })}
                          className="px-3 py-1.5 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors text-xs font-medium"
                        >
                          Update
                        </button>
                        <button 
                          onClick={() => setThresholdModal({ isOpen: true, product: p, low: p.lowStockThreshold, critical: p.criticalStockThreshold })}
                          className="p-1.5 bg-gray-800 text-gray-400 rounded-lg hover:text-white transition-colors"
                          title="Edit Thresholds"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => toggleAcknowledge(p)}
                          className={`p-1.5 rounded-lg transition-colors ${p.stockAlertAcknowledged ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                          title={p.stockAlertAcknowledged ? "Unacknowledge" : "Acknowledge"}
                        >
                          {p.stockAlertAcknowledged ? <CheckCircle size={16} /> : <Clock size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-700/50 flex justify-center gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-3 py-1 bg-gray-800 text-white rounded-lg disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-gray-400 px-3 py-1">{page} / {totalPages}</span>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-3 py-1 bg-gray-800 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Quick Update Modal */}
      {updateModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/30">
              <h3 className="text-lg font-bold text-white">Quick Update</h3>
              <button onClick={() => setUpdateModal({isOpen: false, product: null})} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleQuickUpdate} className="p-6">
              <div className="mb-4 text-gray-400 text-sm">
                Updating: <span className="text-white font-medium">{updateModal.product?.name}</span>
                <div className="mt-1">Current: <span className="text-white">{updateModal.product?.quantity}</span></div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Mode</label>
                <select 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                  value={updateModal.mode}
                  onChange={e => setUpdateModal({...updateModal, mode: e.target.value})}
                >
                  <option value="set">Set Exact Quantity</option>
                  <option value="increase">Increase Quantity (+)</option>
                  <option value="decrease">Decrease Quantity (-)</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Quantity</label>
                <input 
                  type="number"
                  min="0"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                  value={updateModal.value}
                  onChange={e => setUpdateModal({...updateModal, value: e.target.value})}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Remarks</label>
                <input 
                  type="text"
                  placeholder="e.g. Added from warehouse"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                  value={updateModal.remarks}
                  onChange={e => setUpdateModal({...updateModal, remarks: e.target.value})}
                />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setUpdateModal({isOpen: false, product: null})} className="flex-1 px-4 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Update Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Threshold Modal */}
      {thresholdModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/30">
              <h3 className="text-lg font-bold text-white">Update Thresholds</h3>
              <button onClick={() => setThresholdModal({isOpen: false, product: null})} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleThresholdUpdate} className="p-6">
              <div className="mb-6 text-gray-400 text-sm">
                Updating: <span className="text-white font-medium">{thresholdModal.product?.name}</span>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Low Stock Threshold</label>
                <input 
                  type="number"
                  min="0"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                  value={thresholdModal.low}
                  onChange={e => setThresholdModal({...thresholdModal, low: e.target.value})}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Critical Stock Threshold</label>
                <input 
                  type="number"
                  min="0"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                  value={thresholdModal.critical}
                  onChange={e => setThresholdModal({...thresholdModal, critical: e.target.value})}
                />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setThresholdModal({isOpen: false, product: null})} className="flex-1 px-4 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        totalProducts={summary ? summary.totalAttentionRequired : 0}
        hasSelection={false}
      />
    </div>
  );
}
