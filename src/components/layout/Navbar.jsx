import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Download, ShoppingCart, User } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'TESTIMONIALS', path: '/testimonials' },
    { name: 'CAREERS', path: '/careers' },
    { name: 'CONTACT US', path: '/contact' },
    { name: 'PRODUCTS', path: '/inventory-demo' },
  ];

  const isActiveLink = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="absolute w-full z-50 bg-transparent">
      {/* Top Contact Strip */}
      <div className="hidden lg:block border-b border-[#8B5E45]/10">
        <div className="container mx-auto px-6 lg:px-12 py-1.5 flex justify-between items-center text-[12px] text-[#1A0F0A] font-bold tracking-wide">
          <div className="flex items-center gap-6">
            <a href="tel:+916360181932" className="flex items-center gap-2 hover:text-[#4A2F1D] transition-colors">
              <Phone size={14} className="text-[#4A2F1D]" /> +91 6360181932
            </a>
            <span className="text-[#8B5E45]/50">|</span>
            <a href="mailto:info@india-solution.com" className="flex items-center gap-2 hover:text-[#4A2F1D] transition-colors">
              <Mail size={14} className="text-[#4A2F1D]" /> info@india-solution.com
            </a>
          </div>
          <div className="flex items-center gap-2">
             <MapPin size={14} className="text-[#4A2F1D]" />
             <span>Mallathahalli, Bengaluru — Karnataka 560056</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-4 xl:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center justify-center shrink-0 gap-0 mr-2 xl:mr-0" aria-label="India Solution home">
            <img
              src="/new logo.png"
              alt="India Solution Logo"
              className="w-auto object-contain relative z-10 h-20 sm:h-24 xl:h-32"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10 xl:mr-8">
            {navLinks.map((link) => {
              const active = isActiveLink(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[10.5px] xl:text-[12px] font-black tracking-wider transition-colors relative group whitespace-nowrap
                    ${active ? 'text-[#C0602F]' : 'text-[#4A2F1D] hover:text-[#1A0F0A]'}`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C0602F]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 xl:gap-6">
            <div className="flex items-center gap-3 xl:gap-5">
              <Link to="/inventory-demo" className="flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-lg bg-[#C0602F] text-white font-medium text-[14px] xl:text-[15px] hover:bg-[#A05025] transition-colors shadow-sm">
                <ShoppingCart size={18} strokeWidth={2.5} /> <span className="hidden xl:inline">Cart</span> {totalItems > 0 && `(${totalItems})`}
              </Link>
              <div className="flex flex-col gap-1 items-center ml-1 xl:ml-2">
                <Link to="/membership" className="flex items-center justify-center gap-1.5 px-3 xl:px-4 py-1.5 rounded-md border border-[#C0602F] text-[#C0602F] font-bold text-[11px] xl:text-[12px] hover:bg-[#C0602F] hover:text-white transition-colors shadow-sm whitespace-nowrap w-full">
                  <User size={12} strokeWidth={2.5} /> <span>Membership</span>
                </Link>
                <Link to="/admin" className="flex items-center justify-center gap-1 px-2 py-1 rounded border border-[#C0602F] bg-[#F5E6DA] text-[#C0602F] font-bold text-[10px] xl:text-[11px] hover:bg-[#C0602F] hover:text-white transition-colors whitespace-nowrap w-full">
                  <User size={10} strokeWidth={2.5} /> <span>Admin Login</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-[#8B5E45]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAF7F2] border-t border-[#8B5E45]/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-bold tracking-wide py-3 border-b border-[#8B5E45]/10 ${isActiveLink(link.path) ? 'text-[#C0602F]' : 'text-[#8B5E45]'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 py-4 border-t border-[#8B5E45]/10 mt-2">
                 <Link to="/inventory-demo" className="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-md bg-[#C0602F] text-white font-semibold text-[14px]">
                   <ShoppingCart size={16} strokeWidth={2.5} /> Cart {totalItems > 0 && `(${totalItems})`}
                 </Link>
                 <Link to="/membership" className="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-md border-[1.5px] border-[#C0602F] text-[#C0602F] font-semibold text-[14px] hover:bg-[#C0602F] hover:text-white transition-colors">
                   <User size={16} strokeWidth={2.5} /> Login
                 </Link>
                 <Link to="/admin" className="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-md border border-transparent text-[#C0602F] font-semibold text-[14px] hover:bg-[#F5E6DA] transition-colors">
                   <User size={16} strokeWidth={2.5} /> Admin Login
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;