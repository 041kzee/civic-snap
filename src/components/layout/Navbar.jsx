import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Camera } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-indigo p-1.5 rounded-lg">
            <Camera size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">CivicSnap</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-slate-100 mx-1"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">{user?.name || 'Citizen'}</p>
            <p className="text-xs text-slate-500 mt-1 capitalize">{user?.role || 'Citizen'}</p>
          </div>
          <button className="w-10 h-10 bg-indigo-light rounded-full flex items-center justify-center text-indigo hover:bg-indigo-light/80 transition-colors">
            <User size={20} />
          </button>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:text-danger hover:bg-danger-light rounded-full transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
