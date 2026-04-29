import React, { useState } from 'react';
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
  Settings
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, Cell, LabelList
} from 'recharts';

const lineData = [
  { name: 'Day 1', reported: 45, resolved: 32 },
  { name: 'Day 2', reported: 52, resolved: 38 },
  { name: 'Day 3', reported: 48, resolved: 42 },
  { name: 'Day 4', reported: 61, resolved: 45 },
  { name: 'Day 5', reported: 55, resolved: 50 },
  { name: 'Day 6', reported: 40, resolved: 55 },
  { name: 'Day 7', reported: 35, resolved: 48 },
];

const categoryData = [
  { name: 'Pothole', value: 85 },
  { name: 'Streetlight', value: 64 },
  { name: 'Garbage', value: 120 },
  { name: 'Manhole', value: 45 },
  { name: 'Waterlogging', value: 30 },
];

const wardData = [
  { name: 'Ward 12', value: 142 },
  { name: 'Ward 08', value: 110 },
  { name: 'Ward 24', value: 85 },
  { name: 'Ward 04', value: 64 },
  { name: 'Ward 09', value: 42 },
].sort((a, b) => b.value - a.value);

const deptData = [
  { name: "Public Works", assigned: 142, resolved: 118, time: "4.2d", sla: "92%", perf: 92 },
  { name: "Waste Management", assigned: 98, resolved: 75, time: "3.8d", sla: "88%", perf: 88 },
  { name: "Electricity", assigned: 120, resolved: 115, time: "1.5d", sla: "96%", perf: 96 },
  { name: "Water Supply", assigned: 64, resolved: 42, time: "2.1d", sla: "74%", perf: 74 },
  { name: "Public Health", assigned: 45, resolved: 20, time: "5.5d", sla: "45%", perf: 45 },
];

const Analytics = () => {
  const [range, setRange] = useState('7 Days');

  const kpis = [
    { title: "Resolution Rate", value: "84%", icon: TrendingUp, color: "text-green-500", bgColor: "bg-green-50" },
    { title: "Avg Fix Time", value: "4.2 days", icon: Clock, color: "text-blue-500", bgColor: "bg-blue-50" },
    { title: "SLA Compliance", value: "91%", icon: Shield, color: "text-amber-500", bgColor: "bg-amber-50" },
    { title: "Total Reports", value: "348", icon: FileText, color: "text-[#3730A3]", bgColor: "bg-indigo-light" },
  ];

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
                  item.label === "Analytics" 
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
            {kpis.map((kpi, idx) => (
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
                  <p className="text-[10px] text-slate-400 font-medium">Daily trend monitoring</p>
               </div>
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                      <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                      <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                      <Line type="monotone" name="Reported" dataKey="reported" stroke="#3730A3" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                      <Line type="monotone" name="Resolved" dataKey="resolved" stroke="#10B981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                    </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
               <div className="mb-8">
                  <h4 className="text-sm font-bold text-slate-900">Issues by Category</h4>
                  <p className="text-[10px] text-slate-400 font-medium">High volume request analysis</p>
               </div>
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                      <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                      <Bar dataKey="value" fill="#3730A3" radius={[6, 6, 0, 0]}>
                        <LabelList dataKey="value" position="top" style={{ fontSize: '10px', fontWeight: 'bold', fill: '#64748B' }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>

          {/* Row 3 - Department Performance Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Department Performance</h4>
                <button className="text-[10px] font-black text-indigo hover:underline">View All Units</button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-slate-50">
                      <tr>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Assigned</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Resolved</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Avg Fix Time</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">SLA %</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Performance</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {deptData.map((d, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-6 py-4 text-xs font-bold text-slate-900">{d.name}</td>
                           <td className="px-6 py-4 text-xs font-bold text-slate-500 text-center">{d.assigned}</td>
                           <td className="px-6 py-4 text-xs font-bold text-green-600 text-center">{d.resolved}</td>
                           <td className="px-6 py-4 text-xs font-bold text-slate-500 text-center">{d.time}</td>
                           <td className="px-6 py-4 text-center">
                              <span className={`text-xs font-black ${d.perf > 80 ? 'text-green-600' : d.perf > 50 ? 'text-amber-500' : 'text-red-500'}`}>{d.sla}</span>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                   <div 
                                     className={`h-full rounded-full ${d.perf > 80 ? 'bg-green-500' : d.perf > 50 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                     style={{ width: `${d.perf}%` }}
                                   ></div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-500">{d.perf / 10}</span>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>

          {/* Row 4 - Ward Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
             <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Issues per Ward (Hotspots)</h4>
                <p className="text-[10px] text-slate-400 font-medium">Geospatial distribution of citizen reports</p>
             </div>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wardData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} width={80} />
                    <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                       {wardData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index < 3 ? '#F59E0B' : '#3730A3'} />
                       ))}
                       <LabelList dataKey="value" position="right" style={{ fontSize: '10px', fontWeight: 'bold', fill: '#64748B' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

