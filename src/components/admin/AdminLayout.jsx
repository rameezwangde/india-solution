import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  MessageSquare, 
  LogOut, 
  Menu,
  X,
  Upload
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminLayout = () => {
  const { admin, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Categories', path: '/admin/categories', icon: <Tags size={20} /> },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <MessageSquare size={20} /> },
    { name: 'Import Inventory', path: '/admin/import-inventory', icon: <Upload size={20} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-navy-900 border-r border-white/10">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <Link to="/admin" className="text-xl font-bold text-white">
          India <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta to-orange">Admin</span>
        </Link>
        <button className="md:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-magenta/20 to-orange/20 text-white border border-magenta/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="mb-4 px-4">
          <p className="text-sm font-medium text-white truncate">{admin?.name || 'Administrator'}</p>
          <p className="text-xs text-gray-500 truncate">{admin?.email}</p>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-navy-800 flex text-gray-100 font-sans selection:bg-magenta selection:text-white">
      <aside className="hidden md:block w-64 fixed inset-y-0 z-20">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-30 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 z-40 md:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <header className="md:hidden bg-navy-900 border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-10">
          <Link to="/admin" className="text-lg font-bold text-white">
            India <span className="text-magenta">Admin</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
