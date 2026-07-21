import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';
import AdminInventoryImportPage from './pages/admin/AdminInventoryImportPage';
import AdminDepartmentsPage from './pages/admin/AdminDepartmentsPage';
import AdminInventoryActivityPage from './pages/admin/AdminInventoryActivityPage';
import AdminProductDetailsPage from './pages/admin/AdminProductDetailsPage';
import AdminLowStockPage from './pages/admin/AdminLowStockPage';
import AdminBackupsPage from './pages/admin/AdminBackupsPage';
import AdminHelpPage from './pages/admin/AdminHelpPage';
import AdminNotFoundPage from './pages/admin/AdminNotFoundPage';

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#4A2F1D] font-sans selection:bg-[#A67C65] selection:text-white overflow-x-hidden">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

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
  );
}

export default App;