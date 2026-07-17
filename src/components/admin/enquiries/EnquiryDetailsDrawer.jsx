import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, Building2, MapPin, Calendar, Clock, Package, MessageSquare, Loader2, Save } from 'lucide-react';
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
  const { success, error } = useToast();

  // Reset local state when enquiry changes
  React.useEffect(() => {
    if (enquiry) {
      setStatus(enquiry.status);
      setNotes(enquiry.notes || '');
    }
  }, [enquiry]);

  if (!isOpen || !enquiry) return null;

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      await updateEnquiryStatus(enquiry._id, status, notes);
      success('Enquiry updated successfully');
      onStatusUpdated();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to update enquiry');
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
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-navy-900 border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-white">{enquiry.referenceNumber}</h2>
                  <StatusBadge status={enquiry.status} />
                </div>
                <p className="text-sm text-gray-400">
                  Created {new Date(enquiry.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Management Section */}
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Manage Status & Notes</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Enquiry Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-magenta"
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">Admin Notes (Internal)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Add internal notes here..."
                      className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-magenta resize-none"
                    />
                  </div>

                  {hasChanges && (
                    <button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className="w-full bg-magenta hover:bg-magenta-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {isUpdating ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                      Save Changes
                    </button>
                  )}
                </div>
              </div>

              {/* Customer Details */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User size={16} /> Customer Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 rounded-2xl p-5 border border-white/10">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="text-white font-medium">{enquiry.customerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Company</p>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <Building2 size={14} className="text-gray-400" />
                      {enquiry.companyName || '-'}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <Phone size={14} className="text-gray-400" />
                      <a href={`tel:${enquiry.phone}`} className="hover:text-magenta transition-colors">{enquiry.phone}</a>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <Mail size={14} className="text-gray-400" />
                      {enquiry.email ? (
                        <a href={`mailto:${enquiry.email}`} className="hover:text-magenta transition-colors break-all">{enquiry.email}</a>
                      ) : (
                        '-'
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calendar size={16} /> Event Details
                </h3>
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Event Date</p>
                      <div className="flex items-center gap-2 text-white font-medium">
                        <Clock size={14} className="text-gray-400" />
                        {enquiry.eventDate ? new Date(enquiry.eventDate).toLocaleDateString() : '-'}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">City</p>
                      <p className="text-white font-medium">{enquiry.city || '-'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Location / Venue</p>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <MapPin size={14} className="text-gray-400" />
                      {enquiry.eventLocation || '-'}
                    </div>
                  </div>

                  {enquiry.message && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Message from Customer</p>
                      <div className="bg-black/20 p-4 rounded-xl text-gray-300 text-sm mt-1 whitespace-pre-wrap flex items-start gap-3">
                        <MessageSquare size={16} className="text-gray-500 flex-shrink-0 mt-0.5" />
                        {enquiry.message}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Package size={16} /> Requested Items ({enquiry.totalItems})
                </h3>
                <div className="space-y-3">
                  {enquiry.products.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-3">
                      {item.product?.image?.url ? (
                        <img src={item.product.image.url} alt={item.productName} className="w-16 h-16 object-cover rounded-lg bg-black/20" />
                      ) : (
                        <div className="w-16 h-16 bg-navy-900 rounded-lg flex items-center justify-center border border-white/10">
                          <Package size={20} className="text-gray-500" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="text-xs text-magenta mb-0.5">{item.product?.code || 'N/A'}</div>
                        <h4 className="font-bold text-white text-sm">{item.productName}</h4>
                      </div>
                      <div className="px-4 py-2 bg-navy-900 rounded-lg border border-white/10 text-center min-w-[80px]">
                        <p className="text-[10px] text-gray-500 mb-0.5">QTY</p>
                        <p className="font-bold text-white">{item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="h-8"></div> {/* Bottom padding spacer */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquiryDetailsDrawer;
