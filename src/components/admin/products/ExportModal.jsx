import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, X, Loader2 } from 'lucide-react';

const ExportModal = ({ isOpen, onClose, onExport, totalProducts, hasSelection }) => {
  const [format, setFormat] = useState('excel');
  const [scope, setScope] = useState(hasSelection ? 'selected' : 'filtered');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    await onExport(format, scope);
    setIsExporting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/30">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Download size={20} className="text-magenta" /> Export Inventory
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">Export Format</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormat('excel')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-colors ${
                  format === 'excel' 
                    ? 'bg-green-500/10 border-green-500/50 text-green-500' 
                    : 'bg-gray-800 border-transparent text-gray-400 hover:bg-gray-700'
                }`}
              >
                <FileSpreadsheet size={24} />
                <span className="text-xs font-medium">Excel</span>
              </button>
              
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-colors ${
                  format === 'csv' 
                    ? 'bg-blue-500/10 border-blue-500/50 text-blue-500' 
                    : 'bg-gray-800 border-transparent text-gray-400 hover:bg-gray-700'
                }`}
              >
                <FileText size={24} />
                <span className="text-xs font-medium">CSV</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-colors ${
                  format === 'pdf' 
                    ? 'bg-red-500/10 border-red-500/50 text-red-500' 
                    : 'bg-gray-800 border-transparent text-gray-400 hover:bg-gray-700'
                }`}
              >
                <FileText size={24} />
                <span className="text-xs font-medium">PDF</span>
              </button>
            </div>
          </div>

          {/* Scope Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">Export Scope</label>
            <div className="space-y-2">
              {hasSelection && (
                <label className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-transparent hover:border-gray-700 cursor-pointer transition-colors">
                  <input 
                    type="radio" 
                    name="scope" 
                    value="selected" 
                    checked={scope === 'selected'} 
                    onChange={() => setScope('selected')}
                    className="w-4 h-4 text-magenta bg-gray-900 border-gray-700 focus:ring-magenta focus:ring-offset-gray-900" 
                  />
                  <div>
                    <div className="text-sm font-medium text-white">Selected Products</div>
                    <div className="text-xs text-gray-400">Export only the currently selected items</div>
                  </div>
                </label>
              )}
              
              <label className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-transparent hover:border-gray-700 cursor-pointer transition-colors">
                <input 
                  type="radio" 
                  name="scope" 
                  value="filtered" 
                  checked={scope === 'filtered'} 
                  onChange={() => setScope('filtered')}
                  className="w-4 h-4 text-magenta bg-gray-900 border-gray-700 focus:ring-magenta focus:ring-offset-gray-900" 
                />
                <div>
                  <div className="text-sm font-medium text-white">Current View / Filters</div>
                  <div className="text-xs text-gray-400">Export exactly what matches your active search and filters</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-transparent hover:border-gray-700 cursor-pointer transition-colors">
                <input 
                  type="radio" 
                  name="scope" 
                  value="entire" 
                  checked={scope === 'entire'} 
                  onChange={() => setScope('entire')}
                  className="w-4 h-4 text-magenta bg-gray-900 border-gray-700 focus:ring-magenta focus:ring-offset-gray-900" 
                />
                <div>
                  <div className="text-sm font-medium text-white">Entire Inventory</div>
                  <div className="text-xs text-gray-400">Export all {totalProducts} products across all departments</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-800 flex gap-3 bg-gray-900/50">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 px-4 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            disabled={isExporting}
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-magenta text-white rounded-lg hover:bg-pink-600 transition-colors font-medium disabled:opacity-50"
          >
            {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {isExporting ? 'Generating...' : 'Download'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
