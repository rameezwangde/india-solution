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
  Upload,
  Activity,
  AlertTriangle,
  Download,
  HelpCircle
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
    { name: 'Low Stock Centre', path: '/admin/low-stock', icon: <AlertTriangle size={20} /> },
    { name: 'Inventory Activity', path: '/admin/inventory-activity', icon: <Activity size={20} /> },
    { name: 'Import Inventory', path: '/admin/import-inventory', icon: <Upload size={20} /> },
    { name: 'Backups', path: '/admin/backups', icon: <Download size={20} /> },
    { name: 'Help & Guides', path: '/admin/help', icon: <HelpCircle size={20} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-[#E8DFD5] relative z-20 shadow-[4px_0_24px_rgba(74,47,29,0.02)]">
      <div className="p-8 pb-4 flex items-center justify-center">
        <Link to="/admin">
          <img src="/FULL LOGO COLOUR (1)-1.png" alt="India Solution" className="h-16 object-contain" onError={(e) => { e.target.onerror = null; e.target.src="/india-solution-logo.png" }} />
        </Link>
        <button className="md:hidden absolute right-4 top-8 text-[#A67C65]" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all font-semibold ${
                isActive 
                  ? 'bg-gradient-to-r from-[#9A424E] to-[#C0602F] text-[#4A2F1D] shadow-md' 
                  : 'text-[#7C5A48] hover:bg-[#FAF7F2] hover:text-[#4A2F1D]'
              }`
            }
          >
            {item.icon}
            <span className="text-[13px] tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mb-4">
        <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#9A424E] to-[#C0602F] flex items-center justify-center text-[#4A2F1D] font-bold text-sm shrink-0 shadow-sm">
              IS
            </div>
            <div className="overflow-hidden">
              <p className="text-[13px] font-bold text-[#4A2F1D] truncate">{admin?.name || 'India Solution Admin'}</p>
              <p className="text-[11px] font-medium text-[#A67C65] truncate">{admin?.email || 'indiasolutionscrm@gmail.com'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#E8DFD5] hover:border-[#9A424E]/50 hover:bg-[#9A424E]/5 text-[#9A424E] rounded-xl transition-colors text-xs font-bold uppercase tracking-wider"
          >
            <LogOut size={16} strokeWidth={2.5} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex text-[#4A2F1D] font-sans selection:bg-[#C0602F] selection:text-[#4A2F1D] relative overflow-hidden">
      {/* Background Graphic */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -right-20 top-0 w-full md:w-[60%] h-[120%] object-cover object-left opacity-10 mix-blend-multiply" 
          style={{ transform: 'scaleX(-1)'}} 
        />
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="absolute -left-20 top-1/4 w-full md:w-[60%] h-[120%] object-cover object-left opacity-[0.07] mix-blend-multiply" 
        />
      </div>

      <aside className="hidden md:block w-72 fixed inset-y-0 z-20">
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
              className="fixed inset-0 bg-[#4A2F1D]/40 z-30 md:hidden backdrop-blur-sm"
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
        <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-[#E8DFD5] p-4 flex items-center justify-between sticky top-0 z-10">
          <Link to="/admin" className="text-lg font-bold text-[#4A2F1D] font-['Playfair_Display',serif]">
            India <span className="text-[#9A424E]">Admin</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-[#7C5A48] hover:text-[#C0602F] bg-[#FAF7F2] rounded-lg border border-[#E8DFD5]"
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
