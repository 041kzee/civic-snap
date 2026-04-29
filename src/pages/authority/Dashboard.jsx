import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ticket, 
  BarChart2, 
  Map as MapIcon, 
  Building2, 
  Settings,
  AlertCircle,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Search,
  ChevronDown,
  Calendar
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const kpis = [
  { title: "Open Issues", value: "142", icon: AlertCircle, color: "text-red-500", bgColor: "bg-red-50" },
  { title: "In Progress", value: "38", icon: RefreshCw, color: "text-amber-500", bgColor: "bg-amber-50" },
  { title: "Resolved Today", value: "22", icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-50" },
  { title: "SLA Breached", value: "7", icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-100" },
];

const mockTickets = [
  { id: "#CS-9842", category: "POTHOLE", location: "Main St & 4th Ave", ward: "Ward 12", reported: "Oct 18, 09:12 AM", department: "Public Works", status: "IN PROGRESS", statusColor: "text-amber-500", sla: "-04:22", slaColor: "text-red-600", breached: true },
  { id: "#CS-9845", category: "SANITATION", location: "Oak Park Plaza", ward: "Ward 08", reported: "Oct 19, 08:30 AM", department: "Waste Management", status: "OPEN", statusColor: "text-red-500", sla: "01:45", slaColor: "text-green-600", breached: false },
  { id: "#CS-9841", category: "LIGHTING", location: "Blythe St 802", ward: "Ward 24", reported: "Oct 18, 11:45 PM", department: "Electricity", status: "RESOLVED", statusColor: "text-green-500", sla: "COMPLETED", slaColor: "text-slate-400", breached: false },
  { id: "#CS-9839", category: "WATER LEAK", location: "Riverside Dr", ward: "Ward 12", reported: "Oct 17, 02:20 PM", department: "Water Supply", status: "ESCALATED", statusColor: "text-amber-600", sla: "-18:10", slaColor: "text-red-600", breached: true },
  { id: "#CS-9835", category: "POTHOLE", location: "MG Road 45", ward: "Ward 04", reported: "Oct 17, 10:15 AM", department: "Public Works", status: "OPEN", statusColor: "text-red-500", sla: "02:10", slaColor: "text-green-600", breached: false },
  { id: "#CS-9832", category: "SANITATION", location: "Sector 12 Market", ward: "Ward 12", reported: "Oct 16, 04:45 PM", department: "Waste Management", status: "RESOLVED", statusColor: "text-green-500", sla: "COMPLETED", slaColor: "text-slate-400", breached: false },
  { id: "#CS-9830", category: "VANDALISM", location: "Central Park", ward: "Ward 07", reported: "Oct 16, 01:20 PM", department: "Maintenance", status: "IN PROGRESS", statusColor: "text-amber-500", sla: "05:40", slaColor: "text-green-600", breached: false },
  { id: "#CS-9828", category: "UTILITIES", location: "Bridge St 10", ward: "Ward 02", reported: "Oct 15, 09:30 AM", department: "Water Board", status: "OPEN", statusColor: "text-red-500", sla: "-24:15", slaColor: "text-red-600", breached: true },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#3730A3] flex flex-col flex-shrink-0 z-20">
        <div className="py-6 px-4 mb-4">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Building2 size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">CivicSnap</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", path: "/authority/dashboard" },
            { icon: Ticket, label: "All Tickets", path: "/authority/dashboard/tickets" },
            { icon: BarChart2, label: "Analytics", path: "/authority/analytics" },
            { icon: MapIcon, label: "Heatmap", path: "/authority/heatmap" },
            { icon: Building2, label: "Departments", path: "/authority/departments" },
            { icon: Settings, label: "Settings", path: "/authority/settings" },
          ].map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 transition-all ${
                  isActive 
                  ? 'bg-white text-[#3730A3] font-bold rounded-lg mx-2' 
                  : 'text-white/70 hover:text-white hover:bg-white/5 mx-2'
                }`
              }
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 text-white">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold border border-white/20">
              {user?.name?.charAt(0) || 'O'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">{user?.name || 'Officer Mitchell'}</p>
              <span className="inline-block px-1.5 py-0.5 bg-white/10 rounded text-[8px] font-black uppercase tracking-wider text-white/80">Authority</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-900">Good morning, Officer</h2>
          <div className="flex items-center gap-3 text-slate-400">
             <Calendar size={16} />
             <span className="text-sm font-medium">Oct 28, 2025</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.title}</p>
                  <p className="text-3xl font-black text-slate-900">{kpi.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${kpi.bgColor} ${kpi.color}`}>
                  <kpi.icon size={24} />
                </div>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search issues..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo/20"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <select className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 outline-none">
                <option>Department</option>
              </select>
              <select className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 outline-none">
                <option>Ward</option>
              </select>
              <select className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 outline-none">
                <option>SLA Status</option>
              </select>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs font-bold text-slate-600">
                <Calendar size={14} />
                <span>Oct 12 - Oct 19, 2025</span>
              </div>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issue ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Photo</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location/Ward</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reported Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">SLA Countdown</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockTickets.map((ticket) => (
                  <tr 
                    key={ticket.id} 
                    className={`hover:bg-slate-50 transition-colors ${ticket.breached ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-6 py-4 text-xs font-bold text-slate-500">{ticket.id}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-indigo-light text-[#3730A3] text-[9px] font-black rounded uppercase">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
                        <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${ticket.id}`} alt="ticket" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-slate-900">{ticket.location}</p>
                      <p className="text-[10px] text-slate-400">{ticket.ward}</p>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-medium text-slate-500">{ticket.reported}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{ticket.department}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${ticket.statusColor.replace('text-', 'bg-')}`}></div>
                        <span className={`text-[10px] font-black uppercase ${ticket.statusColor}`}>{ticket.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-[10px] font-black ${ticket.slaColor}`}>
                        {ticket.sla}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => navigate('/authority/tickets/1')}
                        className="text-xs font-bold text-[#3730A3] hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing 1–8 of 142 tickets</p>
               <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-lg bg-[#3730A3] text-white text-xs font-bold">1</button>
                  <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">2</button>
                  <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">3</button>
                  <span className="text-slate-400 text-xs px-2">...</span>
                  <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">10</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

