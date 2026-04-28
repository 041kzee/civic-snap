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
  Filter,
  Eye,
  Camera,
  MoreVertical,
  LogOut,
  User as UserIcon,
  Shield
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const mockTickets = [
  { id: "CS-402", category: "Road Damage", location: "MG Road, Ward 4", reported: "2h ago", department: "Roads", status: "In Progress", sla: "12h left", slaType: "ok" },
  { id: "CS-398", category: "Waste Management", location: "Sector 12, Ward 12", reported: "5h ago", department: "Sanitation", status: "Open", sla: "Breached", slaType: "breached" },
  { id: "CS-395", category: "Public Lighting", location: "Park Ave, Ward 7", reported: "1d ago", department: "Electricity", status: "Resolved", sla: "Fixed", slaType: "ok" },
  { id: "CS-392", category: "Utilities", location: "Main St, Ward 4", reported: "2h ago", department: "Water Board", status: "Open", sla: "4h left", slaType: "warning" },
  { id: "CS-390", category: "Vandalism", location: "Bridge Rd, Ward 2", reported: "8h ago", department: "Maintenance", status: "In Progress", sla: "28h left", slaType: "ok" },
  { id: "CS-388", category: "Road Damage", location: "Highway 1, Ward 1", reported: "12h ago", department: "Roads", status: "Open", sla: "Breached", slaType: "breached" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');

  const kpis = [
    { title: "Open Issues", value: "142", icon: AlertCircle, color: "text-danger bg-danger-light" },
    { title: "In Progress", value: "38", icon: RefreshCw, color: "text-amber bg-amber-light" },
    { title: "Resolved Today", value: "22", icon: CheckCircle, color: "text-emerald bg-emerald/10" },
    { title: "SLA Breached", value: "7", icon: AlertTriangle, color: "text-danger bg-danger-light animate-pulse" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Authority Style */}
      <aside className="w-64 bg-indigo-dark text-white flex flex-col flex-shrink-0">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-lg shadow-xl shadow-black/20">
            <Camera size={20} className="text-indigo" />
          </div>
          <span className="text-2xl font-bold tracking-tight">CivicSnap</span>
        </div>

        <nav className="flex-1 mt-8 px-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', path: '/authority/dashboard' },
            { icon: Ticket, label: 'All Tickets', path: '/authority/dashboard?tab=tickets' },
            { icon: BarChart2, label: 'Analytics', path: '/authority/analytics' },
            { icon: MapIcon, label: 'Heatmap', path: '/authority/heatmap' },
            { icon: Building2, label: 'Departments', path: '/authority/departments' },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                  ? 'bg-white text-indigo font-bold shadow-xl shadow-black/10' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon size={20} />
              <span className="text-sm tracking-wide">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto">
           <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo font-bold text-sm">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{user?.name || 'Officer Smith'}</p>
                <div className="flex items-center gap-1">
                   <Shield size={10} className="text-indigo-light" />
                   <p className="text-[10px] text-white/50 uppercase tracking-widest font-black">Authority</p>
                </div>
              </div>
              <button 
                onClick={() => { logout(); navigate('/auth'); }}
                className="text-white/30 hover:text-danger transition-colors"
              >
                <LogOut size={16} />
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-10 flex-shrink-0">
           <h2 className="text-xl font-bold text-slate-900">Good morning, Officer</h2>
           <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Ward: 4</p>
                <p className="text-sm font-bold text-slate-900">Oct 28, 2025</p>
              </div>
           </div>
        </header>

        {/* Scrollable Section */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10">
          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, idx) => (
              <Card key={idx} className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.title}</p>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{kpi.value}</h3>
                  </div>
                  <div className={`p-4 rounded-2xl ${kpi.color}`}>
                    <kpi.icon size={28} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Filter Bar */}
          <Card className="p-4 border-none shadow-sm bg-white/50 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px] relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by ID, ward or department..."
                  className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo/20 text-sm font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <select className="pl-4 pr-10 py-2.5 bg-white border border-slate-100 rounded-xl text-sm font-bold text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-indigo/20">
                      <option>Department</option>
                      <option>Roads</option>
                      <option>Sanitation</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                 </div>
                 <div className="relative">
                    <select className="pl-4 pr-10 py-2.5 bg-white border border-slate-100 rounded-xl text-sm font-bold text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-indigo/20">
                      <option>SLA Status</option>
                      <option>On Track</option>
                      <option>Breached</option>
                    </select>
                    <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                 </div>
                 <Button variant="secondary" className="px-5 font-bold">Apply</Button>
              </div>
            </div>
          </Card>

          {/* Tickets Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-bold text-slate-900">Recent Action Items</h3>
               <button className="text-sm font-bold text-indigo hover:underline">View All Tickets</button>
            </div>
            
            <Card className="overflow-hidden border-none shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">#ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Photo</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reported</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">SLA</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {mockTickets.map((ticket) => (
                    <tr key={ticket.id} className={`hover:bg-slate-50 transition-colors ${ticket.slaType === 'breached' ? 'bg-danger-light/30' : ''}`}>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{ticket.id}</td>
                      <td className="px-6 py-4">
                         <Badge variant="indigo">{ticket.category}</Badge>
                      </td>
                      <td className="px-6 py-4">
                         <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden">
                            <Camera size={18} />
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">{ticket.location.split(',')[0]}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{ticket.location.split(',')[1]}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-500">{ticket.reported}</td>
                      <td className="px-6 py-4">
                         <Badge status={ticket.status} />
                      </td>
                      <td className="px-6 py-4">
                         <div className={`flex items-center gap-1.5 text-xs font-bold ${ticket.slaType === 'breached' ? 'text-danger animate-pulse' : ticket.slaType === 'warning' ? 'text-amber' : 'text-emerald'}`}>
                            {ticket.slaType === 'breached' && <AlertTriangle size={14} />}
                            {ticket.sla}
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button 
                           onClick={() => navigate(`/authority/tickets/${ticket.id}`)}
                           className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-light text-indigo text-xs font-bold rounded-lg hover:bg-indigo hover:text-white transition-all"
                         >
                            <Eye size={14} />
                            View
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <div className="flex items-center justify-between pt-4">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing 1–6 of 142 tickets</p>
               <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-400">Previous</button>
                  <button className="px-3 py-1.5 bg-indigo text-white rounded-lg text-xs font-bold">1</button>
                  <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">2</button>
                  <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">Next</button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
