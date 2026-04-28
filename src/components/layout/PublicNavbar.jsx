import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import Button from '../ui/Button';

const PublicNavbar = () => {
  return (
    <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-indigo p-1.5 rounded-lg">
          <Camera size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">CivicSnap</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/feed" className="text-sm font-medium text-slate-500 hover:text-indigo transition-colors">Feed</Link>
        <Link to="/ward-report" className="text-sm font-medium text-slate-500 hover:text-indigo transition-colors">Reports</Link>
        <Link to="/about" className="text-sm font-medium text-slate-500 hover:text-indigo transition-colors">About</Link>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/auth">
          <Button variant="secondary" className="hidden sm:block">Login</Button>
        </Link>
        <Link to="/auth?mode=register">
          <Button variant="primary">Get Started</Button>
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
