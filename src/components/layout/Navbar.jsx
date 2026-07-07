import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Careers', path: '/careers' },
    { name: 'Inventory Demo', path: '/inventory-demo' },
  ];

  const isActiveLink = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass' : 'bg-transparent'}`}>
      {/* Top Contact Strip */}
      <div className={`hidden lg:block border-b border-white/5 transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
        <div className="container mx-auto px-6 lg:px-12 py-1 flex justify-between items-center text-xs text-gray-300">
          <div className="flex gap-6">
            <a href="tel:+916360181932" className="flex items-center gap-2 hover:text-magenta transition-colors">
              <Phone size={12} className="text-magenta" /> +91 6360181932
            </a>
            <a href="mailto:info@india-solution.com" className="flex items-center gap-2 hover:text-magenta transition-colors">
              <Mail size={12} className="text-magenta" /> info@india-solution.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Follow Us:</span>
            <div className="flex gap-3">
              <a href="#" className="hover:text-magenta transition-colors"><FaFacebookF size={12} /></a>
              <a href="#" className="hover:text-magenta transition-colors"><FaInstagram size={12} /></a>
              <a href="#" className="hover:text-magenta transition-colors"><FaYoutube size={12} /></a>
              <a href="#" className="hover:text-magenta transition-colors"><FaLinkedinIn size={12} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex flex-col items-center justify-center shrink-0 gap-0" aria-label="India Solution home">
            <img
              src="/logo-only.png"
              alt="India Solution Logo"
              className="h-10 w-auto object-contain drop-shadow-[0_0_22px_rgba(255,255,255,0.2)] sm:h-12 lg:h-14 relative z-10"
            />
            <img
              src="/text-logo-new.png"
              alt="India Solution"
              className="h-4 w-auto object-contain drop-shadow-[0_0_22px_rgba(255,255,255,0.2)] sm:h-5 lg:h-6 relative z-20"
              style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(74%) saturate(769%) hue-rotate(355deg) brightness(102%) contrast(106%)' }}
            />
            <img
              src="/text-logo-2.png"
              alt="Experience anything and everything"
              className="h-2.5 w-auto object-contain drop-shadow-[0_0_22px_rgba(255,255,255,0.2)] sm:h-3 lg:h-4 relative z-30"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[13px] font-medium uppercase tracking-wider transition-colors hover:text-magenta
                  ${isActiveLink(link.path) ? 'text-magenta' : 'text-gray-300'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link to="/contact" className="px-5 py-2 rounded-full bg-gradient-to-r from-magenta to-orange text-white font-medium text-[13px] hover:glow-magenta transition-all">
              CONTACT US
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
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
            className="lg:hidden bg-navy-900/95 backdrop-blur-xl mt-4 rounded-xl border border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg uppercase tracking-wide py-2 border-b border-white/5 ${isActiveLink(link.path) ? 'text-magenta' : 'text-gray-300'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;