import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  Calendar,
  Loader2
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import analyticsService from '../../services/analyticsService';
import issueService from '../../services/issueService';
import departmentService from '../../services/departmentService';
import socketService from '../../services/socket';
import { getStatusColor } from '../../utils/statusColors';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const searchTimeout = useRef(null);

  // States
  const [summary, setSummary] = useState({ open: 0, inProgress: 0, resolvedToday: 0, slaBreached: 0 });
  const [issues, setIssues] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingIssues, setLoadingIssues] = useState(true);
  
  const [filters, setFilters] = useState({
    department: '',
    ward: '',
    status: '',
    search: '',
    page: 1,
    limit: 10
  });
  
  const [totalCount, setTotalCount] = useState(0);

  const fetchSummary = useCallback(async () => {
    try {
      setLoadingSummary(true);
      const data = await analyticsService.getSummary();
      setSummary(data);
    } catch (err) {
      console.error('Failed to fetch summary');
    } finally {
      setLoadingSummary(false);
    }
  }, []);

  const fetchIssues = useCallback(async () => {
    try {
      setLoadingIssues(true);
      const data = await issueService.getIssues({
        department: filters.department,
        ward: filters.ward,
        status: filters.status,
        search: filters.search,
        page: filters.page,
        limit: filters.limit
      });
      setIssues(data.issues || []);
      setTotalCount(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch issues');
    } finally {
      setLoadingIssues(false);
    }
  }, [filters]);

  const fetchFilters = useCallback(async () => {
    try {
      const depts = await departmentService.getDepartments();
      setDepartments(depts);
    } catch (err) {
      console.error('Failed to fetch departments');
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchSummary(), fetchFilters()]);
  }, [fetchSummary, fetchFilters]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  // Socket setup
  useEffect(() => {
    socketService.connect();
    
    socketService.on('issue:new', (newIssue) => {
      setIssues(prev => [newIssue, ...prev.slice(0, 9)]);
      setSummary(prev => ({ ...prev, open: prev.open + 1 }));
    });

    socketService.on('sla:escalated', () => {
      // In a real app, show a toast here
      fetchSummary();
      fetchIssues();
    });

    return () => {
      socketService.off('issue:new');
      socketService.off('sla:escalated');
    };
  }, [fetchSummary, fetchIssues]);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: value, page: 1 }));
    }, 400);
  };

  const getSLADisplay = (slaDue, status) => {
    if (status === 'resolved') return { text: 'COMPLETED', color: 'text-slate-400' };
    if (!slaDue) return { text: '--', color: 'text-slate-300' };
    
    const now = new Date();
    const due = new Date(slaDue);
    const diff = due - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (diff < 0) return { text: 'OVERDUE', color: 'text-red-600' };
    if (days > 0) return { text: `${days}d left`, color: 'text-emerald-500' };
    return { text: `${hours}h left`, color: 'text-amber-500' };
  };

  const kpiList = [
    { title: "Open Issues", value: summary.open, icon: AlertCircle, color: "text-red-500", bgColor: "bg-red-50" },
    { title: "In Progress", value: summary.inProgress, icon: RefreshCw, color: "text-amber-500", bgColor: "bg-amber-50" },
    { title: "Resolved Today", value: summary.resolvedToday, icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-50" },
    { title: "SLA Breached", value: summary.slaBreached, icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-100" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden font-inter">
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#3730A3] flex flex-col flex-shrink-0 z-20">
        <div className="py-6 px-4 mb-4">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
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
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold border border-white/20 uppercase">
              {user?.name?.charAt(0) || 'O'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">{user?.name || 'Officer'}</p>
              <span className="inline-block px-1.5 py-0.5 bg-white/10 rounded text-[8px] font-black uppercase tracking-wider text-white/80">Authority</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-900">Live Operations Control</h2>
          <div className="flex items-center gap-3 text-slate-400">
             <Calendar size={16} />
             <span className="text-sm font-bold uppercase tracking-tighter">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#F8FAFC]">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingSummary ? (
              [1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-white rounded-xl animate-pulse border border-slate-50"></div>)
            ) : kpiList.map((kpi, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-50 flex items-center justify-between hover:shadow-md transition-shadow cursor-default">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{kpi.title}</p>
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
                onChange={handleSearch}
                placeholder="Search by ID, location, or description..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo/20 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <select 
                value={filters.department}
                onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value, page: 1 }))}
                className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-600 outline-none hover:bg-slate-100 transition-colors"
              >
                <option value="">All Departments</option>
                {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
              
              <select 
                value={filters.ward}
                onChange={(e) => setFilters(prev => ({ ...prev, ward: e.target.value, page: 1 }))}
                className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-600 outline-none hover:bg-slate-100 transition-colors"
              >
                <option value="">All Wards</option>
                {[...Array(20)].map((_, i) => (
                  <option key={i+1} value={`Ward ${i+1}`}>Ward {i+1}</option>
                ))}
              </select>

              <select 
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
                className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-600 outline-none hover:bg-slate-100 transition-colors"
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px] flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issue ID</th>
                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Evidence</th>
                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</th>
                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reported</th>
                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assignment</th>
                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">SLA</th>
                    <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loadingIssues ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={9} className="px-6 py-8"><div className="h-4 bg-slate-100 rounded w-full"></div></td>
                      </tr>
                    ))
                  ) : issues.length > 0 ? (
                    issues.map((ticket) => {
                      const sla = getSLADisplay(ticket.slaDue, ticket.status);
                      return (
                        <tr 
                          key={ticket._id} 
                          className={`hover:bg-slate-50 transition-colors group ${ticket.escalated ? 'bg-red-50/30' : ''}`}
                        >
                          <td className="px-6 py-5 text-[10px] font-bold text-slate-400">#{ticket._id.slice(-6).toUpperCase()}</td>
                          <td className="px-6 py-5">
                            <span className="px-2 py-1 bg-indigo-light text-[#3730A3] text-[9px] font-black rounded uppercase">
                              {ticket.category}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 group-hover:scale-110 transition-transform">
                              <img src={ticket.thumbnailUrl} alt="evidence" className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-xs font-bold text-slate-900 truncate max-w-[150px]">{ticket.ward}</p>
                            <p className="text-[10px] text-slate-400 font-medium">Lat: {ticket.location.coordinates[1].toFixed(2)}</p>
                          </td>
                          <td className="px-6 py-5 text-[10px] font-bold text-slate-500">
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-5 text-xs font-bold text-slate-600">
                            {ticket.department?.name || 'Unassigned'}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(ticket.status).replace('text-', 'bg-')}`}></div>
                              <span className={`text-[10px] font-black uppercase ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className={`text-[10px] font-black flex items-center gap-1 ${sla.color}`}>
                              {ticket.escalated && <AlertTriangle size={12} />}
                              {sla.text}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button 
                              onClick={() => navigate(`/authority/tickets/${ticket._id}`)}
                              className="px-4 py-2 bg-indigo-light text-[#3730A3] rounded-lg text-xs font-bold hover:bg-indigo hover:text-white transition-all"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-20 text-center">
                         <div className="flex flex-col items-center gap-3">
                            <Ticket size={48} className="text-slate-200" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matching issues found</p>
                         </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                 Showing {(filters.page-1)*filters.limit + 1}–{Math.min(filters.page*filters.limit, totalCount)} of {totalCount} reports
               </p>
               <div className="flex items-center gap-1.5">
                  {[...Array(Math.ceil(totalCount / filters.limit))].map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setFilters(prev => ({ ...prev, page: i + 1 }))}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        filters.page === i + 1 
                        ? 'bg-[#3730A3] text-white shadow-lg shadow-indigo/20' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

