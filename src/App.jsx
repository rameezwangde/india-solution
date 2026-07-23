import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Testimonials from './pages/Testimonials';
import InventoryDemo from './pages/InventoryDemo';
import Gallery from './pages/Gallery';
import Footer from './components/layout/Footer';
import GlobalPrefetcher from './components/layout/GlobalPrefetcher';
import EnquiryCartBar from './components/inventory/EnquiryCartBar';
const EnquiryCartModal = lazy(() => import('./components/inventory/EnquiryCartModal'));
import { useCart } from './context/CartContext';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';

// Lazy loaded Admin Pages (Code Splitting)
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminProductsPage = lazy(() => import('./pages/admin/AdminProductsPage'));
const AdminCategoriesPage = lazy(() => import('./pages/admin/AdminCategoriesPage'));
const AdminEnquiriesPage = lazy(() => import('./pages/admin/AdminEnquiriesPage'));
const AdminInventoryImportPage = lazy(() => import('./pages/admin/AdminInventoryImportPage'));
const AdminDepartmentsPage = lazy(() => import('./pages/admin/AdminDepartmentsPage'));
const AdminInventoryActivityPage = lazy(() => import('./pages/admin/AdminInventoryActivityPage'));
const AdminProductDetailsPage = lazy(() => import('./pages/admin/AdminProductDetailsPage'));
const AdminLowStockPage = lazy(() => import('./pages/admin/AdminLowStockPage'));
const AdminBackupsPage = lazy(() => import('./pages/admin/AdminBackupsPage'));
const AdminHelpPage = lazy(() => import('./pages/admin/AdminHelpPage'));
const AdminNotFoundPage = lazy(() => import('./pages/admin/AdminNotFoundPage'));

const PublicLayout = ({ children }) => {
  const { cartItems, handleUpdateQuantity, handleRemoveItem, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#4A2F1D] font-sans selection:bg-[#A67C65] selection:text-white overflow-x-hidden">
      <GlobalPrefetcher />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />

      {/* Global Sticky Cart Bar */}
      <EnquiryCartBar 
        cartItems={cartItems} 
        onViewCart={() => setIsModalOpen(true)}
        onClearCart={clearCart}
      />

      {/* Global Modal */}
      <Suspense fallback={null}>
        {isModalOpen && (
          <EnquiryCartModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={clearCart}
          />
        )}
      </Suspense>
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
      <ToastProvider>
      <AdminAuthProvider>
        <CartProvider>
        <ErrorBoundary>
          <Router>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              
              <Route path="/admin" element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }>
                <Route element={
                  <Suspense fallback={
                    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-[#E8DFD5] border-t-[#A67C65] rounded-full animate-spin"></div>
                        <p className="text-[#A67C65] font-semibold text-sm tracking-widest uppercase">Loading Workspace...</p>
                      </div>
                    </div>
                  }>
                    <Outlet />
                  </Suspense>
                }>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="products/:id" element={<AdminProductDetailsPage />} />
                  <Route path="low-stock" element={<AdminLowStockPage />} />
                  <Route path="inventory-departments" element={<AdminDepartmentsPage />} />
                  <Route path="inventory-departments/:departmentSlug" element={<AdminProductsPage />} />
                  <Route path="categories" element={<AdminCategoriesPage />} />
                  <Route path="enquiries" element={<AdminEnquiriesPage />} />
                  <Route path="inventory-activity" element={<AdminInventoryActivityPage />} />
                  <Route path="import-inventory" element={<AdminInventoryImportPage />} />
                  <Route path="backups" element={<AdminBackupsPage />} />
                  <Route path="help" element={<AdminHelpPage />} />
                  <Route path="*" element={<AdminNotFoundPage />} />
                </Route>
              </Route>

              {/* Public Routes */}
              <Route path="/*" element={
                <PublicLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
                    <Route path="/services/:serviceSlug/:itemSlug" element={<ServiceDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/contact-us" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/testimonial" element={<Testimonials />} />
                    <Route path="/inventory-demo" element={<InventoryDemo />} />
                  </Routes>
                </PublicLayout>
              } />
            </Routes>
          </Router>
        </ErrorBoundary>
            </CartProvider>
          </AdminAuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;