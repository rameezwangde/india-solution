import React, { useState, useEffect } from 'react';
import { Download, Upload, AlertTriangle, FileJson, Loader2, Database, History, RefreshCw, CheckCircle, Save } from 'lucide-react';
import { getBackupHistory, generateBackup, previewRestore, executeRestore } from '../../api/backupService';
import { useToast } from '../../context/ToastContext';
import { format } from 'date-fns';

const AdminBackupsPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Restore State
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [mode, setMode] = useState('merge');
  const [confirmation, setConfirmation] = useState('');
  
  const { showToast } = useToast();

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await getBackupHistory();
      setHistory(res.backups);
    } catch (err) {
      showToast('Failed to load backup history', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      const res = await generateBackup();
      
      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const contentDisposition = res.headers['content-disposition'];
      let filename = `backup.json`;
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
      
      showToast('Backup generated successfully', 'success');
      fetchHistory();
    } catch (err) {
      showToast('Failed to generate backup', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    if (selectedFile.type !== 'application/json' && !selectedFile.name.endsWith('.json')) {
      showToast('Only JSON backup files are allowed', 'error');
      return;
    }
    
    setFile(selectedFile);
    setIsPreviewing(true);
    setPreviewData(null);
    setConfirmation('');
    
    try {
      const res = await previewRestore(selectedFile);
      setPreviewData(res);
      showToast('Backup parsed successfully', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to parse backup', 'error');
      setFile(null);
    } finally {
      setIsPreviewing(false);
    }
  };

  const handleRestore = async (e) => {
    e.preventDefault();
    if (mode === 'replace' && confirmation !== 'RESTORE AND REPLACE') {
      showToast('Invalid confirmation text', 'error');
      return;
    }
    
    try {
      setIsRestoring(true);
      await executeRestore(file, mode, confirmation);
      showToast('Restore completed successfully', 'success');
      setFile(null);
      setPreviewData(null);
      setConfirmation('');
      setMode('merge');
      fetchHistory();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to restore backup', 'error');
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Backups & Restore</h1>
          <p className="text-gray-400">Manage database backups and restore application state.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Create Backup */}
        <div className="bg-[#12121A] border border-white/5 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
              <Download size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create Backup</h2>
              <p className="text-sm text-gray-400">Download a full application state snapshot</p>
            </div>
          </div>
          
          <div className="bg-gray-800/30 border border-gray-700/50 p-4 rounded-xl mb-6">
            <h3 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Database size={16} className="text-gray-400" /> Included in Backup
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Products & Categories</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Enquiries</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Import History</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Inventory Activity logs</li>
            </ul>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {isGenerating ? 'Generating Backup...' : 'Generate & Download Backup'}
          </button>
        </div>

        {/* Restore Backup */}
        <div className="bg-[#12121A] border border-white/5 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
              <Upload size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Restore Backup</h2>
              <p className="text-sm text-gray-400">Upload a JSON backup file to restore</p>
            </div>
          </div>

          {!previewData ? (
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center bg-gray-800/20 hover:bg-gray-800/40 transition-colors relative">
              <input 
                type="file" 
                accept=".json,application/json" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isPreviewing}
              />
              {isPreviewing ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin text-orange-500" size={32} />
                  <p className="text-gray-400 text-sm mt-2">Parsing backup file...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 pointer-events-none">
                  <FileJson className="text-gray-500 mb-2" size={32} />
                  <p className="text-white font-medium">Click or drag a .json backup file here</p>
                  <p className="text-gray-500 text-xs">Maximum file size: 50MB</p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleRestore} className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex justify-between items-start mb-4 border-b border-gray-700 pb-4">
                  <div>
                    <h3 className="text-white font-medium">{previewData.metadata.application}</h3>
                    <p className="text-xs text-gray-400">Created: {format(new Date(previewData.metadata.createdAt), 'PPpp')}</p>
                  </div>
                  <button type="button" onClick={() => setPreviewData(null)} className="text-gray-400 hover:text-white text-xs underline">
                    Cancel
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Products in Backup</p>
                    <p className="text-white font-medium">{previewData.metadata.recordCounts?.products || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Existing Products</p>
                    <p className="text-white font-medium">{previewData.existingCounts?.products || 0}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Restore Mode</label>
                <select 
                  value={mode} 
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                >
                  <option value="merge">Merge (Create new, skip existing)</option>
                  <option value="update">Update Matching (Overwrite existing by ID)</option>
                  <option value="replace">Replace Operational Data (Wipe & Restore)</option>
                </select>
              </div>

              {mode === 'replace' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="text-red-500 shrink-0" size={20} />
                    <p className="text-sm text-red-400 font-medium leading-tight">
                      DANGER: This will delete all current operational data before restoring the backup.
                    </p>
                  </div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 mt-2">Type "RESTORE AND REPLACE" to confirm</label>
                  <input 
                    type="text" 
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    placeholder="RESTORE AND REPLACE"
                    required
                    className="w-full bg-gray-900 border border-red-500/50 rounded-lg px-4 py-2 text-white outline-none"
                  />
                </div>
              )}

              <button 
                type="submit"
                disabled={isRestoring || (mode === 'replace' && confirmation !== 'RESTORE AND REPLACE')}
                className="w-full flex items-center justify-center gap-2 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
              >
                {isRestoring ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                {isRestoring ? 'Restoring...' : 'Confirm Restore'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* History */}
      <div className="bg-[#12121A] border border-white/5 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-gray-800/30">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <History size={18} className="text-magenta" /> Backup History
          </h2>
          <button onClick={fetchHistory} className="text-gray-400 hover:text-white transition-colors">
            <RefreshCw size={18} />
          </button>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="animate-spin text-magenta mx-auto" size={24} />
          </div>
        ) : history.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No backup history found.
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-gray-400 text-sm">
                  <th className="p-4 font-medium">Filename</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Size</th>
                  <th className="p-4 font-medium">Products</th>
                  <th className="p-4 font-medium">Created By</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {history.map(item => (
                  <tr key={item._id} className="hover:bg-white/5 transition-colors text-sm">
                    <td className="p-4 text-white font-medium">{item.fileName}</td>
                    <td className="p-4 text-gray-300 capitalize">{item.backupType}</td>
                    <td className="p-4 text-gray-400">{(item.fileSize / 1024 / 1024).toFixed(2)} MB</td>
                    <td className="p-4 text-gray-300">{item.recordCounts?.products || 0}</td>
                    <td className="p-4 text-gray-400">{item.createdBy}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${
                        item.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        item.status === 'restored' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">
                      {format(new Date(item.createdAt), 'PP p')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminBackupsPage;
