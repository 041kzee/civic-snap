import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  TrendingUp, 
  Clock, 
  Shield, 
  FileText, 
  Calendar, 
  ChevronDown,
  LayoutDashboard,
  Ticket,
  Map as MapIcon,
  Building2,
  Settings,
  Camera,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const lineData = [
  { name: 'Mon', reported: 45, resolved: 32 },
  { name: 'Tue', reported: 52, resolved: 38 },
  { name: 'Wed', reported: 48, resolved: 42 },
  { name: 'Thu', reported: 61, resolved: 45 },
  { name: 'Fri', reported: 55, resolved: 50 },
  { name: 'Sat', reported: 40, resolved: 55 },
  { name: 'Sun', reported: 35, resolved: 48 },
];

const barData = [
  { name: 'Pothole', value: 85 },
  { name: 'Light', value: 64 },
  { name: 'Garbage', value: 120 },
  { name: 'Water', value: 45 },
  { name: 'Traffic', value: 30 },
];

const wardData = [
  { name: 'Ward 4', value: 142 },
  { name: 'Ward 12', value: 110 },
  { name: 'Ward 7', value: 85 },
  { name: 'Ward 2', value: 64 },
  { name: 'Ward 9', value: 42 },
];

const deptData = [
  { name: "Roads & Highways", assigned: 142, resolved: 118, time: "4.2d", sla: "92%", perf: 92 },
  { name: "Public Health", assigned: 98, resolved: 75, time: "3.8d", sla: "88%", perf: 88 },
  { name: "Sanitation", assigned: 120, resolved: 115, time: "1.5d", sla: "96%", perf: 96 },
  { name: "Electricity", assigned: 64, resolved: 42, time: "2.1d", sla: "74%", perf: 74 },
  { name: "Water Board", assigned: 45, resolved: 20, time: "5.5d", sla: "45%", perf: 45 },
];

const Analytics = () => {
  const navigate = useNavigate();
  const [range, setRange] = useState('7 Days');

  const kpis = [
    { title: "Resolution Rate", value: "84%", icon: TrendingUp, color: "text-emerald bg-emerald/10", trend: "+2.4%" },
    { title: "Avg Fix Time", value: "4.2 days", icon: Clock, color: "text-indigo bg-indigo-light", trend: "-1.1d" },
    { title: "SLA Compliance", value: "91%", icon: Shield, color: "text-amber bg-amber-light", trend: "+0.5%" },
    { title: "Total Reports", value: "348", icon: FileText, color: "text-slate-900 bg-slate-100", trend: "+12%" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Authority Style */}
      <aside className="w-64 bg-indigo-dark text-white flex flex-col flex-shrink-0">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-lg">
            <Camera size={20} className="text-indigo" />
          </div>
          <span className="text-2xl font-bold tracking-tight">CivicSnap</span>
        </div>
        <nav className="flex-1 mt-8 px-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', path: '/authority/dashboard' },
            { icon: Ticket, label: 'All Tickets', path: '/authority/tickets' },
            { icon: BarChart2, label: 'Analytics', path: '/authority/analytics', active: true },
            { icon: MapIcon, label: 'Heatmap', path: '/authority/heatmap' },
            { icon: Building2, label: 'Departments', path: '/authority/departments' },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                item.active 
                ? 'bg-white text-indigo font-bold shadow-xl shadow-black/10' 
                : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm tracking-wide">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 mt-auto">
           <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo font-bold text-sm">A</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Officer Ravi</p>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-black">Authority</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 flex-shrink-0">
           <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics & Performance</h1>
           <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100">
              {['7 Days', '30 Days', '3 Months'].map(r => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                    range === r ? 'bg-indigo text-white shadow-lg shadow-indigo/20' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {r}
                </button>
              ))}
           </div>
        </header>

        {/* Scrollable Dashboard */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10">
          
          {/* Row 1 - KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {kpis.map((kpi, idx) => (
              <Card key={idx} className="p-8 border-none shadow-sm relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-2xl ${kpi.color}`}>
                    <kpi.icon size={24} />
                  </div>
                  <span className={`text-xs font-black px-2 py-1 rounded-md ${kpi.trend.startsWith('+') ? 'bg-emerald/10 text-emerald' : 'bg-danger-light text-danger'}`}>
                    {kpi.trend}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{kpi.value}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.title}</p>
              </Card>
            ))}
          </div>

          {/* Row 2 - Main Charts */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Line Chart */}
            <Card className="p-8 border-none shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Trends Over Time</h4>
                    <p className="text-xs font-medium text-slate-400">Comparing reported vs resolved issues</p>
                  </div>
                  <Calendar size={18} className="text-slate-300" />
               </div>
               <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94A3B8'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94A3B8'}} />
                      <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                      <Legend iconType="circle" />
                      <Line type="monotone" dataKey="reported" stroke="#3730A3" strokeWidth={4} dot={{r: 6}} activeDot={{r: 8}} />
                      <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={4} dot={{r: 6}} activeDot={{r: 8}} />
                    </LineChart>
                  </ResponsiveContainer>
               </div>
            </Card>

            {/* Bar Chart */}
            <Card className="p-8 border-none shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Issue Categories</h4>
                    <p className="text-xs font-medium text-slate-400">Total volume by category</p>
                  </div>
                  <BarChart2 size={18} className="text-slate-300" />
               </div>
               <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94A3B8'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94A3B8'}} />
                      <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                         {barData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3730A3' : '#6366F1'} />
                         ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </Card>
          </div>

          {/* Row 3 - Department Performance */}
          <Card className="p-8 border-none shadow-sm overflow-hidden">
             <div className="flex items-center justify-between mb-10">
                <h4 className="text-xl font-bold text-slate-900">Department Performance Metrics</h4>
                <Button variant="secondary" className="text-xs font-bold px-4">Export CSV</Button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-slate-50 rounded-xl">
                         <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</th>
                         <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned</th>
                         <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Resolved</th>
                         <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Fix Time</th>
                         <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">SLA %</th>
                         <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {deptData.map((d, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-6 py-5 font-bold text-slate-900">{d.name}</td>
                           <td className="px-6 py-5 font-bold text-slate-500">{d.assigned}</td>
                           <td className="px-6 py-5 font-bold text-emerald">{d.resolved}</td>
                           <td className="px-6 py-5 font-bold text-slate-500">{d.time}</td>
                           <td className="px-6 py-5">
                              <span className={`font-black ${d.perf > 80 ? 'text-emerald' : d.perf > 50 ? 'text-amber' : 'text-danger'}`}>{d.sla}</span>
                           </td>
                           <td className="px-6 py-5">
                              <div className="w-full max-w-[120px] h-2 bg-slate-100 rounded-full overflow-hidden">
                                 <div 
                                   className={`h-full rounded-full ${d.perf > 80 ? 'bg-emerald' : d.perf > 50 ? 'bg-amber' : 'bg-danger'}`} 
                                   style={{ width: `${d.perf}%` }}
                                 ></div>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </Card>

          {/* Row 4 - Ward Breakdown */}
          <Card className="p-8 border-none shadow-sm">
             <div className="flex items-center justify-between mb-10">
                <h4 className="text-xl font-bold text-slate-900">Issues by Ward (Hotspots)</h4>
                <MapIcon size={20} className="text-slate-300" />
             </div>
             <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wardData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94A3B8'}} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94A3B8'}} width={80} />
                    <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
                    <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                       {wardData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index < 3 ? '#F59E0B' : '#3730A3'} />
                       ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
