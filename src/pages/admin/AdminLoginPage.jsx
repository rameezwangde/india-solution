import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Mail, Lock, ShieldCheck, Box, MessageSquare, BarChart2, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminLoginPage = () => {
  const { login, isAuthenticated, loading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/admin';

  if (authLoading) return null;
  if (isAuthenticated) return <Navigate to={from} replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
  };

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#9A424E]" strokeWidth={1.5} />,
      title: "Secure Access",
      desc: "Protected & Reliable"
    },
    {
      icon: <Box className="w-6 h-6 text-[#C0602F]" strokeWidth={1.5} />,
      title: "Inventory Control",
      desc: "Manage Products & Stock"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#9A424E]" strokeWidth={1.5} />,
      title: "Enquiries",
      desc: "Track & Respond Efficiently"
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-[#C0602F]" strokeWidth={1.5} />,
      title: "Analytics",
      desc: "Insights at Your Fingertips"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
      {/* Background Watermarks */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/hero-bg.png" alt="" className="absolute -left-40 top-0 w-[60%] h-full object-cover object-left opacity-30 mix-blend-multiply" />
        <img src="/hero-bg.png" alt="" className="absolute -right-40 top-0 w-[60%] h-full object-cover object-right opacity-30 mix-blend-multiply" style={{ transform: 'scaleX(-1)'}} />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-24 z-10 items-center">
        
        {/* Left Side: Branding & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center xl:text-left flex flex-col items-center xl:items-start"
        >
          {/* Back Button */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-[#A67C65] hover:text-[#C0602F] font-bold text-sm tracking-wider uppercase mb-8 transition-colors group"
          >
            <span className="p-2 rounded-full bg-white border border-[#E8DFD5] group-hover:border-[#C0602F]/50 group-hover:shadow-sm transition-all shadow-sm">
              <ArrowLeft size={16} strokeWidth={2.5} />
            </span>
            Back to Website
          </Link>

          {/* Logo Kept As Is */}
          <img src="/FULL LOGO COLOUR (1)-1.png" alt="India Solution" className="h-24 md:h-28 mb-12 object-contain" onError={(e) => { e.target.onerror = null; e.target.src="/india-solution-logo.png" }} />
          
          <div className="flex items-center justify-center xl:justify-start gap-4 mb-6 w-full">
            <h2 className="text-[#9A424E] font-bold tracking-[0.25em] text-xs uppercase">
              Inventory CRM Admin Panel
            </h2>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#9A424E]/50 to-transparent"></div>
          </div>
          
          <h1 className="text-5xl md:text-[3.5rem] font-['Playfair_Display',serif] font-bold text-[#4A2F1D] mb-4 leading-[1.15]">
            Manage. Monitor.<br/>
            <span className="text-[#9A424E]">Elevate.</span>
          </h1>
          
          {/* Diamond separator line */}
          <div className="flex items-center justify-center xl:justify-start w-full gap-4 my-8">
            <div className="h-px bg-gradient-to-r from-transparent via-[#D5C5B9] to-transparent flex-1 max-w-[150px]"></div>
            <div className="w-2 h-2 rotate-45 bg-[#C0602F]"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#D5C5B9] to-transparent flex-1 max-w-[150px]"></div>
          </div>
          
          <p className="text-[#7C5A48] text-lg md:text-xl mb-12 max-w-lg leading-relaxed">
            Secure access to manage products, inventory, categories and enquiries seamlessly.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-2xl">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center mb-4 group-hover:border-[#C0602F]/50 group-hover:shadow-md transition-all duration-300 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-[#4A2F1D] font-bold text-sm mb-1">{feature.title}</h3>
                <p className="text-[#7C5A48] text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-lg mx-auto xl:ml-auto xl:mr-0"
        >
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(74,47,29,0.05)] border border-[#E8DFD5]">
            
            <div className="flex flex-col items-center mb-10">
              <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 rounded-full border border-[#9A424E]/20 scale-[1.15]"></div>
                <div className="absolute inset-0 rounded-full border border-[#9A424E]/10 scale-[1.3]"></div>
                <Lock className="w-8 h-8 text-[#9A424E]" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-['Playfair_Display',serif] font-bold text-[#4A2F1D] mb-3">
                Welcome <span className="text-[#C0602F]">Back</span>
              </h2>
              <p className="text-[#7C5A48] text-sm">Please sign in to your admin account</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm mb-6 text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[11px] font-bold text-[#9A424E] tracking-wider mb-2 uppercase">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#A67C65]" strokeWidth={1.5} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl pl-12 pr-4 py-3.5 text-[#4A2F1D] font-medium placeholder:text-[#A67C65]/50 focus:outline-none focus:border-[#C0602F] focus:ring-1 focus:ring-[#C0602F] transition-all"
                    placeholder="admin@indiasolutions.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#9A424E] tracking-wider mb-2 uppercase">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#A67C65]" strokeWidth={1.5} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl pl-12 pr-12 py-3.5 text-[#4A2F1D] font-medium placeholder:text-[#A67C65]/50 focus:outline-none focus:border-[#C0602F] focus:ring-1 focus:ring-[#C0602F] transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A67C65] hover:text-[#C0602F] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm py-2">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <div className="w-5 h-5 rounded border border-[#E8DFD5] bg-[#FAF7F2] peer-checked:bg-[#9A424E] peer-checked:border-[#9A424E] transition-colors flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#4A2F1D] opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="ml-3 text-[#7C5A48] group-hover:text-[#4A2F1D] font-medium transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-[#9A424E] hover:text-[#7A323E] transition-colors font-bold">Forgot Password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#9A424E] to-[#C0602F] hover:opacity-90 text-[#4A2F1D] font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 shadow-md hover:shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : null}
                {loading ? 'Signing In...' : 'Sign In to Dashboard'}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-[#E8DFD5] flex items-center justify-center gap-5 text-[#A67C65] text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#9A424E]" strokeWidth={2} /> Secure
              </div>
              <span className="text-[#E8DFD5]">|</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C0602F]" strokeWidth={2} /> Reliable
              </div>
              <span className="text-[#E8DFD5]">|</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#9A424E]" strokeWidth={2} /> Trusted
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminLoginPage;
