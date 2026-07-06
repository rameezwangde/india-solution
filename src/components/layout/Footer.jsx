import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-navy-800 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="mb-6 inline-flex flex-col items-start gap-0" aria-label="India Solution home">
              <img
                src="/logo-only.png"
                alt="India Solution Logo"
                className="h-8 w-auto object-contain drop-shadow-[0_0_22px_rgba(255,255,255,0.18)] relative z-10"
              />
              <img
                src="/text-logo-new.png"
                alt="India Solution"
                className="h-3.5 w-auto object-contain drop-shadow-[0_0_22px_rgba(255,255,255,0.18)] relative z-20"
                style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(74%) saturate(769%) hue-rotate(355deg) brightness(102%) contrast(106%)' }}
              />
              <img
                src="/text-logo-2.png"
                alt="Experience anything and everything"
                className="h-2 w-auto object-contain drop-shadow-[0_0_22px_rgba(255,255,255,0.18)] relative z-30"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Creating unforgettable events since 2010. We turn your vision into extraordinary experiences with flawless execution.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-magenta transition-colors">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-magenta transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-magenta transition-colors">
                <FaYoutube size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-magenta transition-colors">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="site-heading text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-magenta text-sm transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-magenta text-sm transition-colors">Our Services</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-magenta text-sm transition-colors">Gallery</Link></li>
              <li><Link to="/why-choose-us" className="text-gray-400 hover:text-magenta text-sm transition-colors">Why Choose Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-magenta text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="site-heading text-white font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-400 hover:text-orange text-sm transition-colors">Corporate Events</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-orange text-sm transition-colors">Weddings & Pre-Wedding</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-orange text-sm transition-colors">Trade Shows</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-orange text-sm transition-colors">Birthday Parties</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-orange text-sm transition-colors">Special Entries</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="site-heading text-white font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-magenta mt-1 shrink-0" />
                <span className="text-gray-400 text-sm">Bengaluru, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-magenta shrink-0" />
                <span className="text-gray-400 text-sm">+91 6360181932</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-magenta shrink-0" />
                <span className="text-gray-400 text-sm">info@india-solution.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            Ã‚Â© {new Date().getFullYear()} India Solution Events. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
