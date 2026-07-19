import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const AdminNotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <div className="bg-[#12121A] border border-white/5 rounded-2xl p-10 text-center max-w-md w-full shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-orange-500/10 text-orange-500 rounded-full">
            <AlertCircle size={48} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <h2 className="text-xl font-medium text-gray-300 mb-6">Page Not Found</h2>
        <p className="text-gray-400 text-sm mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/admin" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-magenta to-orange px-6 py-3 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
        >
          <Home size={20} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AdminNotFoundPage;
