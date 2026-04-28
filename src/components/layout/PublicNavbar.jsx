import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Globe, Info, Activity } from 'lucide-react';
import Button from '../ui/Button';

const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-50">
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo p-2 rounded-2xl shadow-xl shadow-indigo/20 group-hover:scale-110 transition-transform">
            <Camera size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">CivicSnap</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
           {[
             { label: 'Public Feed', path: '/feed', icon: Activity },
             { label: 'Ward Reports', path: '/ward-report', icon: Globe },
             { label: 'About Project', path: '/about', icon: Info },
           ].map((link) => (
             <Link 
               key={link.path} 
               to={link.path} 
               className="text-sm font-bold text-slate-500 hover:text-indigo flex items-center gap-2 transition-colors"
             >
               <link.icon size={16} />
               {link.label}
             </Link>
           ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/auth?mode=login')}
          className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-indigo transition-colors"
        >
          Log In
        </button>
        <Button 
          onClick={() => navigate('/auth?mode=register')}
          className="px-8 py-3 font-bold rounded-2xl shadow-xl shadow-indigo/20"
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default PublicNavbar;
