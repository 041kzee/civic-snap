import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Camera, 
  AlertTriangle,
  ArrowLeft,
  Navigation
} from 'lucide-react';
import PublicNavbar from '../components/layout/PublicNavbar';
import Button from '../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Dot Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#3730A3 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Illustration */}
        <div className="relative mb-12 animate-float">
          <svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Road */}
            <rect x="20" y="100" width="280" height="60" rx="4" fill="#E2E8F0" />
            <rect x="20" y="128" width="280" height="4" fill="white" fillOpacity="0.4" />
            
            {/* Pothole */}
            <path d="M140 115C135 118 130 125 135 132C140 139 155 142 165 138C175 134 185 125 180 118C175 111 145 112 140 115Z" fill="#1E293B" />
            <path d="M145 118C142 120 138 123 140 128C142 133 155 135 162 132C169 129 174 125 172 120C170 115 148 116 145 118Z" fill="#0F172A" />
            
            {/* Warning Signs */}
            <path d="M80 80L95 110H65L80 80Z" fill="#F59E0B" />
            <rect x="78" y="92" width="4" height="10" rx="2" fill="white" />
            <circle cx="80" cy="106" r="2" fill="white" />
            
            <path d="M240 80L255 110H225L240 80Z" fill="#F59E0B" />
            <rect x="238" y="92" width="4" height="10" rx="2" fill="white" />
            <circle cx="240" cy="106" r="2" fill="white" />

            {/* Flying MapPin */}
            <g className="animate-bounce-slow">
               <circle cx="160" cy="40" r="20" fill="#3730A3" fillOpacity="0.1" />
               <MapPin x="148" y="28" className="text-indigo" size={24} />
            </g>
          </svg>
        </div>

        <div className="text-center relative z-10">
          <h1 className="text-9xl font-black text-indigo/10 mb-[-60px] tracking-tighter">404</h1>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Looks like this road leads nowhere.</h2>
          <p className="text-slate-500 font-medium max-w-md mx-auto mb-12 text-lg">
            The page you're looking for doesn't exist, has been moved, or is currently under repair.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button 
               onClick={() => navigate('/')}
               variant="primary" 
               className="px-10 py-4 font-bold rounded-2xl flex items-center gap-3 shadow-2xl shadow-indigo/20"
             >
                <Home size={20} />
                Go to Home
             </Button>
             <div className="relative group">
                <Button 
                  onClick={() => navigate('/report')}
                  variant="secondary" 
                  className="px-10 py-4 font-bold rounded-2xl flex items-center gap-3 border-2"
                >
                   <Camera size={20} />
                   Report a Problem
                </Button>
                {/* Tooltip */}
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black uppercase py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                   Not this kind of problem 😄
                </div>
             </div>
          </div>
        </div>

        <button 
          onClick={() => navigate(-1)}
          className="mt-16 flex items-center gap-2 text-slate-400 font-bold hover:text-indigo transition-colors group"
        >
           <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
           Back to Previous Page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
