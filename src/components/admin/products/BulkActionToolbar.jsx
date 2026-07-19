import React, { useState } from 'react';
import { 
  Package, X, Trash2, Power, PowerOff, Tags, MoveRight, ChevronUp, ChevronDown 
} from 'lucide-react';

const BulkActionToolbar = ({ 
  selectedCount, 
  onClearSelection,
  onBulkDepartment,
  onBulkCategory,
  onBulkActivate,
  onBulkDeactivate,
  onBulkThresholds,
  onBulkDelete,
  departments,
  categories
}) => {
  const [showOptions, setShowOptions] = useState(false);

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1e1e2d] border border-[#3f3f46] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 min-w-[500px]">
      <div className="flex items-center justify-between p-4 bg-gray-800/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="bg-magenta/20 text-magenta rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            {selectedCount}
          </div>
          <div>
            <div className="text-white font-medium text-sm">Products Selected</div>
            <div className="text-gray-400 text-xs">Ready for bulk action</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Actions {showOptions ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
          
          <div className="w-px h-6 bg-gray-700 mx-2"></div>
          
          <button 
            onClick={onClearSelection}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-colors"
            title="Clear Selection"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {showOptions && (
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2 bg-[#12121A] border-t border-gray-800">
          <button onClick={onBulkDepartment} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg text-sm text-gray-300 hover:text-white transition-colors">
            <MoveRight size={16} className="text-blue-400" /> Change Dept
          </button>
          
          <button onClick={onBulkCategory} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg text-sm text-gray-300 hover:text-white transition-colors">
            <Tags size={16} className="text-purple-400" /> Change Category
          </button>
          
          <button onClick={onBulkThresholds} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg text-sm text-gray-300 hover:text-white transition-colors">
            <Package size={16} className="text-orange-400" /> Thresholds
          </button>

          <button onClick={onBulkActivate} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg text-sm text-gray-300 hover:text-green-400 transition-colors">
            <Power size={16} className="text-green-500" /> Activate
          </button>

          <button onClick={onBulkDeactivate} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg text-sm text-gray-300 hover:text-yellow-400 transition-colors">
            <PowerOff size={16} className="text-yellow-500" /> Deactivate
          </button>
          
          <button onClick={onBulkDelete} className="flex items-center gap-2 p-2 hover:bg-red-500/10 rounded-lg text-sm text-gray-300 hover:text-red-500 transition-colors">
            <Trash2 size={16} className="text-red-500" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkActionToolbar;
