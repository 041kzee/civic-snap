import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Camera, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Shield, 
  CheckCircle2,
  Loader2,
  MapPin
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import Button from '../components/ui/Button';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuthStore();
  
  // URL params can specify starting mode
  const searchParams = new URLSearchParams(location.search);
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('citizen');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication process
    setTimeout(() => {
      const mockUser = {
        id: '123',
        name: mode === 'register' ? formData.name : 'John Doe',
        email: formData.email,
        role: role
      };
      const mockToken = 'mock-jwt-token-12345';
      
      setUser(mockUser, role, mockToken);
      setLoading(false);
      
      if (role === 'authority') {
        navigate('/authority/dashboard');
      } else {
        navigate('/map');
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo relative flex-col items-center justify-center p-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 opacity-5">
           {Array.from({ length: 20 }).map((_, i) => (
             <MapPin 
               key={i} 
               className="absolute text-white" 
               size={32} 
               style={{ 
                 top: `${Math.random() * 100}%`, 
                 left: `${Math.random() * 100}%`,
                 transform: `rotate(${Math.random() * 360}deg)`
               }} 
             />
           ))}
        </div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
            <Camera size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">CivicSnap</h1>
          <p className="text-indigo-light text-xl mb-12">Give your city a voice.</p>
          
          <div className="space-y-6 text-left max-w-sm">
            {[
              "Empowering transparent governance",
              "Direct connection with local authorities",
              "Real-time issue tracking and resolution"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-indigo-light/80">
                <CheckCircle2 size={20} className="text-emerald" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-12 text-indigo-light/40 text-xs font-medium">
          © 2025 CivicSnap. Public Digital Infrastructure.
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-background lg:bg-white">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 mb-10">
            <button 
              onClick={() => setMode('register')}
              className={`flex-1 pb-4 text-sm font-bold transition-all ${mode === 'register' ? 'text-indigo border-b-2 border-indigo' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Register
            </button>
            <button 
              onClick={() => setMode('login')}
              className={`flex-1 pb-4 text-sm font-bold transition-all ${mode === 'login' ? 'text-indigo border-b-2 border-indigo' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Login
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {mode === 'register' ? 'Join CivicSnap' : 'Welcome Back'}
            </h2>
            <p className="text-slate-500">
              {mode === 'register' ? 'Create your account to start improving your community.' : 'Log in to track your reports and stay updated.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo/20 focus:border-indigo outline-none transition-all"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo/20 focus:border-indigo outline-none transition-all"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo/20 focus:border-indigo outline-none transition-all"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div className={mode === 'register' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : ""}>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo/20 focus:border-indigo outline-none transition-all"
                    onChange={handleInputChange}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="password" 
                      name="confirmPassword"
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo/20 focus:border-indigo outline-none transition-all"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-bold text-indigo hover:underline">Forgot Password?</button>
              </div>
            )}

            {mode === 'register' && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Select Your Role</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('citizen')}
                    className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${role === 'citizen' ? 'border-indigo bg-indigo-light text-indigo' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${role === 'citizen' ? 'bg-indigo text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <User size={20} />
                    </div>
                    <span className="font-bold text-sm mb-1">Citizen</span>
                    <span className="text-[10px] opacity-80 leading-tight">Report issues, track progress</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('authority')}
                    className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${role === 'authority' ? 'border-indigo bg-indigo-light text-indigo' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${role === 'authority' ? 'bg-indigo text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Shield size={20} />
                    </div>
                    <span className="font-bold text-sm mb-1">Authority</span>
                    <span className="text-[10px] opacity-80 leading-tight">Manage and resolve issues</span>
                  </button>
                </div>
              </div>
            )}

            <Button 
              type="submit"
              disabled={loading}
              className="w-full py-4 text-base font-bold shadow-lg shadow-indigo/20 flex items-center justify-center gap-3"
            >
              {loading && <Loader2 className="animate-spin" size={20} />}
              {mode === 'register' ? 'Create Account' : 'Login to CivicSnap'}
            </Button>

            <div className="relative py-4 flex items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">OR</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <button 
              type="button"
              className="w-full py-3 border border-slate-200 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors font-semibold text-slate-700"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            {mode === 'register' ? 'Already have an account?' : "Don't have an account yet?"}{' '}
            <button 
              onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
              className="text-indigo font-bold hover:underline"
            >
              {mode === 'register' ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
