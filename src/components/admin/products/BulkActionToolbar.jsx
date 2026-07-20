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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white border border-[#E8DFD5] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 min-w-[500px]">
      <div className="flex items-center justify-between p-4 bg-white/90 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="bg-[#9A424E]/10 text-[#9A424E] rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            {selectedCount}
          </div>
          <div>
            <div className="text-[#4A2F1D] font-medium text-sm">Products Selected</div>
            <div className="text-[#A67C65] text-xs">Ready for bulk action</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#4A2F1D] rounded-lg transition-colors text-sm font-medium"
          >
            Actions {showOptions ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
          
          <div className="w-px h-6 bg-[#E8DFD5] mx-2"></div>
          
          <button 
            onClick={onClearSelection}
            className="p-1.5 text-[#A67C65] hover:text-[#4A2F1D] rounded-lg hover:bg-[#E8DFD5] transition-colors"
            title="Clear Selection"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {showOptions && (
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white border-t border-[#E8DFD5]">
          <button onClick={onBulkDepartment} className="flex items-center gap-2 p-2 hover:bg-[#FAF7F2] rounded-lg text-sm text-[#4A2F1D] hover:text-[#4A2F1D] transition-colors">
            <MoveRight size={16} className="text-blue-400" /> Change Dept
          </button>
          
          <button onClick={onBulkCategory} className="flex items-center gap-2 p-2 hover:bg-[#FAF7F2] rounded-lg text-sm text-[#4A2F1D] hover:text-[#4A2F1D] transition-colors">
            <Tags size={16} className="text-purple-400" /> Change Category
          </button>
          
          <button onClick={onBulkThresholds} className="flex items-center gap-2 p-2 hover:bg-[#FAF7F2] rounded-lg text-sm text-[#4A2F1D] hover:text-[#4A2F1D] transition-colors">
            <Package size={16} className="text-[#C0602F]-400" /> Thresholds
          </button>

          <button onClick={onBulkActivate} className="flex items-center gap-2 p-2 hover:bg-[#FAF7F2] rounded-lg text-sm text-[#4A2F1D] hover:text-green-400 transition-colors">
            <Power size={16} className="text-green-500" /> Activate
          </button>

          <button onClick={onBulkDeactivate} className="flex items-center gap-2 p-2 hover:bg-[#FAF7F2] rounded-lg text-sm text-[#4A2F1D] hover:text-yellow-400 transition-colors">
            <PowerOff size={16} className="text-yellow-500" /> Deactivate
          </button>
          
          <button onClick={onBulkDelete} className="flex items-center gap-2 p-2 hover:bg-red-500/10 rounded-lg text-sm text-[#4A2F1D] hover:text-red-500 transition-colors">
            <Trash2 size={16} className="text-red-500" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkActionToolbar;
