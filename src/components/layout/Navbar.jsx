import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Camera, Map, Layers, PieChart } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navLinks = [
    { label: 'Map View', path: '/map', icon: Map },
    { label: 'Active Issues', path: '/feed', icon: Layers },
    { label: 'My Reports', path: '/my-reports', icon: Camera },
    { label: 'Leaderboard', path: '/leaderboard', icon: PieChart },
  ];

  return (
    <nav className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-indigo p-1.5 rounded-lg shadow-lg shadow-indigo/20">
            <Camera size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">CivicSnap</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `text-sm font-bold transition-all px-3 py-2 rounded-xl flex items-center gap-2 ${
                  isActive 
                  ? 'text-indigo bg-indigo-light' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <link.icon size={16} />
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/notifications" className="p-2.5 text-slate-400 hover:text-indigo hover:bg-indigo-light rounded-xl relative transition-all group">
          <Bell size={22} className="group-hover:rotate-12" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white shadow-sm"></span>
        </Link>
        
        <div className="h-8 w-px bg-slate-100"></div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-indigo-light rounded-2xl flex items-center justify-center text-indigo hover:bg-indigo hover:text-white transition-all shadow-sm border border-indigo/10"
          >
            <User size={22} />
          </button>
          
          <div className="hidden lg:block">
            <p className="text-xs font-black text-slate-900 leading-none mb-0.5">{user?.name || 'John Doe'}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user?.role || 'Citizen'}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
