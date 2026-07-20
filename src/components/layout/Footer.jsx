import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#F3EAE0] pt-16 pb-8 relative overflow-hidden font-sans border-t border-[#E8DFD5]/50">
      {/* Subtle right-aligned floral watermark */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/hero-bg.png" alt="" className="absolute -right-20 bottom-0 w-[40%] h-[120%] object-cover object-left opacity-30 mix-blend-multiply" style={{ transform: 'scaleX(-1)'}} />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12 max-w-[1300px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="mb-6 inline-flex flex-col items-start gap-1" aria-label="India Solution home">
              <img
                src="/logo-only.png"
                alt="India Solution Logo"
                className="h-9 w-auto object-contain relative z-10"
              />
              <img
                src="/text-logo-new.png"
                alt="India Solution"
                className="h-4 w-auto object-contain relative z-20"
                style={{ filter: 'brightness(0) sepia(1) hue-rotate(330deg) saturate(3) opacity(0.85)' }}
              />
              <img
                src="/text-logo-2.png"
                alt="Experience anything and everything"
                className="h-2 w-auto object-contain relative z-30"
                style={{ filter: 'brightness(0) opacity(0.6)' }}
              />
            </Link>
            <p className="text-[#5c4033] text-[11.5px] font-medium leading-relaxed mb-6">
              Creating unforgettable events since 2010.<br/>
              We turn your vision into extraordinary<br/>
              experiences with flawless execution.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full border border-[#D5C5B9] flex items-center justify-center text-[#A67C65] hover:bg-[#A67C65] hover:text-white transition-all">
                <FaFacebookF size={12} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#D5C5B9] flex items-center justify-center text-[#A67C65] hover:bg-[#A67C65] hover:text-white transition-all">
                <FaInstagram size={12} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#D5C5B9] flex items-center justify-center text-[#A67C65] hover:bg-[#A67C65] hover:text-white transition-all">
                <FaYoutube size={12} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#D5C5B9] flex items-center justify-center text-[#A67C65] hover:bg-[#A67C65] hover:text-white transition-all">
                <FaLinkedinIn size={12} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-8">
            <h4 className="text-[12px] text-[#A67C65] font-bold tracking-widest mb-3">QUICK LINKS</h4>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-[1px] w-4 bg-[#D5C5B9]" />
              <span className="text-[#A67C65] text-[10px]">❖</span>
              <span className="h-[1px] w-4 bg-[#D5C5B9]" />
            </div>
            <ul className="space-y-3.5">
              <li><Link to="/about" className="text-[#5c4033] font-medium hover:text-[#A67C65] text-[12px] transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-[#5c4033] font-medium hover:text-[#A67C65] text-[12px] transition-colors">Our Services</Link></li>
              <li><Link to="/gallery" className="text-[#5c4033] font-medium hover:text-[#A67C65] text-[12px] transition-colors">Gallery</Link></li>
              <li><Link to="/why-choose-us" className="text-[#5c4033] font-medium hover:text-[#A67C65] text-[12px] transition-colors">Why Choose Us</Link></li>
              <li><Link to="/contact" className="text-[#5c4033] font-medium hover:text-[#A67C65] text-[12px] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[12px] text-[#A67C65] font-bold tracking-widest mb-3">OUR SERVICES</h4>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-[1px] w-4 bg-[#D5C5B9]" />
              <span className="text-[#A67C65] text-[10px]">❖</span>
              <span className="h-[1px] w-4 bg-[#D5C5B9]" />
            </div>
            <ul className="space-y-3.5">
              <li><Link to="/services" className="text-[#5c4033] font-medium hover:text-[#A67C65] text-[12px] transition-colors">Corporate Events</Link></li>
              <li><Link to="/services" className="text-[#5c4033] font-medium hover:text-[#A67C65] text-[12px] transition-colors">Weddings & Pre-Wedding</Link></li>
              <li><Link to="/services" className="text-[#5c4033] font-medium hover:text-[#A67C65] text-[12px] transition-colors">Trade Shows</Link></li>
              <li><Link to="/services" className="text-[#5c4033] font-medium hover:text-[#A67C65] text-[12px] transition-colors">Birthday Parties</Link></li>
              <li><Link to="/services" className="text-[#5c4033] font-medium hover:text-[#A67C65] text-[12px] transition-colors">Special Entries</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[12px] text-[#A67C65] font-bold tracking-widest mb-3">CONTACT INFO</h4>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-[1px] w-4 bg-[#D5C5B9]" />
              <span className="text-[#A67C65] text-[10px]">❖</span>
              <span className="h-[1px] w-4 bg-[#D5C5B9]" />
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#D5C5B9]">
                  <MapPin size={10} className="text-[#A67C65]" />
                </div>
                <span className="text-[#5c4033] font-medium text-[12px] mt-0.5">Bengaluru, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#D5C5B9]">
                  <Phone size={10} className="text-[#A67C65]" />
                </div>
                <span className="text-[#5c4033] font-medium text-[12px]">+91 6360181932</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#D5C5B9]">
                  <Mail size={10} className="text-[#A67C65]" />
                </div>
                <span className="text-[#5c4033] font-medium text-[12px]">info@india-solution.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 mt-4 relative text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#E8DFD5]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#A67C65] text-[10px] bg-[#FAF7F2] px-2">❖</div>
          
          <p className="text-[#A67C65] text-[11px] font-medium">
            © {new Date().getFullYear()} India Solution Events. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-[#A67C65] hover:text-[#4A2F1D] text-[11px] font-medium transition-colors">Privacy Policy</Link>
            <span className="text-[#D5C5B9]">|</span>
            <Link to="/terms" className="text-[#A67C65] hover:text-[#4A2F1D] text-[11px] font-medium transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
