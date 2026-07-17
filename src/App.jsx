import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ToastProvider } from './context/ToastContext';
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
import { AdminEnquiriesPage } from './pages/admin/AdminPlaceholders';

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-navy-900 text-white font-sans selection:bg-magenta selection:text-white overflow-x-hidden">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <ToastProvider>
      <AdminAuthProvider>
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
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
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
    </AdminAuthProvider>
    </ToastProvider>
  );
}

export default App;