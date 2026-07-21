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
    { name: 'GALLERY', path: '/gallery' },
    { name: 'SERVICES', path: '/services' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'TESTIMONIALS', path: '/testimonials' },
    { name: 'FAQ', path: '/faq' },
    { name: 'CAREERS', path: '/careers' },
    { name: 'PRODUCTS', path: '/inventory-demo' },
  ];

  const isActiveLink = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#FAF7F2]/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      {/* Top Contact Strip */}
      <div className={`hidden lg:block border-b border-[#8B5E45]/10 transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
        <div className="container mx-auto px-6 lg:px-12 py-1.5 flex justify-between items-center text-[11px] text-[#5c4033] font-medium">
          <div className="flex items-center gap-6">
            <a href="tel:+916360181932" className="flex items-center gap-2 hover:text-[#946247] transition-colors">
              <Phone size={12} className="text-[#946247]" /> +91 6360181932
            </a>
            <span className="text-[#8B5E45]/30">|</span>
            <a href="mailto:info@india-solution.com" className="flex items-center gap-2 hover:text-[#946247] transition-colors">
              <Mail size={12} className="text-[#946247]" /> info@india-solution.com
            </a>
          </div>
          <div className="flex items-center gap-2">
             <MapPin size={12} className="text-[#946247]" />
             <span>Battahalasur, Bangalore — Karnataka 560001</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center justify-center shrink-0 gap-0" aria-label="India Solution home">
            <img
              src="/logo-only.png"
              alt="India Solution Logo"
              className="h-10 w-auto object-contain sm:h-12 relative z-10"
              style={{ filter: 'brightness(1)' }}
            />
            <img
              src="/text-logo-new.png"
              alt="India Solution"
              className="h-4 w-auto object-contain sm:h-5 mt-1 relative z-20"
              style={{ filter: 'brightness(0) saturate(100%) invert(51%) sepia(16%) saturate(1022%) hue-rotate(339deg) brightness(90%) contrast(85%)' }}
            />
            <img
              src="/text-logo-2.png"
              alt="Experience anything and everything"
              className="h-2 w-auto object-contain sm:h-2.5 mt-0.5 relative z-30 opacity-70"
              style={{ filter: 'brightness(0)' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => {
              const active = isActiveLink(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[11px] font-bold tracking-wider transition-colors relative group
                    ${active ? 'text-[#C0602F]' : 'text-[#8B5E45]/70 hover:text-[#946247]'}`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C0602F]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-5">
              <Link to="/inventory-demo" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C0602F] text-white font-medium text-[15px] hover:bg-[#A05025] transition-colors shadow-sm">
                <ShoppingCart size={18} strokeWidth={2.5} /> Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
              <Link to="/admin" className="flex items-center gap-2 text-[#C0602F] font-medium text-[15px] hover:text-[#A05025] transition-colors">
                <User size={20} strokeWidth={2.5} /> Login
              </Link>
            </div>
            
            <div className="flex gap-3 ml-2 text-[#8B5E45]/70 border-l border-[#8B5E45]/20 pl-6">
              <a href="#" className="hover:text-[#946247] transition-colors"><FaFacebookF size={14} /></a>
              <a href="#" className="hover:text-[#946247] transition-colors"><FaInstagram size={14} /></a>
              <a href="#" className="hover:text-[#946247] transition-colors"><FaYoutube size={14} /></a>
              <a href="#" className="hover:text-[#946247] transition-colors"><FaLinkedinIn size={14} /></a>
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
              <div className="flex items-center gap-4 py-4">
                 <Link to="/inventory-demo" className="flex-1 flex justify-center items-center gap-2 px-4 py-3 rounded-md bg-[#C0602F] text-white font-semibold text-[14px]">
                   <ShoppingCart size={16} strokeWidth={2.5} /> Cart {totalItems > 0 && `(${totalItems})`}
                 </Link>
                 <Link to="/admin" className="flex-1 flex justify-center items-center gap-2 px-4 py-3 rounded-md border border-[#C0602F] text-[#C0602F] font-semibold text-[14px]">
                   <User size={16} strokeWidth={2.5} /> Login
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