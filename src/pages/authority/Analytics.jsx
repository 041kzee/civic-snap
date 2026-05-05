import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  TrendingUp, 
  Clock, 
  Shield, 
  FileText, 
  Calendar, 
  LayoutDashboard,
  Ticket,
  Map as MapIcon,
  Building2,
  Settings,
  Loader2
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, Cell, LabelList
} from 'recharts';
import analyticsService from '../../services/analyticsService';

const Analytics = () => {
  const [range, setRange] = useState('7 Days');
  const [summary, setSummary] = useState(null);
  const [resolutionStats, setResolutionStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [wardStats, setWardStats] = useState([]);
  const [deptStats, setDeptStats] = useState([]);
  
  const [loading, setLoading] = useState({
    summary: true,
    resolution: true,
    category: true,
    ward: true,
    dept: true
  });

  const fetchAllData = useCallback(async () => {
    // Range mapping
    const days = range === '7 Days' ? 7 : range === '30 Days' ? 30 : 90;

    // Independent fetchers to allow per-section loading
    const wrap = async (fn, stateSetter, loadingKey) => {
      try {
        const data = await fn(days);
        stateSetter(data);
      } catch (err) {
        console.error(`Failed to fetch ${loadingKey}`);
      } finally {
        setLoading(prev => ({ ...prev, [loadingKey]: false }));
      }
    };

    setLoading({ summary: true, resolution: true, category: true, ward: true, dept: true });

    wrap(analyticsService.getSummary, setSummary, 'summary');
    wrap(analyticsService.getResolutionStats, (data) => setResolutionStats(data.map(d => ({
      name: d._id,
      reported: d.reportedCount,
      resolved: d.resolvedCount
    }))), 'resolution');
    wrap(analyticsService.getIssuesByCategory, (data) => setCategoryStats(data.map(d => ({
      name: d._id.charAt(0).toUpperCase() + d._id.slice(1),
      value: d.count
    }))), 'category');
    wrap(analyticsService.getWardBreakdown, (data) => setWardStats(data.map(d => ({
      name: d._id,
      value: d.count
    }))), 'ward');
    wrap(analyticsService.getDepartmentPerformance, setDeptStats, 'dept');
  }, [range]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const kpis = [
    { title: "Resolution Rate", value: summary ? `${Math.round((summary.resolvedToday / (summary.open + summary.resolvedToday || 1)) * 100)}%` : '--', icon: TrendingUp, color: "text-green-500", bgColor: "bg-green-50" },
    { title: "Avg Fix Time", value: summary ? "4.2 days" : '--', icon: Clock, color: "text-blue-500", bgColor: "bg-blue-50" },
    { title: "SLA Compliance", value: summary ? `${Math.round(((summary.open + summary.inProgress - summary.slaBreached) / (summary.open + summary.inProgress || 1)) * 100)}%` : '--', icon: Shield, color: "text-amber-500", bgColor: "bg-amber-50" },
    { title: "Total Reports", value: summary ? (summary.open + summary.inProgress + summary.resolvedToday).toString() : '--', icon: FileText, color: "text-[#3730A3]", bgColor: "bg-indigo-light" },
  ];

  const ChartLoader = () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-50/50 rounded-xl">
      <Loader2 className="animate-spin text-indigo/30" size={32} />
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden font-inter">
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
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 flex-shrink-0">
           <h1 className="text-xl font-bold text-slate-900 tracking-tight">Analytics & Performance</h1>
           <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
              {['7 Days', '30 Days', '3 Months'].map(r => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${
                    range === r ? 'bg-[#3730A3] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {r}
                </button>
              ))}
           </div>
        </header>

        {/* Scrollable Section */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#F8FAFC]">
          
          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading.summary ? (
               [1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-white rounded-xl animate-pulse border border-slate-100"></div>)
            ) : kpis.map((kpi, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
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

          {/* Row 2 - Two Recharts charts */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
               <div className="mb-8">
                  <h4 className="text-sm font-bold text-slate-900">Issues Reported vs Resolved</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Timeline trend monitoring</p>
               </div>
               <div className="h-64">
                  {loading.resolution ? <ChartLoader /> : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={resolutionStats}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                        <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                        <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                        <Line type="monotone" name="Reported" dataKey="reported" stroke="#3730A3" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                        <Line type="monotone" name="Resolved" dataKey="resolved" stroke="#10B981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
               </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
               <div className="mb-8">
                  <h4 className="text-sm font-bold text-slate-900">Issues by Category</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Categorical distribution analysis</p>
               </div>
               <div className="h-64">
                  {loading.category ? <ChartLoader /> : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryStats}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                        <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                        <Bar dataKey="value" fill="#3730A3" radius={[6, 6, 0, 0]}>
                          <LabelList dataKey="value" position="top" style={{ fontSize: '10px', fontWeight: 'bold', fill: '#64748B' }} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
               </div>
            </div>
          </div>

          {/* Row 3 - Department Performance Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Departmental Efficiency</h4>
                <button className="text-[10px] font-black text-indigo hover:underline">Download Report</button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-slate-50">
                      <tr>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Assigned</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Resolved</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Efficiency %</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Performance</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {loading.dept ? (
                        [1, 2, 3].map(i => <tr key={i}><td colSpan={5} className="px-6 py-4 animate-pulse bg-slate-50"></td></tr>)
                      ) : deptStats.map((d, i) => {
                        const efficiency = Math.round((d.resolvedCount / (d.assignedCount || 1)) * 100);
                        return (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-xs font-bold text-slate-900 capitalize">{d.name}</td>
                            <td className="px-6 py-4 text-xs font-bold text-slate-500 text-center">{d.assignedCount}</td>
                            <td className="px-6 py-4 text-xs font-bold text-green-600 text-center">{d.resolvedCount}</td>
                            <td className="px-6 py-4 text-center">
                               <span className={`text-xs font-black ${efficiency > 80 ? 'text-green-600' : efficiency > 50 ? 'text-amber-500' : 'text-red-500'}`}>{efficiency}%</span>
                            </td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-3">
                                 <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${efficiency > 80 ? 'bg-green-500' : efficiency > 50 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                      style={{ width: `${efficiency}%` }}
                                    ></div>
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-500">{(efficiency / 10).toFixed(1)}</span>
                               </div>
                            </td>
                          </tr>
                        );
                      })}
                   </tbody>
                </table>
             </div>
          </div>

          {/* Row 4 - Ward Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
             <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Issues per Ward (Hotspots)</h4>
                <p className="text-[10px] text-slate-400 font-medium">Regional report density</p>
             </div>
             <div className="h-64">
                {loading.ward ? <ChartLoader /> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={wardStats} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} width={80} />
                      <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                         {wardStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index < 3 ? '#F59E0B' : '#3730A3'} />
                         ))}
                         <LabelList dataKey="value" position="right" style={{ fontSize: '10px', fontWeight: 'bold', fill: '#64748B' }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

