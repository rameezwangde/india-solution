import React, { useState } from 'react';
import { X, AlertTriangle, MoveRight, Tags, Package, Trash2, Power, PowerOff, Loader2 } from 'lucide-react';

const BulkActionModal = ({ 
  isOpen, 
  onClose, 
  mode, 
  selectedCount, 
  onConfirm, 
  departments, 
  categories 
}) => {
  const [department, setDepartment] = useState('');
  const [category, setCategory] = useState('');
  const [lowStock, setLowStock] = useState(5);
  const [criticalStock, setCriticalStock] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      let data = {};
      if (mode === 'department') data = { newDepartment: department };
      if (mode === 'category') data = { newCategoryId: category };
      if (mode === 'thresholds') data = { lowStockThreshold: lowStock, criticalStockThreshold: criticalStock };
      
      await onConfirm(mode, data);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getModalConfig = () => {
    switch (mode) {
      case 'department':
        return { icon: MoveRight, color: 'text-blue-500', title: 'Change Department', button: 'Move Products' };
      case 'category':
        return { icon: Tags, color: 'text-purple-500', title: 'Change Category', button: 'Update Category' };
      case 'thresholds':
        return { icon: Package, color: 'text-[#C0602F]-500', title: 'Update Thresholds', button: 'Save Thresholds' };
      case 'activate':
        return { icon: Power, color: 'text-green-500', title: 'Activate Products', button: 'Activate' };
      case 'deactivate':
        return { icon: PowerOff, color: 'text-yellow-500', title: 'Deactivate Products', button: 'Deactivate' };
      case 'delete':
        return { icon: Trash2, color: 'text-red-500', title: 'Delete Products', button: 'Delete Permanently' };
      default:
        return { icon: AlertTriangle, color: 'text-[#A67C65]', title: 'Bulk Action', button: 'Confirm' };
    }
  };

  const config = getModalConfig();
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-[#E8DFD5] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-[#E8DFD5] flex justify-between items-center bg-white/30">
          <h3 className={`text-lg font-bold flex items-center gap-2 ${config.color}`}>
            <Icon size={20} /> {config.title}
          </h3>
          <button onClick={onClose} className="text-[#A67C65] hover:text-[#4A2F1D] transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6 p-3 bg-white/50 rounded-lg text-sm text-[#7C5A48]">
            You are about to apply this action to <strong className="text-[#4A2F1D]">{selectedCount} selected products</strong>.
            {mode === 'delete' && (
              <div className="mt-2 text-red-400 flex gap-2 items-start">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                <span>This action cannot be undone. Associated inventory logs will also be permanently deleted.</span>
              </div>
            )}
          </div>

          {mode === 'department' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#A67C65] mb-2">New Department</label>
              <select
                required
                className="w-full bg-white border border-gray-700 rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-blue-500 outline-none"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department...</option>
                {departments.map(dept => (
                  <option key={dept._id || dept.slug} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>
          )}

          {mode === 'category' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#A67C65] mb-2">New Category</label>
              <select
                required
                className="w-full bg-white border border-gray-700 rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-blue-500 outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category...</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          )}

          {mode === 'thresholds' && (
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[#A67C65] mb-2">Low Stock Threshold</label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full bg-white border border-gray-700 rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-blue-500 outline-none"
                  value={lowStock}
                  onChange={(e) => setLowStock(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A67C65] mb-2">Critical Stock Threshold</label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full bg-white border border-gray-700 rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:border-blue-500 outline-none"
                  value={criticalStock}
                  onChange={(e) => setCriticalStock(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-4 py-2.5 bg-white text-[#4A2F1D] rounded-lg hover:bg-gray-700 transition-colors"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isProcessing}
              className={`flex-1 flex justify-center items-center gap-2 px-4 py-2.5 text-[#4A2F1D] rounded-lg transition-colors font-medium ${
                mode === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              } disabled:opacity-50`}
            >
              {isProcessing && <Loader2 size={18} className="animate-spin" />}
              {isProcessing ? 'Processing...' : config.button}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkActionModal;
