import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  Map as MapIcon, 
  Search, 
  ChevronRight, 
  Layers, 
  LayoutDashboard, 
  Ticket, 
  BarChart2, 
  Building2, 
  Settings, 
  Camera, 
  LogOut,
  MapPin,
  Flame,
  Grid
} from 'lucide-react';
import { MapContainer, TileLayer, Circle, Popup, Polygon } from 'react-leaflet';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const mockWards = [
  { id: 1, name: "Ward 4 - Green Valley", score: 82, open: 12, resolved: 145, trend: 'up' },
  { id: 2, name: "Ward 12 - Downtown", score: 45, open: 38, resolved: 88, trend: 'down' },
  { id: 3, name: "Ward 7 - West Coast", score: 68, open: 24, resolved: 110, trend: 'stable' },
  { id: 4, name: "Ward 2 - Industrial", score: 55, open: 30, resolved: 72, trend: 'down' },
  { id: 5, name: "Ward 9 - Parkside", score: 91, open: 5, resolved: 156, trend: 'up' },
  { id: 6, name: "Ward 1 - Old Town", score: 42, open: 45, resolved: 40, trend: 'down' },
];

const Heatmap = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('Heatmap');
  const [selectedWard, setSelectedWard] = useState(null);

  const heatmapPoints = [
    { center: [20.5937, 78.9629], radius: 500, color: '#EF4444', intensity: 0.6 },
    { center: [20.5957, 78.9649], radius: 800, color: '#EF4444', intensity: 0.4 },
    { center: [20.5917, 78.9619], radius: 400, color: '#F59E0B', intensity: 0.5 },
    { center: [20.5977, 78.9689], radius: 600, color: '#F59E0B', intensity: 0.3 },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald bg-emerald/10';
    if (score >= 60) return 'text-amber bg-amber-light';
    return 'text-danger bg-danger-light';
  };

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
            { icon: BarChart2, label: 'Analytics', path: '/authority/analytics' },
            { icon: MapIcon, label: 'Heatmap', path: '/authority/heatmap', active: true },
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
      </aside>

      {/* Ward Overview Panel (Left) */}
      <div className="w-80 bg-white border-r border-slate-100 flex flex-col z-10">
        <div className="p-6 border-b border-slate-50">
           <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Grid size={20} className="text-indigo" />
              Ward Overview
           </h2>
           <div className="relative mb-2">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search Ward..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo/20"
              />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {mockWards.map((ward) => (
            <div 
              key={ward.id}
              onClick={() => setSelectedWard(ward)}
              className={`p-6 cursor-pointer transition-all hover:bg-slate-50 group ${selectedWard?.id === ward.id ? 'bg-indigo-light/30 border-r-4 border-indigo' : ''}`}
            >
               <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 pr-2">
                     <h4 className={`font-bold text-sm transition-colors ${selectedWard?.id === ward.id ? 'text-indigo' : 'text-slate-900'}`}>{ward.name}</h4>
                  </div>
                  <div className={`px-2 py-1 rounded-lg font-black text-[10px] ${getScoreColor(ward.score)}`}>
                     {ward.score}%
                  </div>
               </div>
               
               <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                     <MapPin size={10} /> {ward.open} Open
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald uppercase">
                     <Flame size={10} className="text-amber" /> {ward.resolved} Fixed
                  </div>
               </div>

               <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo rounded-full" 
                    style={{ width: `${(ward.resolved / (ward.open + ward.resolved)) * 100}%` }}
                  ></div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Area (Right) */}
      <main className="flex-1 relative bg-slate-100">
         <MapContainer 
           center={[20.5937, 78.9629]} 
           zoom={14} 
           style={{ height: '100%', width: '100%' }}
           zoomControl={false}
         >
           <TileLayer
             url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
           />
           
           {view === 'Heatmap' && heatmapPoints.map((point, i) => (
             <Circle 
               key={i}
               center={point.center}
               radius={point.radius}
               pathOptions={{ fillColor: point.color, color: 'transparent', fillOpacity: point.intensity }}
             />
           ))}

           {view === 'Pin View' && (
             <Circle center={[20.5937, 78.9629]} radius={200} pathOptions={{ color: '#3730A3' }}>
                <Popup>Active Hotspot</Popup>
             </Circle>
           )}
         </MapContainer>

         {/* View Toggle Pill */}
         <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[1000] flex p-1.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50">
            {['Heatmap', 'Pin View', 'Boundaries'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  view === v ? 'bg-indigo text-white shadow-xl shadow-indigo/30' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {v}
              </button>
            ))}
         </div>

         {/* Bottom Ward Summary Bar */}
         <div className="absolute bottom-0 left-0 right-0 z-[1000] h-24 bg-white border-t border-slate-100 shadow-2xl flex items-center px-6 overflow-x-auto gap-8 scrollbar-hide">
            {mockWards.map(w => (
              <div key={w.id} className="flex-shrink-0 flex items-center gap-6 pr-8 border-r border-slate-50 last:border-0 h-full">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${getScoreColor(w.score)}`}>
                    {w.score}
                 </div>
                 <div>
                    <h5 className="text-sm font-bold text-slate-900 truncate w-32">{w.name}</h5>
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-bold text-danger uppercase tracking-tighter">{w.open} Open</span>
                       <button className="text-[10px] font-bold text-indigo hover:underline uppercase tracking-tighter">View All →</button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </main>
    </div>
  );
};

export default Heatmap;
