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
    { name: 'Departments', path: '/admin/inventory-departments', icon: <Package size={20} /> },
    { name: 'Categories', path: '/admin/categories', icon: <Tags size={20} /> },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <MessageSquare size={20} /> },
    { name: 'Import Inventory', path: '/admin/import-inventory', icon: <Upload size={20} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0B0A10] border-r border-white/5 relative z-20">
      <div className="p-8 pb-4 flex items-center justify-center">
        <Link to="/admin">
          <img src="/FULL LOGO COLOUR (1)-1.png" alt="India Solution" className="h-16 object-contain" onError={(e) => { e.target.onerror = null; e.target.src="/india-solution-logo.png" }} />
        </Link>
        <button className="md:hidden absolute right-4 top-8 text-gray-400" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all font-medium ${
                isActive 
                  ? 'bg-gradient-to-r from-magenta to-orange/80 text-white shadow-[0_0_15px_rgba(233,30,99,0.3)] border border-white/10' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mb-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-magenta to-orange flex items-center justify-center text-white font-bold text-sm shrink-0">
              IS
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{admin?.name || 'India Solution Admin'}</p>
              <p className="text-[10px] text-gray-400 truncate">{admin?.email || 'indiasolutionscrm@gmail.com'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-red-400 rounded-xl transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen bg-[#0B0A10] flex text-gray-100 font-sans selection:bg-magenta selection:text-white relative overflow-hidden"
    >
      {/* Background Graphic */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/bg image.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4
        }}
      ></div>

      <aside className="hidden md:block w-72 fixed inset-y-0 z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
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
              className="fixed inset-0 bg-black/80 z-30 md:hidden backdrop-blur-sm"
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

      <main className="flex-1 md:pl-72 flex flex-col min-h-screen relative z-10 bg-transparent">
        <header className="md:hidden bg-[#0B0A10]/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-10">
          <Link to="/admin" className="text-lg font-bold text-white">
            India <span className="text-magenta">Admin</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg border border-white/10"
          >
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 p-6 lg:p-10 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
