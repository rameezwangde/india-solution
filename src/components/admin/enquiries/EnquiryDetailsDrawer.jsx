import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, Building2, MapPin, Calendar, Clock, Package, MessageSquare, Loader2, Save, AlertTriangle } from 'lucide-react';
import { updateEnquiryStatus } from '../../../api/enquiryService';
import { useToast } from '../../../context/ToastContext';

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
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles['Pending']}`}>
      {status}
    </span>
  );
};

const EnquiryDetailsDrawer = ({ isOpen, onClose, enquiry, onStatusUpdated }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(enquiry?.status || 'Pending');
  const [notes, setNotes] = useState(enquiry?.notes || '');
  
  const [showConfirmModal, setShowConfirmModal] = useState(null); // 'confirm' or 'cancel'
  const [insufficientItems, setInsufficientItems] = useState([]);
  
  const { success, error } = useToast();

  React.useEffect(() => {
    if (enquiry) {
      setStatus(enquiry.status);
      setNotes(enquiry.notes || '');
      setInsufficientItems([]);
      setShowConfirmModal(null);
    }
  }, [enquiry]);

  if (!isOpen || !enquiry) return null;

  const handleUpdate = () => {
    // Intercept Confirmed
    if (status === 'Confirmed' && status !== enquiry.status && (!enquiry.stockProcessed || enquiry.stockRestored)) {
      setShowConfirmModal('confirm');
      return;
    }
    // Intercept Cancelled
    if (status === 'Cancelled' && status !== enquiry.status && enquiry.stockProcessed && !enquiry.stockRestored) {
      setShowConfirmModal('cancel');
      return;
    }
    
    // Normal save
    executeSave();
  };

  const executeSave = async () => {
    try {
      setIsUpdating(true);
      setInsufficientItems([]);
      await updateEnquiryStatus(enquiry._id, status, notes);
      success('Enquiry updated successfully');
      setShowConfirmModal(null);
      onStatusUpdated();
    } catch (err) {
      if (err.response?.status === 409 && err.response?.data?.insufficientItems) {
        setInsufficientItems(err.response.data.insufficientItems);
      } else {
        error(err.response?.data?.message || 'Failed to update enquiry');
        if (!err.response?.data?.insufficientItems) setShowConfirmModal(null);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const hasChanges = status !== enquiry.status || notes !== (enquiry.notes || '');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { if(!showConfirmModal) onClose(); }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-white border-l border-[#E8DFD5] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E8DFD5] bg-[#FAF7F2]">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-[#4A2F1D]">{enquiry.referenceNumber}</h2>
                  <StatusBadge status={enquiry.status} />
                </div>
                <p className="text-sm text-[#A67C65]">
                  Created {new Date(enquiry.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#A67C65] hover:text-[#4A2F1D] hover:bg-[#E8DFD5] rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Management Section */}
              <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#E8DFD5]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-[#A67C65] uppercase tracking-wider">Manage Status & Notes</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#A67C65] uppercase font-bold">Stock Status:</span>
                    {enquiry.stockProcessed && !enquiry.stockRestored && (
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] rounded uppercase font-bold border border-blue-500/20">Deducted</span>
                    )}
                    {enquiry.stockRestored && (
                      <span className="px-2 py-1 bg-gray-500/10 text-[#A67C65] text-[10px] rounded uppercase font-bold border border-gray-500/20">Restored</span>
                    )}
                    {!enquiry.stockProcessed && (
                      <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] rounded uppercase font-bold border border-yellow-500/20">Not Processed</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#7C5A48] mb-2">Enquiry Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full bg-white border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:outline-none focus:border-magenta"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Quotation Sent">Quotation Sent</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#7C5A48] mb-2">Admin Notes (Internal)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Add internal notes here..."
                      className="w-full bg-white border border-[#E8DFD5] rounded-lg px-4 py-2.5 text-[#4A2F1D] focus:outline-none focus:border-magenta resize-none"
                    />
                  </div>

                  {hasChanges && (
                    <button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className="w-full bg-[#9A424E] hover:bg-[#9A424E]-600 text-[#4A2F1D] font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {isUpdating ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                      Save Changes
                    </button>
                  )}
                </div>
              </div>

              {/* Customer Details */}
              <div>
                <h3 className="text-sm font-bold text-[#A67C65] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User size={16} /> Customer Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF7F2] rounded-2xl p-5 border border-[#E8DFD5]">
                  <div>
                    <p className="text-xs text-[#A67C65] mb-1">Full Name</p>
                    <p className="text-[#4A2F1D] font-medium">{enquiry.customerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A67C65] mb-1">Company</p>
                    <div className="flex items-center gap-2 text-[#4A2F1D] font-medium">
                      <Building2 size={14} className="text-[#A67C65]" />
                      {enquiry.companyName || '-'}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#A67C65] mb-1">Phone</p>
                    <div className="flex items-center gap-2 text-[#4A2F1D] font-medium">
                      <Phone size={14} className="text-[#A67C65]" />
                      <a href={`tel:${enquiry.phone}`} className="hover:text-[#9A424E] transition-colors">{enquiry.phone}</a>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#A67C65] mb-1">Email</p>
                    <div className="flex items-center gap-2 text-[#4A2F1D] font-medium">
                      <Mail size={14} className="text-[#A67C65]" />
                      {enquiry.email ? (
                        <a href={`mailto:${enquiry.email}`} className="hover:text-[#9A424E] transition-colors break-all">{enquiry.email}</a>
                      ) : (
                        '-'
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div>
                <h3 className="text-sm font-bold text-[#A67C65] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calendar size={16} /> Event Details
                </h3>
                <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#E8DFD5] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#A67C65] mb-1">Event Date</p>
                      <div className="flex items-center gap-2 text-[#4A2F1D] font-medium">
                        <Clock size={14} className="text-[#A67C65]" />
                        {enquiry.eventDate ? new Date(enquiry.eventDate).toLocaleDateString() : '-'}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#A67C65] mb-1">City</p>
                      <p className="text-[#4A2F1D] font-medium">{enquiry.city || '-'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-[#A67C65] mb-1">Location / Venue</p>
                    <div className="flex items-center gap-2 text-[#4A2F1D] font-medium">
                      <MapPin size={14} className="text-[#A67C65]" />
                      {enquiry.eventLocation || '-'}
                    </div>
                  </div>

                  {enquiry.message && (
                    <div>
                      <p className="text-xs text-[#A67C65] mb-1">Message from Customer</p>
                      <div className="bg-black/20 p-4 rounded-xl text-[#7C5A48] text-sm mt-1 whitespace-pre-wrap flex items-start gap-3">
                        <MessageSquare size={16} className="text-[#A67C65] flex-shrink-0 mt-0.5" />
                        {enquiry.message}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-sm font-bold text-[#A67C65] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Package size={16} /> Requested Items ({enquiry.totalItems})
                </h3>
                <div className="space-y-3">
                  {enquiry.products.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-3">
                      {item.product?.image?.url ? (
                        <img src={item.product.image.url} alt={item.productName} className="w-16 h-16 object-cover rounded-lg bg-black/20" />
                      ) : (
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-[#E8DFD5]">
                          <Package size={20} className="text-[#A67C65]" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="text-xs text-[#9A424E] mb-0.5">{item.product?.productCode || item.product?.code || 'N/A'}</div>
                        <h4 className="font-bold text-[#4A2F1D] text-sm">{item.productName}</h4>
                      </div>
                      <div className="px-4 py-2 bg-white rounded-lg border border-[#E8DFD5] text-center min-w-[80px]">
                        <p className="text-[10px] text-[#A67C65] mb-0.5">QTY</p>
                        <p className="font-bold text-[#4A2F1D]">{item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="h-8"></div> {/* Bottom padding spacer */}
            </div>
          </motion.div>
          
          {/* CONFIRM / CANCEL MODAL OVERLAY */}
          {showConfirmModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowConfirmModal(null)} />
              <div className="relative bg-white border border-[#E8DFD5] rounded-2xl p-6 max-w-lg w-full shadow-2xl">
                <h3 className="text-xl font-bold text-[#4A2F1D] mb-2">
                  {showConfirmModal === 'confirm' ? 'Confirm Enquiry' : 'Cancel Confirmed Enquiry'}
                </h3>
                <p className="text-[#A67C65] mb-6 text-sm">
                  {showConfirmModal === 'confirm' 
                    ? 'Confirming this enquiry will reduce the available inventory quantities.'
                    : 'Cancelling this enquiry will restore the deducted inventory quantities.'}
                </p>
                
                {insufficientItems.length > 0 && (
                  <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-red-400 font-bold mb-3">
                      <AlertTriangle size={18} /> Insufficient Stock
                    </div>
                    <div className="space-y-2">
                      {insufficientItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-black/20 p-2 rounded-lg text-sm">
                          <span className="text-[#7C5A48] truncate pr-2">{item.productName}</span>
                          <span className="text-red-400 font-mono whitespace-nowrap">Need {item.requested} (Have {item.available})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {!insufficientItems.length && showConfirmModal === 'confirm' && (
                  <div className="mb-6 space-y-2 max-h-60 overflow-y-auto pr-2">
                    {enquiry.products.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-[#FAF7F2] p-3 rounded-lg text-sm border border-[#E8DFD5]">
                        <span className="text-[#7C5A48] truncate pr-2 font-medium">{item.productName}</span>
                        <div className="flex gap-4 text-right">
                          <div>
                            <div className="text-[10px] text-[#A67C65]">Request</div>
                            <div className="text-[#4A2F1D] font-bold">{item.quantity}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[#A67C65]">Available</div>
                            <div className={`font-bold ${item.product?.quantity >= item.quantity ? 'text-green-400' : 'text-red-400'}`}>
                              {item.product?.quantity || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowConfirmModal(null)}
                    disabled={isUpdating}
                    className="flex-1 py-2.5 px-4 bg-[#FAF7F2] hover:bg-[#E8DFD5] text-[#4A2F1D] rounded-lg transition-colors font-medium"
                  >
                    Close
                  </button>
                  {insufficientItems.length === 0 && (
                    <button
                      onClick={executeSave}
                      disabled={isUpdating}
                      className="flex-1 py-2.5 px-4 bg-gradient-to-r from-magenta to-orange hover:glow-magenta text-[#4A2F1D] rounded-lg transition-all font-bold flex justify-center items-center gap-2"
                    >
                      {isUpdating ? <Loader2 size={18} className="animate-spin" /> : null}
                      {showConfirmModal === 'confirm' ? 'Confirm and Update Inventory' : 'Cancel and Restore Inventory'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquiryDetailsDrawer;
