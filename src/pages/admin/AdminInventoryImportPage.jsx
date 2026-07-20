import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, X, AlertTriangle, CheckCircle, Info, Download, ArrowRight, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { previewInventory, executeInventory, downloadTemplate, exportInventory } from '../../api/importService';
import { clearInventory, clearTestData } from '../../api/productService';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

const AdminInventoryImportPage = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [result, setResult] = useState(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [duplicateMode, setDuplicateMode] = useState('skip');
  const [createMissingCategories, setCreateMissingCategories] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearConfirmText, setClearConfirmText] = useState('');
  const [isClearing, setIsClearing] = useState(false);
  const [clearMode, setClearMode] = useState('products'); // 'products' or 'all'
  
  const fileInputRef = useRef(null);
  const { addToast } = useToast();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile) => {
    // Check extension
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls')) {
      return addToast('error', 'Please upload a valid .xlsx or .xls file.');
    }
    
    // Check size (15MB)
    if (selectedFile.size > 15 * 1024 * 1024) {
      return addToast('error', 'File size exceeds 15MB limit.');
    }
    
    setFile(selectedFile);
    setPreviewData(null);
    setResult(null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewData(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePreview = async () => {
    if (!file) return;
    
    setIsPreviewing(true);
    try {
      const data = await previewInventory(file);
      if (data.success) {
        setPreviewData(data);
        addToast('success', 'Workbook parsed successfully.');
      }
    } catch (err) {
      addToast('error', err.response?.data?.message || 'Failed to preview workbook');
    } finally {
      setIsPreviewing(false);
    }
  };

  const handleExecute = async () => {
    setShowConfirmModal(false);
    setIsExecuting(true);
    try {
      const data = await executeInventory(file, duplicateMode, createMissingCategories);
      if (data.success) {
        setResult(data);
        addToast('success', data.message || 'Success! The Excel sheet has been imported successfully.');
      }
    } catch (err) {
      addToast('error', err.response?.data?.message || 'Failed to execute import');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      await downloadTemplate();
      addToast('success', 'Template downloaded');
    } catch (err) {
      addToast('error', 'Failed to download template');
    }
  };

  const handleExport = async () => {
    try {
      await exportInventory();
      addToast('success', 'Inventory exported');
    } catch (err) {
      addToast('error', 'Failed to export inventory');
    }
  };

  // Convert error array to CSV string for download
  const handleDownloadErrors = () => {
    if (!result || !result.errors || result.errors.length === 0) return;
    
    let csvContent = "data:text/csv;charset=utf-8,Sheet,Row,Reason\n";
    result.errors.forEach(e => {
      const reason = e.reason ? e.reason.replace(/"/g, '""') : '';
      csvContent += `"${e.sheet}","${e.row}","${reason}"\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Import_Errors.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset to upload state
  const resetUpload = () => {
    handleRemoveFile();
  };

  const handleClearInventory = async () => {
    if (clearMode === 'products' && clearConfirmText !== 'DELETE INVENTORY') return;
    if (clearMode === 'all' && clearConfirmText !== 'RESET TEST DATA') return;

    const confirmPrompt = window.confirm(
      clearMode === 'all' 
      ? "Are you absolutely sure you want to permanently delete ALL test data (products, enquiries, history)? This action cannot be undone."
      : "Are you absolutely sure you want to permanently delete all inventory products? This action cannot be undone."
    );
    
    if (!confirmPrompt) return;

    setIsClearing(true);
    try {
      if (clearMode === 'all') {
        const data = await clearTestData();
        addToast('success', `Test data cleared! Products: ${data.deletedCounts.products}, Enquiries: ${data.deletedCounts.enquiries}`);
        window.alert(`Success: ${data.deletedCounts.products} products and ${data.deletedCounts.enquiries} enquiries deleted.`);
        
        // Reset query params and local state
        localStorage.removeItem('adminFilters');
        sessionStorage.clear();
      } else {
        const data = await clearInventory();
        addToast('success', `Inventory cleared! ${data.deletedCount} items were deleted.`);
        window.alert(`Success: ${data.deletedCount} items were successfully deleted.`);
      }
      
      setShowClearModal(false);
      setClearConfirmText('');
    } catch (err) {
      addToast('error', err.response?.data?.message || 'Failed to clear data');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#4A2F1D] mb-2">Import Inventory</h1>
          <p className="text-[#A67C65]">Bulk import products using an Excel workbook.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setShowClearModal(true)}
            className="px-4 py-2 border border-red-500/50 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors flex items-center gap-2 font-medium"
          >
            <Trash2 size={18} />
            Clear Inventory
          </button>
          <button 
            onClick={handleDownloadTemplate}
            className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#4A2F1D] rounded-lg transition-colors flex items-center gap-2 font-medium"
          >
            <FileSpreadsheet size={18} />
            Template
          </button>
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg transition-colors flex items-center gap-2 font-medium"
          >
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      {result ? (
        // RESULT STATE
        <div className="bg-white border border-[#E8DFD5] rounded-2xl p-8 text-center max-w-3xl mx-auto mt-10">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${result.summary.failed === 0 ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-[#C0602F]-500'}`}>
            {result.summary.failed === 0 ? <CheckCircle size={40} /> : <AlertTriangle size={40} />}
          </div>
          <h2 className="text-3xl font-bold text-[#4A2F1D] mb-2">Import Complete</h2>
          <p className="text-[#A67C65] mb-8">Your Excel workbook has been processed.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-[#FAF7F2] rounded-xl p-4">
              <div className="text-3xl font-bold text-green-400 mb-1">{result.summary.created}</div>
              <div className="text-xs text-[#A67C65] uppercase tracking-wider">Created</div>
            </div>
            <div className="bg-[#FAF7F2] rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-400 mb-1">{result.summary.updated}</div>
              <div className="text-xs text-[#A67C65] uppercase tracking-wider">Updated</div>
            </div>
            <div className="bg-[#FAF7F2] rounded-xl p-4">
              <div className="text-3xl font-bold text-[#A67C65] mb-1">{result.summary.skipped}</div>
              <div className="text-xs text-[#A67C65] uppercase tracking-wider">Skipped</div>
            </div>
            <div className="bg-[#FAF7F2] rounded-xl p-4">
              <div className="text-3xl font-bold text-red-400 mb-1">{result.summary.failed}</div>
              <div className="text-xs text-[#A67C65] uppercase tracking-wider">Failed</div>
            </div>
            <div className="bg-[#FAF7F2] rounded-xl p-4">
              <div className="text-3xl font-bold text-[#9A424E] mb-1">{result.summary.categoriesCreated}</div>
              <div className="text-xs text-[#A67C65] uppercase tracking-wider">Categories Created</div>
            </div>
          </div>

          {result.sheetSummaries && result.sheetSummaries.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
              {result.sheetSummaries.map((sheet, index) => (
                <div key={index} className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-5 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-[#4A2F1D] mb-2">{sheet.sheetName}</h3>
                  <div className="flex items-center gap-2 text-sm text-[#A67C65] mb-4">
                    <span>Mapped Department:</span>
                    <span className="text-[#9A424E] font-medium">{sheet.department || 'Main Inventory'}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 text-sm mb-6 flex-grow">
                    <div className="text-[#A67C65]">Rows Scanned:</div>
                    <div className="text-[#4A2F1D] font-medium text-right">{sheet.scanned}</div>
                    
                    <div className="text-[#A67C65]">Created:</div>
                    <div className="text-green-400 font-medium text-right">{sheet.created}</div>
                    
                    <div className="text-[#A67C65]">Updated:</div>
                    <div className="text-blue-400 font-medium text-right">{sheet.updated}</div>
                    
                    <div className="text-[#A67C65]">Skipped/Failed:</div>
                    <div className="text-red-400 font-medium text-right">{sheet.skipped} / {sheet.failed}</div>
                    
                    <div className="text-[#A67C65] pt-2 border-t border-[#E8DFD5] mt-2">Total Quantity:</div>
                    <div className="text-[#9A424E] font-bold text-right pt-2 border-t border-[#E8DFD5] mt-2">
                      {sheet.totalQuantity.toLocaleString()}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/admin/inventory-departments/${(sheet.department || 'Main Inventory').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`} 
                    className="w-full py-2 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#4A2F1D] font-medium rounded-lg text-center transition-colors"
                  >
                    View Department
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/admin/products" className="px-6 py-3 bg-gradient-to-r from-magenta to-orange hover:glow-magenta text-[#4A2F1D] font-medium rounded-xl transition-all">
              View Products
            </Link>
            <button onClick={resetUpload} className="px-6 py-3 bg-[#E8DFD5] hover:bg-white/20 text-[#4A2F1D] font-medium rounded-xl transition-all">
              Import Another File
            </button>
            {result.summary.failed > 0 && result.errors?.length > 0 && (
              <button onClick={handleDownloadErrors} className="px-6 py-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 font-medium rounded-xl transition-all flex items-center justify-center gap-2">
                <Download size={18} />
                Download Error Report
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {/* UPLOAD AREA */}
            <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#4A2F1D] mb-4">1. Upload Workbook</h3>
              
              {!file ? (
                <div 
                  className="border-2 border-dashed border-white/20 hover:border-magenta bg-[#FAF7F2] rounded-xl p-8 text-center transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={32} className="text-[#A67C65] mx-auto mb-4" />
                  <p className="text-[#4A2F1D] font-medium mb-1">Click or drag file to this area to upload</p>
                  <p className="text-xs text-[#A67C65] mb-4">Strictly .xlsx or .xls format up to 15MB.</p>
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                    onChange={handleFileChange}
                  />
                  <div className="inline-block px-4 py-2 bg-[#E8DFD5] rounded-lg text-sm text-[#4A2F1D] font-medium">Browse File</div>
                </div>
              ) : (
                <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileSpreadsheet className="text-[#9A424E] flex-shrink-0" size={24} />
                    <div className="truncate">
                      <p className="text-[#4A2F1D] font-medium truncate">{file.name}</p>
                      <p className="text-xs text-[#A67C65]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button onClick={handleRemoveFile} className="text-[#A67C65] hover:text-red-400 p-2">
                    <X size={20} />
                  </button>
                </div>
              )}
              
              <button 
                onClick={handlePreview}
                disabled={!file || isPreviewing}
                className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-magenta to-orange hover:glow-magenta text-[#4A2F1D] font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isPreviewing ? <><Loader2 size={18} className="animate-spin" /> Parsing Workbook...</> : 'Preview Inventory'}
              </button>
            </div>
            
            {/* SETTINGS AREA */}
            {previewData && (
              <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#4A2F1D] mb-4">2. Import Settings</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#7C5A48] mb-3">Duplicate Handling Strategy</label>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 p-3 rounded-xl border border-[#E8DFD5] hover:bg-[#FAF7F2] cursor-pointer transition-colors">
                      <input type="radio" name="duplicateMode" value="skip" checked={duplicateMode === 'skip'} onChange={() => setDuplicateMode('skip')} className="mt-1 text-[#9A424E] bg-[#FAF7F2] border-white/20 focus:ring-magenta" />
                      <div>
                        <div className="text-[#4A2F1D] font-medium">Skip Existing Products</div>
                        <div className="text-xs text-[#A67C65]">Ignore rows that match an existing product code or name.</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 rounded-xl border border-[#E8DFD5] hover:bg-[#FAF7F2] cursor-pointer transition-colors">
                      <input type="radio" name="duplicateMode" value="update_quantity" checked={duplicateMode === 'update_quantity'} onChange={() => setDuplicateMode('update_quantity')} className="mt-1 text-[#9A424E] bg-[#FAF7F2] border-white/20 focus:ring-magenta" />
                      <div>
                        <div className="text-[#4A2F1D] font-medium">Update Quantity Only</div>
                        <div className="text-xs text-[#A67C65]">Update stock levels. Do not overwrite pricing or descriptions.</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 rounded-xl border border-[#E8DFD5] hover:bg-[#FAF7F2] cursor-pointer transition-colors">
                      <input type="radio" name="duplicateMode" value="update_all" checked={duplicateMode === 'update_all'} onChange={() => setDuplicateMode('update_all')} className="mt-1 text-[#9A424E] bg-[#FAF7F2] border-white/20 focus:ring-magenta" />
                      <div>
                        <div className="text-[#4A2F1D] font-medium">Update All Details</div>
                        <div className="text-xs text-[#A67C65]">Overwrite price, category, name, and quantity (preserves images).</div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-[#E8DFD5]">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={createMissingCategories} 
                      onChange={(e) => setCreateMissingCategories(e.target.checked)} 
                      className="w-5 h-5 rounded border-white/20 bg-[#FAF7F2] text-[#9A424E] focus:ring-magenta"
                    />
                    <span className="text-[#4A2F1D] font-medium">Create missing categories automatically</span>
                  </label>
                  <p className="text-xs text-[#A67C65] mt-1 pl-8">If unchecked, uncategorized products will fallback to standard defaults.</p>
                </div>
                
                <button 
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-magenta to-orange hover:glow-magenta text-[#4A2F1D] font-bold rounded-xl transition-all flex justify-center items-center gap-2"
                >
                  Confirm & Execute Import <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-2">
            {/* PREVIEW AREA */}
            {!previewData ? (
              <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center">
                <FileSpreadsheet size={64} className="text-[#4A2F1D]/10 mb-4" />
                <h3 className="text-xl font-bold text-[#4A2F1D] mb-2">Workbook Preview</h3>
                <p className="text-[#A67C65] max-w-md">Upload an Excel file and click preview to see detected sheets, valid rows, and potential duplicates before making any changes.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-[#E8DFD5] rounded-xl p-4">
                    <div className="text-2xl font-bold text-[#4A2F1D] mb-1">{previewData.summary.sheetsDetected}</div>
                    <div className="text-xs text-[#A67C65] uppercase">Sheets Found</div>
                  </div>
                  <div className="bg-white border border-[#E8DFD5] rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-400 mb-1">{previewData.summary.validRows}</div>
                    <div className="text-xs text-[#A67C65] uppercase">Valid Rows</div>
                  </div>
                  <div className="bg-white border border-[#E8DFD5] rounded-xl p-4">
                    <div className="text-2xl font-bold text-red-400 mb-1">{previewData.summary.invalidRows}</div>
                    <div className="text-xs text-[#A67C65] uppercase">Invalid Rows</div>
                  </div>
                  <div className="bg-white border border-[#E8DFD5] rounded-xl p-4">
                    <div className="text-2xl font-bold text-[#C0602F]-400 mb-1">{previewData.summary.possibleDuplicates}</div>
                    <div className="text-xs text-[#A67C65] uppercase">Duplicates</div>
                  </div>
                </div>

                {/* Sheets Table */}
                <div className="bg-white border border-[#E8DFD5] rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-[#E8DFD5] bg-[#FAF7F2]">
                    <h3 className="text-lg font-bold text-[#4A2F1D]">Detected Departments (Sheets)</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#FAF7F2] text-xs uppercase tracking-wider text-[#A67C65]">
                          <th className="p-4 font-medium">Sheet Name</th>
                          <th className="p-4 font-medium">Mapped Department</th>
                          <th className="p-4 font-medium">Valid</th>
                          <th className="p-4 font-medium">Invalid</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {previewData.sheets.map((s, i) => (
                          <tr key={i} className="hover:bg-[#FAF7F2]">
                            <td className="p-4 text-sm text-[#4A2F1D] font-medium">{s.sheetName}</td>
                            <td className="p-4 text-sm text-[#7C5A48]">{s.department}</td>
                            <td className="p-4 text-sm text-green-400">{s.validRows}</td>
                            <td className="p-4 text-sm text-red-400">{s.invalidRows}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Preview Rows */}
                <div className="bg-white border border-[#E8DFD5] rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-[#E8DFD5] bg-[#FAF7F2] flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#4A2F1D]">Preview Data (First 100 rows)</h3>
                  </div>
                  <div className="overflow-x-auto max-h-[500px]">
                    <table className="w-full text-left border-collapse relative">
                      <thead className="sticky top-0 bg-white shadow-md">
                        <tr className="bg-[#FAF7F2] text-xs uppercase tracking-wider text-[#A67C65]">
                          <th className="p-4 font-medium whitespace-nowrap">Code</th>
                          <th className="p-4 font-medium">Product Name</th>
                          <th className="p-4 font-medium">Category Map</th>
                          <th className="p-4 font-medium">Qty</th>
                          <th className="p-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {previewData.previewRows.map((r, i) => (
                          <tr key={i} className={`hover:bg-[#FAF7F2] ${r.isDuplicate ? 'bg-orange-500/5' : ''}`}>
                            <td className="p-4 text-sm text-[#7C5A48] font-mono">{r.productCode}</td>
                            <td className="p-4 text-sm text-[#4A2F1D] font-medium">
                              {r.name}
                              {r.isDuplicate && <span className="ml-2 inline-block px-2 py-0.5 bg-orange-500/20 text-[#C0602F]-400 text-[10px] rounded uppercase font-bold">Duplicate</span>}
                            </td>
                            <td className="p-4 text-sm text-[#A67C65]">{r.categoryName}</td>
                            <td className="p-4 text-sm text-[#7C5A48]">{r.quantity}</td>
                            <td className="p-4 text-sm">
                              <span className={`px-2 py-1 rounded-md text-xs font-medium ${r.quantity > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {r.quantity > 0 ? 'Available' : 'Out of Stock'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !isExecuting && setShowConfirmModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white border border-[#E8DFD5] rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-[#4A2F1D] mb-4">Execute Import?</h2>
              <p className="text-[#A67C65] mb-6">You are about to process <strong className="text-[#4A2F1D]">{previewData?.summary.validRows}</strong> products from <strong>{file?.name}</strong>.</p>
              
              <div className="bg-[#FAF7F2] rounded-xl p-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#A67C65]">Duplicate Mode:</span>
                  <span className="text-[#4A2F1D] font-medium">{duplicateMode === 'skip' ? 'Skip Existing' : duplicateMode === 'update_quantity' ? 'Update Quantity' : 'Update All'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A67C65]">Missing Categories:</span>
                  <span className="text-[#4A2F1D] font-medium">{createMissingCategories ? 'Auto-Create' : 'Use Default'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {isExecuting ? (
                  <div className="w-full text-center py-2">
                    <div className="mb-4 text-[#9A424E] font-semibold flex justify-center items-center gap-2">
                      <Loader2 size={20} className="animate-spin" /> Processing Workbook...
                    </div>
                    <div className="w-full bg-[#E8DFD5] rounded-full h-2.5 mb-2 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-magenta to-orange h-full w-[50%] animate-pulse" style={{ animationDuration: '1s' }}></div>
                    </div>
                    <p className="text-xs text-[#A67C65] mt-3">Please do not close or refresh this window. This may take a few moments depending on the file size.</p>
                  </div>
                ) : (
                  <div className="flex gap-4 w-full">
                    <button
                      onClick={() => setShowConfirmModal(false)}
                      className="flex-1 py-3 px-4 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#4A2F1D] rounded-xl transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleExecute}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-magenta to-orange hover:glow-magenta text-[#4A2F1D] rounded-xl transition-all font-bold flex justify-center items-center gap-2"
                    >
                      Import Now
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Clear Inventory Confirmation Modal */}
      <AnimatePresence>
        {showClearModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowClearModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#1e293b] border border-[#E8DFD5] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-red-400">
                  <div className="p-3 bg-red-500/10 rounded-full">
                    <AlertTriangle size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#4A2F1D]">Clear Entire Inventory?</h3>
                </div>
                
                <p className="text-[#7C5A48] mb-6 text-sm leading-relaxed">
                  This will permanently delete <span className="font-bold text-[#4A2F1D]">all products</span> from the inventory. 
                  Categories, admin accounts, and enquiries will not be deleted.
                  <br/><br/>
                  <span className="text-[#A67C65] text-xs italic">
                    Note: Unused Cloudinary assets are preserved and can be cleaned separately to prevent accidental deletion of shared media.
                  </span>
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-4 p-1 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5]">
                    <button
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${clearMode === 'products' ? 'bg-[#E8DFD5] text-[#4A2F1D]' : 'text-[#A67C65] hover:text-[#4A2F1D] hover:bg-[#FAF7F2]'}`}
                      onClick={() => { setClearMode('products'); setClearConfirmText(''); }}
                    >
                      Products Only
                    </button>
                    <button
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${clearMode === 'all' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-[#A67C65] hover:text-red-400 hover:bg-[#FAF7F2]'}`}
                      onClick={() => { setClearMode('all'); setClearConfirmText(''); }}
                    >
                      All Test Data
                    </button>
                  </div>
                
                  {clearMode === 'all' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-300">
                      <strong>Warning:</strong> This will delete ALL Products, Enquiries, Import History, and Notifications. Admins and Categories will be preserved.
                    </div>
                  )}

                  <div className="space-y-2 mt-4">
                    <label className="text-sm text-[#A67C65]">
                      Type <span className="font-bold text-red-400 select-none">{clearMode === 'all' ? 'RESET TEST DATA' : 'DELETE INVENTORY'}</span> to confirm:
                    </label>
                    <input 
                      type="text" 
                      value={clearConfirmText}
                      onChange={(e) => setClearConfirmText(e.target.value)}
                      className="w-full bg-[#0f172a] border border-[#E8DFD5] rounded-xl px-4 py-3 text-[#4A2F1D] focus:outline-none focus:border-red-500 transition-colors"
                      placeholder={clearMode === 'all' ? 'RESET TEST DATA' : 'DELETE INVENTORY'}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowClearModal(false)}
                    disabled={isClearing}
                    className="flex-1 px-4 py-3 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#4A2F1D] rounded-xl transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearInventory}
                    disabled={
                      (clearMode === 'products' && clearConfirmText !== 'DELETE INVENTORY') || 
                      (clearMode === 'all' && clearConfirmText !== 'RESET TEST DATA') || 
                      isClearing
                    }
                    className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-[#4A2F1D] rounded-xl transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    {isClearing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Clearing...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminInventoryImportPage;
