import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 3s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const success = (msg) => addToast(msg, 'success');
  const error = (msg) => addToast(msg, 'error');

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border pointer-events-auto ${
                t.type === 'success' 
                  ? 'bg-green-900/90 border-green-500/30 text-green-400' 
                  : 'bg-red-900/90 border-red-500/30 text-red-400'
              } backdrop-blur-md min-w-[250px]`}
            >
              {t.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
              <span className="font-medium text-sm flex-1 text-white">{t.message}</span>
              <button onClick={() => removeToast(t.id)} className="opacity-70 hover:opacity-100 transition-opacity text-white">
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
