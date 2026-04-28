import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ticket, 
  BarChart3, 
  Map as MapIcon, 
  Building2, 
  Settings,
  ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/authority/dashboard' },
    { icon: Ticket, label: 'Tickets', path: '/authority/tickets' },
    { icon: BarChart3, label: 'Analytics', path: '/authority/analytics' },
    { icon: MapIcon, label: 'Heatmap', path: '/authority/heatmap' },
    { icon: Building2, label: 'Departments', path: '/authority/departments' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 h-[calc(100vh-64px)] sticky top-16 hidden lg:flex flex-col p-4">
      <div className="flex items-center gap-2 px-3 py-4 mb-6 bg-slate-50 rounded-xl">
        <ShieldCheck className="text-indigo" size={24} />
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Authority Portal</p>
          <p className="text-sm font-semibold text-slate-900">Admin Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                ? 'bg-indigo text-white shadow-md shadow-indigo/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-100">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
