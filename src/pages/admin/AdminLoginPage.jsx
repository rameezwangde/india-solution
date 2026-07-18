import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Mail, Lock, ShieldCheck, Box, MessageSquare, BarChart2 } from 'lucide-react';
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
      icon: <ShieldCheck className="w-6 h-6 text-magenta" />,
      title: "Secure Access",
      desc: "Protected & Reliable"
    },
    {
      icon: <Box className="w-6 h-6 text-magenta" />,
      title: "Inventory Control",
      desc: "Manage Products & Stock"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-magenta" />,
      title: "Enquiries",
      desc: "Track & Respond Efficiently"
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-magenta" />,
      title: "Analytics",
      desc: "Insights at Your Fingertips"
    }
  ];

  return (
    <div 
      className="min-h-screen bg-navy-900 flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans"
      style={{
        backgroundImage: "url('/bg image.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background overlay if needed */}
      <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm z-0"></div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 z-10 items-center">
        
        {/* Left Side: Branding & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <img src="/FULL LOGO COLOUR (1)-1.png" alt="India Solution" className="h-24 md:h-32 mb-12 object-contain" onError={(e) => { e.target.onerror = null; e.target.src="/india-solution-logo.png" }} />
          
          <h2 className="text-magenta font-bold tracking-widest text-sm mb-4 uppercase">
            Inventory CRM Admin Panel
          </h2>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2 leading-tight">
            Manage. Monitor.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta to-orange">Elevate.</span>
          </h1>
          
          {/* Diamond separator line */}
          <div className="flex items-center justify-center lg:justify-start w-full gap-4 my-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1 max-w-[100px]"></div>
            <div className="w-2 h-2 rotate-45 bg-gold"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1 max-w-[100px]"></div>
          </div>
          
          <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-lg">
            Secure access to manage products, inventory, categories and enquiries seamlessly.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-2xl">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-magenta/50 group-hover:bg-magenta/10 transition-all duration-300 shadow-[0_0_15px_rgba(233,30,99,0.1)] group-hover:shadow-[0_0_20px_rgba(233,30,99,0.3)]">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-gray-400 text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0"
        >
          <div className="relative rounded-3xl p-px bg-gradient-to-br from-magenta/50 via-white/10 to-orange/50 shadow-2xl">
            <div className="bg-navy-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/5">
              
              <div className="flex flex-col items-center mb-10">
                <div className="w-16 h-16 rounded-full bg-black/40 border border-white/5 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,42,133,0.15)] relative">
                  <div className="absolute inset-0 rounded-full border border-magenta/30 scale-110"></div>
                  <div className="absolute inset-0 rounded-full border border-magenta/10 scale-125"></div>
                  <Lock className="w-6 h-6 text-orange-glow" />
                </div>
                
                <h2 className="text-3xl font-display font-bold text-white mb-2">
                  Welcome <span className="text-orange">Back</span>
                </h2>
                <p className="text-gray-400 text-sm">Please sign in to your admin account</p>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6 text-center"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-magenta tracking-wider mb-2 uppercase">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all"
                      placeholder="admin@indiasolutions.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-orange tracking-wider mb-2 uppercase">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <div className="w-5 h-5 rounded border border-white/20 bg-transparent peer-checked:bg-magenta peer-checked:border-magenta transition-colors flex items-center justify-center">
                        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="ml-3 text-gray-400 group-hover:text-white transition-colors">Remember me</span>
                  </label>
                  <a href="#" className="text-orange hover:text-orange-glow transition-colors font-medium">Forgot Password?</a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-magenta to-orange hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 shadow-[0_0_20px_rgba(233,30,99,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : null}
                  {loading ? 'Signing In...' : 'Sign In to Dashboard'}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-4 text-gray-500 text-sm">
                <ShieldCheck className="w-4 h-4 text-magenta/70" />
                <span>Secure <span className="mx-2">•</span> Reliable <span className="mx-2">•</span> Trusted</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminLoginPage;
